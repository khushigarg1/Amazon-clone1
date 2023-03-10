import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        const existingCartItemIndex = cartItems.findIndex(
            (item) => item.id === product.id
        );
        if (existingCartItemIndex >= 0) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingCartItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const removeCartItem = (productId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const hasDiscount = cartTotal >= 2000;
    const discount = hasDiscount ? 0.1 * cartTotal : 0;
    const grandTotal = cartTotal - discount;

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeCartItem,
                clearCart,
                cartTotal,
                hasDiscount,
                discount,
                grandTotal,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;