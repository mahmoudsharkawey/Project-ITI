export interface ICartItem {
  productId: number;
  quantity: number;
  productName?: string;
  productImage?: string;
}

export interface ICart {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}
