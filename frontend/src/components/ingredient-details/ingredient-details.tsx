import React, {FC} from "react";
import styles from "./ingredient-details.module.css";
import { useSelectorHook } from "../../hooks/redux";
import { useNavigate, useParams } from "react-router-dom";
import {IIngredient} from "../../utils/types";
import { CloseIcon } from "../shared";
import { useIsMobile } from "../../hooks/use-media-query";

interface IComponentProps {
  bg?: boolean
}

const IngredientDetails: FC<IComponentProps> = ({ bg }) => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = React.useState<IIngredient>();
  const { ingredientsArray } = useSelectorHook((store) => store.ingredients);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  React.useEffect(() => {
      setData(ingredientsArray.find((el: IIngredient) => el._id === id));
  }, [ingredientsArray]);


  return (
          <div className={!bg ? styles.wrapper : undefined}>
            <div className={styles.main}>
              {isMobile ? (
                !bg && (
                  <div className={styles.mobile_bar}>
                    <CloseIcon type="primary" onClick={() => navigate("/")} />
                  </div>
                )
              ) : (
                <header className={styles.header}>
                  <h2 className="text text_type_main-large">Детали ингредиента</h2>
                </header>
              )}
              <img src={data?.image_large} alt={"ingredient"} />
              <p className="text text_type_main-medium mt-4">{data?.name}</p>
              <div className={styles.details + " mt-8"}>
                <div className={styles.nutrition}>
                  <p className="text text_type_main-default text_color_inactive">
                    Калории,ккал
                  </p>
                  <p className="text text_type_digits-default text_color_inactive mt-2">
                    {data?.calories}
                  </p>
                </div>
                <div className={styles.nutrition}>
                  <p className="text text_type_main-default text_color_inactive">
                    Белки, г
                  </p>
                  <p className="text text_type_digits-default text_color_inactive mt-2">
                    {data?.proteins}
                  </p>
                </div>
                <div className={styles.nutrition}>
                  <p className="text text_type_main-default text_color_inactive">
                    Жиры, г
                  </p>
                  <p className="text text_type_digits-default text_color_inactive mt-2">
                    {data?.fat}
                  </p>
                </div>
                <div className={styles.nutrition}>
                  <p className="text text_type_main-default text_color_inactive">
                    Углеводы, г
                  </p>
                  <p className="text text_type_digits-default text_color_inactive mt-2">
                    {data?.carbohydrates}
                  </p>
                </div>
              </div>
            </div>
          </div>
  );
};

export default IngredientDetails;

