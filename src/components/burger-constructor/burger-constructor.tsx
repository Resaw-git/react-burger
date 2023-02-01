import React, {FC} from "react";
import {
  CurrencyIcon,
  Button
} from "../shared";
import ConstructorItem from "../constructor-item/constructor-item";
import styles from "./burger-constructor.module.css";
import { useDispatchHook, useSelectorHook } from "../../hooks/redux";
import { MODAL_OPEN } from "../../services/actions/modal";
import { fetchOrder } from "../../services/actions/order";
import { v4 as uuidv4 } from "uuid";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT, ADD_BUN } from "../../services/actions/constructor";
import { useHistory } from "react-router-dom";
import {IIngredient} from "../../utils/types";

const BurgerConstructor: FC = () => {
  const history = useHistory();
  const dispatch = useDispatchHook();

  const { constructorIng, constructorBun } = useSelectorHook(
    (store) => store.constructorList
  );

  const { loginSuccess } = useSelectorHook((store) => store.login);

  const [, dragRef] = useDrop({
    accept: "ingredient",
    drop(item: IIngredient) {
      if (item.type === "bun") {
        dispatch({
          type: ADD_BUN,
          item: {
            ...item,
            id: uuidv4(),
          },
        });
      } else {
        dispatch({
          type: ADD_INGREDIENT,
          item: {
            ...item,
            id: uuidv4(),
          },
        });
      }
    },
  });

  const getIngredientsId = (ingredients: IIngredient[], bun: IIngredient[]) => {
    return [...ingredients, ...bun].map((e) => e._id);
  };

  const openOrderModal = () => {
    if (!loginSuccess) {
      history.push("/login");
    } else {
      dispatch({
        type: MODAL_OPEN,
        isDetails: false,
      });
      dispatch(fetchOrder(getIngredientsId(constructorIng, constructorBun)));
    }
  };

  const getTotalSum = (ingredients: IIngredient[], bun: IIngredient[]) => {
    const arr = [...ingredients, ...bun];
    return arr.reduce((accum, current) =>
      current.type === "bun" ? accum + current.price * 2 : accum + current.price
    , 0);
  };

  return (
    <div className={styles.main} ref={dragRef}>
      <div className={styles.elements} data-test={'dropfield'}>
        <ConstructorItem index={0} position={"top"} />
        <div className={styles.scroll}>
          {(constructorIng.length > 0 &&
            constructorIng.map((e: IIngredient, index: number) => (
              <ConstructorItem
                el={e}
                key={e.id}
                index={index}
              />
            ))) || <ConstructorItem index={0} />}
        </div>
        <ConstructorItem index={0} position={"bottom"} />
        <div className={styles.block}>
          <p className="text text_type_digits-medium mr-4">
            {getTotalSum(constructorIng, constructorBun)}
          </p>
          <div className={styles.bigIcon + " mr-10"}>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            onClick={openOrderModal}
            type="primary"
            size="large"
            disabled={constructorBun.length === 0}
            htmlType="button">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;
