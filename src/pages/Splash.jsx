import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fill loader bar
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 100);

    // Redirect to login page
    const redirectTimer = setTimeout(() => {
      navigate('/login');
    }, 3500);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative p-margin-mobile">
      {/* Atmospheric Background Element */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary-container/5 blur-[120px] pulse-slow"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-tertiary-container/5 blur-[120px] pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Central Identity Cluster */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Brand Mark / Logo Slot */}
        <div className="slide-up">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full scale-150 opacity-40"></div>
            <div className="w-20 h-20 bg-primary-container rounded-[24px] flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 cursor-pointer">
              <span className="material-symbols-outlined text-on-primary-container text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="flex flex-col items-center space-y-2 slide-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-display-lg md:text-display-lg font-extrabold tracking-tighter text-on-surface">
            MatchUp AI
          </h1>
          <p className="font-title-md text-title-md text-on-surface-variant font-normal tracking-wide opacity-80">
            Apply Smarter, Not More.
          </p>
        </div>

        {/* Progress/Loading State */}
        <div className="w-48 h-1 bg-surface-container rounded-full overflow-hidden mt-12 slide-up" style={{ animationDelay: '0.4s' }}>
          <div 
            className="h-full bg-primary rounded-full transition-all duration-[3000ms] ease-out" 
            style={{ width: `${progress}%` }}
            id="loader-bar"
          ></div>
        </div>
      </div>

      {/* Footnote Info */}
      <div className="absolute bottom-12 left-0 w-full flex flex-col items-center space-y-4 fade-in" style={{ animationDelay: '0.8s' }}>
        <div className="flex items-center space-y-0 space-x-2 text-outline">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest">Enterprise Encrypted</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-slate-200" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASKocu-yHRJWQ4vgJTtWRSBiScDSl2j3JPMXxlB0oHDMm18r7lM0n2pzjU3705uCj9qZ8bC2TgauNKAsZLrmengXumA0KixMD2RQeCtYfMh34oo9GbYzWmoVaJjZ9mVG1ykDSuKRfocMRblvhM4f3_q1CBblSuKz4qq4ab3_X96KXOaTffGV8x6xWa-M-bBvp9a-Wh8e9wR-QBXUUmytbqmL-QKiwqaP0wS_O_9fBUk9bkjxCo5X3G')", backgroundSize: 'cover' }}></div>
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-slate-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCml_Tl0zp2u8T_9DJZ9enD1meg-eL_Bnz678TvJ8cKUbQogtflfSiMglOuRVdUUKAggf6fuh9POR-oOnynraS4nwDpWU4hZ0Yfe4rJDy2rTjwr-L0Q0SoUT15SLwV5ihpyQKRqmTnqeBBuztl77Mm3q1Isv1uFRVDMtB6IAvj6z3Q75G3RPs5Lm4tSbdiAAPVb2OTShWvf3pagpm4ozEug2zyWpLWwZdXQjCi18Y8aI6ODZSSe92iS')", backgroundSize: 'cover' }}></div>
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-slate-400" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyYOhdADf-ny3LHUP1JHCa_g-dr_E29hCuX8489CnRGFeuTzDp0VfKXXquejBRooHU9ngwz1aY5jDaQHpEDy4LeVp_sUDVQe_QkUYxBBgpNoA_tJkxhlr6UHdFj4KFsIw5aBAwmN4ifcGy0s4WNA5ecFiDz_yGNPR8i43tPovdWiZy-uueEG-PbuoPWScsX614S-YFbLU4_TLU7me7i6HqagkEaD-9upM83tf8TuP93FPd3gzlUc94')", backgroundSize: 'cover' }}></div>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            Trusted by <span className="font-bold text-primary">12k+</span> professionals
          </p>
        </div>
      </div>
    </div>
  );
}
