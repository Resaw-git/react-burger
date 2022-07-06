import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItem from "../constructor-item/constructor-item";
import styles from "./burger-constructor.module.css";
import { useSelector, useDispatch } from "react-redux";
import { MODAL_OPEN } from "../../services/actions/modal";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((store) => store.constructorList);

  const openModal = () => {
    dispatch({
      type: MODAL_OPEN,
      item: "",
      header: "",
    });
  };

  const getTotalSum = (arr) => {
    return arr.reduce((accum, current) => {
      if (current.type === "bun") {
        return accum + current.price * 2;
      }
      return accum + current.price;
    }, 0);
  };

  const addBun = (id, pos) => {
    return <ConstructorItem position={pos} id={id} />;
  };

  const addIngredient = (id) => {
    return <ConstructorItem position="middle" id={id} />;
  };

  return (
    <div className={styles.main}>
      <div className={styles.elements}>
        {addBun("60d3b41abdacab0026a733c6", "top")}
        <div className={styles.scroll}>
          {addIngredient("60d3b41abdacab0026a733cd")}
          {addIngredient("60d3b41abdacab0026a733cd")}
          {addIngredient("60d3b41abdacab0026a733cd")}
          {addIngredient("60d3b41abdacab0026a733cd")}
        </div>
        {addBun("60d3b41abdacab0026a733c6", "bottom")}
        <div className={styles.block}>
          <p className="text text_type_digits-medium mr-4">
            {getTotalSum(list)}
          </p>
          <div className={styles.bigIcon + " mr-10"}>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={openModal} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;
