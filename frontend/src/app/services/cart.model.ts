export interface ICartItem {
  productId: number;
  quantity: number;
  productName?: string;
  productImage?: string;
}

export interface ICart {
  fillter(arg0: (item: any) => boolean): any;
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}
