import React, {FC, useEffect, useState} from "react";
import styles from "./mobile-constructor-element.module.css";
import { CurrencyIcon, DragIcon } from "../shared";

interface IComponentProps {
  text: string;
  image: string;
  price: number;
  pos?: string;
}

const MobileConstructorElement: FC<IComponentProps> = ({ text, image, price, pos }) => {
  const [touchX, setTouchX] = useState(0);
  const [cordX, setCordX] = useState(0)

  const touchStart = (e: any) => {
    setTouchX(0)
  }

  const touchMove = (e: any) => {
        if(e.changedTouches[0].clientX > cordX) {
          setCordX(e.changedTouches[0].clientX)
        } else {
          setCordX(cordX);
        }

    console.log(cordX)
    setTouchX(prevState => prevState - Math.round(e.changedTouches[0].clientX / 100))
  }

  const touchEnd = (e: any) => {
    setTouchX(0)
  }



  return (
    <div className={styles.wrapper}>
      <div style={{left: `${cordX}px`}} className={styles.item} onTouchStart={touchStart} onTouchEnd={touchEnd} onTouchMove={touchMove}>
        <div className={styles.dots}>
          <DragIcon type="primary" />
        </div>
        <div className={styles.img_wrapper}>
          <img src={image} alt={text} className={styles.image} />
        </div>
        <div className={styles.desc}>
          <span className={styles.name}>{pos ? text + " " + touchX : text + " " + touchX}</span>
          <span className={styles.price}>
            {price}
            <CurrencyIcon type="primary" />
          </span>
        </div>
        <div className={styles.delete_box}>delete</div>
      </div>
    </div>
  );
};

export default MobileConstructorElement;
