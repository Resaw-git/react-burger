import React, { FC, useEffect, useState } from "react";
import styles from "./style.module.css";
import { useDispatchHook, useSelectorHook } from "../hooks/redux";
import {
  getUserData,
  refreshToken,
  userLogout,
} from "../services/actions/user";
import { NavLink, useHistory } from "react-router-dom";
import { SET_USER_SUCCESS } from "../services/actions/order";
import { OrderCard } from "../components/order-card/order-card";
import {
  connectWsUserFeed,
  disconnectWsUserFeed,
} from "../services/actions/ws-user-feed";
import { IOrder } from "../utils/types";

export const Orders: FC = () => {
  const history = useHistory();
  const dispatch = useDispatchHook();
  const { jwtExpired, jwtInvalid } = useSelectorHook((store) => store.user);
  const { data } = useSelectorHook((store) => store.userFeed);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { userAccess } = useSelectorHook((store) => store.order);

  useEffect(() => {
    const sortByOrderNumber = data.orders.sort((a: IOrder, b: IOrder) =>
      a.number < b.number ? 1 : a.number > b.number ? -1 : 0
    );
    setOrders(sortByOrderNumber);
  }, [data]);

  useEffect(() => {
    if (!jwtInvalid) {
      dispatch(getUserData());
    }
    if (jwtExpired) {
      dispatch(refreshToken());
    }
  }, [dispatch, jwtInvalid, jwtExpired]);

  useEffect(() => {
    connectWsUserFeed(dispatch);

    return () => {
      disconnectWsUserFeed(dispatch);
    };
  }, [dispatch]);

  const logout = () => {
    dispatch(userLogout());
  };

  if (userAccess) {
    dispatch({
      type: SET_USER_SUCCESS,
      userAccess: false,
    });
    history.push("/");
  }

  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <div className={styles.box}>
          <NavLink
            to="/profile"
            exact={true}
            className={styles.link}
            activeClassName={styles.link_active}
          >
            <p className="text text_type_main-medium">Профиль</p>
          </NavLink>
          <NavLink
            to="/profile/orders"
            exact={true}
            className={styles.link}
            activeClassName={styles.link_active}
          >
            <p className="text text_type_main-medium">История заказов</p>
          </NavLink>
          <div className={styles.link}>
            <p onClick={logout} className="text text_type_main-medium">
              Выход
            </p>
          </div>
          <div className={"mb-20"} />
          <div className={styles.text_info}>
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете посмотреть свою историю заказов
            </p>
          </div>
        </div>
        <div className={styles.user_feed}>
          <div className={styles.scroll}>
            {orders.map((el) => (
              <OrderCard key={el._id} item={el} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
