import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Loader from "../loader/loader";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/actions/ingredients";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const App = () => {
  const { ingredientsArray, ingredientsFailed, ingredientsRequest } =
    useSelector((store) => store.ingredients);

  const { modalOpen, header } = useSelector((store) => store.modal);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      {modalOpen && (
        <Modal>{header ? <IngredientDetails /> : <OrderDetails />}</Modal>
      )}
      <AppHeader />
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

export default App;
