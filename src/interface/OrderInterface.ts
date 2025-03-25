export interface OrderInterface {
  created_at: string;
  customer_name: string;
  total_products: number;
  total_price: string;
  id: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface OrderProduct {
  quantity: number;
  product: Product;
}

export interface OrderByIdInterface {
  order_id: string;
  customer_name: string;
  products: OrderProduct[];
}
