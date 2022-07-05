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



const App = () => {
  const {ingredientsArray} = useSelector((store) => store.ingredients);
  const {ingredientsFailed} = useSelector((store) => store.ingredients);
  const {ingredientsRequest} = useSelector((store) => store.ingredients);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);


  const [modal, setModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({
    header: "",
    content: "",
  });

  const [info, setInfo] = React.useState({});

  const toggleModal = () => setModal(!modal);
  const getInfoItem = (id) => {
    setInfo(ingredientsArray.find((item) => item._id === id));
  };
  const getModalContent = (content) => {
    if (content === "info") {
      setModalContent({
        ...modalContent,
        header: "Детали ингредиента",
        content,
      });
    } else {
      setModalContent({ ...modalContent, header: "", content });
    }
  };

  return (
    <>
      {modal && (
        <Modal setVisible={toggleModal} header={modalContent.header}>
          {(modalContent.content === "info" && (
            <IngredientDetails infoItem={info} />
          )) || <OrderDetails numberOrder={"034536"} />}
        </Modal>
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
            <>
              <section>
                <BurgerIngredients
                  modal={toggleModal}
                  info={getInfoItem}
                  content={getModalContent}
                />
              </section>
              <section>
                <BurgerConstructor
                  modal={toggleModal}
                  content={getModalContent}
                />
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
