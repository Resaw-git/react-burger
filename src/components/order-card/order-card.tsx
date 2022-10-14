import React, { FC, useEffect, useState } from "react";
import styles from "./order-card.module.css";
import { useDispatchHook, useSelectorHook } from "../../hooks/redux";
import { IIngredient, ILocation, IOrder } from "../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useLocation } from "react-router-dom";
import { MODAL_OPEN } from "../../services/actions/modal";
import { useGetDate } from "../../hooks/use-date";

interface IComponentProps {
  item: IOrder;
}

export const OrderCard: FC<IComponentProps> = ({ item }) => {
  const history = useHistory();
  const location = useLocation<ILocation>();
  const [data, setData] = useState<IIngredient[]>([]);
  const dispatch = useDispatchHook();
  const { ingredientsArray } = useSelectorHook((store) => store.ingredients);

  useEffect(() => {
    const items: any = [];
    item?.ingredients.map((e: string) => {
      items.push(ingredientsArray.find((el: IIngredient) => el._id === e));
    });
    setData(items);
  }, [ingredientsArray]);

  const showDetails = () => {
    history.push(`feed/${item?.number}`, { background: location });
    dispatch({
      type: MODAL_OPEN,
      isDetails: true,
    });
  };

  const useTotalSum = (ingredients: IIngredient[]) =>
    ingredients.reduce(
      (accum, current) =>
        current.type === "bun"
          ? accum + current.price * 2
          : accum + current.price,
      0
    );

  const renderIng = () =>
    data?.map((el, index) =>
      index === 0 && data?.length > 5 ? (
        <div key={index} className={styles.small_img}>
          <img
            className={styles.img_ing}
            src={el?.image_mobile}
            alt={el?.name}
          />
          <div className={styles.count}>+{data?.length - 5}</div>
        </div>
      ) : index <= 5 ? (
        <div key={index} className={styles.small_img}>
          <img
            className={styles.img_ing}
            src={el?.image_mobile}
            alt={el?.name}
          />
        </div>
      ) : null
    );

  return (
    <div className={styles.order_box} onClick={showDetails}>
      <div className={styles.order_title}>
        <div className="text text_type_digits-default">#{item.number}</div>
        <p className="text text_type_main-default text_color_inactive">
          {useGetDate(item.createdAt)}
        </p>
      </div>

      <div className="text text_type_main-medium">{item.name}</div>

      <div className={styles.order_footer}>
        <div className={styles.order_ingredients}>{renderIng()}</div>
        <div className={styles.order_price}>
          <div className="text text_type_digits-default">
            {useTotalSum(data)}
          </div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};