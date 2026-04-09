import React, { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

const AppLayout = () => {
    const[isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleOpenMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev),[]);
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
        </div>
    );
};

export default AppLayout;