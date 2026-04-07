import React, { useCallback, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { Lightbulb, Smartphone } from 'lucide-react';

const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);
  const handleCloseMobileMenu = useCallback(() => setIsMobileMenuOpen(false),[]);

  return (
      <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans relative">
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} onCloseMobileMenu={handleCloseMobileMenu} />
        <div className="flex flex-col flex-1 min-w-0">
          <TopNavbar onMenuClick={handleOpenMobileMenu} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 hide-scrollbar relative">
            <Outlet />
          </main>
        </div>

        {/* Еле заметные кнопки для презентации гипотез */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 opacity-40 hover:opacity-100 transition-opacity duration-300">
          <button
              onClick={() => navigate('/hub-franchise')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-lg border border-gray-200 text-gray-600 hover:text-brand-600 hover:border-brand-300 transition-all group"
              title="Лендинг франшизы для B2B инвесторов"
          >
            <Lightbulb size={14} className="group-hover:animate-pulse" />
            <span className="text-[10px] font-bold tracking-wide uppercase">B2B: Франшиза Hub</span>
          </button>

          <button
              onClick={() => navigate('/b2c-mockup')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-900 shadow-lg border border-gray-800 text-gray-300 hover:text-white transition-all group"
              title="Симулятор мобильного приложения B2C"
          >
            <Smartphone size={14} />
            <span className="text-[10px] font-bold tracking-wide uppercase">B2C: Демо супераппа</span>
          </button>
        </div>
      </div>
  );
};

export default AppLayout;