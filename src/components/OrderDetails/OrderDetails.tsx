import { useAppSelector } from "../../hooks/useAppSelector";
import done from "../../images/done.svg";
import orderDetailsStyle from "./OrderDetails.module.css";

export const OrderDetails = () => {
  const { data } = useAppSelector((store) => store.orderObject);

  if (!data) return null;
  return (
    <>  
      <p
        className={`${orderDetailsStyle.orderDetails__orderNumber} text text_type_digits-large mt-30 mb-8`}
      >
        {"order" in data && data?.order.number}
      </p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
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
  );
};