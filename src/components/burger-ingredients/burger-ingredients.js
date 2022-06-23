import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";


const BurgerIngredients = ({data}) => {
  const [current, setCurrent] = React.useState("one");
  if (data) {
  const renderElements = (data, category) => {
    const type =
      (category === "Булки" && "bun") ||
      (category === "Соусы" && "sauce") ||
      (category === "Начинки" && "main");
    const result = data.map((e) => {
      return (
        e.type === type && (
          <IngredientItem
            key={e._id}
            name={e.name}
            price={e.price}
            img={e.image_large}
          />
        )
      );
    });
    return (
      <>
        {category === "Булки" ? (
          <h2 className="text text_type_main-medium">{category}</h2>
        ) : (
          <h2 className="text text_type_main-medium mt-10">{category}</h2>
        )}

        <div className={styles.items}>{result}</div>
      </>
    );
  };

  return (
    <div className={styles.warp}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={styles.main}>
        <div className="mt-5 mb-10" style={{ display: "flex" }}>
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
          {renderElements(data, "Булки")}
          {renderElements(data, "Соусы")}
          {renderElements(data, "Начинки")}
        </div>
      </div>
    </div>
  );
};}

export default BurgerIngredients;
