import { supabase } from "../integrations/supabase/client";
import { toast } from "sonner";
import type { IOrder } from "../shared";
import { create } from "domain";

const sb = supabase as any

export const getOrders = async () => {
    const { data, error } = await sb.from('orders').select('*').order('created_at', { ascending: false });
    if (error) {
        toast.error(`Error fetching orders: ${error.message}`);
        return [];
    }
    return data
}

export const saveOrder = async (order: IOrder) => {
    const { id, items, customer, paymentMethod, status, tableNumber, total, timestamp } = order;

    const { data, error } = await sb.from('orders').insert([{
        order_id: id,
        customer_info: customer,
        items,
        total,
        payment_method: paymentMethod,
        status,
        table_number: tableNumber,
        created_at: timestamp ? new Date(timestamp).toISOString() : new Date().toISOString()
    }]).select()

    if (error) {
        console.error(`Error saving order: ${error.message}`);
        throw error;
    }

    return data
}

export const getFeedbacks = async () => {
    const { data, error } = await sb
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching feedbacks:', error);
        toast.error("Failed to fetch feedback.");
        return [];
    }
    return data;
};

export const saveFeedback = async (feedback: any) => {
    const { id, orderId, rating, comment, timestamp } = feedback;
    const { data, error } = await sb
        .from('feedbacks')
        .insert([{
            feedback_id: id,
            order_id: orderId,
            rating,
            comment,
            created_at: timestamp
        }]).select();

    if (error) {
        console.error('Error saving feedback:', error);
        throw error;
    }
    return data;
};