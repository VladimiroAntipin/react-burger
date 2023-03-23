import { MouseEventHandler } from "react";
import overlayStyle from "./ModalOverlay.module.css";

export const ModalOverlay = ({ onClick }: { onClick: MouseEventHandler<HTMLDivElement>; }) => 
<div onClick={onClick} className={overlayStyle.modal__overlay} />;