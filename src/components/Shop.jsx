import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { atom, useRecoilState , selector } from 'recoil';
import { food } from '../constants';
import './Styles/shop.css';
import { BsFillCartPlusFill, BsCartCheckFill } from 'react-icons/bs'
import Transition from '../components/Transition';
import { useEffect, useState } from 'react';

export const CartState = atom({
    key: "CartState",
    default : {},
})

export const cartStateWithRemove = selector({
    key: 'cartStateWithRemove',
    get: ({ get }) => get(CartState),
    set: ({ set }, updatedCart) => {
    set(CartState, updatedCart);
    },
});

export function addToCart(item, cart, setCart) {
    if (cart[item.id]) {
        const updatedCart = { ...cart };
        const itemCount = updatedCart[item.id];
        
        if (itemCount > 1) {
            updatedCart[item.id] = itemCount - 1;
        } else {
            delete updatedCart[item.id]; 
        }
        
        setCart(updatedCart);
    } else {
        const updatedCart = { ...cart, [item.id]: 1 };
        setCart(updatedCart);
    }
}



function Shop() {
    const [cart , setCart] = useRecoilState(CartState);
    const [visible, setVisible] = React.useState(8);
    const [searchParams, setSearchParams] = useSearchParams();
    const [items, setItems] = React.useState([]);
    // console.log(Object.keys(cart).length);
    var cartLength = 0;
    for (var key in cart) {
        cartLength++;
    }
    console.log(cartLength);

    if(!cart) {
        console.log("Cart is undefined")
    }

    React.useEffect(() => {
        setItems(food);
        window.scrollTo(0,0);
    }, []);

    const [showTransition, setShowTransition] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const timeout = setTimeout(() => {
        setShowTransition(false);
        }, 3000);
        return () => {
        clearTimeout(timeout);
        };
    }, []);

    const typeFilter = searchParams.get('catagory');
    const displayedItems = typeFilter ? items.filter((items) => items.catagory === typeFilter) : items;

    const showMoreItems = () => {
        setVisible(prevState => prevState + 4);
    };


    const toggleClicked = (item) => {
        setItems((prevItems) =>
            prevItems.map((prevItem) =>
                prevItem.id === item.id ? { ...prevItem, clicked: !prevItem.clicked } : prevItem
            )
        );
    };

    const remainingItems = displayedItems.length - visible;
    const showMoreButton = remainingItems > 0 && (
        <div className='shop-button'>
            <button className='button' onClick={showMoreItems}>Explore More</button>
        </div>
    );

    const ItemsElements = displayedItems.slice(0, visible).map((item) => (
        <div className='item-card' key={item.id}>
            <div className='item-discount angle'>-{item.discount}%</div>
            <div className='item-pic'>
                <img className="item-pic" src={item.pic} alt="Biriyani" />
            </div>
            <div className='item-info'>
                <h2 className='name'>{item.Name}</h2>
                <p className='price'>₹{item.Price} <span className='original-price'>₹{item.O_price}</span></p>
                <button className='cart-button'
                    onClick={() => {
                        addToCart(item, cart, setCart);
                        toggleClicked(item);
                    }}
                    >{item.clicked ? (
                        <>
                            Added to Cart <BsCartCheckFill />
                        </>
                    ) : (
                        <>
                            Add to Cart <BsFillCartPlusFill />
                        </>
                    )}
                </button>
            </div>
        </div>
    ));

    return (
        <div className='shop-container'>
                {showTransition && <Transition />}
            <h1>Explore Our Menu</h1>

            <nav className='filter-nav'>
                <Link className='item-type' to='.'>All</Link>

                <Link
                    className={`item-type st ${typeFilter === 'st' ? 'selected' : ''}`}
                    to='?catagory=st'
                >
                    Starters
                </Link>

                <Link
                    className={`item-type mc ${typeFilter === 'mc' ? 'selected' : ''}`}
                    to='?catagory=mc'
                >
                    Main Course
                </Link>

                <Link
                    className={`item-type si ${typeFilter === 'si' ? 'selected' : ''}`}
                    to='?catagory=si'
                >
                    Sides
                </Link>

                <Link
                    className={`item-type de ${typeFilter === 'de' ? 'selected' : ''}`}
                    to='?catagory=de'
                >
                    Desserts
                </Link>
                <Link
                    className={`item-type dr ${typeFilter === 'dr' ? 'selected' : ''}`}
                    to='?catagory=dr'
                >
                   Drinks
                </Link>

            </nav>

            <div className='item-container'>
                {ItemsElements}
            </div>
            {showMoreButton}
        </div>
    );
}

export default Shop;
