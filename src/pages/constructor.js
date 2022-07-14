import React from "react";
import { DndProvider } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Loader from "../components/loader/loader";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { fetchIngredients } from "../services/actions/ingredients";
import {MODAL_CLOSE} from "../services/actions/modal";
import {RESET_ORDER} from "../services/actions/order";
import styles from "./style.module.css";

export const Constructor = () => {
    const { ingredientsArray, ingredientsFailed, ingredientsRequest } =
        useSelector((store) => store.ingredients);

    const { orderRequest } = useSelector((store) => store.order);

    const { modalOpen, header } = useSelector((store) => store.modal);

    const dispatch = useDispatch();

    const modalClose = () => {
        dispatch({
            type: MODAL_CLOSE,
        });
        dispatch({
            type: RESET_ORDER
        })
    };

    React.useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <>
            {modalOpen && (
                <Modal onClose={modalClose}>
                    {orderRequest ? (
                        <Loader />
                    ) : header ? (
                        <IngredientDetails />
                    ) : (
                        <OrderDetails />
                    )}
                </Modal>
            )}
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


