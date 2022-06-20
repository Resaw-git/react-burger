import React from "react";
import {
  CurrencyIcon,
  LockIcon,
  DeleteIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-item.module.css";

const ConstructorItem = (props) => {
  const setPosition = (pos) => {
    const position =
      (pos === "top" && styles.top) ||
      (pos === "middle" && styles.middle) ||
      styles.bottom;

    return position;
  };

  return (
    <div className={styles.block}>
      <div className={styles.box + " " + setPosition(props.position)}>
        {props.position === "middle" && (
          <div className={styles.dots}>
            <DragIcon type="primary" />
          </div>
        )}

        <div className={styles.smallImage}>
          <img src={props.img} alt={props.text} />
        </div>
        <div className={styles.text}>
          <p className="text text_type_main-default mr-5">{props.text}</p>
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">{props.price}</p>
        </div>

        <CurrencyIcon />
        <div className="mr-5"></div>
        {(props.position === "middle" && <DeleteIcon type="primary" />) || (
          <LockIcon type="secondary" />
        )}
      </div>
    </div>
  );
};

export default ConstructorItem;
