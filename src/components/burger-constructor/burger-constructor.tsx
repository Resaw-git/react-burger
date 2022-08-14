import React, {FC} from "react";
import {
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItem from "../constructor-item/constructor-item";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_OPEN } from "../../services/actions/modal";
import { fetchOrder, SET_USER_SUCCESS } from "../../services/actions/order";
import { v4 as uuidv4 } from "uuid";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT, ADD_BUN } from "../../services/actions/constructor";
import { useHistory } from "react-router-dom";
import {IIngredient} from "../../utils/types";
import {Button} from "../../utils/UI";

const BurgerConstructor: FC = () => {
  const history = useHistory();

  const { constructorIng, constructorBun } = useSelector(
      // @ts-ignore
    (store) => store.constructorList
  );

  // @ts-ignore
  const { loginSuccess } = useSelector((store) => store.login);

  const dispatch = useDispatch();

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
      dispatch({
        type: SET_USER_SUCCESS,
        userAccess: true,
      });
      history.push("/login");

    } else {
      dispatch({
        type: MODAL_OPEN,
      });
      // @ts-ignore
      dispatch(fetchOrder(getIngredientsId(constructorIng, constructorBun)));
    }
  };

  const getTotalSum = (ingredients: IIngredient[], bun: IIngredient[]) => {
    const arr = [...ingredients, ...bun];
    return arr.reduce((accum, current) => {
      if (current.type === "bun") {
        return accum + current.price * 2;
      }
      return accum + current.price;
    }, 0);
  };

  return (
    <div className={styles.main} ref={dragRef}>
      <div className={styles.elements}>
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
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;
