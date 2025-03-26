import {OrderByIdInterface} from '../interface/OrderInterface';
import {CalculateTotalAddAndCreatePriceInterface} from '../screens/OrderManage';

export const calculateTotalOrderPrice = (
  order: OrderByIdInterface = {
    products: [],
    order_id: '',
    customer_name: '',
  },
): number => {
  return order.products.reduce(
    (total, item) =>
      total + (Number(item.quantity) || 0) * (Number(item.product?.price) || 0),
    0,
  );
};

export const calculateTotalAddAndCreatePrice = (
  data: CalculateTotalAddAndCreatePriceInterface = [],
): number => {
  return data.reduce(
    (total, item) =>
      total + (Number(item.quantity) || 0) * (Number(item.price) || 0),
    0,
  );
};
