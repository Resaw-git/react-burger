import React from "react";
import styles from "./modal-overlay.module.css";
import { MODAL_CLOSE } from "../../services/actions/modal";
import { useDispatch } from "react-redux";

const ModalOverlay = () => {
  const dispatch = useDispatch();

  const modalClose = () => {
    dispatch({
      type: MODAL_CLOSE,
    });
  };

  return <div onClick={modalClose} className={styles.modaloverlay}></div>;
};

export default ModalOverlay;


