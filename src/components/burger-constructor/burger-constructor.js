import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItem from "../constructor-item/constructor-item";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";


const BurgerConstructor = ({ modal, content }) => {
  const getContent = () => {
    content("order");
    modal();
  };


  const addBun = (id, pos) => {
    return <ConstructorItem position={pos} id={id} />;
  }

  const addIngredient = (id) => {
    return <ConstructorItem position="middle" id={id} />;
  };

  return (
    <div className={styles.main}>
      <div className={styles.elements} >
        {addBun('60d3b41abdacab0026a733c6', "top")}
        <div className={styles.scroll}>
          {addIngredient('60d3b41abdacab0026a733cd')}
          {addIngredient('60d3b41abdacab0026a733cd')}
          {addIngredient('60d3b41abdacab0026a733cd')}
          {addIngredient('60d3b41abdacab0026a733cd')}
        </div>
        {addBun('60d3b41abdacab0026a733c6', "bottom")}
        <div className={styles.block}>
          <p className="text text_type_digits-medium mr-4">12345</p>
          <div className={styles.bigIcon + " mr-10"}>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={getContent} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  modal: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
};
