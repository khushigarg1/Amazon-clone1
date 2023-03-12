import React, { createContext, useState, useEffect } from "react";
//-------context to manage the cart state
export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);

    //-------Load the cart items from local storage on component mount
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
    }, []);

    //-------whenever the cartItems state changes save the cart items to local storage
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    //-------Add a product to the cart
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

    //-------remove a product from the cart
    const removeCartItem = (productId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);
    };

    //-------Clear the cart
    const clearCart = () => {
        setCartItems([]);
    };


    //-------Calculate the total price of all items in the cart
    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const hasDiscount = cartTotal >= 2000;
    const discount = hasDiscount ? 0.1 * cartTotal : 0;
    const grandTotal = cartTotal - discount;


    //-------Render the CartContext.Provider with the cart state and functions as its value
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