import React from "react";
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
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  TOTAL_SUM,
  addBun
} from "../../services/actions/constructor";

const ConstructorItem = (props) => {
  const { ingredientsArray } = useSelector((store) => store.ingredients);
  const dispatch = useDispatch()



  const element = ingredientsArray.find((el) => el._id === props.id && el);

  React.useEffect(() => {
    dispatch(addBun(element));
  }, [])

  const setPosition = (pos) => {
    const position =
      (pos === "top" && styles.top) ||
      (pos === "middle" && styles.middle) ||
      styles.bottom;
    return position;
  };

  return (
    <div className={styles.block}>
      <div className={styles.box + " " + setPosition(props.position)}>
        {props.position === "middle" && (
          <div className={styles.dots}>
            <DragIcon type="primary" />
          </div>
        )}

        <div className={styles.smallImage}>
          <img src={element.image_mobile} alt={element.name} />
        </div>
        <div className={styles.text}>
          <p className="text text_type_main-default mr-5">
            {element.name +
              ((props.position === "top" && " (верх)") ||
                (props.position === "bottom" && " (низ)") ||
                "")}
          </p>
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">{element.price}</p>
        </div>

        <CurrencyIcon />
        <div className="mr-5"></div>
        {(props.position === "middle" && <DeleteIcon type="primary" />) || (
          <LockIcon type="secondary" />
        )}
      </div>
    </div>
  );
};

export default ConstructorItem;

ConstructorItem.propTypes = {
  position: PropTypes.string.isRequired,
};
