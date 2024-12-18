import React, { useState, useMemo, useCallback } from 'react';
import './Styles/Cart.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CartState, cartStateWithRemove } from './Shop';
import { food } from '../constants';
import { dec, del, emptycart, inc } from '../assets';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const cart = useRecoilValue(CartState);
    const setCartState = useSetRecoilState(cartStateWithRemove);
    const navigate = useNavigate();

    const quantities = useMemo(() => {
        const initialQuantities = {};
        for (const itemId in cart) {
            initialQuantities[itemId] = cart[itemId];
        }
        return initialQuantities;
    }, [cart]);

    const [localQuantities, setLocalQuantities] = useState(quantities);

    const handleRemoveItem = useCallback((itemId) => {
        setCartState((prevCart) => {
            const { [itemId]: removedItem, ...updatedCart } = prevCart;
            return updatedCart;
        });
        setLocalQuantities(prevQuantities => {
            const newQuantities = {...prevQuantities}
            delete newQuantities[itemId]
            return newQuantities
        })
    }, [setCartState]);

    const handleQuantityChange = useCallback((itemId, change) => {
        setCartState((prevCart) => ({
            ...prevCart,
            [itemId]: Math.max(1, (prevCart[itemId] || 0) + change),
        }));
        setLocalQuantities((prevQuantities) => ({
            ...prevQuantities,
            [itemId]: Math.max(1, (prevQuantities[itemId] || 0) + change),
        }));
    }, [setCartState]);

    const calculateSubtotal = useCallback((id, quantity) => {
        return food[id].Price * (quantity || 0);
    }, [food]);

    const calculateTotalPrice = useMemo(() => {
        let total = 0;
        for (const [id, quantity] of Object.entries(cart)) {
            total += calculateSubtotal(id, quantity);
        }
        return total;
    }, [cart, calculateSubtotal]);

    const handleCheckout = () => {
        if (Object.keys(cart).length > 0) {
            navigate('/checkout'); // Corrected: lowercase 'c'
        } else {
            alert("Your cart is empty. Please add items before checking out.");
        }
    };

    if (Object.keys(cart).length === 0) {
        return (
            <div className='empty-cart'>
                <h1>Oops! Your Cart is Empty</h1>
                <div className='empty-cart-gif'>
                    <img src={emptycart} width="200px" alt="Empty Cart" />
                </div>
            </div>
        );
    }

    return (
        <div className='cart-container'>
            <div className='cart-list-container'>
                {Object.entries(cart).map(([id]) => (
                    <div key={id} className='cart-list'>
                        <div className='cart-item-details'>
                            <img src={food[id].pic} width="120px" alt={food[id].Name} />
                            <div className='cart-item-info'>
                                <p className='cart-item-name'>{food[id].Name}</p>
                                <p>Price: ₹{food[id].Price}</p>
                                <button className="Btn" onClick={() => handleRemoveItem(id)}>
                                    <img src={del} className='sign' width="15px" alt="Remove" />
                                    <div className="text">Remove</div>
                                </button>
                            </div>
                        </div>
                        <div className='quantity-controls'>
                            <button className='qty-button' onClick={() => handleQuantityChange(id, -1)}>
                                <img src={dec} width="20px" alt="Decrement" />
                            </button>
                            <p>{localQuantities[id]}</p>
                            <button className='qty-button' onClick={() => handleQuantityChange(id, 1)}>
                                <img src={inc} width="20px" alt="Increment" />
                            </button>
                        </div>
                        <p className='cart-item-price'>SubTotal: ₹{calculateSubtotal(id, localQuantities[id])}</p>
                    </div>
                ))}
            </div>

            <div className='divider'></div>

            <div className="total-price">
                <h2>Total Price</h2>
                <h2>₹{calculateTotalPrice}</h2>
            </div>
            <div className='checkout-btn'>
                <button className='cart-button' onClick={handleCheckout}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default Cart;