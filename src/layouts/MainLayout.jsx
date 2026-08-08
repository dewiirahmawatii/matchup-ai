import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer';
import BottomNavigation from '../components/BottomNavigation';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
  const location = useLocation();
  const pathname = location.pathname;

  // Global layout switcher state ('mobile' | 'desktop')
  const [layoutMode, setLayoutMode] = useState(() => {
    return localStorage.getItem('layoutMode') || 'desktop';
  });

  // Paths that do NOT show the main navigation panels
  const hideNavPaths = ['/', '/login', '/signup', '/complete-profile'];
  const showNav = !hideNavPaths.includes(pathname);

  const handleToggleLayout = (mode) => {
    setLayoutMode(mode);
    localStorage.setItem('layoutMode', mode);
  };

  const isSplash = pathname === '/';

  return (
    <MobileContainer layoutMode={layoutMode}>
      {/* Floating Layout Toggle Selector (matches top-right toggle in user design mockup) */}
      <div className={`absolute ${isSplash ? 'top-6' : 'top-20'} right-6 z-[100] flex items-center bg-white/95 border border-outline-variant/40 rounded-full p-1 shadow-md pointer-events-auto transition-all duration-300`}>
        <button 
          type="button"
          onClick={() => handleToggleLayout('mobile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-label-sm text-xs font-bold transition-all duration-300 ${
            layoutMode === 'mobile' 
              ? 'bg-primary text-white shadow-sm' 
              : 'text-on-surface-variant hover:bg-secondary-container/20'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">phone_iphone</span>
          <span>Handphone</span>
        </button>
        <button 
          type="button"
          onClick={() => handleToggleLayout('desktop')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-label-sm text-xs font-bold transition-all duration-300 ${
            layoutMode === 'desktop' 
              ? 'bg-primary text-white shadow-sm' 
              : 'text-on-surface-variant hover:bg-secondary-container/20'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
          <span>Desktop</span>
        </button>
      </div>

      {showNav && <Sidebar layoutMode={layoutMode} />}
      
      <div className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden">
        <Outlet context={[layoutMode, handleToggleLayout]} />
      </div>
      
      {showNav && <BottomNavigation layoutMode={layoutMode} />}
    </MobileContainer>
  );
}
