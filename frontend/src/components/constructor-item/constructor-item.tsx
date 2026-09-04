import React, { FC, useRef } from "react";
import type { Identifier, XYCoord } from "dnd-core";
import {
  ConstructorElement,
  DragIcon,
} from "../shared";
import styles from "./constructor-item.module.css";
import { useDispatchHook, useSelectorHook } from "../../hooks/redux";
import {
  DELETE_INGREDIENT,
  REORDER_INGREDIENT,
} from "../../services/actions/constructor";
import { useDrag, useDrop } from "react-dnd";
import { IIngredient } from "../../utils/types";

interface IComponentProps {
  el?: IIngredient | undefined;
  index: number;
  position?: "top" | "bottom" | undefined;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const ConstructorItem: FC<IComponentProps> = ({ el, index, position }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatchHook();
  const { constructorBun, constructorIng } = useSelectorHook(
    (store) => store.constructorList
  );

  const deleteIng = () => {
    dispatch({
      type: DELETE_INGREDIENT,
      id: el?.id,
    });
  };

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: function (item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

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

  const setPosition = (pos: string | undefined): string => {
    return (
      (pos === "top" && styles.top) ||
      (pos === undefined && styles.middle) ||
      styles.bottom
    );
  };

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      className={styles.block}
      ref={position === undefined ? ref : null}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      {position !== undefined && constructorBun.length === 0 && (
        <div className={styles.empty_box + " " + setPosition(position)}>
          <div className={styles.text}>
            <p className="text text_type_main-default mr-5">Выберите булку</p>
          </div>
        </div>
      )}
      {position === undefined && constructorIng.length === 0 && (
        <div className={styles.empty_box + " " + setPosition(position)}>
          <div className={styles.text}>
            <p className="text text_type_main-default mr-5">Выберите начинку</p>
          </div>
        </div>
      )}
      {position !== undefined && constructorBun.length > 0 && (
        <ConstructorElement
          type={position}
          isLocked={true}
          text={constructorBun[0].name + (position === "top" ? " (верх)" : " (низ)")}
          price={constructorBun[0].price}
          thumbnail={constructorBun[0].image_mobile}
        />
      )}
      {position === undefined && constructorIng.length > 0 && (
        <div className={styles.box + " " + setPosition(position)}>
          <div className={styles.dots}>
            <DragIcon type="primary" />
          </div>
          {el && <ConstructorElement
              isLocked={false}
              text={el.name}
              price={el.price}
              thumbnail={el.image_mobile}
              handleClose={deleteIng}
          />}
        </div>
      )}
    </div>
  );
};

export default ConstructorItem;
