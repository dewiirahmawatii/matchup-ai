import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CareerRoadmap() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col relative pb-32">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-sm flex justify-between items-center w-full px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-KJsjPaXj_OKjFk8dSDkagp7knClNGbikuQP0YhG8_0MokPMF5wXcFtQnZhcluiF_ci2o-EREO_gpJTbU8pnX88i1kGRpK7SPLkcsFO27CzUVXqRZpfG19ZZIEu6PMfBxEQq9gH-ds9aqEWPAnrv0dtG-J7cmErHQjwowp6IegDn_NO2i7RjSRWNS_YX9m3cv-SJlZieKV9Ma1AlkLl71Rg9y81lm0WxPQs7cs_Yn2vaJHCuVkdql" alt="Avatar" />
          </div>
          <span className="font-headline-lg-mobile text-[22px] font-bold text-primary">MatchUp AI</span>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-primary-container/20 transition-colors active:scale-95">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-8 w-full">
        {/* Hero Section */}
        <section className="mb-10 flex flex-col gap-6">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Your Career Roadmap</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Based on your target role as <span className="font-bold text-primary">Senior DevOps Engineer</span>, MatchUp AI has curated this sequence to optimize your employability.</p>
          </div>
          
          {/* Current Readiness Card */}
          <div className="glass-card rounded-[24px] p-6 flex flex-col items-center justify-center border-primary/10 self-start w-full">
            <span className="font-label-sm text-label-sm text-on-surface-variant mb-1">CURRENT READINESS</span>
            <div className="text-4xl font-extrabold text-primary">68%</div>
            <div className="flex items-center gap-1 text-green-600 mt-1">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
              <span className="font-label-sm text-label-sm font-bold">+12% Projected</span>
            </div>
          </div>
        </section>

        {/* AI Guidance Banner */}
        <div className="glass-card rounded-[24px] p-5 mb-12 flex items-start gap-4 border-l-4 border-l-primary relative overflow-hidden">
          <div className="ai-sparkle w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <div className="flex-1">
            <h3 className="font-title-md text-title-md text-primary mb-1">MatchUp AI Tip</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">"Focusing on Step 1 this week will increase your match rate for high-paying remote roles by approximately 18% in the EMEA market. Shall we set a reminder for your Docker practice session?"</p>
            <div className="mt-3 flex gap-3">
              <button className="px-4 py-2 bg-primary text-white rounded-full font-label-sm text-label-sm hover:opacity-90 transition-opacity">Schedule Task</button>
              <button 
                onClick={() => navigate('/skill-gap')}
                className="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-full font-label-sm text-label-sm hover:bg-surface-variant/50 transition-colors"
              >
                See Details
              </button>
            </div>
          </div>
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative space-y-12">
          {/* Vertical line path */}
          <div className="absolute left-6 top-4 bottom-4 w-1 roadmap-line -translate-x-1/2"></div>
          
          {/* Step 1: Active */}
          <div className="relative flex flex-col gap-4 group pl-16">
            <div className="absolute left-6 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white z-10 shadow-lg ring-4 ring-primary/20">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-widest">In Progress</span>
              <h2 className="font-title-md text-title-md text-on-surface mt-1">Step 1: Master Docker Orchestration</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">Deep dive into container lifecycle management and multi-stage builds. Highly requested for the roles you saved.</p>
            </div>
            <div className="glass-card rounded-[24px] p-6 hover:shadow-xl transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full font-label-sm text-label-sm font-bold">+5.2% Readiness</span>
                <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3"></div>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-3">Course: Docker Deep Dive (75% Complete)</p>
            </div>
          </div>

          {/* Step 2: Next Up */}
          <div className="relative flex flex-col gap-4 pl-16">
            <div className="absolute left-6 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-primary flex items-center justify-center text-primary z-10 shadow-md">
              <span className="material-symbols-outlined">account_tree</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-widest">Next Milestone</span>
              <h2 className="font-title-md text-title-md text-on-surface mt-1">Step 2: Build a CI/CD Project</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">Integrate GitHub Actions with your Docker images. This project will serve as your primary portfolio anchor.</p>
            </div>
            <div className="glass-card rounded-[24px] p-6 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">inventory_2</span>
                </div>
                <span className="font-label-sm text-label-sm font-bold">PROJECT SCOPE</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-green-500 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Setup Automated Testing
                </li>
                <li className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-green-500 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Cloud Deployment (AWS/GCP)
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center">
                <span className="font-label-sm text-label-sm font-bold text-primary">+4.8% Readiness</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Est. 12 Hours</span>
              </div>
            </div>
          </div>

          {/* Step 3: Locked */}
          <div className="relative flex flex-col gap-4 pl-16 opacity-60">
            <div className="absolute left-6 -translate-x-1/2 w-12 h-12 rounded-full bg-surface-container border-4 border-outline-variant flex items-center justify-center text-outline z-10">
              <span className="material-symbols-outlined">workspace_premium</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-widest">Future Step</span>
              <h2 className="font-title-md text-title-md text-on-surface mt-1">Step 3: Terraform Certification</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">Validate your Infrastructure as Code (IaC) skills. 42% of your target companies list this as 'Required'.</p>
            </div>
            <div className="glass-card rounded-[24px] p-6 border-dashed border-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant">lock</span>
                  <span className="font-label-sm text-label-sm font-bold">LOCKED</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary">+2.0% Readiness</span>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant italic">Unlock by completing Step 2 projects.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <section className="mt-20 mb-10 text-center space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Ready to level up?</h2>
          <div className="flex flex-col gap-4 justify-center">
            <button 
              onClick={() => alert("Roadmap task started!")}
              className="bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-full font-title-md text-title-md flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20 w-full"
            >
              <span className="material-symbols-outlined">play_circle</span>
              Start Step 1 Now
            </button>
            <button className="border-2 border-primary text-primary px-8 py-4 rounded-full font-title-md text-title-md flex items-center justify-center gap-2 transition-all hover:bg-primary/5 active:scale-95 w-full">
              <span className="material-symbols-outlined">edit</span>
              Modify Roadmap
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
