import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

function OrderList() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const ordersCollection = collection(db, 'orders');

        const unsubscribe = onSnapshot(ordersCollection, (snapshot) => { // Real-time updates
            try {
                const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(ordersData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }, (error) => {
            setError(error.message)
            setLoading(false)
        });

        return () => unsubscribe(); // Unsubscribe on unmount
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const orderRef = doc(db, 'orders', orderId);
            await updateDoc(orderRef, { status: newStatus });
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div>Loading orders...</div>;
    }

    if(error){
        return <div>Error: {error}</div>
    }


    return (
        <div>
            <h2>Order Management</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User ID</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.userId}</td>
                                <td>₹{order.totalAmount}</td>
                                <td>
                                    <select value={order.status} onChange={e => handleStatusUpdate(order.id, e.target.value)}>
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td><button onClick={() => navigate(`/admin/order/${order.id}`)}>View Details</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OrderList;