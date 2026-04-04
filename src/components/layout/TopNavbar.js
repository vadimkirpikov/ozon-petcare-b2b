import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const routeNames = {
  '/partner/dashboard': 'Главный дашборд',
  '/partner/schedule': 'Расписание (ЕМИАС)',
  '/partner/hotel': 'Зоогостиница',
  '/partner/gigs': 'Биржа фриланса',
  '/partner/market': 'Маркет заводчиков',
  '/partner/clients': 'Клиенты и CRM',
  '/partner/sos': 'Экстренный хаб (SOS)',
  '/partner/finance': 'Финансы и аналитика',
  '/partner/registration': 'B2B регистрация'
};

const TopNavbar = ({ onMenuClick }) => {
  const location = useLocation();
  const pageTitle = routeNames[location.pathname] || 'Ozon PetCare';

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          aria-label="Открыть меню"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden lg:flex items-center relative w-64">
          <Search size={16} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по системе..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
          />
          <div className="absolute right-2 flex items-center gap-1 opacity-50">
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono text-gray-500">Ctrl</kbd>
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono text-gray-500">K</kbd>
          </div>
        </div>

        <button type="button" className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-ozon-500 rounded-full border border-white animate-pulse"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-100 cursor-pointer">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-gray-800">Ветклиника «Четыре Лапы»</p>
            <p className="text-xs text-gray-500">Елена В. (Админ)</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold font-sans">
            ЕВ
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
