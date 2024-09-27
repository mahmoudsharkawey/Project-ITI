export interface ICartItem {
    productId: number; 
    quantity: number;  
  }
  
  export interface ICart {
    items: ICartItem[]; 
    totalQuantity: number; 
    totalPrice: number; 
  }
  