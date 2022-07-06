import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const { ingredientsArray } = useSelector((store) => store.ingredients);

  const [current, setCurrent] = React.useState("one");

  const renderElements = (ingredients, category) => {
    const type =
      (category === "Булки" && "bun") ||
      (category === "Соусы" && "sauce") ||
      (category === "Начинки" && "main");
    const result = ingredients.map((e) => {
      return (
        e.type === type && (
          <IngredientItem
            key={e._id}
            id={e._id}
          />
        )
      );
    });
    return (
      <>
        <h2
          className={
            "text text_type_main-medium" +
            (category !== "Булки" ? " mt-10" : "")
          }
        >
          {category}
        </h2>
        <div className={styles.items}>{result}</div>
      </>
    );
  };

  return (
    <div className={styles.warp}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={styles.main}>
        <div className={styles.tabs}>
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={styles.scroll}>
          {renderElements(ingredientsArray, "Булки")}
          {renderElements(ingredientsArray, "Соусы")}
          {renderElements(ingredientsArray, "Начинки")}
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;


