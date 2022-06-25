import React from "react";
import styles from "./order-details.module.css";
import PropTypes from "prop-types";

const OrderDetails = (props) => {
  return (
    <div className={styles.main}>
      <p className={styles.number + " text text_type_digits-large"}>
        {props.numberOrder}
      </p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={styles.mark_icon} />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p
        className={"text text_type_main-default text_color_inactive mt-2 mb-30"}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;

OrderDetails.propTypes = {
  numberOrder: PropTypes.string.isRequired,
};
