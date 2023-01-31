import { func } from 'prop-types';
import overlayStyle from './ModalOverlay.module.css'

export const ModalOverlay = ({ onClick }) => (
  <div onClick={onClick} className={overlayStyle.modal__overlay}></div>
);

ModalOverlay.propTypes = {
  onClick: func,
}
