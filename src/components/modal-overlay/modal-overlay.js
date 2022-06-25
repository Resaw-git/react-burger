import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ setVisible }) => {
  return <div onClick={setVisible} className={styles.modaloverlay}></div>;
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  setVisible: PropTypes.func.isRequired,
};
