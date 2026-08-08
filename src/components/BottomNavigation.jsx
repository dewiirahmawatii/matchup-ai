import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNavigation({ layoutMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  if (layoutMode === 'desktop') return null;

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: 'home', matches: ['/dashboard'] },
    { path: '/jobs', label: 'Jobs', icon: 'work', matches: ['/jobs', '/job-detail'] },
    { path: '/roadmap', label: 'Coach', icon: 'bolt', matches: ['/roadmap', '/skill-gap', '/ai-analysis'] },
    { path: '/saved-jobs', label: 'Saved', icon: 'bookmark', matches: ['/saved-jobs'] },
    { path: '/profile', label: 'Profile', icon: 'person', matches: ['/profile', '/upload-cv'] },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-[450px] md:hidden z-50 bg-surface/85 backdrop-blur-xl border-t border-outline-variant shadow-lg flex justify-around items-center px-4 pb-6 pt-2">
      {navItems.map((item) => {
        const isActive = item.matches.some(m => pathname.startsWith(m));
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={
              isActive
                ? "flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1.5 scale-90 duration-200"
                : "flex flex-col items-center justify-center text-on-surface-variant px-4 py-1.5 hover:bg-secondary-container/30 transition-colors duration-200"
            }
          >
            <span 
              className="material-symbols-outlined text-2xl" 
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="font-label-sm text-[11px] font-medium tracking-wide mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
