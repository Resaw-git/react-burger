import React from "react";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

const Modal = ({ children, onClose }) => {
  const { header } = useSelector((store) => store.modal);

  const escapeModal = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", escapeModal);
    return () => {
      document.removeEventListener("keydown", escapeModal);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2 className="text text_type_main-large">{header}</h2>
        </header>
        <div className={styles.cross}>
          <CloseIcon type="primary" onClick={onClose} />
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
  onClose: PropTypes.func.isRequired
};
