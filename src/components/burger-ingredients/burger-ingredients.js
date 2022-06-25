import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import PropTypes from "prop-types";

const BurgerIngredients = ({ data, modal, info, content }) => {
  const [current, setCurrent] = React.useState("one");

  const renderElements = (data, category) => {
    const type =
      (category === "Булки" && "bun") ||
      (category === "Соусы" && "sauce") ||
      (category === "Начинки" && "main");
    const result = data.map((e) => {
      return (
        e.type === type && (
          <IngredientItem
            modal={modal}
            key={e._id}
            id={e._id}
            info={info}
            name={e.name}
            price={e.price}
            img={e.image_large}
            content={content}
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
};

export default BurgerIngredients;

const dataPropTypes = PropTypes.shape({
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  __v: PropTypes.number,
  _id: PropTypes.string.isRequired,
});

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  modal: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
  info: PropTypes.func.isRequired,
};
