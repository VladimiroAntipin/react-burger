import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { func, node, string } from "prop-types";
import { useEffect } from "react";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { Portal } from "../Portal/Portal";
import modalStyles from "./Modal.module.css";

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    document.addEventListener("keydown",(event) => {
        if (event.key !== "Escape") return;
        onClose();
      },
    );
    return;
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
  className: string,
  type: string,
};
