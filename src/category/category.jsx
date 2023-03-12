import React, { useState, useEffect, useContext } from 'react';
import './category.css';
import { CartContext } from '../App';
import { CategoriesContext } from '../App';

function CategoryPage({ category }) {
    //---------Using the useContext hook to access cartItems and setCartItems from the CartContex
    const { cartItems, setCartItems } = useContext(CartContext);
    //---------to access categories from the CategoriesContext
    const { categories } = useContext(CategoriesContext);
    //---------to store the products fetched from the API
    const [products, setProducts] = useState([]);

    //---------Using the useEffect hook to fetch products for the selected category
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

    //-----------Handling the "Add to cart" button click event
    const handleAddToCart = (product) => {
        //---------Checking if the product already exists in the cart or not
        const existingCartItem = cartItems.find((item) => item.id === product.id);

        //--------------If exists, increment the quantity otherwise add it to the cart with quantity 1
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


    //--------to store the selected sort option
    const [sortOption, setSortOption] = useState('price-low-to-high');
    //---------Creating a copy of the products array to sort it based on the selected sort option
    const sortedProducts = [...products];
    console.log(sortedProducts);
    switch (sortOption) {
        case 'price-low-to-high':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high-to-low':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'date of arrival':
            sortedProducts.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
            break;
        default:
            break;
    }


    return (
        <div className="category-page">
            <h1>{category}</h1>
            <div className='category-top'>
                <div className="cart-sorting">
                    {/* Display sorting label */}
                    <span>Sort by: </span>
                    {/* Dropdown for selecting sort option */}
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="price-low-to-high">Price (low to high)</option>
                        <option value="price-high-to-low">Price (high to low)</option>
                        <option value="date of arrival">Date of arrival</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </div>

            <div className="product-list">
                {/* Map through the sorted products and render each one */}
                {sortedProducts.map((product) => (
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
