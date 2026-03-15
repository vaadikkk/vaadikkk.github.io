import React, { useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export const ThankYou: React.FC = () => {
  const location = useLocation();
  const state = location.state as { transactionId: string; total: number } | null;

  useEffect(() => {
    // We already fired the purchase event in the checkout form submission,
    // but sometimes it's fired on the thank you page depending on the setup.
    // For this practice app, we log it here too as a pageview confirmation.
    console.log('Page: Thank You / Order Confirmation');
  }, []);

  if (!state) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="max-w-md w-full px-4 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4" id="thank-you-title">Спасибо!</h1>
        <p className="text-xl text-gray-600 mb-8" id="thank-you-subtitle">Ваш заказ был успешно оформлен.</p>
        
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Детали заказа</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Номер заказа</span>
            <span className="font-medium text-gray-900" id="order-id">{state.transactionId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Итого оплачено</span>
            <span className="font-medium text-gray-900" id="order-total">${state.total}</span>
          </div>
        </div>
        
        <p className="text-gray-500 mb-10 text-sm">
          Мы отправили письмо с подтверждением заказа и информацией для отслеживания.
        </p>
        
        <Link 
          to="/" 
          className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-medium transition-colors inline-block w-full"
          id="continue-shopping-btn-ty"
        >
          Продолжить покупки
        </Link>
      </div>
    </div>
  );
};
