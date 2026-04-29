export interface IItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
    category: string;
}

export interface ICustomer {
    name: string;
    phone: string;
}

export type OrderStatus = 'pending' | 'completed' | 'cancelled'

export interface IOrder {
    items: IItem[];
    total: number;
    customer: ICustomer;
    tableNumber: number;
    paymentMethod: string;
    status: OrderStatus;
}