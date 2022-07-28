import React from "react";
import styles from "./ingredient-details.module.css";
import {useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const IngredientDetails = ({bg}) => {
  const { id } = useParams();
  const [data, setData] = React.useState("");
  const { ingredientsArray } = useSelector((store) => store.ingredients);

  React.useEffect(() => {
    setData(ingredientsArray.find((el) => el._id === id));
  }, [ingredientsArray]);

  return (
    data && (
        <div className={!bg ? styles.wrapper : null}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
        </header>
        <img src={data.image_large} alt={"ingredient"} />
        <p className="text text_type_main-medium mt-4">{data.name}</p>
        <div className={styles.details + " mt-8"}>
          <div className={styles.nutrition}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive mt-2">
              {data.calories}
            </p>
          </div>
          <div className={styles.nutrition}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive mt-2">
              {data.proteins}
            </p>
          </div>
          <div className={styles.nutrition}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive mt-2">
              {data.fat}
            </p>
          </div>
          <div className={styles.nutrition}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive mt-2">
              {data.carbohydrates}
            </p>
          </div>
        </div>
      </div>
        </div>
    )
  );
};

export default IngredientDetails;

IngredientDetails.propTypes = {
  bg: PropTypes.object,
};
