import React from "react";
import styles from "./mobile-constructor.module.css";
import { Button, CurrencyIcon } from "../shared";
import { useSelectorHook } from "../../hooks/redux";
import { IIngredient } from "../../utils/types";
import MobileConstructorElement from "../mobile-constructor-element/mobile-constructor-element";

const MobileConstructor = () => {
  const { constructorIng, constructorBun } = useSelectorHook((store) => store.constructorList);

  const getTotalSum = (ingredients: IIngredient[], bun: IIngredient[]) => {
    const arr = [...ingredients, ...bun];
    return arr.reduce(
      (accum, current) => (current.type === "bun" ? accum + current.price * 2 : accum + current.price),
      0,
    );
  };



  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Заказ</h1>
      <div className={styles.ingredients}>
          {constructorBun.length > 0 &&
            <MobileConstructorElement text={constructorBun[0].name} image={constructorBun[0].image_mobile} price={constructorBun[0].price} pos="(верх)" />
          }
          {constructorIng.map((el, index) => {
              return <MobileConstructorElement id={el.id} text={el.name} image={el.image_mobile} price={el.price} key={index}/>
          })}
          {constructorBun.length > 0 &&
            <MobileConstructorElement text={constructorBun[0].name} image={constructorBun[0].image_mobile} price={constructorBun[0].price} pos="(низ)"/>
          }
          </div>
      <div className={styles.total}>
        <div className={styles.price}>
          {getTotalSum(constructorIng, constructorBun)}
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" size={"small"} disabled={constructorBun.length === 0 && constructorIng.length === 0}>
          Заказать
        </Button>
      </div>
    </div>
  );
};

export default MobileConstructor;
