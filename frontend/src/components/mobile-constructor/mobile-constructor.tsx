import React, {useState} from "react";
import styles from "./mobile-constructor.module.css";
import { Button, CurrencyIcon } from "../shared";
import {useDispatchHook, useSelectorHook} from "../../hooks/redux";
import { IIngredient } from "../../utils/types";
import MobileConstructorElement from "../mobile-constructor-element/mobile-constructor-element";
import MobileModal from "../mobile-modal/mobile-modal";
import {closeMobileModal} from "../../services/actions/modal";
import MobileOrderDetails from "../mobile-order-details/mobile-order-details";

const MobileConstructor = () => {
  const { constructorIng, constructorBun } = useSelectorHook((store) => store.constructorList);
  const [openOrder, setOpenOrder] = useState(false);
  const dispatch = useDispatchHook();

    const closeModal = () => {
        closeMobileModal(dispatch)
    }

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
        <Button
            htmlType="button"
            size={"small"}
            disabled={constructorBun.length === 0}
            onClick={()=> { setOpenOrder(true)}}
        >
          Заказать
        </Button>
      </div>
        {openOrder &&
            <MobileModal onClose={closeModal}>
                <MobileOrderDetails />
            </MobileModal>
        }
    </div>
  );
};

export default MobileConstructor;
