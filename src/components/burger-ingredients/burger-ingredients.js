import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

const BurgerIngredients = () => {
  const { ingredientsArray } = useSelector((store) => store.ingredients);

  const [current, setCurrent] = React.useState("bun");

  const renderElements = (ingredients, category) => {
    const type =
      (category === "Булки" && "bun") ||
      (category === "Соусы" && "sauce") ||
      (category === "Начинки" && "main");

    const result = ingredients.map(
      (e) => e.type === type && <IngredientItem key={e._id} id={e._id} />
    );

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

  const [bunRef, inViewBun] = useInView({
    threshold: 0.5,
  });
  const [sauceRef, inViewSauce] = useInView({
    threshold: 0.5,
  });
  const [mainRef, inViewMain] = useInView({
    threshold: 0.2,
  });

  React.useEffect(() => {
    if (inViewBun) {
      setCurrent("bun");
    } else if (inViewSauce) {
      setCurrent("sauce");
    } else if (inViewMain) {
      setCurrent("main");
    }
  }, [inViewBun, inViewSauce, inViewMain]);

  return (
    <div className={styles.warp}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={styles.main}>
        <div className={styles.tabs}>
          <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={styles.scroll}>
          <div ref={bunRef}>{renderElements(ingredientsArray, "Булки")}</div>
          <div ref={sauceRef}>{renderElements(ingredientsArray, "Соусы")}</div>
          <div ref={mainRef}>{renderElements(ingredientsArray, "Начинки")}</div>
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
