import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <section>
            <BurgerIngredients />
          </section>
          <section>
            <BurgerConstructor />
          </section>
        </div>
      </main>
    </>
  );
};

export default App;
