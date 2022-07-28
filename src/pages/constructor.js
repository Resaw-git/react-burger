import React from "react";
import { DndProvider } from "react-dnd";
import { useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Loader from "../components/loader/loader";

import styles from "./style.module.css";

export const Constructor = () => {
    const { ingredientsArray, ingredientsFailed, ingredientsRequest } =
        useSelector((store) => store.ingredients);

    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    {ingredientsRequest && (
                        <div className={styles.info}>
                            <Loader />
                        </div>
                    )}
                    {ingredientsFailed && (
                        <div className={styles.info}>
                            <p className="text text_type_main-large">
                                Произошла ошибка получения данных
                            </p>
                        </div>
                    )}
                    {!ingredientsFailed && ingredientsArray.length > 0 && (
                        <DndProvider backend={HTML5Backend}>
                            <section>
                                <BurgerIngredients />
                            </section>
                            <section>
                                <BurgerConstructor />
                            </section>
                        </DndProvider>
                    )}
                </div>
            </main>
        </>
    );
};


