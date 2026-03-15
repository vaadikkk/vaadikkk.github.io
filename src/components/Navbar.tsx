import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingBag, Search, Menu, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const Navbar: React.FC = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  const navLinks = [
    { name: 'Магазин', path: '/' },
    { name: 'Mac', path: '/?category=Mac' },
    { name: 'iPad', path: '/?category=iPad' },
    { name: 'iPhone', path: '/?category=iPhone' },
    { name: 'Watch', path: '/?category=Watch' },
    { name: 'AirPods', path: '/?category=AirPods' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" id="nav-logo">
              <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05,20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24,0-1.44.62-2.2.44-3.06-.35C2.79,15.25,3.51,7.59,9.05,7.31c1.35.05,2.53.68,3.14.68.65,0,2.06-.78,3.67-.65,2.61.15,4.04,1.46,4.04,1.46-3.15,1.9-2.67,5.81.44,7.1-1.04,2.58-2.31,4.38-3.29,4.38ZM12.03,7.25c-.15-2.23,1.66-4.07,3.74-4.25.29,2.58-2.34,4.5-3.74,4.25Z" />
              </svg>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = link.path === '/' 
                ? !currentCategory 
                : currentCategory === link.path.split('=')[1];
                
              return (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className={`text-sm font-medium transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}
                  id={`nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-black transition-colors" id="nav-search-btn">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/wishlist" className="text-gray-700 hover:text-black transition-colors relative" id="nav-wishlist-btn">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-black transition-colors relative" id="nav-cart-btn">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            <button className="md:hidden text-gray-700 hover:text-black transition-colors" id="nav-menu-btn">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
