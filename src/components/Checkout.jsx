import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CartState } from './Shop';
import { food } from '../constants';
import './Styles/Checkout.css';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpzOtIdIKUsysQJE5eEynBJe20Sv2qFjU",
  authDomain: "kahanikhaneki-c7937.firebaseapp.com",
  projectId: "kahanikhaneki-c7937",
  storageBucket: "kahanikhaneki-c7937.firebasestorage.app",
  messagingSenderId: "511318078095",
  appId: "1:511318078095:web:24783d318784f7752f76fa",
  measurementId: "G-6050EKCH8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



function Checkout() {
    const cart = useRecoilValue(CartState);
    const setCartState = useSetRecoilState(CartState);
    const navigate = useNavigate();

    const calculateSubtotal = (id, quantity) => {
        return food[id].Price * (quantity || 1);
    };

    const calculateTotalPrice = () => {
        let total = 0;
        for (const [id, quantity] of Object.entries(cart)) {
            total += calculateSubtotal(id, quantity);
        }
        return total;
    };

    const handlePlaceOrder = async () => {
        try {
            console.log("handlePlaceOrder called");
            if (Object.keys(cart).length === 0) {
                console.log("Cart is empty, exiting");
                alert("Your cart is empty.");
                return;
            }
    
            const ordersCollection = collection(db, "orders");
            console.log("ordersCollection:", ordersCollection);
    
            const orderItems = Object.entries(cart).map(([id, quantity]) => ({
                foodId: id,
                name: food[id].Name,
                price: food[id].Price,
                quantity: quantity,
            }));
            console.log("orderItems:", orderItems);
    
            const orderData = {
                items: orderItems,
                total: calculateTotalPrice(),
                timestamp: serverTimestamp(),
            };
            console.log("orderData:", orderData);
    
            console.log("About to add document..."); // Add this line
            const docRef = await addDoc(ordersCollection, orderData);
            console.log("Document written with ID: ", docRef.id);
    
            setCartState({});
            alert("Order placed successfully!");
            navigate('/');
        } catch (error) {
            console.error("Error adding document: ", error); // Log the error!
            alert("An error occurred: " + error.message); // Show the error message to the user
        }
    };

    if (Object.keys(cart).length === 0) {
        return (
            <div>
                <h1>No Items in the cart</h1>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            <div className="checkout-items">
                {Object.entries(cart).map(([id, quantity]) => (
                    <div key={id} className="checkout-item">
                        <img src={food[id].pic} alt={food[id].Name} width="80px" />
                        <div className="item-details">
                            <h3>{food[id].Name}</h3>
                            <p>Quantity: {quantity}</p>
                            <p>Price: ₹{food[id].Price}</p>
                            <p>Subtotal: ₹{calculateSubtotal(id, quantity)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="checkout-total">
                <h2>Total: ₹{calculateTotalPrice()}</h2>
            </div>

            <div className="checkout-form">
                <button onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </div>
    );
}

export default Checkout;