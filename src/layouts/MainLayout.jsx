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
      {showNav && <Sidebar layoutMode={layoutMode} />}
      
      <div className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden">
        {/* Scrollable Layout Toggle Bar (Never overlaps greeting or name) */}
        <div className="w-full flex justify-end items-center px-4 py-2 bg-surface/60 backdrop-blur-md border-b border-outline-variant/20 z-40 shrink-0">
          <div className="flex items-center bg-white border border-outline-variant/40 rounded-full p-1 shadow-sm">
            <button 
              type="button"
              onClick={() => handleToggleLayout('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-sm text-xs font-bold transition-all duration-200 ${
                layoutMode === 'mobile' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-on-surface-variant hover:bg-secondary-container/20'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">phone_iphone</span>
              <span>Handphone</span>
            </button>
            <button 
              type="button"
              onClick={() => handleToggleLayout('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-sm text-xs font-bold transition-all duration-200 ${
                layoutMode === 'desktop' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-on-surface-variant hover:bg-secondary-container/20'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">desktop_windows</span>
              <span>Desktop</span>
            </button>
          </div>
        </div>

        <Outlet context={[layoutMode, handleToggleLayout]} />
      </div>
      
      {showNav && <BottomNavigation layoutMode={layoutMode} />}
    </MobileContainer>
  );
}
