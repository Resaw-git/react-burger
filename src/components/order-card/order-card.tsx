import React, { FC, useEffect, useState } from "react";
import styles from "./order-card.module.css";
import { useDispatchHook, useSelectorHook } from "../../hooks/redux";
import { IIngredient, ILocation, IOrder } from "../../utils/types";
import { CurrencyIcon } from "../shared";
import { useHistory, useLocation } from "react-router-dom";
import { MODAL_OPEN } from "../../services/actions/modal";
import { formatOrderData } from "../../lib/format-order-data";

interface IComponentProps {
  item: IOrder;
}

export const OrderCard: FC<IComponentProps> = ({ item }) => {
  const history = useHistory();
  const location = useLocation<ILocation>();
  const [data, setData] = useState<IIngredient[]>([]);
  const [totalSum, setTotalSum] = useState(0);
  const dispatch = useDispatchHook();
  const { ingredientsArray } = useSelectorHook((store) => store.ingredients);

  useEffect(() => {
    if (item && item.ingredients) {
      const items: IIngredient[] = item.ingredients.map(
        (e: string) => ingredientsArray.find((el: IIngredient) => el._id === e) as IIngredient,
      );
      setData(items);
    }
  }, [ingredientsArray]);

  const showDetails = () => {
    history.push(`${location.pathname}/${item?.number}`, {
      background: location,
    });
    dispatch({
      type: MODAL_OPEN,
      isDetails: true,
    });
  };

  useEffect(() => {
    const result = data.reduce(
      (accum, current) => (current?.type === "bun" ? accum + current?.price * 2 : accum + current?.price),
      0,
    );
    setTotalSum(result);
  }, [data]);

  const renderIng = () =>
    data?.map((el, index) => {
      if (index === 0 && data?.length > 5) {
        return (
          <div key={index} className={styles.small_img}>
            <img className={styles.img_ing} src={el?.image_mobile} alt={el?.name} />
            <div className={styles.count}>+{data?.length - 5}</div>
          </div>
        );
      } else if (index <= 5) {
        return (
          <div key={index} className={styles.small_img}>
            <img className={styles.img_ing} src={el?.image_mobile} alt={el?.name} />
          </div>
        );
      }
    });

  return (
    <div className={styles.order_box} onClick={showDetails}>
      <div className={styles.order_title}>
        <div className="text text_type_digits-default">#{item.number}</div>
        <p className="text text_type_main-default text_color_inactive">{formatOrderData(item.createdAt)}</p>
      </div>

      <div className="text text_type_main-medium">{item.name}</div>
      {location.pathname.indexOf("feed") === -1 && (
        <p
          className={
            item?.status === "done" ? "text text_type_main-default text_color_success" : "text text_type_main-default"
          }
        >
          {item?.status === "done" ? "Выполнен" : "Готовится"}
        </p>
      )}

      <div className={styles.order_footer}>
        <div className={styles.order_ingredients}>{renderIng()}</div>
        <div className={styles.order_price}>
          <div className="text text_type_digits-default">{`${totalSum}`}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
