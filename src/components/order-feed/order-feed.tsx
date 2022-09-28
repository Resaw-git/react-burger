import React, { FC } from "react";
import styles from "./order-feed.module.css";
import { useSelectorHook } from "../../hooks/redux";
import { IIngredient } from "../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderCard: FC = () => {
  const { ingredientsArray } = useSelectorHook((store) => store.ingredients);

  const newArr: IIngredient[] = ingredientsArray;
  const orderNumber: number = Math.floor(Math.random() * 999999);

  const getTotalSum = (ingredients: IIngredient[]) => {
    const arr = [...ingredients];
    return arr.reduce((accum, current) => {
      return accum + current.price;
    }, 0);
  };

  const renderIng = () => {
    return newArr.map((el, index) => {
      if (index === 0 && newArr.length > 5) {
        return (
          <div className={styles.small_img} key={el?._id}>
            <img
              className={styles.img_ing}
              src={el?.image_mobile}
              alt={el?.name}
            />
            <div className={styles.count}>+{newArr.length - 5}</div>
          </div>
        );
      } else if (index <= 5) {
        return (
          <div className={styles.small_img} key={el?._id}>
            <img
              className={styles.img_ing}
              src={el?.image_mobile}
              alt={el?.name}
            />
          </div>
        );
      } else {
        return null
      }
    });
  };

  return (
    <div className={styles.order_box}>
      <div className={styles.order_title}>
        <div className="text text_type_digits-default">#{orderNumber}</div>
        <p className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </p>
      </div>

      <div className="text text_type_main-medium">
        Death Star Starship Main бургер
      </div>

      <div className={styles.order_footer}>
        <div className={styles.order_ingredients}>{renderIng()}</div>
        <div className={styles.order_price}>
          <div className="text text_type_digits-default">
            {getTotalSum(newArr)}
          </div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export const OrderFeed: FC = () => {
  return (
    <>
      <div className={styles.warp}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={styles.main}>
            <div className={styles.scroll}>
                <OrderCard />

            </div>

        </div>
      </div>
        <div className="mr-15"></div>
      <div className={styles.warp}>
        <div className={styles.main_right}>
          <div className={styles.order_state}>
            <div className={styles.order_numbers}>
              <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
              <ul className={styles.order_list}>
                <li className="text text_type_digits-default text_color_success">
                  123456
                </li>
                <li className="text text_type_digits-default text_color_success">
                  123456
                </li>
                <li className="text text_type_digits-default text_color_success">
                  123456
                </li>
                <li className="text text_type_digits-default text_color_success">
                  123456
                </li>
                <li className="text text_type_digits-default text_color_success">
                  123456
                </li>
                <li className="text text_type_digits-default text_color_success">
                  123456
                </li>
                <li className="text text_type_digits-default text_color_success">
                  123456
                </li>
                <li className="text text_type_digits-default text_color_success">
                  123456
                </li>
                <li className="text text_type_digits-default text_color_success">
                  123456
                </li>
              </ul>
            </div>
            <div className={styles.order_numbers}>
              <h2 className="text text_type_main-medium mb-6">В работе:</h2>
              <ul className={styles.order_list}>
                <li className="text text_type_digits-default">123456</li>
                <li className="text text_type_digits-default">123456</li>
                <li className="text text_type_digits-default">123456</li>
                <li className="text text_type_digits-default">123456</li>
                <li className="text text_type_digits-default">123456</li>
                <li className="text text_type_digits-default">123456</li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text text_type_main-medium mb-6">
              Выполнено за все время:
            </h2>
            <p className={styles.order_bignumber}>12 345</p>
          </div>
          <div>
            <h2 className="text text_type_main-medium mb-6">
                Выполнено за сегодня:
            </h2>
            <p className={styles.order_bignumber}>123</p>
          </div>
        </div>
      </div>
    </>
  );
};
