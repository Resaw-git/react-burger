import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItem from "../constructor-item/constructor-item";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_OPEN } from "../../services/actions/modal";
import { fetchOrder } from "../../services/actions/order";
import { v4 as uuidv4 } from "uuid";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT, ADD_BUN } from "../../services/actions/constructor";

const BurgerConstructor = () => {
  const { constructorIng, constructorBun } = useSelector(
    (store) => store.constructorList
  );

  const dispatch = useDispatch();

  const [, dragRef] = useDrop({
    accept: "ingredient",
    drop(item) {
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

  const getIngredientsId = (ingredients, bun) => {
    return [...ingredients, ...bun].map((e) => e._id);
  };

  const openOrderModal = () => {
    dispatch({
      type: MODAL_OPEN,
    });
    dispatch(fetchOrder(getIngredientsId(constructorIng, constructorBun)));
  };

  const getTotalSum = (ingredients, bun) => {
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
        <ConstructorItem position={"top"} />
        <div className={styles.scroll}>
          {(constructorIng.length > 0 &&
            constructorIng.map((e, index) => (
              <ConstructorItem
                position={"middle"}
                el={e}
                key={e.id}
                index={index}
              />
            ))) || <ConstructorItem position={"middle"} />}
        </div>
        <ConstructorItem position={"bottom"} />
        <div className={styles.block}>
          <p className="text text_type_digits-medium mr-4">
            {getTotalSum(constructorIng, constructorBun)}
          </p>
          <div className={styles.bigIcon + " mr-10"}>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={constructorBun.length > 0 ? openOrderModal : null} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;
