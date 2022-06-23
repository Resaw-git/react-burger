import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Loader from "../loader/loader";

const App = () => {
  const url = "https://norma.nomoreparties.space/api/ingredients";
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  React.useEffect(() => {
    setState({ ...state, isLoading: true, hasError: false, });
    setTimeout(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setState({ ...state, data, isLoading: false }))
        .catch((e) => {
          setState({ ...state, hasError: true, isLoading: false });
          console.log(e);
        });
    }, 3000);
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          {state.isLoading && (
            <div className={styles.info}>
              <Loader />
            </div>
          )}
          {state.hasError && (
            <div className={styles.info}>
              <p className="text text_type_main-large">Произошла ошибка получения данных</p>
            </div>
          )}
          {!state.isLoading && !state.hasError && (
            <>
              <section>
                <BurgerIngredients data={state.data.data} />
              </section>
              <section>
                <BurgerConstructor data={state.data.data} />
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
