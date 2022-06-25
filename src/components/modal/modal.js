import React from "react";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({ children, setVisible, header }) => {
  const escapeModal = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setVisible();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", escapeModal);
    return () => {
      document.addEventListener("keydown", escapeModal);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay setVisible={setVisible} />
      <div className={styles.modal}>
        {header && (
          <header className={styles.header}>
            <h2 className="text text_type_main-large">{header}</h2>
          </header>
        )}
        <div className={styles.cross}>
          <CloseIcon onClick={setVisible} />
        </div>
        {children}
      </div>
    </>,
    document.getElementById("react-modal")
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  setVisible: PropTypes.func.isRequired,
  header: PropTypes.string,
};
