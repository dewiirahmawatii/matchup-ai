import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer';
import BottomNavigation from '../components/BottomNavigation';

export default function MainLayout() {
  const location = useLocation();
  const pathname = location.pathname;

  // Paths that do NOT show the bottom navigation bar
  const hideBottomNavPaths = ['/', '/login', '/complete-profile'];
  const showBottomNav = !hideBottomNavPaths.includes(pathname);

  return (
    <MobileContainer>
      <Outlet />
      {showBottomNav && <BottomNavigation />}
    </MobileContainer>
  );
}
