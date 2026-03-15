import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
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
  };

  if (wishlist.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8" id="empty-wishlist-title">Избранное пусто</h1>
        <p className="text-gray-500 mb-8">Сохраняйте товары, которые вам понравились.</p>
        <Link 
          to="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          Продолжить покупки
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center" id="wishlist-title">Ваше избранное</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((product) => (
            <div 
              key={product.id}
              className="group flex flex-col bg-gray-50 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 relative"
              id={`wishlist-item-${product.id}`}
            >
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-colors"
                title="Удалить из избранного"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <Link to={`/product/${product.id}`} className="flex-grow flex flex-col">
                <div className="p-8 pb-0">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{product.category}</h3>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h4>
                  <p className="text-gray-600 mb-4">От ${product.price}</p>
                </div>
                <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden bg-gray-200 flex-grow">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="p-6 bg-white flex justify-center">
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
