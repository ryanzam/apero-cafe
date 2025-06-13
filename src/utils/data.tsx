export const getOrders = () => {
    try {
        const orders = localStorage.getItem('restaurant_orders');
        return orders ? JSON.parse(orders) : [];
    } catch (error) {
        console.error('Error loading orders:', error);
        return [];
    }
};

export const getFeedbacks = () => {
    try {
        const feedbacks = localStorage.getItem('restaurant_feedbacks');
        return feedbacks ? JSON.parse(feedbacks) : [];
    } catch (error) {
        console.error('Error loading feedbacks:', error);
        return [];
    }
};
