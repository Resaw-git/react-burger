import React, {FC} from "react";
import styles from "./style.module.css";


export const NotFound404: FC = () => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <p className="text text_type_main-large">Страница не найдена. Ошибка 404</p>
                </div>
            </div>
        </main>
    );
};
