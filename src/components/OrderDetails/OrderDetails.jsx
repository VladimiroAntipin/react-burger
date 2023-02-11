import { func, string } from "prop-types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import done from "../../images/done.svg";
import { Modal } from "../Modal/Modal";
import orderDetailsStyle from "./OrderDetails.module.css";

export const OrderDetails = () => {
  const { status, data } = useAppSelector((store) => store.orderObject);

  const dispatch = useAppDispatch();
  if (status === "STALE" || status === "LOADING") {
    return null;
  }

  return (
    <Modal
      onClose={() => {
        dispatch({ type: "SEND_ORDER_STALE" });
        dispatch({ type: "CONSTRUCTOR_RESET_INGREDIENT" });
      }}
    >
      {status === "FAILED" ? (
        "Ошибка"
      ) : (
        <>
          <p
            className={`${orderDetailsStyle.orderDetails__orderNumber} text text_type_digits-large mt-30 mb-8`}
          >
            {data?.order.number}
          </p>
          <p className="text text_type_main-medium mb-15">
            идентификатор заказа
          </p>
          <img
            src={done}
            alt="заказано"
            className={orderDetailsStyle.orderDetails__image}
          />
          <p className="text text_type_main-default mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive mb-30">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </Modal>
  );
};

OrderDetails.propTypes = {
  onClose: func,
  done: string,
  className: string,
  src: string,
  alt: string,
  type: string,
};
