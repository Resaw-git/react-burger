import React from "react";
import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const { modalData } = useSelector((store) => store.modal);
  return (
    <div className={styles.main}>
      <img src={modalData.image_large} alt={"ingredient"} />
      <p className="text text_type_main-medium mt-4">{modalData.name}</p>
      <div className={styles.details + " mt-8"}>
        <div className={styles.nutrition}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {modalData.calories}
          </p>
        </div>
        <div className={styles.nutrition}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {modalData.proteins}
          </p>
        </div>
        <div className={styles.nutrition}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {modalData.fat}
          </p>
        </div>
        <div className={styles.nutrition}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {modalData.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
