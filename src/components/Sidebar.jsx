import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar({ layoutMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  if (layoutMode === 'mobile') return null;

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: 'home', matches: ['/dashboard'] },
    { path: '/jobs', label: 'Jobs', icon: 'work', matches: ['/jobs', '/job-detail'] },
    { path: '/roadmap', label: 'Coach', icon: 'bolt', matches: ['/roadmap', '/skill-gap', '/ai-analysis'] },
    { path: '/saved-jobs', label: 'Saved', icon: 'bookmark', matches: ['/saved-jobs'] },
    { path: '/profile', label: 'Profile', icon: 'person', matches: ['/profile', '/upload-cv'] },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-surface/90 backdrop-blur-xl border-r border-outline-variant/30 p-6 justify-between shrink-0 z-40">
      <div className="space-y-8">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          <span className="font-headline-lg-mobile text-[22px] font-bold text-primary">MatchUp AI</span>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = item.matches.some(m => pathname.startsWith(m));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                    : "text-on-surface-variant hover:bg-secondary-container/30"
                }`}
              >
                <span 
                  className="material-symbols-outlined text-2xl" 
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className="font-title-md text-sm tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info / Help */}
      <div className="space-y-4 pt-6 border-t border-outline-variant/30 px-2">
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-4 px-2 py-2 text-outline hover:text-primary transition-colors text-left"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
        <div className="text-[10px] text-outline font-normal">
          MatchUp AI • Enterprise Encrypted
        </div>
      </div>
    </aside>
  );
}
