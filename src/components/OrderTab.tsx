import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Clock, DollarSign, MapPin, PhoneCallIcon, User2 } from 'lucide-react';
import { Badge } from './ui/badge';
import type { OrderStatus } from '../shared';
import { updateStatusOrder } from '../utils/supabase';
import { toast } from 'sonner';

interface OrderTabProps {
    orders: any[];
    onRefresh: () => void;
}

const OrderTab = ({ orders, onRefresh }: OrderTabProps) => {

    const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
        try {
            await updateStatusOrder(orderId, status);
            toast.success(`Order status updated to ${status}`);
            onRefresh();
        } catch (error) {
            toast.error("Failed to update order status. Please try again.");
            console.error(error);
        }
    };

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'archive': return 'bg-gray-100 text-gray-800';
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
                                    <Badge className={getStatusColor(order.status)}>
                                        {order.status}
                                    </Badge>

                                    <select value={order.status} onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}>
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                        <option value="archive">Archive</option>
                                    </select>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Customer Info */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-2">
                                        <User2 className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="font-medium">{order.customer_name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <PhoneCallIcon className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-600">{order.customer_phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="font-medium">Table {order.table_number}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-600">{formatTime(order.created_at)}</p>
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
                                        <div className="text-sm">Payment Method: <span className='uppercase font-bold'>{order.payment_method}</span></div>
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