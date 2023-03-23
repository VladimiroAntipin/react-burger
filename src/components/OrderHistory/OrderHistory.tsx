import { useGetOrderHistory } from '../../hooks/orders';
import { OrderCard } from '../OrderCard/OrderCard';
import OrderHistoryStyle from './OrderHistory.module.css';

export const OrderHistory = () => {
  const history = useGetOrderHistory().orders;

  return (
    <div className={OrderHistoryStyle.orderHistory}>
      <ul className={OrderHistoryStyle.profileList}>
      {history?.reverse().map((order) => (
          <li key={order._id} className={OrderHistoryStyle.listItem}>
            <OrderCard order={order}>
              <OrderCard.Status status={order.status} />
            </OrderCard>
          </li>
        ))}
      </ul>
    </div>
  );
}