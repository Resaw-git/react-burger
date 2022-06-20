import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppHeader />
    <main className="main">
      <div className="container">
        <section>
          <BurgerIngredients />
        </section>
        <section>
          <BurgerConstructor />
        </section>
      </div>
    </main>
  </React.StrictMode>
);
