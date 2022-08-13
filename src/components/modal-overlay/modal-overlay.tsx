import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {
  return <div onClick={onClose} className={styles.modaloverlay}></div>;
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
};