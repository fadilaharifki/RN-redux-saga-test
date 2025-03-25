import {OrderByIdInterface} from '../interface/OrderInterface';

export const calculateTotalOrderPrice = (
  order?: OrderByIdInterface,
): number => {
  if (order) {
    return order.products.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0,
    );
  } else {
    return 0;
  }
};
