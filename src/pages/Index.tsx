import React, { useEffect, useState } from 'react'
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { QrCode, ShoppingCart, Star, TrendingUp, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { getFeedbacks, getOrders } from '../utils/data';
import QRCodeGenerator from '../components/QRCodeGenerator';
import OrderTab from '../components/OrderTab';
import FeedbackTab from '../components/FeedbackTab';

const Index = () => {

    const [orders, setOrders] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        avgRating: 0,
        todayOrders: 0
    });

    useEffect(() => {
        const loadData = () => {
            const allOrders = getOrders();
            const allFeedbacks = getFeedbacks();

            setOrders(allOrders);
            setFeedbacks(allFeedbacks);

            // Calculate stats
            const totalRevenue = allOrders.reduce((sum: number, order: any) => sum + order.total, 0);
            const avgRating = allFeedbacks.length > 0
                ? allFeedbacks.reduce((sum: number, fb: any) => sum + fb.rating, 0) / allFeedbacks.length
                : 0;
            const today = new Date().toDateString();
            const todayOrders = allOrders.filter((order: any) =>
                new Date(order.timestamp).toDateString() === today
            ).length;

            setStats({
                totalOrders: allOrders.length,
                totalRevenue,
                avgRating: Math.round(avgRating * 10) / 10,
                todayOrders
            });
        };
        loadData()
    }, [])

    const handleRefresh = () => {

    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">AperoCafe Dashboard</h1>
                            <p className="text-gray-600 mt-1">Manage your digital menu and orders</p>
                        </div>
                        <Button onClick={handleRefresh} variant="outline">
                            Refresh Data
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <ShoppingCart className="h-8 w-8 text-blue-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <TrendingUp className="h-8 w-8 text-green-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                    <p className="text-2xl font-bold text-gray-900">NPR {stats.totalRevenue}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <Star className="h-8 w-8 text-yellow-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.avgRating}/5</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <Users className="h-8 w-8 text-purple-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.todayOrders}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <Tabs defaultValue="qr" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="qr">QR Code Menu</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    </TabsList>

                    <TabsContent value="qr" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <QrCode className="h-5 w-5" />
                                    QR Code Generator
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <QRCodeGenerator />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="orders" className="space-y-6">
                        <OrderTab orders={orders} onRefresh={handleRefresh} />
                    </TabsContent>

                    <TabsContent value="feedback" className="space-y-6">
                        <FeedbackTab feedbacks={feedbacks} onRefresh={handleRefresh} />
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    )
}

export default Index