import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Basic validation: check if all fields have at least some value
    const isValid = Object.values(formData).every(val => typeof val === 'string' && val.trim().length > 0);
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Simulate GTM add_payment_info or add_shipping_info
    if (name === 'cardNumber' && value.length === 1) {
      console.log('Event: add_payment_info', {
        payment_type: 'Credit Card',
        value: total,
        currency: 'USD',
        items: cart.map(item => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      });
    }
    
    if (name === 'address' && value.length === 1) {
      console.log('Event: add_shipping_info', {
        shipping_tier: 'Standard',
        value: total,
        currency: 'USD',
        items: cart.map(item => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    setIsSubmitting(true);

    // Simulate GTM purchase event
    const transactionId = `T-${Math.floor(Math.random() * 1000000)}`;
    
    console.log('Event: purchase', {
      transaction_id: transactionId,
      value: total,
      tax: 0,
      shipping: 0,
      currency: 'USD',
      items: cart.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    });

    clearCart();
    navigate('/thank-you', { state: { transactionId, total } });
  };

  if (cart.length === 0 && !isSubmitting) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="pt-24 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900" id="checkout-title">Оформление заказа</h1>
          <p className="text-gray-500 mt-2">Безопасное оформление вашего заказа.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 sm:p-10">
            <form onSubmit={handleSubmit} id="checkout-form">
              {/* Contact Info */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="bg-black text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm mr-3">1</span>
                  Контактная информация
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email адрес</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="bg-black text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm mr-3">2</span>
                  Адрес доставки
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Адрес</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Город</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Индекс</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="bg-black text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm mr-3">3</span>
                  Детали оплаты
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Lock className="h-4 w-4 mr-2 text-green-600" />
                    Безопасная зашифрованная транзакция (Фейковая форма для тестов)
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Номер карты</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CreditCard className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                          placeholder="0000 0000 0000 0000"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Срок действия</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                          placeholder="ММ/ГГ"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary & Submit */}
              <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-gray-500 text-sm">Итого к оплате</p>
                  <p className="text-3xl font-bold text-gray-900">${total}</p>
                </div>
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full sm:w-auto px-12 py-4 rounded-xl text-lg font-medium transition-all ${
                    isFormValid && !isSubmitting
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 cursor-pointer' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  id="place-order-btn"
                >
                  {isSubmitting ? 'Обработка...' : 'Оплатить заказ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
