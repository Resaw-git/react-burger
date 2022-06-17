import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppHeader from "./components/app-header/app-header";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      <AppHeader />
  </React.StrictMode>
);
