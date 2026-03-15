import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Check, CreditCard } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(p => p.id === id);
  const isWishlisted = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    if (product) {
      // Simulate GTM view_item event
      console.log('Event: view_item', {
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category
        }],
        value: product.price,
        currency: 'USD'
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Товар не найден</h1>
        <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Вернуться в магазин</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    
    // Simulate GTM add_to_cart event
    console.log('Event: add_to_cart', {
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: 1
      }],
      value: product.price,
      currency: 'USD'
    });

    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
      // Simulate GTM add_to_wishlist event
      console.log('Event: add_to_wishlist', {
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category
        }],
        value: product.price,
        currency: 'USD'
      });
    }
  };

  return (
    <div className="pt-14 min-h-screen bg-white">
      {/* Product Sticky Header */}
      <div className="sticky top-14 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-900 font-medium">${product.price}</span>
            <button 
              onClick={handleAddToCart}
              className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center"
              id="sticky-add-to-cart-btn"
              data-gtm-product-id={product.id}
            >
              {addedToCart ? <Check className="h-4 w-4 mr-1" /> : null}
              {addedToCart ? 'Добавлено' : 'В корзину'}
            </button>
            <button 
              onClick={handleBuyNow}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center"
              id="sticky-buy-now-btn"
              data-gtm-product-id={product.id}
            >
              Купить
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-3xl overflow-hidden flex items-center justify-center p-8">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto max-h-[600px] object-contain rounded-2xl shadow-sm"
              id="product-main-image"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" id="product-title">{product.name}</h1>
            <p className="text-xl text-gray-500 mb-8" id="product-description">{product.description}</p>
            
            <div className="text-3xl font-semibold text-gray-900 mb-8" id="product-price">
              ${product.price}
            </div>

            <div className="space-y-6 mb-12">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Основные характеристики</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-black px-8 py-4 rounded-xl text-lg font-medium transition-colors flex justify-center items-center"
                id="main-add-to-cart-btn"
                data-gtm-product-id={product.id}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {addedToCart ? 'В корзине' : 'В корзину'}
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-colors flex justify-center items-center shadow-lg shadow-blue-600/20"
                id="main-buy-now-btn"
                data-gtm-product-id={product.id}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Купить сейчас
              </button>
              
              <button 
                onClick={handleWishlist}
                className={`flex items-center justify-center px-6 py-4 rounded-xl border-2 transition-colors ${
                  isWishlisted 
                    ? 'border-red-500 text-red-500 bg-red-50' 
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
                id="add-to-wishlist-btn"
                data-gtm-product-id={product.id}
              >
                <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            <div className="mt-8 text-sm text-gray-500 flex items-center justify-center sm:justify-start">
              <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Бесплатная доставка и возврат.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
