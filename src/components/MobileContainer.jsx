import React from 'react';

export default function MobileContainer({ children, layoutMode }) {
  const isMobileMode = layoutMode === 'mobile';

  return (
    <div className={`min-h-screen ${isMobileMode ? 'bg-slate-100 flex justify-center items-stretch' : 'bg-background'} overflow-x-hidden transition-colors duration-300`}>
      <div className={`w-full ${isMobileMode ? 'max-w-[450px] shadow-2xl border-x border-outline-variant/30 flex flex-col pb-20' : 'max-w-none shadow-none border-none flex flex-col md:flex-row pb-0'} bg-background min-h-screen relative overflow-x-hidden transition-all duration-300`}>
        {children}
      </div>
    </div>
  );
}
