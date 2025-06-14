import React from 'react'
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Clock, DollarSign, MapPin, Phone } from 'lucide-react';
import { Badge } from './ui/badge';

interface OrderDashboardProps {
    orders: any[];
    onRefresh: () => void;
}

const OrderTab = ({ orders, onRefresh }: OrderDashboardProps) => {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'preparing': return 'bg-blue-100 text-blue-800';
            case 'ready': return 'bg-green-100 text-green-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Orders</h2>
                <Button onClick={onRefresh} variant="outline">
                    Refresh
                </Button>
            </div>

            {orders.length === 0 ? (
                <Card>
                    <CardContent className="p-8 text-center">
                        <p className="text-gray-500">No orders yet. Orders will appear here when customers place them.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {orders.map((order) => (
                        <Card key={order.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{order.id}</CardTitle>
                                    <Badge className={getStatusColor(order.status)}>
                                        {order.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Customer Info */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="font-medium">{order.customer.name}</p>
                                            <p className="text-sm text-gray-600">{order.customer.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="font-medium">Table {order.customer.tableNumber}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-600">{formatTime(order.timestamp)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                    <h4 className="font-medium mb-2">Items:</h4>
                                    <div className="space-y-1">
                                        {order.items.map((item: any, index: number) => (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span>{item.quantity}x {item.name.en}</span>
                                                <span>NPR {item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div className="flex items-center justify-between pt-2 border-t">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">{order.paymentMethod}</span>
                                    </div>
                                    <div className="font-bold">
                                        Total: NPR {order.total}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default OrderTab