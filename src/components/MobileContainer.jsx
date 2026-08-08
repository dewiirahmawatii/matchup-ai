import React from 'react';

export default function MobileContainer({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-stretch overflow-x-hidden">
      <div className="w-full max-w-[450px] bg-background min-h-screen shadow-2xl relative flex flex-col border-x border-outline-variant/30 overflow-x-hidden pb-20">
        {children}
      </div>
    </div>
  );
}
