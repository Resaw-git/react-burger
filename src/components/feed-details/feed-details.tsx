import React, { FC, useEffect, useState } from "react";
import styles from "./feed-details.module.css";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatchHook, useSelectorHook } from "../../hooks/redux";
import { IIngredient, ILocation, IOrder } from "../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useGetDate } from "../../hooks/use-date";
import { WS_FEED_CLOSE, WS_FEED_CONNECT } from "../../services/actions/ws-feed";
import { wsURL } from "../../services/api";
import { getCookie } from "../../services/cookies";
import {
  WS_USER_FEED_CLOSE,
  WS_USER_FEED_CONNECT,
} from "../../services/actions/ws-user-feed";

interface IComponentProps {
  bg?: string | unknown;
}

interface IParams {
  id: string;
}

export const FeedDetails: FC<IComponentProps> = ({ bg }) => {
  const { id }: IParams = useParams();
  const dispatch = useDispatchHook();
  const history = useHistory();
  const url = history.location.pathname;
  const [order, setOrder] = useState<IOrder>();
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const { ingredientsArray } = useSelectorHook((store) => store.ingredients);
  const { data } = useSelectorHook((store) =>
    url.indexOf("feed") === 1 ? store.feed : store.userFeed
  );

  useEffect(() => {
    if (!bg) {
      if (url.indexOf("feed") === 1) {
        dispatch({
          type: WS_FEED_CONNECT,
          payload: `${wsURL}/all`,
        });

        return () => {
          dispatch({ type: WS_FEED_CLOSE });
        };
      } else {
        const token = getCookie("accessToken");
        const accessToken = token?.replace(/Bearer /, "");
        dispatch({
          type: WS_USER_FEED_CONNECT,
          payload: `${wsURL}?token=${accessToken}`,
        });

        return () => {
          dispatch({ type: WS_USER_FEED_CLOSE });
        };
      }
    }
  }, [dispatch]);

  useEffect(() => {
    setOrder(data?.orders.find((el) => el.number.toString() === id));
  }, [data]);

  useEffect(() => {
    const items: any = [];
    order?.ingredients.map((e: string) => {
      items.push(ingredientsArray.find((el: IIngredient) => el._id === e));
    });

    const sortedItems = items.sort((a: IIngredient, b: IIngredient) =>
      a._id > b._id ? 1 : a._id < b._id ? -1 : 0
    );

    sortedItems.map((elem: IIngredient, index: number) => {
      index === 0 ? (elem.count = 2) : (elem.count = 1);
      return elem;
    });

    sortedItems.map((elem: IIngredient, index: number, self: IIngredient[]) => {
      if (self[index + 1] === elem) {
        elem.count = elem.count + 1;
      }
      return elem;
    });

    const unique = sortedItems.filter(
      (elem: IIngredient, index: number, self: IIngredient[]) =>
        index === self.indexOf(elem)
    );

    setIngredients(unique);
  }, [order]);

  const renderItem = () => {
    return ingredients?.map((el) => {
      return (
        <div className={styles.item_info} key={el?._id}>
          <div className={styles.item_description}>
            <div className={styles.small_img}>
              <img
                className={styles.img_ing}
                src={el?.image_mobile}
                alt={el?.name}
              />
            </div>
            <div className={styles.name}>
              <p className="text text_type_main-default">{el?.name}</p>
            </div>
          </div>

          <div className={styles.price}>
            {`${el.count} x ${el.price}`}
            <div className="mr-2" />
            <CurrencyIcon type="primary" />
          </div>
        </div>
      );
    });
  };

  const useTotalSum = (ingredients: IIngredient[]) => {
    const result = ingredients.reduce(
      (accum, current) => accum + current.price * current.count,
      0
    );
    return result;
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.content}>
            <div className={bg ? styles.text_left : styles.text_center}>
              <p
                className={
                  bg
                    ? `text text_type_digits-default mb-10`
                    : `text text_type_digits-default mt-30 mb-10`
                }
              >
                #{id}
              </p>
            </div>

            <h2 className="text_type_main-medium mb-3">{order?.name}</h2>
            <p className="text text_type_main-default text_color_success mb-15">
              {order?.status === "done" ? "Выполнен" : "В работе"}
            </p>

            <h2 className="text_type_main-medium mb-6">Состав:</h2>
            <div className={styles.scroll}>{renderItem()}</div>
            <div className={styles.footer}>
              <p className="text text_type_main-default text_color_inactive">
                {useGetDate(order?.createdAt)}
              </p>
              <div className={styles.total_price}>
                {useTotalSum(ingredients)}
                <div className="mr-2" />
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
