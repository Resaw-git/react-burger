import React, {FC, useRef} from "react";
import {CurrencyIcon, DeleteIcon, DragIcon, LockIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-item.module.css";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_INGREDIENT, REORDER_INGREDIENT,} from "../../services/actions/constructor";
import {DropTargetMonitor, useDrag, useDrop} from "react-dnd";
import {IIngredient} from "../../utils/types";


interface IComponentProps {
  el?: IIngredient;
  index?: number;
  position: string;
}

const ConstructorItem: FC<IComponentProps> = ({ el, index, position }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { constructorBun, constructorIng } = useSelector(
      // @ts-ignore
    (store) => store.constructorList
  );

  // @ts-ignore
  useDispatch(() => {
    deleteIng();
  }, []);

  const deleteIng = () => {
    dispatch({
      type: DELETE_INGREDIENT,
      // @ts-ignore
      id: el.id,
    });
  };

  const [{ handlerId }, drop]: any = useDrop<any>({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: function (item: IIngredient, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      // @ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      // @ts-ignore
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // @ts-ignore
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // @ts-ignore
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: REORDER_INGREDIENT,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructor",
    item: () => {
      return { id: el?._id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const setPosition = (pos: string) => {
    return (pos === "top" && styles.top) ||
        (pos === "middle" && styles.middle) ||
        styles.bottom;
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
              {constructorBun[0].name + (position === "top" ? " (верх)" : " (низ)")}
            </p>
          </div>
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-2">
              {constructorBun[0].price}
            </p>
          </div>
          <CurrencyIcon type="primary" />
          <div className="mr-5" />
          <LockIcon type="secondary" />
        </div>
      )}
      {position === "middle" && constructorIng.length > 0 && (
        <div className={styles.box + " " + setPosition(position)}>
          <div className={styles.dots}>
            <DragIcon type="primary" />
          </div>
          <div className={styles.smallImage}>
            <img src={el?.image_mobile} alt={el?.name} />
          </div>
          <div className={styles.text}>
            <p className="text text_type_main-default mr-5">{el?.name}</p>
          </div>
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-2">{el?.price}</p>
          </div>
          <CurrencyIcon type="primary" />
          <div className="mr-5" />
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
