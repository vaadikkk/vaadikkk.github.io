import React, { useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export const Home: React.FC = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category');

  const displayedProducts = category 
    ? products.filter(p => p.category.toLowerCase() === category.toLowerCase())
    : products;

  useEffect(() => {
    // Simulate GTM view_item_list event
    console.log('Event: view_item_list', {
      items: displayedProducts.map(p => ({
        item_id: p.id,
        item_name: p.name,
        price: p.price,
        item_category: p.category
      }))
    });
  }, [category]);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleBuyNow = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="pt-14 min-h-screen bg-white">
      {/* Hero Section */}
      {!category && (
        <section className="relative bg-black text-white py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4" id="hero-title">iPhone 15 Pro</h1>
            <p className="text-xl md:text-2xl font-medium text-gray-300 mb-8" id="hero-subtitle">Титан. Такой прочный. Такой легкий. Такой Pro.</p>
            <div className="flex justify-center space-x-6">
              <Link 
                to="/product/iphone-15-pro" 
                className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
                id="hero-learn-more-btn"
              >
                Подробнее
              </Link>
              <button 
                onClick={(e) => handleBuyNow(e, products[0])}
                className="bg-transparent border border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white/10 transition-colors"
                id="hero-buy-btn"
                data-gtm-product-id="iphone-15-pro"
              >
                Купить
              </button>
            </div>
          </div>
          <div className="absolute inset-0 z-0 opacity-50">
            <img 
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2000&auto=format&fit=crop" 
              alt="iPhone 15 Pro" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </section>
      )}

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {displayedProducts.length === 0 ? (
          <p className="text-center text-gray-500">Товары в данной категории не найдены.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => (
              <Link 
                to={`/product/${product.id}`} 
                key={product.id}
                className="group flex flex-col bg-gray-50 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
                id={`product-card-${product.id}`}
                data-gtm-product-id={product.id}
              >
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
                <div className="p-6 bg-white flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-full text-sm font-medium transition-colors text-center"
                    id={`add-to-cart-btn-${product.id}`}
                    data-gtm-product-id={product.id}
                  >
                    В корзину
                  </button>
                  <button 
                    onClick={(e) => handleBuyNow(e, product)}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors text-center"
                    id={`buy-now-btn-${product.id}`}
                    data-gtm-product-id={product.id}
                  >
                    Купить
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
