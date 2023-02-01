import React, { FC, useEffect, useState } from "react";
import styles from "./feed-details.module.css";
import { useParams } from "react-router-dom";
import { useDispatchHook, useSelectorHook } from "../../hooks/redux";
import { IIngredient, IOrder } from "../../utils/types";
import { CurrencyIcon } from "../shared";
import { formatOrderData } from "../../lib/format-order-data";
import {
  connectWsFeed,
  disconnectWsFeed,
} from "../../services/actions/ws-feed";
import {
  connectWsUserFeed,
  disconnectWsUserFeed,
} from "../../services/actions/ws-user-feed";
import { v4 as uuidv4 } from "uuid";

interface IComponentProps {
  bg?: string | unknown;
  path: string;
}

interface IParams {
  id: string;
}

export const FeedDetails: FC<IComponentProps> = ({ bg, path }) => {
  const { id }: IParams = useParams();
  const dispatch = useDispatchHook();
  const [order, setOrder] = useState<IOrder>();
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const { ingredientsArray } = useSelectorHook((store) => store.ingredients);
  const { data } = useSelectorHook((store) =>
    path.indexOf("feed") === 1 ? store.feed : store.userFeed
  );

  useEffect(() => {
    if (!bg) {
      if (path.indexOf("feed") === 1) {
        connectWsFeed(dispatch);
        return () => {
          disconnectWsFeed(dispatch);
        };
      } else {
        connectWsUserFeed(dispatch);
        return () => {
          disconnectWsUserFeed(dispatch);
        };
      }
    }
  }, [dispatch, bg, path]);

  useEffect(() => {
    setOrder(data.orders.find((el) => el.number.toString() === id));
  }, [data]);

  useEffect(() => {
    if (order && order.ingredients) {
      const items: IIngredient[] = order.ingredients.map(
        (e: string) =>
          ingredientsArray.find(
            (el: IIngredient) => el._id === e
          ) as IIngredient
      );

      const sortItems = items.sort((a: IIngredient, b: IIngredient) =>
        a._id > b._id ? 1 : a._id < b._id ? -1 : 0
      );

      const setCountBun = () => {
        return sortItems.forEach((elem: IIngredient) => {
            elem.type === "bun" ? (elem.count = 2) : (elem.count = 1);
            return elem;
          });
      }

      const setCountIngredients = () => {
        return sortItems.forEach(
          (elem: IIngredient, index: number, self: IIngredient[]) => {
            if (self[index + 1] === elem) {
              elem.count = elem.count + 1;
            }
            return elem;
          }
        );
      }

      const unique = sortItems.filter(
        (elem: IIngredient, index: number, self: IIngredient[]) =>
          index === self.indexOf(elem)
      );

      setIngredients(unique);
    }
  }, [order]);

  const renderItem = () => {
    return ingredients?.map((el) => {
      return (
        <div className={styles.item_info} key={uuidv4()}>
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
            {`${1} x ${2}`}
            <div className="mr-2" />
            <CurrencyIcon type="primary" />
          </div>
        </div>
      );
    });
  };

  const getTotalSum = (ingredients: IIngredient[]) => {
    u
    return ingredients.reduce(
      (accum, current) => accum + current.price * current.count,
      0
    );
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
                {formatOrderData(order?.createdAt)}
              </p>
              <div className={styles.total_price}>
                {getTotalSum(ingredients)}
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
