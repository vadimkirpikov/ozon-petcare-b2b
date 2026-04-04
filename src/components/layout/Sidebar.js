import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Building2,
  MapPin,
  ShoppingBag,
  Users,
  Activity,
  Wallet,
  Settings,
  FileText
} from 'lucide-react';

const navItems = [
  { to: '/partner/dashboard', icon: LayoutDashboard, label: 'Дашборд' },
  { to: '/partner/schedule', icon: Calendar, label: 'Расписание' },
  { to: '/partner/hotel', icon: Building2, label: 'Зоогостиница' },
  { to: '/partner/gigs', icon: MapPin, label: 'Биржа заявок' },
  { to: '/partner/market', icon: ShoppingBag, label: 'Маркет животных' },
  { to: '/partner/clients', icon: Users, label: 'База клиентов' },
  { to: '/partner/sos', icon: Activity, label: 'SOS и Телемед', className: 'text-red-500 hover:bg-red-50' },
  { to: '/partner/finance', icon: Wallet, label: 'Финансы' }
];

const SidebarContent = ({ onItemClick }) => (
  <>
    <div className="h-16 flex items-center px-6 border-b border-gray-100">
      <span className="font-bold text-xl text-gray-900 tracking-tight">Ozon <span className="text-brand-600">PetCare</span></span>
      <span className="ml-2 text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">B2B</span>
    </div>

    <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 hide-scrollbar">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onItemClick}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm
            ${isActive
              ? 'bg-brand-50 text-brand-700 border-r-4 border-brand-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            ${item.className || ''}`
          }
        >
          <item.icon size={20} className="flex-shrink-0" />
          {item.label}
        </NavLink>
      ))}
    </div>

    <div className="p-4 border-t border-gray-100 space-y-2">
      <NavLink
        to="/partner/registration"
        onClick={onItemClick}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 w-full rounded-xl transition-colors font-medium text-sm
          ${isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
        }
      >
        <FileText size={20} />
        B2B регистрация
      </NavLink>

      <button
        type="button"
        onClick={onItemClick}
        className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors font-medium text-sm"
      >
        <Settings size={20} />
        Настройки
      </button>
    </div>
  </>
);

const Sidebar = ({ isMobileMenuOpen = false, onCloseMobileMenu = () => {} }) => {
  const location = useLocation();

  React.useEffect(() => {
    onCloseMobileMenu();
  }, [location.pathname]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onCloseMobileMenu}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-40 md:hidden flex flex-col transition-transform duration-200 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <SidebarContent onItemClick={onCloseMobileMenu} />
      </aside>

      <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 hidden md:flex flex-col h-full">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
