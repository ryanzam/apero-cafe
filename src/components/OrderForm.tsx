import { useState } from 'react'
import type { Language } from '../pages/Menu';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { translations } from '../utils/translations';
import { saveOrder } from '../utils/data';

interface OrderFormProps {
    cart: any[];
    totalPrice: number;
    language: Language;
    onComplete: (orderId: string) => void;
    onCancel: () => void;
}

const OrderForm = ({ cart, totalPrice, language, onComplete, onCancel }: OrderFormProps) => {
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        tableNumber: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('');

    const tlang = translations[language];

    const handleInputChange = (field: string, value: string) => {
        setCustomerInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        if (!customerInfo.name || !customerInfo.phone || !customerInfo.tableNumber || !paymentMethod) {
            toast.error(tlang.fillAllFields);
            return;
        }

        // Generate order ID
        const orderId = `ORD-${Date.now()}`;

        // Create order object
        const order = {
            id: orderId,
            items: cart,
            total: totalPrice,
            customer: customerInfo,
            paymentMethod,
            status: 'pending',
            timestamp: new Date().toISOString()
        };

        // Save order
        saveOrder(order);

        // Log to console for restaurant
        console.log(`New Order Received!`);
        console.log(`Order ID: ${orderId}`);
        console.log(`Customer: ${customerInfo.name} (${customerInfo.phone})`);
        console.log(`Table: ${customerInfo.tableNumber}`);
        console.log(`Items:`, cart.map(item => `${item.quantity}x ${item.name[language]}`).join(', '));
        console.log(`Total: NPR ${totalPrice}`);
        console.log(`Payment Method: ${paymentMethod}`);

        // Handle payment
        if (paymentMethod === 'khalti') {
            console.log(`Khalti payment of NPR ${totalPrice} initiated for Order #${orderId}`);
            toast.success(tlang.khaltiInitiated);
        } else if (paymentMethod === 'esewa') {
            console.log(`eSewa payment of NPR ${totalPrice} initiated for Order #${orderId}`);
            toast.success(tlang.esewaInitiated);
        } else {
            console.log(`Cash payment of NPR ${totalPrice} for Order #${orderId}`);
        }

        // Dispatch custom event to notify dashboard
        window.dispatchEvent(new CustomEvent('dataUpdated'));

        onComplete(orderId);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center p-4">
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>{tlang.orderDetails}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={onCancel}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Order Summary */}
                    <div className="border-b pb-4">
                        <h3 className="font-medium mb-2">{tlang.orderSummary}</h3>
                        {cart.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span>{item.quantity}x {item.name[language]}</span>
                                <span>NPR {item.price * item.quantity}</span>
                            </div>
                        ))}
                        <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                            <span>{tlang.total}:</span>
                            <span>NPR {totalPrice}</span>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="space-y-3">
                        <div>
                            <Label htmlFor="name">{tlang.customerName} *</Label>
                            <Input
                                id="name"
                                value={customerInfo.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder={tlang.enterName}
                            />
                        </div>

                        <div>
                            <Label htmlFor="phone">{tlang.phoneNumber} *</Label>
                            <Input
                                id="phone"
                                value={customerInfo.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder={tlang.enterPhone}
                                type="tel"
                            />
                        </div>

                        <div>
                            <Label htmlFor="table">{tlang.tableNumber} *</Label>
                            <Input
                                id="table"
                                value={customerInfo.tableNumber}
                                onChange={(e) => handleInputChange('tableNumber', e.target.value)}
                                placeholder={tlang.enterTable}
                            />
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <Label>{tlang.paymentMethod} *</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                            <SelectTrigger>
                                <SelectValue placeholder={tlang.selectPayment} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="khalti">Khalti</SelectItem>
                                <SelectItem value="esewa">eSewa</SelectItem>
                                <SelectItem value="cash">{tlang.cash}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        className="w-full bg-neutral-600 hover:bg-neutral-900"
                    >
                        {paymentMethod === 'cash' ? tlang.placeOrder : tlang.payNow}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default OrderForm