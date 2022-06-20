import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-item.module.css";

const IngredientItem = (props) => {
  
  return (
    <div className={styles.block}>
      <Counter  count={1} size="default" />
      <img alt={props.name} src={props.img} className={styles.img} />
      <div className={styles.price}>
        <p className="text text_type_digits-default pr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.name}>
        <p className="mt-3 text text_type_main-default">{props.name}</p>
      </div>
    </div>
  );
};

export default IngredientItem;
