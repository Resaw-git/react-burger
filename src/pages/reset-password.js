import React from "react";
import styles from "./style.module.css";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const ResetPassword = () => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.page_box}>
                    <p className="text text_type_main-medium">Восстановление пароля</p>
                    <div className={"mb-6"} />
                    <Input
                        type={"text"}
                        placeholder={"Введите новый пароль"}
                        name={"password"}
                        icon={"ShowIcon"}
                        error={false}
                        errorText={"Ошибка"}
                        size={"default"}
                    />
                    <div className={"mb-6"} />
                    <Input
                        type={"text"}
                        placeholder={"Введите код из письма"}
                        name={"password"}
                        error={false}
                        errorText={"Ошибка"}
                        size={"default"}
                    />
                    <div className={"mb-6"} />
                    <Button type="primary" size="large">
                        Сохранить
                    </Button>
                    <div className={"mb-20"} />
                    <p className={"text text_color_inactive text_type_main-default"}>
                        Вспомнили пароль?
                        <button className={styles.button}>Войти</button>
                    </p>
                </div>
            </div>
        </main>
    );
};
