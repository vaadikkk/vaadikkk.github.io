import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // GTM / Pixel event simulation
    console.log('Event: generate_lead', { email });
    alert('Спасибо за подписку!');
    setEmail('');
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Будьте в курсе</h3>
            <p className="text-sm text-gray-500 mb-4">Подпишитесь на нашу рассылку, чтобы получать последние новости о продуктах и предложениях.</p>
            <form onSubmit={handleSubscribe} className="flex max-w-md" id="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите ваш email"
                className="min-w-0 flex-1 appearance-none rounded-l-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                required
                id="newsletter-email"
              />
              <button
                type="submit"
                className="flex-shrink-0 rounded-r-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                id="newsletter-submit-btn"
              >
                Подписаться
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Выбор и покупка</h3>
            <ul className="space-y-2">
              <li><a href="/?category=Mac" className="text-sm text-gray-500 hover:text-gray-900" id="footer-link-mac">Mac</a></li>
              <li><a href="/?category=iPad" className="text-sm text-gray-500 hover:text-gray-900" id="footer-link-ipad">iPad</a></li>
              <li><a href="/?category=iPhone" className="text-sm text-gray-500 hover:text-gray-900" id="footer-link-iphone">iPhone</a></li>
              <li><a href="/?category=Watch" className="text-sm text-gray-500 hover:text-gray-900" id="footer-link-watch">Watch</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">О компании Apple</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900" id="footer-link-newsroom">Newsroom</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900" id="footer-link-leadership">Руководство Apple</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900" id="footer-link-investors">Инвесторы</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900" id="footer-link-ethics">Этика и соответствие</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; 2026 Apple Inc. Все права защищены. (Фейковый магазин для практики GTM)
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900" id="footer-link-privacy">Политика конфиденциальности</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900" id="footer-link-terms">Условия использования</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900" id="footer-link-sales">Продажи и возврат</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900" id="footer-link-legal">Юридическая информация</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
