import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate GTM view_cart event
    console.log('Event: view_cart', {
      items: cart.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      value: total,
      currency: 'USD'
    });
  }, [cart, total]);

  const handleRemove = (id: string, name: string, price: number, quantity: number) => {
    removeFromCart(id);
    
    // Simulate GTM remove_from_cart event
    console.log('Event: remove_from_cart', {
      items: [{
        item_id: id,
        item_name: name,
        price: price,
        quantity: quantity
      }],
      value: price * quantity,
      currency: 'USD'
    });
  };

  const handleCheckout = () => {
    // Simulate GTM begin_checkout event
    console.log('Event: begin_checkout', {
      items: cart.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      value: total,
      currency: 'USD'
    });
    
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8" id="empty-cart-title">Ваша корзина пуста.</h1>
        <p className="text-gray-500 mb-8">Бесплатная доставка и бесплатный возврат.</p>
        <Link 
          to="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
          id="continue-shopping-btn"
        >
          Продолжить покупки
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center" id="cart-title">Проверьте вашу корзину.</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <ul className="divide-y divide-gray-100">
            {cart.map((item) => (
              <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6" id={`cart-item-${item.id}`}>
                <div className="w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 p-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between w-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <div className="mt-2 flex items-center border border-gray-200 rounded-lg w-fit">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                          aria-label="Уменьшить количество"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 border-x border-gray-200 font-medium text-sm">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                          aria-label="Увеличить количество"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xl font-semibold text-gray-900">${item.price * item.quantity}</p>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={() => handleRemove(item.id, item.name, item.price, item.quantity)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center transition-colors"
                      id={`remove-item-btn-${item.id}`}
                      data-gtm-product-id={item.id}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Удалить
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="bg-gray-50 p-6 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4 text-gray-600">
              <span>Подытог</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between items-center mb-6 text-gray-600">
              <span>Доставка</span>
              <span>Бесплатно</span>
            </div>
            <div className="flex justify-between items-center text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6">
              <span>Итого</span>
              <span id="cart-total">${total}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={handleCheckout}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-xl text-lg font-medium transition-colors flex justify-center items-center shadow-lg shadow-blue-600/20"
            id="checkout-btn"
          >
            Оформить заказ
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
