import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItem from "../constructor-item/constructor-item";
import styles from "./burger-constructor.module.css";
import data from "../../utils/data.json";

const BurgerConstructor = () => {
  const renderElements = (data) => {
    return data.map((e) => {
      return (
        (e.type === "sauce" || e.type === "main") && (
          <ConstructorItem
            key={e._id}
            position="middle"
            text={e.name}
            price={e.price}
            img={e.image_mobile}
          />
        )
      );
    });
  };

  const totalPrice = (data) => {
    let result = 0;
    data.map((e) => {
      return result += e.price;
    });
    return result;
  };

  return (
    <div className={styles.main}>
      <div className={styles.elements}>
        <ConstructorItem
          position="top"
          img={data[0].image_mobile}
          text={data[0].name + " (верх)"}
          price={data[0].price}
        />
        <div className={styles.scroll}>{renderElements(data)}</div>
        <ConstructorItem
          position="bottom"
          img={data[0].image_mobile}
          text={data[0].name + " (низ)"}
          price={data[0].price}
        />
        <div className={styles.block}>
          <p className="text text_type_digits-medium mr-4">
            {totalPrice(data)}
          </p>
          <div className={styles.bigIcon + " mr-10"}>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};



export default BurgerConstructor;
