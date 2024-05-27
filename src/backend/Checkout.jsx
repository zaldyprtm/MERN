import React, { useState } from 'react';
import axios from 'axios';

const Checkout = ({ cartItems, clearCart }) => {
  const [userName, setUserName] = useState('');

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
      clearCart();
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="w-16 card-actions">
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className=" input input-bordered focus:outline-sky-500 px-2 w-44  md:w-44"
      />
      <button className="btn w-44 btn-primary " onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
