import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative p-margin-mobile bg-white overflow-hidden min-h-screen">
      
      {/* Background Graphic Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        
        {/* Soft Aurora Blurs */}
        <div className="absolute -left-32 top-[10%] w-[500px] h-[500px] bg-[#dbeafe]/40 rounded-full blur-[110px]"></div>
        <div className="absolute -right-32 bottom-[10%] w-[500px] h-[500px] bg-[#f3e8ff]/50 rounded-full blur-[110px]"></div>
        <div className="absolute left-[15%] bottom-[-150px] w-[600px] h-[300px] bg-sky-100/30 rounded-full blur-[120px]"></div>

        {/* Vector Ribbon Waves (Bottom-Left and Bottom-Right curved mesh lines) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bottom Left Wave Group */}
          <path d="M-50,650 C180,680 320,530 480,720 C580,790 680,900 680,900" stroke="#818cf8" strokeWidth="1.5" strokeOpacity="0.22" />
          <path d="M-50,670 C200,700 340,510 500,700 C600,770 700,900 700,900" stroke="#818cf8" strokeWidth="1.5" strokeOpacity="0.18" />
          <path d="M-50,630 C160,660 300,550 460,740 C560,810 660,900 660,900" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.15" />
          <path d="M-50,690 C220,720 360,490 520,680 C620,750 720,900 720,900" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.1" />

          {/* Bottom Right Wave Group */}
          <path d="M1490,620 C1210,670 1070,520 920,730 C820,810 720,900 720,900" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.22" />
          <path d="M1490,640 C1230,690 1090,500 940,710 C840,790 740,900 740,900" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.18" />
          <path d="M1490,600 C1190,650 1050,540 900,750 C800,830 700,900 700,900" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.12" />
          <path d="M1490,660 C1250,710 1110,480 960,690 C860,770 760,900 760,900" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.1" />

          {/* Light Bottom Wave Fill */}
          <path d="M0,900 L0,740 C220,770 450,660 700,790 C950,920 1150,810 1440,840 L1440,900 Z" fill="url(#bg-wave-grad)" opacity="0.25" />
          <defs>
            <linearGradient id="bg-wave-grad" x1="0" y1="650" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#eff6ff" />
              <stop offset="50%" stopColor="#f5f3ff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>

        {/* 3D Spheres (mimicking realistic rendering from mock) */}
        {/* Large bottom-left sphere */}
        <div className="absolute left-[3%] bottom-[12%] w-24 h-24 bg-[radial-gradient(circle_at_35%_35%,#e0e7ff_0%,#a5b4fc_40%,#4f46e5_100%)] rounded-full shadow-[inset_-6px_-6px_15px_rgba(0,0,0,0.15),0_12px_28px_rgba(79,70,229,0.25)] sphere-float-lg z-10"></div>
        {/* Medium bottom-right sphere */}
        <div className="absolute right-[20%] bottom-[15%] w-12 h-12 bg-[radial-gradient(circle_at_35%_35%,#f5f3ff_0%,#c084fc_40%,#7c3aed_100%)] rounded-full shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.15),0_8px_16px_rgba(124,58,237,0.2)] sphere-float-md z-10"></div>
        {/* Small top-left sphere */}
        <div className="absolute left-[18%] top-[12%] w-7 h-7 bg-[radial-gradient(circle_at_35%_35%,#e0f2fe_0%,#7dd3fc_40%,#0284c7_100%)] rounded-full shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.1),0_4px_8px_rgba(2,132,199,0.15)] sphere-float-sm z-10"></div>
        {/* Medium-small middle-right sphere */}
        <div className="absolute right-[22%] top-[38%] w-8 h-8 bg-[radial-gradient(circle_at_35%_35%,#e0f2fe_0%,#60a5fa_40%,#2563eb_100%)] rounded-full shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.15),0_6px_12px_rgba(37,99,235,0.15)] sphere-float-md z-10"></div>
        {/* Small light purple sphere left */}
        <div className="absolute left-[22%] top-[48%] w-7 h-7 bg-[radial-gradient(circle_at_35%_35%,#fdf4ff_0%,#f0abfc_40%,#c084fc_100%)] rounded-full shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.1),0_4px_8px_rgba(192,132,252,0.15)] sphere-float-sm z-10"></div>
        {/* Tiny blue sphere left */}
        <div className="absolute left-[16%] top-[56%] w-4 h-4 bg-[radial-gradient(circle_at_35%_35%,#e0f2fe_0%,#60a5fa_50%,#2563eb_100%)] rounded-full sphere-float-lg z-10"></div>

        {/* Dot Grids (4x3 grids of blue dots) */}
        {/* Left dot grid */}
        <div className="absolute left-[6%] top-[25%] opacity-30 z-10">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[#2563eb] rounded-full"></div>
            ))}
          </div>
        </div>
        {/* Right dot grid */}
        <div className="absolute right-[12%] top-[60%] opacity-30 z-10">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[#2563eb] rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Outlined Circles */}
        <div className="absolute left-[3%] top-[15%] w-6 h-6 rounded-full border border-blue-400/20 z-10"></div>
        <div className="absolute right-[20%] top-[15%] w-6 h-6 rounded-full border border-blue-400/20 z-10"></div>
        <div className="absolute right-[3%] top-[38%] w-4 h-4 rounded-full border border-blue-400/20 z-10"></div>
        <div className="absolute right-[28%] bottom-[28%] w-8 h-8 rounded-full border border-blue-400/20 z-10"></div>

        {/* Sparkles (four-pointed stars) */}
        {/* Sparkle 1 */}
        <div className="absolute left-[18%] top-[33%] z-10 animate-pulse">
          <svg className="w-4 h-4 text-blue-300/60 fill-current" viewBox="0 0 24 24">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
        </div>
        {/* Sparkle 2 */}
        <div className="absolute left-[11%] top-[44%] z-10 animate-pulse" style={{ animationDelay: '1.5s' }}>
          <svg className="w-3 h-3 text-blue-300/60 fill-current" viewBox="0 0 24 24">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
        </div>
        {/* Sparkle 3 */}
        <div className="absolute right-[28%] top-[25%] z-10 animate-pulse" style={{ animationDelay: '0.8s' }}>
          <svg className="w-4 h-4 text-blue-300/60 fill-current" viewBox="0 0 24 24">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
        </div>
        {/* Sparkle 4 */}
        <div className="absolute left-[29%] bottom-[22%] z-10 animate-pulse" style={{ animationDelay: '2s' }}>
          <svg className="w-5 h-5 text-blue-300/60 fill-current" viewBox="0 0 24 24">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
        </div>

      </div>

      {/* Central Identity Cluster */}
      <div className="relative z-20 flex flex-col items-center space-y-8 my-auto">
        {/* Squircle logo wrapper matching mockup */}
        <div className="relative flex items-center justify-center w-24 h-24 animate-fade-in">
          <div className="absolute inset-0 bg-[#2563eb]/10 blur-xl rounded-full scale-125 pointer-events-none"></div>
          <div className="w-20 h-20 bg-[#2563eb] rounded-[28px] flex items-center justify-center shadow-lg shadow-blue-600/25 rotate-0 hover:rotate-6 transition-transform duration-300 cursor-pointer">
            {/* White hexagon polygon vector */}
            <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 100 100">
              <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" />
            </svg>
          </div>
        </div>

        {/* Brand Title: MatchUp AI (with split typography colors) */}
        <div className="flex flex-col items-center space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="font-headline-lg-mobile text-[40px] md:text-[46px] font-extrabold tracking-tight text-center">
            <span className="text-[#0b1c30]">MatchUp</span>{' '}
            <span className="text-[#2563eb]">AI</span>
          </h1>
          <p className="font-body-md text-sm md:text-base text-[#737686] font-normal tracking-wide text-center">
            Apply Smarter, Not More.
          </p>
        </div>

        {/* Action Button: Get Started (with white circle arrow) */}
        <div className="pt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-4 bg-[#2563eb] hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md shadow-blue-600/20"
          >
            <span className="tracking-wide text-base">Get Started</span>
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#2563eb] text-sm font-black">arrow_forward</span>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}
