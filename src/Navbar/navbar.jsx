import React, { useContext, useEffect, useState } from 'react';
import './navbar.css';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as ShoppingBagIcon } from '../assets/shopping-bag.svg';
import { CartContext } from '../App';
import logo from "./logo.png";
import cart from "./cart.png";

function Navbar({ categories }) {
    const { cartItems, setCartItems } = useContext(CartContext);
    const [totalCartItems, setTotalCartItems] = useState(0);

    // console.log(cartItems);

    // Function to add a product to the cart
    // const addToCart = (product) => {
    //     // Find if the product is already in the cart
    //     const existingCartItem = cartItems.find((item) => item.id === product.id);

    //     if (existingCartItem) {
    //         const updatedCartItems = cartItems.map((item) => {
    //             if (item.id === product.id) {
    //                 return { ...item, quantity: item.quantity + 1 };
    //             }
    //             return item;
    //         });
    //         setCartItems(updatedCartItems);
    //     } else {
    //         setCartItems([...cartItems, { ...product, quantity: 1 }]);
    //     }
    // };


    //-------Calculate the total number of items in the cart
    useEffect(() => {
        let totalCount = 0;
        for (let item of cartItems) {
            totalCount += item.quantity;
        }
        setTotalCartItems(totalCount);
    }, [cartItems, setTotalCartItems]);

    return (
        <nav className="navbar">
            {/* <div className="logo">
                <img src="../assets/logo.png" alt="Company Logo" />
            </div> */}
            <Link to="/">
                <div className="logo">
                    <img src={logo} alt="Company Logo" />
                </div>
            </Link>
            <ul className="navbar-links">
                {categories.map((category) => (
                    <li key={category}>
                        <NavLink to={`/category/${category}`}>{category}</NavLink>
                    </li>
                ))}
            </ul>

            <div className="cart-icon">
                <ShoppingBagIcon />
                <span className="cart-count" onClick={() => window.location.href = "/checkout"}>
                    <img src={cart} alt={"cart - icon"} />{totalCartItems}
                </span>
            </div>
        </nav>
    );
}

export default Navbar;