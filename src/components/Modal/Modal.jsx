import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { func, node } from "prop-types";
import { useEffect } from "react";
import { Portal } from "../Portal/Portal";
import modalStyles from "./Modal.module.css";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";

export const Modal = ({ onClose, children }) => {
  useEffect(() => {

    window.addEventListener(
      "keyup",
      (event) => {
        if (event.key !== "Escape") return;
        onClose();
      },
    );
  }, [onClose]);

  return (
    <Portal>
      <ModalOverlay onClick={onClose} />
      <section className={modalStyles.modal}>
        <div className={modalStyles["modal__close-icon"]}>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </section>
    </Portal>
  );
};

Modal.propTypes = {
  children: node,
  onClose: func,
};