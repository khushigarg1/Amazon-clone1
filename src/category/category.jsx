import React, { useState, useEffect, useContext } from 'react';
import './category.css';
import { CartContext } from '../App';
import { CategoriesContext } from '../App';

function CategoryPage({ category }) {
    const { cartItems, setCartItems } = useContext(CartContext);
    const { categories } = useContext(CategoriesContext);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(
                `https://fakestoreapi.com/products/category/${category}`
            );
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, [category]);

    const handleAddToCart = (product) => {
        const existingCartItem = cartItems.find((item) => item.id === product.id);

        if (existingCartItem) {
            const updatedCartItems = cartItems.map((item) => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        } else {
            console.log("adas");
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
            console.log("cartItems: ", cartItems);
        }
    };

    return (
        <div className="category-page">
            <h1>{category}</h1>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} />
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <button onClick={() => handleAddToCart(product)}>
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;
