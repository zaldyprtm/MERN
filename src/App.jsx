import { useState } from 'react';
import axios from 'axios';
import Navbar from "./frontend/layouts/Navbar";
import './App.css';
import Hero from './frontend/layouts/Hero';
import Footer from './frontend/layouts/Footer';
import Minuman from './components/Minuman';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [userName, setUserName] = useState('');

  const clearCart = () => {
    setCartItems([]);
  };
  // Handle add to cart
  const addToCart = (item) => {
    const itemExists = cartItems.find(cartItem => cartItem.id === item.id);
    if (itemExists) {
      setCartItems(cartItems.map(cartItem => cartItem.id === item.id ? { ...itemExists, quantity: itemExists.quantity + 1 } : cartItem));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleCheckout = async () => {
    try {
      const total = cartItems.reduce((sum, item) => sum + item.harga * item.quantity, 0);
      const response = await axios.post('http://localhost:3000/api/checkout', {
        userName,
        items: cartItems,
        total
      });
      const { whatsappUrl } = response.data;
      window.location.href = whatsappUrl;
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <>
      <Navbar cartItems={cartItems} handleCheckout={handleCheckout} clearCart={clearCart} />
      <Hero />
      <div className="divider font-bold text-2xl mt-20" id='menu'>OUR MENU</div>
      <Minuman handleAddToCart={addToCart} />
       <Footer />

    </>
  );
}

export default App;
