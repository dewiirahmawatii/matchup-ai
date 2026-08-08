import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSkillGaps } from '../services/careerCoach';

export default function SkillGap() {
  const navigate = useNavigate();
  const [skillGapsList, setSkillGapsList] = useState([]);

  useEffect(() => {
    async function loadGaps() {
      const gaps = await getSkillGaps();
      if (Array.isArray(gaps)) {
        setSkillGapsList(gaps);
      }
    }
    loadGaps();
  }, []);

  const skillsData = [
    {
      name: 'Advanced Prototyping',
      match: 65,
      benchmark: 90,
      description: 'Critical Gap: Higher requirement in FinTech sector',
      critical: true,
    },
    {
      name: 'User Research & Synthesis',
      match: 95,
      benchmark: 85,
      description: 'Profile strength: Exceeds average market expectations',
      critical: false,
    },
    {
      name: 'Cross-functional Leadership',
      match: 40,
      benchmark: 75,
      description: 'Emerging need for Stakeholder Management',
      critical: false,
    }
  ];

  return (
    <div className="flex-1 flex flex-col relative pb-28">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-sm flex justify-between items-center w-full px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined">analytics</span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">MatchUp AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-primary-container/20 transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 py-8 w-full">
        {/* Header Section */}
        <section className="mb-10">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Skill Gap Analysis</h2>
              <p className="text-on-surface-variant font-body-lg text-body-lg">Precision intelligence comparing your current profile against real-time market requirements for <span className="text-primary font-bold">Senior Product Designer</span> roles.</p>
            </div>
            <button 
              onClick={() => navigate('/roadmap')}
              className="bg-primary-container text-on-primary-container px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all font-title-md text-title-md shadow-md active:scale-95 self-start w-full"
            >
              <span className="material-symbols-outlined">route</span>
              Career Roadmap
            </button>
          </div>
        </section>

        {/* Bento Analysis Grid */}
        <div className="space-y-6">
          {/* Skill Match Score */}
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Overall Match</span>
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              </div>
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                  <circle className="text-surface-container-high" cx="64" cy="64" fill="transparent" r="52" stroke="currentColor" strokeWidth="8"></circle>
                  <circle 
                    className="text-primary" 
                    cx="64" 
                    cy="64" 
                    fill="transparent" 
                    r="52" 
                    stroke="currentColor" 
                    strokeDasharray="326.7" 
                    strokeDashoffset="71.8" 
                    strokeLinecap="round" 
                    strokeWidth="10"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-3xl font-bold text-on-surface leading-none">78%</span>
                  <span className="text-[10px] text-on-surface-variant font-medium uppercase mt-1">Ready</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-outline-variant/30 text-center">
              <p className="text-on-surface-variant text-label-sm mb-1">Top 12% of candidates</p>
              <div className="flex justify-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-outline-variant"></div>
              </div>
            </div>
          </div>

          {/* Market Demand Trend */}
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-title-md text-title-md text-on-surface">Market Demand</h3>
                <span className="px-3 py-1 bg-surface-container rounded-full text-label-sm font-medium text-primary">Last 30 Days</span>
              </div>
              <div className="h-48 flex items-end justify-between gap-2">
                {/* Chart Bars */}
                <div className="flex-1 bg-primary/10 rounded-t-lg relative group h-[40%]"></div>
                <div className="flex-1 bg-primary/20 rounded-t-lg relative group h-[65%]"></div>
                <div className="flex-1 bg-primary/40 rounded-t-lg relative group h-[85%]"></div>
                <div className="flex-1 bg-primary rounded-t-lg relative group h-[95%]">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded opacity-100 whitespace-nowrap">AI Ethics Peak</div>
                </div>
                <div className="flex-1 bg-primary/60 rounded-t-lg relative group h-[70%]"></div>
                <div className="flex-1 bg-primary/30 rounded-t-lg relative group h-[50%]"></div>
              </div>
              <div className="mt-4 flex justify-between text-[11px] text-on-surface-variant font-medium">
                <span>WK 1</span>
                <span>WK 2</span>
                <span>WK 3</span>
                <span>WK 4</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-8xl">trending_up</span>
            </div>
          </div>

          {/* Detailed Skill Breakdown */}
          <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-3xl shadow-sm">
            <h3 className="font-title-md text-title-md text-on-surface mb-8">Skill Proficiency vs Requirement</h3>
            <div className="space-y-8">
              {skillsData.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="font-semibold text-on-surface">{skill.name}</span>
                      <p className="text-label-sm text-on-surface-variant">{skill.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-label-sm font-bold text-primary">{skill.match}% Match</span>
                    </div>
                  </div>
                  <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden relative">
                    {/* Market Benchmark Marker */}
                    <div 
                      className={`absolute top-0 w-0.5 h-full z-20 ${skill.critical ? 'bg-error' : 'bg-on-surface-variant/40'}`} 
                      style={{ left: `${skill.benchmark}%` }}
                    ></div>
                    {/* User Progress */}
                    <div 
                      className={`h-full rounded-full z-10 ${skill.match >= 60 ? 'bg-primary skill-bar-shine' : 'bg-primary/45'}`}
                      style={{ width: `${skill.match}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 p-4 bg-primary-container/10 border border-primary/20 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <p className="text-on-surface text-label-sm leading-relaxed">
                <strong className="text-primary">MatchUp AI Insight:</strong> Closing the <span className="underline underline-offset-2">Advanced Prototyping</span> gap would increase your interview probability by 22% in the current market.
              </p>
            </div>
          </div>

          {/* Learning Goals Sidebar */}
          <div className="space-y-6">
            <div className="bg-surface-container-highest p-6 rounded-3xl border border-outline-variant">
              <h3 className="font-title-md text-title-md text-on-surface mb-6">Learning Goals</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-lowest border border-outline-variant flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">data_object</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-on-surface">Framer Motion Mastery</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-surface-container rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-on-surface-variant">75%</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 opacity-60">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-lowest border border-outline-variant flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">psychology</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-on-surface">Behavioral Economics</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-surface-container rounded-full">
                        <div className="h-full bg-outline rounded-full" style={{ width: '12%' }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-on-surface-variant">12%</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-8 py-3 border border-primary text-primary rounded-xl font-label-sm text-label-sm hover:bg-primary/5 transition-colors">
                Add New Goal
              </button>
            </div>

            {/* Unlock Roadmap Banner */}
            <div 
              onClick={() => navigate('/roadmap')}
              className="bg-primary p-6 rounded-3xl text-on-primary shadow-xl relative overflow-hidden group cursor-pointer active:scale-95 transition-transform"
            >
              <div className="relative z-10">
                <h4 className="font-title-md text-title-md mb-2">Unlock Career Roadmap</h4>
                <p className="text-primary-fixed-dim text-label-sm mb-4">Get a step-by-step personalized guide to reach Senior Product Designer level.</p>
                <span className="material-symbols-outlined float-right text-4xl">arrow_forward</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
