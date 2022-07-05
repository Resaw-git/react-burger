import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-item.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";


const IngredientItem = (props) => {
  const { ingredientsArray } = useSelector((store) => store.ingredients);
  const throwProps = () => {
    props.info(props.id);
    props.content("info");
    props.modal();
  };

  const element = ingredientsArray.find((el) => el._id === props.id && el)

  return (
    <div className={styles.block} onClick={throwProps}>
      <Counter count={1} size="default" />
      <img alt={element.name} src={element.image} className={styles.img} />
      <div className={styles.price}>
        <p className="text text_type_digits-default pr-2">{element.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.name}>
        <p className="mt-3 text text_type_main-default">{element.name}</p>
      </div>
    </div>
  );
};

export default IngredientItem;

IngredientItem.propTypes = {
  info: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
  modal: PropTypes.func.isRequired,
};
