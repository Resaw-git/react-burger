import React from "react";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MODAL_CLOSE } from "../../services/actions/modal";
import { useSelector, useDispatch } from "react-redux";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const { header } = useSelector(store => store.modal)

  const modalClose = () => {
    dispatch({
      type: MODAL_CLOSE,
    });
  };

  const escapeModal = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      modalClose();
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
      <ModalOverlay />
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2 className="text text_type_main-large">{header}</h2>
        </header>
        <div className={styles.cross}>
          <CloseIcon type="primary" onClick={modalClose} />
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
};
