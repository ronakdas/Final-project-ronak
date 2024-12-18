import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Your Firebase config


function OrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersCollection = collection(db, 'orders');
                const ordersSnapshot = await getDocs(ordersCollection);
                const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(ordersData);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const orderRef = doc(db, 'orders', orderId);
            await updateDoc(orderRef, { status: newStatus });
            // Optimistically update the UI
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    return (
        <div>
            <h2>Order Management</h2>
            {orders.map(order => (
                <div key={order.id}>
                    <h3>Order ID: {order.id}</h3>
                    <p>User ID: {order.userId}</p>
                    <p>Total: {order.totalAmount}</p>
                    <p>Status: {order.status}</p>
                    <select
                        value={order.status}
                        onChange={e => handleStatusUpdate(order.id, e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    {/* Display other order details */}
                </div>
            ))}
        </div>
    );
}

export default OrderList;