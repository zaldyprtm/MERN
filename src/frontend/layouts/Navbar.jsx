import { useState } from 'react';
import Checkout from '../../backend/Checkout';

export const Navbar = ({ cartItems, clearCart }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleViewCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <div className="navbar bg-base-100 sticky top-0 z-10">
        <div className="flex-1">
          <img src="/icon/icon.png" alt="logo" className="w-8 grayscale-0" />
          <a className="btn btn-ghost text-md md:text-xl font-bold text-amber-700">Coffee & Chill</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={handleViewCart}>
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">{cartItems.length}</span>
              </div>
            </div>
            {isCartOpen && (
              <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                  <span className="font-bold text-lg">{cartItems.length} Items</span>
                  <ul className="text-info">
                    {cartItems.map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        {item.nama}: <br /> IDR {item.harga}
                        <button className="btn btn-sm btn-error ml-2">X</button>
                      </li>
                    ))}
                  </ul>
                  <span className="text-info">Subtotal: IDR {cartItems.reduce((sum, item) => sum + item.harga, 0)}</span>
                  <div className="card-actions ">
                    <Checkout cartItems={cartItems} clearCart={clearCart} />
                    <button className="btn btn-secondary btn-block" onClick={handleCloseCart}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
