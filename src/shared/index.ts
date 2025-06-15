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

export interface IOrder {
    id: string;
    items: IItem[];
    total: number;
    customer: ICustomer;
    tableNumber: number;
    paymentMethod: string;
    status: 'pending' | 'completed' | 'cancelled';
    timestamp: string;
}