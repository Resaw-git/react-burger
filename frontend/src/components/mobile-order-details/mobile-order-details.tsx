import React from 'react';
import styles from "./mobile-order-details.module.css";
import Loader from "../loader/loader";
import {useSelectorHook} from "../../hooks/redux";

const MobileOrderDetails = () => {
    const { orderNumber, orderRequest, orderSuccess } = useSelectorHook(
        (store) => store.order
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Заказ оформлен</h1>

                    <p className={styles.number + " text text_type_digits-default"}>
                        12345678
                    </p>
                    <p className="text text_type_main-medium mt-8">
                        идентификатор заказа
                    </p>
                    <div className={styles.mark_icon} />
                    <p className="text text_type_main-default mt-15">
                        Ваш заказ начали готовить
                    </p>
                    <p
                        className={
                            "text text_type_main-default text_color_inactive mt-2 mb-30"
                        }
                    >
                        Дождитесь готовности на орбитальной станции
                    </p>

        </div>
    );
};

export default MobileOrderDetails;