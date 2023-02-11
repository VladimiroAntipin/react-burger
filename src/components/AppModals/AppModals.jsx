import { IngredientsDetails } from "../IngredientsDetails/IngredientsDetails";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { element } from "prop-types";

export const AppModals = () => (
  <>
    <IngredientsDetails />
    <OrderDetails />
  </>
);

AppModals.propTypes = {
  IngredientsDetails: element,
  OrderDetails: element,
}
