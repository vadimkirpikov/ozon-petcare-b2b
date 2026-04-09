import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useProfileStore from '../../store/useProfileStore';
import {
    LayoutDashboard, Calendar, Building2, MapPin,
    ShoppingBag, Users, Activity, Wallet, Settings, FileText, PlusCircle
} from 'lucide-react';
import { cn } from '../ui/Card';

const navItems =[
    { id: 'dashboard', to: '/partner/dashboard', icon: LayoutDashboard, label: 'Дашборд' },
    { id: 'schedule', to: '/partner/schedule', icon: Calendar, label: 'Расписание' },
    { id: 'clients', to: '/partner/clients', icon: Users, label: 'База клиентов' },
    { id: 'market', to: '/partner/market', icon: ShoppingBag, label: 'Маркет животных' },
    { id: 'sos', to: '/partner/sos', icon: Activity, label: 'SOS и Телемед', className: 'text-red-500 hover:bg-red-50' },
    { id: 'hotel', to: '/partner/hotel', icon: Building2, label: 'Зоогостиница' },
    { id: 'finance', to: '/partner/finance', icon: Wallet, label: 'Финансы' },
    { id: 'gigs', to: '/partner/gigs', icon: MapPin, label: 'Биржа заявок' },
];

const SidebarContent = ({ onItemClick }) => {
    const { activeModules } = useProfileStore();

    const activeItems = navItems.filter(item => activeModules[item.id]);
    const inactiveItems = navItems.filter(item => !activeModules[item.id]);

    return (
        <>
            <div className="h-16 flex items-center px-6 border-b border-gray-100 flex-shrink-0">
                <span className="font-bold text-xl text-gray-900 tracking-tight">Ozon <span className="text-brand-600">PetCare</span></span>
                <span className="ml-2 text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">B2B</span>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-6 hide-scrollbar">
                <div className="flex flex-col gap-1">
                    <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Мои сервисы</p>
                    {activeItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={onItemClick}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm",
                                    isActive ? "bg-brand-50 text-brand-700 border-r-4 border-brand-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                    item.className
                                )
                            }
                        >
                            <item.icon size={20} className="flex-shrink-0" />
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                {inactiveItems.length > 0 && (
                    <div className="flex flex-col gap-1 mt-auto pb-4">
                        <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Доступно к подключению</p>
                        {inactiveItems.map((item) => (
                            <NavLink key={item.to} to={item.to} onClick={onItemClick} className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors font-medium text-sm group">
                                <div className="flex items-center gap-3">
                                    <item.icon size={20} className="flex-shrink-0 opacity-50 group-hover:opacity-100" />
                                    {item.label}
                                </div>
                                <PlusCircle size={16} className="opacity-0 group-hover:opacity-100 text-brand-500 transition-opacity" />
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const Sidebar = ({ isMobileMenuOpen = false, onCloseMobileMenu = () => {} }) => {
    const location = useLocation();

    React.useEffect(() => {
        onCloseMobileMenu();
    },[location.pathname, onCloseMobileMenu]);

    return (
        <>
            <div className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onCloseMobileMenu} aria-hidden="true" />
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-40 md:hidden flex flex-col transition-transform duration-200 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-hidden={!isMobileMenuOpen}>
                <SidebarContent onItemClick={onCloseMobileMenu} />
            </aside>
            <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 hidden md:flex flex-col h-full">
                <SidebarContent />
            </aside>
        </>
    );
};

export default Sidebar;