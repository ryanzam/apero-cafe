import React from 'react'
import { Button } from './ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { translations } from '../utils/translations';
import type { Language } from '../pages/Menu';

interface CartDrawerProps {
    onClose: () => void;
    cart: any[];
    updateQuantity: (id: number, quantity: number) => void;
    totalPrice: number;
    language: Language;
    onCheckout: () => void;
}

const CartDrawer = ({
    onClose,
    cart,
    updateQuantity,
    totalPrice,
    language,
    onCheckout
}: CartDrawerProps) => {

    const tlang = translations[language]
    console.log({ cart, tlang })
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
            <div
                className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold">{tlang.cart}</h2>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {cart.length === 0 ? (
                            <div className="text-center text-gray-500 mt-8">
                                <p>{tlang.emptyCart}</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <Card key={item.id} className='py-3'>
                                        <CardContent>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name[language]}
                                                        className="w-20 h-20 object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium">{item.name[language]}</h3>
                                                    <p className="text-sm text-gray-600">NPR {item.price}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="text-right mt-2">
                                                <span className="font-medium">NPR {item.price * item.quantity}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="border-t p-4 space-y-4">
                            <div className="flex justify-between items-center text-lg font-semibold">
                                <span>{tlang.total}:</span>
                                <span>NPR {totalPrice}</span>
                            </div>
                            <Button
                                onClick={onCheckout}
                                className="w-full bg-orange-600 hover:bg-orange-700"
                            >
                                {tlang.checkout}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CartDrawer