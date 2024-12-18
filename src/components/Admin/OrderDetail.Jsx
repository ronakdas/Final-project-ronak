import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Adjust path as needed
import { useParams, useNavigate } from 'react-router-dom';

function OrderDetail() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderRef = doc(db, 'orders', orderId);
                const orderSnap = await getDoc(orderRef);
                if (orderSnap.exists()) {
                    setOrder(orderSnap.data());
                } else {
                    setError("Order not found.");
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return <div>Loading order details...</div>;
    }

    if(error){
        return <div>Error: {error}</div>
    }

    if (!order) {
        return <div>Order not found.</div>; // Handle case where order doesn't exist
    }

    return (
        <div>
            <h2>Order Details</h2>
            <button onClick={() => navigate(-1)}>Go Back</button>
            <p>Order ID: {orderId}</p>
            <p>User ID: {order.userId}</p>
            <p>Total Amount: ₹{order.totalAmount}</p>
            <p>Status: {order.status}</p>
            <h3>Items:</h3>
            <ul>
                {order.items && order.items.map((item, index) => (
                    <li key={index}>
                        {item.name} x {item.quantity} - ₹{item.price}
                    </li>
                ))}
            </ul>
            {/* Display other order details as needed */}
        </div>
    );
}

export default OrderDetail;