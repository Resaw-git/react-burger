import React, { FC, TouchEvent, useEffect, useState } from "react";
import styles from "./mobile-constructor-element.module.css";
import { CurrencyIcon, DeleteIcon, DragIcon } from "../shared";
import {deleteIng} from "../../services/actions/constructor";
import { useDispatchHook, useSelectorHook } from "../../hooks/redux";

interface IComponentProps {
  id?: string;
  text: string;
  image: string;
  price: number;
  pos?: string;
}

interface ITouchParams {
  startX: null | number;
  moveX: null | number;
  endX: null | number;
  position: number;
  touched: boolean;
}

const MobileConstructorElement: FC<IComponentProps> = ({ id, text, image, price, pos }) => {
  const { constructorIng } = useSelectorHook((store) => store.constructorList);
  const dispatch = useDispatchHook();
  const [touchParams, setTouchParams] = useState<ITouchParams>({
    startX: null,
    moveX: null,
    endX: null,
    position: 0,
    touched: false,
  });

  const touchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchParams({ ...touchParams, startX: e.changedTouches[0].clientX, touched: true });
  };

  const touchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchParams({ ...touchParams, moveX: e.changedTouches[0].clientX });
  };

  const touchEnd = (e: TouchEvent<HTMLDivElement>) => {
    setTouchParams({ ...touchParams, endX: e.changedTouches[0].clientX, touched: false });
  };

  useEffect(() => {
    if (touchParams.moveX === null || touchParams.startX === null || touchParams.endX === null) return;
    const diff = touchParams.moveX - touchParams.startX;
    if (diff < 200 && diff > -200) {
      setTouchParams({ ...touchParams, position: diff });
    }
  }, [touchParams.moveX]);

  useEffect(() => {
    if (touchParams.endX === null || touchParams.startX === null || touchParams.touched) return;

    setTimeout(() => {
      if (touchParams.position === -144) return;
      if (touchParams.position > 0) {
        setTouchParams({ ...touchParams, position: touchParams.position - 1 });
      }
      if (touchParams.position < 0) {
        setTouchParams({ ...touchParams, position: touchParams.position + 1 });
      }
    }, 1);
  }, [touchParams.position, touchParams.touched]);

  useEffect(() => {
    setTouchParams({ ...touchParams, position: 0 });
  }, [constructorIng]);

  const deleteItem = () => {
    deleteIng(id, dispatch)
  }

  return (
    <div
      className={styles.wrapper}
      onTouchStart={!pos ? touchStart : undefined}
      onTouchMove={!pos ? touchMove : undefined}
      onTouchEnd={!pos ? touchEnd : undefined}
    >
      <div className={styles.item} style={{ left: touchParams.position }}>
        <div className={styles.dots}>
          <DragIcon type="primary" />
        </div>
        <div className={styles.img_wrapper}>
          <img src={image} alt={text} className={styles.image} />
        </div>
        <div className={styles.desc}>
          <span className={styles.name}>{`${pos ? text + " " + pos : text}`}</span>
          <span className={styles.price}>
            {price}
            <CurrencyIcon type="primary" />
          </span>
        </div>
        <div className={styles.delete_box} onClick={deleteItem}>
          <DeleteIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default MobileConstructorElement;
