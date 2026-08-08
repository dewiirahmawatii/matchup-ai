import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer';
import BottomNavigation from '../components/BottomNavigation';
import Sidebar from '../components/Sidebar';

// Global Error Boundary to catch render failures gracefully
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-surface min-h-screen">
          <div className="w-16 h-16 bg-error-container text-error rounded-full flex items-center justify-center mb-6 shadow-sm">
            <span className="material-symbols-outlined text-3xl">error</span>
          </div>
          <h2 className="font-headline-lg-mobile text-lg font-bold text-on-surface mb-2">Something went wrong</h2>
          <p className="font-body-md text-sm text-on-surface-variant max-w-xs mb-6">
            We ran into an unexpected rendering error. Let's return to your dashboard.
          </p>
          <button 
            type="button"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/dashboard';
            }}
            className="px-6 py-2.5 bg-primary text-white rounded-full font-label-sm text-xs font-bold shadow-md hover:bg-primary-container transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function MainLayout() {
  const location = useLocation();
  const pathname = location.pathname;

  // Global layout switcher state ('mobile' | 'desktop')
  const [layoutMode, setLayoutMode] = useState(() => {
    return localStorage.getItem('layoutMode') || 'desktop';
  });

  // Stateful toast notification configuration
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    const timer = setTimeout(() => {
      setToast(null);
    }, 2800);
    return () => clearTimeout(timer);
  };

  // Paths that do NOT show the main navigation panels
  const hideNavPaths = ['/', '/login', '/signup', '/complete-profile'];
  const showNav = !hideNavPaths.includes(pathname);

  const handleToggleLayout = (mode) => {
    setLayoutMode(mode);
    localStorage.setItem('layoutMode', mode);
  };

  return (
    <MobileContainer layoutMode={layoutMode}>
      {showNav && <Sidebar layoutMode={layoutMode} />}
      
      <div className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden pb-12">
        {/* Toast Popup Notification Overlay */}
        {toast && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none w-[90%] max-w-[360px]">
            <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-white font-label-sm text-xs font-bold shadow-2xl ${
              toast.type === 'error' ? 'bg-error' : 'bg-primary'
            }`}>
              <span className="material-symbols-outlined text-[18px]">
                {toast.type === 'error' ? 'error' : 'check_circle'}
              </span>
              <span>{toast.message}</span>
            </div>
          </div>
        )}

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

        <ErrorBoundary>
          <Outlet context={{ showToast, layoutMode, handleToggleLayout }} />
        </ErrorBoundary>
      </div>
      
      {showNav && <BottomNavigation layoutMode={layoutMode} />}
    </MobileContainer>
  );
}
