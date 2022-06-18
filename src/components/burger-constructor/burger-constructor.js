import React from "react";
import {
  ConstructorElement,
  Typography,
  Box,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import data from "../../utils/data.json"

const BurgerConstructor = () => {
  console.log(data)
  return (
    <div className={styles.main}>
      <div>
        <div className={styles.elements}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[0].name + " (верх)"}
            price={data[0].price}
            thumbnail={data[0].image}
          />
          <ConstructorElement
            text={data[5].name}
            price={data[5].price}
            thumbnail={data[5].image}
          />
          <ConstructorElement
            text={data[4].name}
            price={data[4].price}
            thumbnail={data[4].image}
          />
          <ConstructorElement
            text={data[7].name}
            price={data[7].price}
            thumbnail={data[7].image}
          />
          <ConstructorElement
            text={data[8].name}
            price={data[8].price}
            thumbnail={data[8].image}
          />
          <ConstructorElement
            text={data[8].name}
            price={data[8].price}
            thumbnail={data[8].image}
          />
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={data[0].name + " (низ)"}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;
