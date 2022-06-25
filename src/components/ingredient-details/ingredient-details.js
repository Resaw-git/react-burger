import React from "react";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

const IngredientDetails = ({ infoItem }) => {
  return (
    <div className={styles.main}>
      <img src={infoItem.image_large} alt={"ingredient"} />
      <p className="text text_type_main-medium mt-4">{infoItem.name}</p>
      <div className={styles.details + " mt-8"}>
        <div className={styles.nutrition}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {infoItem.calories}
          </p>
        </div>
        <div className={styles.nutrition}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {infoItem.proteins}
          </p>
        </div>
        <div className={styles.nutrition}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {infoItem.fat}
          </p>
        </div>
        <div className={styles.nutrition}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {infoItem.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;

IngredientDetails.propTypes = {
  infoItem: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};
