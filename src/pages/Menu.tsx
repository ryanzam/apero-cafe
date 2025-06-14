import React, { useState } from 'react'
import HeaderMenu from '../components/HeaderMenu';
import { menuItems } from '../utils/data';
import { Card, CardContent } from '../components/ui/card';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { translations } from '../utils/translations';
import CartDrawer from '../components/CartDrawer';
import { toast } from 'sonner';
import { Badge } from '../components/ui/badge';
import OrderForm from '../components/OrderForm';
import FeedbackForm from '../components/FeedbackForm';

export type Language = 'en' | 'ne';

interface ICartItem {
    id: number,
    name: { en: string, ne: string },
    price: number,
    quantity: number
}

const Menu = () => {

    const [language, setLanguage] = useState<Language>('en');
    const [cart, setCart] = useState<ICartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [lastOrderId, setLastOrderId] = useState<string | null>(null);

    const tlang = translations[language]

    const addToCart = (item: any) => {
        console.log(item)
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
        toast.success(tlang.addedToCart);
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity === 0) {
            setCart(cart.filter(item => item.id !== id));
        } else {
            setCart(cart.map(item =>
                item.id === id ? { ...item, quantity } : item
            ));
        }
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handleOrderComplete = (orderId: string) => {
        setLastOrderId(orderId);
        setCart([]);
        setShowOrderForm(false);
        setIsCartOpen(false);
        setShowFeedback(true);
        toast.success(tlang.orderPlaced);
    };

    const handleFeedbackComplete = () => {
        setShowFeedback(false);
        setLastOrderId(null);
        toast.success(tlang.feedbackSubmitted);
    };

    return (
        <div className="min-h-screen">
            <HeaderMenu
                language={language}
                onLanguageChange={setLanguage}
                cartCount={getTotalItems()}
                onCartClick={() => setIsCartOpen(true)}
            />

            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Welcome Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{tlang.welcome}</h1>
                    <p className="text-gray-600">{tlang.menuDescription}</p>
                </div>

                {/* Menu Categories */}
                <div className="space-y-8">
                    {/* Main Dishes */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{tlang.mainDishes}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {menuItems.filter(item => item.category === 'main').map((item) => (
                                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative">
                                        <img
                                            src={item.image}
                                            alt={item.name[language]}
                                            className="w-full h-48 object-cover"
                                        />
                                        <Badge className="absolute top-2 right-2 bg-neutral-800">
                                            NPR {item.price}
                                        </Badge>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {item.name[language]}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {item.description[language]}
                                        </p>
                                        <Button
                                            onClick={() => addToCart(item)}
                                            className="w-full bg-neutral-600 hover:bg-neutral-900"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            {tlang.addToCart}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Drinks */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{tlang.drinks}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {menuItems.filter(item => item.category === 'drinks').map((item) => (
                                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative">
                                        <img
                                            src={item.image}
                                            alt={item.name[language]}
                                            className="w-full h-48 object-cover"
                                        />
                                        <Badge className="absolute top-2 right-2 bg-neutral-800">
                                            NPR {item.price}
                                        </Badge>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {item.name[language]}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {item.description[language]}
                                        </p>
                                        <Button
                                            onClick={() => addToCart(item)}
                                            className="w-full bg-neutral-600 hover:bg-neutral-900"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            {tlang.addToCart}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Cart Drawer */}
            {isCartOpen &&
                <CartDrawer
                    onClose={() => setIsCartOpen(false)}
                    cart={cart}
                    updateQuantity={updateQuantity}
                    totalPrice={getTotalPrice()}
                    language={language}
                    onCheckout={() => {
                        setIsCartOpen(false);
                        setShowOrderForm(true);
                    }}
                />}

            {showOrderForm && (
                <OrderForm
                    cart={cart}
                    totalPrice={getTotalPrice()}
                    language={language}
                    onComplete={handleOrderComplete}
                    onCancel={() => setShowOrderForm(false)}
                />
            )}

            {showFeedback && (
                <FeedbackForm
                    orderId={lastOrderId}
                    language={language}
                    onComplete={() => handleFeedbackComplete()}
                    onSkip={handleFeedbackComplete}
                />
            )}

        </div>
    )
}

export default Menu