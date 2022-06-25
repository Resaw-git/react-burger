import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Loader from "../loader/loader";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";


const URL = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {
  const [data, setData] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const arrIngredients = data.data.data;

  const [modal, setModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({
    header: "",
    content: "",
  });

  const [info, setInfo] = React.useState({});

  const toggleModal = () => setModal(!modal);
  const getInfoItem = (id) => {
    setInfo(arrIngredients.find((item) => item._id === id));
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

  React.useEffect(() => {
    setData({ ...data, isLoading: true, hasError: false });
    fetch(URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((data) => setData({ ...data, data, isLoading: false }))
      .catch((err) => {
        setData({ ...data, hasError: true, isLoading: false });
        console.log(err);
      });
  }, []);

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
          {data.isLoading && (
            <div className={styles.info}>
              <Loader />
            </div>
          )}
          {data.hasError && (
            <div className={styles.info}>
              <p className="text text_type_main-large">
                Произошла ошибка получения данных
              </p>
            </div>
          )}
          {!data.hasError && arrIngredients && (
            <>
              <section>
                <BurgerIngredients
                  data={arrIngredients}
                  modal={toggleModal}
                  info={getInfoItem}
                  content={getModalContent}
                />
              </section>
              <section>
                <BurgerConstructor
                  data={arrIngredients}
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
