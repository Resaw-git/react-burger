import React from "react";
import {
  Tab,
  Typography,
  Box,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import InggredientItem from "../ingredient-item/ingredient-item";
import data from "../../utils/data.json"
import bun2 from "../../images/bun-02-large.png";
import bun1 from "../../images/bun-01-large.png";
import sauce2 from "../../images/sauce-02-large.png";
import sauce4 from "../../images/sauce-04-large.png";

const BurgerIngredients = () => {
  
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={styles.wrap}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={styles.main}>
        <div className="mt-5" style={{ display: "flex" }}>
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
        <h2 className="text text_type_main-medium mt-10">Булки</h2>
        <div className={styles.items}>
          <InggredientItem
            name="Краторная булка N-200i"
            price="20"
            img={bun2}
            count={true}
          />
          <InggredientItem
            name="Флюоресцентная булка R2-D3"
            price="20"
            img={bun1}
          />
        </div>
        <h2 className="text text_type_main-medium mt-10">Соусы</h2>
        <div className={styles.items}>
          <InggredientItem
            name="Краторная булка N-200i"
            price="20"
            img={sauce2}
            count={true}
          />
          <InggredientItem
            name="Флюоресцентная булка R2-D3"
            price="20"
            img={sauce4}
          />
          <InggredientItem
            name="Соус Spicy-X"
            price="30"
            img={sauce2}
          />
          <InggredientItem
            name="Соус фирменный Space Sauce"
            price="30"
            img={sauce4}
          />
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
