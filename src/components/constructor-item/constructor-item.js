import React, { useRef } from "react";
import {
  CurrencyIcon,
  LockIcon,
  DeleteIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-item.module.css";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  DELETE_INGREDIENT,
  REORDER_INGREDIENT,
} from "../../services/actions/constructor";
import { useDrag, useDrop } from "react-dnd";

const ConstructorItem = ({ el, index, position }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { constructorBun, constructorIng } = useSelector(
    (store) => store.constructorList
  );

  useDispatch(() => {
    deleteIng();
  });

  const deleteIng = () => {
    dispatch({
      type: DELETE_INGREDIENT,
      id: el.id,
    });
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: function (item, monitor) {
      if (!ref.current) {
        return;
      }
      // Индекс перемещаемого элемента
      const dragIndex = item.index;
      // Индекс текущего элемента (над которым находится курсор при dnd)
      const hoverIndex = index;

      // Выходим, если индексы сопадают
      if (dragIndex === hoverIndex) {
        return;
      }

      // Получаем положение текущего элемента относительно экрана
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Получаем центр текущего элемента по вертикали
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Получаем положение курсора
      const clientOffset = monitor.getClientOffset();
      // Получает положение курсора относительно текущего элемента
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Выходим, если перемещаемый элемент ниже, чем 50% от высоты текущего
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Выходим, если перемещаемый элемент выше, чем 50% от высоты текущего
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: REORDER_INGREDIENT,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });

      // Сразу меняем индекс перемещаемого элемента
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructor",
    item: () => {
      // Определяем элемент
      return { id: el._id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const setPosition = (pos) => {
    const position =
      (pos === "top" && styles.top) ||
      (pos === "middle" && styles.middle) ||
      styles.bottom;
    return position;
  };

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      className={styles.block}
      ref={position === "middle" ? ref : null}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      {position !== "middle" && constructorBun.length === 0 && (
        <div className={styles.empty_box + " " + setPosition(position)}>
          <div className={styles.text}>
            <p className="text text_type_main-default mr-5">Выберите булку</p>
          </div>
        </div>
      )}
      {position === "middle" && constructorIng.length === 0 && (
        <div className={styles.empty_box + " " + setPosition(position)}>
          <div className={styles.text}>
            <p className="text text_type_main-default mr-5">Выберите Начинку</p>
          </div>
        </div>
      )}
      {position !== "middle" && constructorBun.length > 0 && (
        <div className={styles.box + " " + setPosition(position)}>
          <div className={styles.smallImage}>
            <img
              src={constructorBun[0].image_mobile}
              alt={constructorBun[0].name}
            />
          </div>
          <div className={styles.text}>
            <p className="text text_type_main-default mr-5">
              {constructorBun[0].name}
            </p>
          </div>
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-2">
              {constructorBun[0].price}
            </p>
          </div>
          <CurrencyIcon type="primary"/>
          <div className="mr-5"></div>
          <LockIcon type="secondary" />
        </div>
      )}
      {position === "middle" && constructorIng.length > 0 && (
        <div className={styles.box + " " + setPosition(position)}>
          <div className={styles.dots}>
            <DragIcon type="primary" />
          </div>
          <div className={styles.smallImage}>
            <img src={el.image_mobile} alt={el.name} />
          </div>
          <div className={styles.text}>
            <p className="text text_type_main-default mr-5">{el.name}</p>
          </div>
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-2">{el.price}</p>
          </div>
          <CurrencyIcon type="primary"/>
          <div className="mr-5"></div>
          <DeleteIcon type="primary" onClick={deleteIng} />
        </div>
      )}
    </div>
  );
};

export default ConstructorItem;

ConstructorItem.propTypes = {
  position: PropTypes.string.isRequired,
};
