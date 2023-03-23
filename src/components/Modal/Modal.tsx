import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { PropsWithChildren, useEffect } from "react";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { Portal } from "../Portal/Portal";
import modalStyles from "./Modal.module.css";

export const Modal = ({ onClose, children }: PropsWithChildren<{ onClose: () => void }>) => {
  useEffect(() => {
    const abortController = new AbortController();

    document.addEventListener(
      "keydown",
      (evt) => {
        if (evt.key === "Escape") {
          onClose();
        }
      },
      { signal: abortController.signal }
    );

    return () => abortController.abort();
  }, [onClose]);

  return (
    <Portal>
      <ModalOverlay onClick={onClose} />
      <section aria-modal className={modalStyles.modal}>
        <div className={modalStyles["modal__close-icon"]}>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </section>
    </Portal>
  );
};