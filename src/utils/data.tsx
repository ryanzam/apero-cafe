export const menuItems = [
    {
        id: 1,
        name: { en: 'Chicken Momo', ne: 'कुखुराको मोमो' },
        description: { en: 'Steamed dumplings filled with spiced chicken', ne: 'मसालेदार कुखुराले भरिएको भापमा पकाएको मोमो' },
        price: 150,
        image: 'https://images.unsplash.com/photo-1687068283776-fd69669beab8?w=500',
        category: 'main'
    },
    {
        id: 2,
        name: { en: 'Vegetable Momo', ne: 'तरकारी मोमो' },
        description: { en: 'Healthy steamed vegetable dumplings', ne: 'स्वस्थ तरकारीको भापमा पकाएको मोमो' },
        price: 120,
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=200&fit=crop',
        category: 'main'
    },
    {
        id: 3,
        name: { en: 'Milk Tea', ne: 'कालो चिया' },
        description: { en: 'Traditional Nepali spiced milk tea', ne: 'परम्परागत नेपाली मसाला कालो चिया' },
        price: 30,
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=200&fit=crop',
        category: 'drinks'
    },
    {
        id: 4,
        name: { en: 'Black Coffee', ne: 'कालो कफी' },
        description: { en: 'Fresh brewed black coffee', ne: 'ताजा बनाएको कालो कफी' },
        price: 50,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
        category: 'drinks'
    },
    {
        id: 5,
        name: { en: 'Black Tea', ne: 'कालो चिया' },
        description: { en: 'Black tea', ne: 'कालो चिया' },
        price: 20,
        image: 'https://images.unsplash.com/photo-1617191880520-c6a69e04fa75?q=80&w=1470',
        category: 'drinks'
    },
];

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

export const saveOrder = (order: any) => {
    try {
        const orders = getOrders();
        orders.unshift(order); // Add to beginning
        localStorage.setItem('restaurant_orders', JSON.stringify(orders));
    } catch (error) {
        console.error('Error saving order:', error);
    }
};
