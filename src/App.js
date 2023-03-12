import React, { useEffect, useState, createContext } from 'react';
import Navbar from './Navbar/navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CategoryPage from './category/category';
import CheckoutPage from './checkout/checkout';

export const CategoriesContext = createContext();

//-------Define the setCartItems function outside the App component
const setCartItems = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
};

// Create a context for cart
export const CartContext = createContext({
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
    calculateTotalPrice: () => { },
    calculateDiscount: () => { },
});

function App() {
    const [categories, setCategories] = useState([]);
    const [cartItems, setCartItemsState] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data));
    }, []);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItemsState(items);
    }, []);

    // Update the cartItems state and store it in local storage
    const handleSetCartItems = (items) => {
        setCartItemsState(items);
        setCartItems(items);
    };

    return (
        <CategoriesContext.Provider value={categories}>
            <CartContext.Provider
                value={{
                    cartItems,
                    setCartItems: handleSetCartItems,
                }}
            >
                <Router>
                    <div className="container">
                        <Navbar categories={categories} />
                        <div className="category-container">
                            <Switch>
                                {categories.map((category) => (
                                    <Route path={`/category/${category}`} key={category}>
                                        <CategoryPage category={category} />
                                    </Route>
                                ))}
                                <Route path={['/', '/checkout']}>
                                    <CheckoutPage cartItems={cartItems} setCartItems={handleSetCartItems} />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </CartContext.Provider>
        </CategoriesContext.Provider>
    );
}

export default App;
