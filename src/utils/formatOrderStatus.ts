export const formatOrderStatus = (orderStatus: string) =>
  orderStatus === "done"
    ? "Выполнен"
    : orderStatus === "pending"
    ? "Готовится"
    : "Создан";