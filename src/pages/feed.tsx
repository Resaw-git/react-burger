import React, {FC} from "react";
import styles from "./style.module.css";
import {OrderFeed} from "../components/order-feed/order-feed";


export const Feed: FC = () => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <OrderFeed />
            </div>
        </div>
    );
};

