import React, { FC } from "react";
import styles from "./ingredient-item-mobile.module.css";
import { Button, Counter, CurrencyIcon } from "../shared";
import { IIngredient } from "../../utils/types";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatchHook, useSelectorHook } from "../../hooks/redux";
import { addBun, addIngredient } from "../../services/actions/constructor";

interface IComponentProps {
  id: string;
}

const IngredientItemMobile: FC<IComponentProps> = ({ id }) => {
  const dispatch = useDispatchHook();
  const { ingredientsArray } = useSelectorHook((store) => store.ingredients);
  const { constructorBun, constructorIng } = useSelectorHook((store) => store.constructorList);

  const element = ingredientsArray.find((el: IIngredient) => el._id === id);

  const addToConstructor = () => {
    if (element) {
      if (element.type === "bun") {
        addBun(element, dispatch);
      } else {
        addIngredient(element, dispatch);
      }
    }
  };

  const counter = React.useMemo(() => {
    let count = 0;

    if (element?.type !== "bun") {
      constructorIng.map((e: IIngredient) => {
        if (e._id === element?._id) {
          ++count;
        }
      });
    } else {
      constructorBun.map((e: IIngredient) => {
        if (e._id === element._id) {
          return (count = 2);
        }
      });
    }
    return count;
  }, [constructorIng, constructorBun]);

  return (
    <div className={styles.block}>
      {counter !== 0 && <Counter count={counter} size="default" />}
      <div className={styles.desc}>
        <img alt={element?.name} src={element?.image_mobile} className={styles.img} />
        <div className={styles.price}>
          <p className="text text_type_digits-default pr-2">{element?.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div className={styles.name}>
          <p className="mt-3 text text_type_main-default">{element?.name}</p>
        </div>
      </div>

      <Button htmlType={"button"} type={"secondary"} size={"medium"} onClick={addToConstructor}>
        Добавить
      </Button>
    </div>
  );
};

export default IngredientItemMobile;
