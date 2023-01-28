import { func, string } from "prop-types";
import done from "../../images/done.svg";
import { Modal } from "../Modal/Modal";

export const OrderDetails = ({ onClose }) => (
  <Modal onClose={onClose}>
    <p
      className="text text_type_digits-large mt-30 mb-8"
      style={{
        textShadow:
          "0px 0px 16px rgba(51, 51, 255, 0.25), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 4px 32px rgba(51, 51, 255, 0.5)",
      }}
    >
      034536
    </p>
    <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
    <img
      src={done}
      alt="ordered"
      style={{ width: "120px", height: "120px", marginBottom: "60px" }}
    />
    <p className="text text_type_main-default mb-2">
      Ваш заказ начали готовить
    </p>
    <p className="text text_type_main-default text_color_inactive mb-30">
      Дождитесь готовности на орбитальной станции
    </p>
  </Modal>
);

OrderDetails.propTypes = {
  onClose: func,
  done: string,
}