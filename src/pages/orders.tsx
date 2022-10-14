import React, {FC, useEffect} from "react";
import styles from "./style.module.css";
import { useDispatchHook, useSelectorHook } from "../hooks/redux";
import {
    getUserData,
    refreshToken,
    userLogout,
} from "../services/actions/user";
import {NavLink, useHistory} from "react-router-dom";
import {SET_USER_SUCCESS} from "../services/actions/order";
import {OrderCard} from "../components/order-card/order-card";
import {WS_USER_FEED_CLOSE, WS_USER_FEED_CONNECT} from "../services/actions/ws-user-feed";
import {wsURL} from "../services/api";
import {getCookie} from "../services/cookies";



export const Orders: FC = () => {
    const history = useHistory()
    const dispatch = useDispatchHook();
    const { jwtExpired, jwtInvalid } =
        useSelectorHook((store) => store.user);
    const { data } = useSelectorHook((store) => store.userFeed);

    const {userAccess} = useSelectorHook(store => store.order)

    useEffect(() => {
        if (!jwtInvalid) {
            dispatch(getUserData());
        }
        if (jwtExpired) {
            dispatch(refreshToken());
        }
    }, [dispatch, jwtInvalid, jwtExpired]);


    const logout = () => {
        dispatch(userLogout());
    };

    if (userAccess) {
        dispatch({
            type: SET_USER_SUCCESS,
            userAccess: false
        })
        history.push('/')
    }

    useEffect(() => {
        const token = getCookie("accessToken")
        const accessToken = token?.replace(/Bearer /, '')
        dispatch({
            type: WS_USER_FEED_CONNECT,
            payload: `${wsURL}?token=${accessToken}`,
        });

        return () => {
            dispatch({ type: WS_USER_FEED_CLOSE });
        };
    }, [dispatch]);

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
                            В этом разделе вы можете изменить свои персональные данные
                        </p>
                    </div>
                </div>
                <div className="ml-15 mt-10">
                    <div className={styles.scroll}>
                        {data.orders.map((el) =>
                            <OrderCard key={el._id} item={el}/>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
};
