
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './checkout.css';

import { CartContext } from '../App';
import { CategoriesContext } from '../App';

function CheckoutPage() {
    const { cartItems, setCartItems } = useContext(CartContext);
    const { categoriesItems } = useContext(CategoriesContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [showThankYouPage, setShowThankYouPage] = useState(false);

    function handleCheckout() {
        setShowThankYouPage(true);
    }
    useEffect(() => {
        let price = 0;
        cartItems.forEach((item) => {
            price += item.price * item.quantity;
        });
        setTotalPrice(price);
        if (price > 2000) {
            setDiscountedPrice(price * 0.9);
        } else {
            setDiscountedPrice(price);
        }
    }, [cartItems]);

    const handleRemoveItem = (id) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCartItems);
    };

    const handleIncrementQuantity = (id) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleDecrementQuantity = (id) => {
        const existingCartItem = cartItems.find((item) => item.id === id);
        if (existingCartItem.quantity === 1) {
            handleRemoveItem(id);
        } else {
            const updatedCartItems = cartItems.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        }
    };

    const handleClearCart = () => {
        setCartItems([]);
        localStorage.clear();
    };

    const [sortOption, setSortOption] = useState('price-low-to-high');

    const sortedCartItems = [...cartItems];
    console.log(sortedCartItems);
    switch (sortOption) {
        case 'price-low-to-high':
            sortedCartItems.sort((a, b) => a.price - b.price);
            break;
        case 'price-high-to-low':
            sortedCartItems.sort((a, b) => b.price - a.price);
            break;
        case 'date of arrival':
            sortedCartItems.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        // case 'date-desc':
        //     sortedCartItems.sort((a, b) => new Date(b.date) - new Date(a.date));
        //     break;
        case 'rating':
            sortedCartItems.sort((a, b) => b.rating.rate - a.rating.rate);
            break;
        default:
            break;
    }

    return (
        <div>
            {!showThankYouPage ? (
                <div className="checkout-page">
                    {/* <h1>Checkout</h1> */}
                    <div className='checkout-top'>
                        <div className="cart-sorting">
                            <span>Sort by:  </span>
                            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                                <option value="price-low-to-high">Price (low to high)</option>
                                <option value="price-high-to-low">Price (high to low)</option>
                                <option value="date of arrival">Date of arrival</option>
                                {/* <option value="date-desc">Date (newest to oldest)</option> */}
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                        <button className='cart-button' onClick={handleClearCart}>Clear Cart</button>
                    </div>

                    <div className='checkout-container'>
                        <div className='checkout-header'>
                            <div className='header-block'>
                                <span>Product</span>
                            </div>
                            <div className='header-block'>
                                <span>Name</span>
                            </div>
                            <div className='header-block'>
                                <span>Quantity</span>
                            </div>
                            <div className='header-block'>
                                <span>Price</span>
                            </div>
                        </div>
                        <div className="cart-items">
                            {cartItems.length > 0 ? (
                                <React.Fragment>
                                    {sortedCartItems.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <div className="cart-item-image">
                                                <img src={item.image} alt={item.title} />
                                            </div>
                                            <h2 className='name'>{item.title}</h2>
                                            <div className="cart-item-details">
                                                <span className="cart-item-actions">
                                                    <button className='arrow' onClick={() => handleDecrementQuantity(item.id)}>
                                                        -
                                                    </button>
                                                    <span className='value'>{item.quantity}</span>
                                                    <button className='arrow' onClick={() => handleIncrementQuantity(item.id)}>
                                                        +
                                                    </button>
                                                    {/* <button onClick={() => handleRemoveItem(item.id)}>
                                                    Remove
                                                </button> */}
                                                </span>
                                            </div>
                                            <p className='price'>${item.price}</p>
                                        </div>
                                    ))}
                                    <div className="cart-summary">
                                        <p className='total'>
                                            Total Price: <span>${totalPrice}</span>
                                        </p>
                                        {totalPrice > 24.38 && (
                                            <p className='total'>
                                                Discount(10% off): <span>${discountedPrice}</span>
                                            </p>
                                        )}
                                    </div>
                                    <Link className='checkout' onClick={handleCheckout}>Checkout</Link>
                                </React.Fragment>
                            ) : (
                                <p>No items in cart.</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="thank-you-page">
                    <h2>Thank you for your purchase!</h2>
                    <Link to="/">Continue Shopping</Link>
                </div>
            )}
        </div>
    );
};
export default CheckoutPage;