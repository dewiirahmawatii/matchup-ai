import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeResume } from '../services/careerCoach';
import { getUserProfile, recordCVUpload, saveUserProfile } from '../services/db';

export default function AICVAnalysis() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [scoreOffset, setScoreOffset] = useState(251.2);

  useEffect(() => {
    async function performAnalysis() {
      setIsLoading(true);
      try {
        const profile = await getUserProfile();
        const base64Data = localStorage.getItem('cv_base64') || '';
        const filename = localStorage.getItem('cv_filename') || 'CV_Resume.pdf';
        
        const result = await analyzeResume(base64Data, filename, profile);
        setAnalysis(result);
        
        // Resolve active email dynamically
        const activeEmail = profile?.email || localStorage.getItem('currentUserEmail') || 'alex.sterling@example.com';

        // Save the CV analysis to Supabase & local storage
        await recordCVUpload(activeEmail, filename, result.readinessScore, result.hardSkills);
        localStorage.setItem('cv_target_role', result.targetRole);

        // Update profile full name and readiness score in database
        if (result.candidateName && result.candidateName !== 'Kandidat' && result.candidateName !== 'Alex Sterling') {
          const updatedProfile = {
            ...profile,
            email: activeEmail,
            full_name: result.candidateName,
            readiness_score: result.readinessScore || profile?.readiness_score || 85
          };
          await saveUserProfile(updatedProfile);
        }

        // Animate readiness score circle
        const radius = 40;
        const circumference = 2 * Math.PI * radius; // ~251.2
        const offset = circumference - (result.readinessScore / 100) * circumference;
        
        setTimeout(() => {
          setScoreOffset(offset);
        }, 300);
      } catch (err) {
        console.error('Failed to perform AI analysis:', err);
      } finally {
        setIsLoading(false);
      }
    }
    performAnalysis();
  }, []);

  if (isLoading || !analysis) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-surface min-h-screen">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-primary-container opacity-20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-4xl ai-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
        </div>
        <h2 className="font-headline-lg-mobile text-lg font-bold text-on-surface mb-2">Analyzing Your CV</h2>
        <p className="font-body-md text-sm text-on-surface-variant max-w-xs">
          MatchUp AI is scanning skills, calculating readiness score, mapping trajectory milestones, and identifying gaps.
        </p>
      </div>
    );
  }

  // Handle case where document is not a CV/Resume
  if (analysis.isNotCV) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-surface min-h-screen">
        <div className="w-16 h-16 bg-error-container text-error rounded-2xl flex items-center justify-center mb-6 shadow-md">
          <span className="material-symbols-outlined text-3xl">warning</span>
        </div>
        <h2 className="font-headline-lg-mobile text-lg font-bold text-on-surface mb-2">Dokumen Tidak Sesuai</h2>
        <p className="font-body-md text-sm text-on-surface-variant max-w-xs mb-8">
          {analysis.errorMessage || "Berkas tidak teridentifikasi sebagai CV/Resume. Silakan unggah berkas CV yang sesuai."}
        </p>
        <button 
          type="button"
          onClick={() => {
            localStorage.removeItem('cv_base64');
            localStorage.removeItem('cv_filename');
            navigate('/upload-cv');
          }}
          className="w-full max-w-xs h-12 bg-primary text-on-primary rounded-full font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center"
        >
          Unggah Ulang CV
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col relative pb-32">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 w-full flex justify-between items-center px-5 py-3 bg-surface/80 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => navigate(-1)} 
            className="material-symbols-outlined text-on-surface-variant hover:bg-primary-container/20 p-2 rounded-full transition-colors active:scale-95"
          >
            arrow_back
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">MatchUp AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-primary-container/20 rounded-full transition-colors cursor-pointer">notifications</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 py-8 w-full">
        {/* Header & Primary Score */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-in">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-medium mb-1">
              <span className="material-symbols-outlined text-sm ai-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_back_ios_new</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider">AI Analysis Complete</span>
            </div>
            <h2 className="font-headline-lg text-[26px] font-semibold text-on-surface leading-tight">{analysis.targetRole}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Based on your CV and the current market requirements for Tier-1 Tech.</p>
          </div>
          
          {/* Career Readiness Score Card */}
          <div className="glass-card rounded-[32px] p-6 flex items-center gap-6 self-start md:self-auto min-w-[280px]">
            <div className="relative w-24 h-24">
              <svg className="career-score-svg w-full h-full" viewBox="0 0 100 100">
                <circle className="text-secondary-container" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                <circle 
                  className="text-primary-container career-score-circle" 
                  cx="50" 
                  cy="50" 
                  fill="transparent" 
                  r="40" 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeWidth="8"
                  style={{ strokeDasharray: 251.2, strokeDashoffset: scoreOffset }}
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[28px] font-bold text-primary">{analysis.readinessScore}%</span>
              </div>
            </div>
            <div>
              <h3 className="font-title-md text-title-md">Readiness Score</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{analysis.growthLevel || 'Top Tier Candidate'}</p>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-6">
          {/* Extracted Skills */}
          <section className="glass-card rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-title-md text-title-md flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">psychology</span>
                Extracted Skills
              </h3>
              <button type="button" className="text-primary font-label-sm text-label-sm flex items-center gap-1">
                View Matrix <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
            <div className="space-y-8">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant block mb-4 uppercase tracking-widest">Hard Skills Proficiency</span>
                <div className="flex flex-wrap gap-3">
                  {analysis.hardSkills.map((skill, index) => (
                    <span 
                      key={index} 
                      className={`px-4 py-2 rounded-full font-medium text-sm ${
                        index < 3 
                          ? 'bg-primary-container/10 text-primary flex items-center gap-2' 
                          : 'bg-secondary-container text-on-surface-variant'
                      }`}
                    >
                      {skill}
                      {index === 0 && <span className="w-1.5 h-1.5 rounded-full bg-primary ai-pulse"></span>}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 pt-4 border-t border-outline-variant/30">
                <div className="space-y-3">
                  <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Soft Skills</h4>
                  <ul className="space-y-4">
                    {analysis.softSkills.map((skillObj, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span className="font-body-md text-body-md">{skillObj.skill}</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map(bar => (
                            <div 
                              key={bar} 
                              className={`w-4 h-1.5 rounded-full ${
                                bar <= skillObj.level ? 'bg-primary' : 'bg-outline-variant'
                              }`}
                            ></div>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Experience Depth</h4>
                  <div className="bg-surface-container rounded-2xl p-4">
                    <span className="block text-2xl font-bold text-primary mb-1">{analysis.experienceYears} Years</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Relevant Professional Tenure</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Identified Strengths & Gaps */}
          <section className="space-y-6">
            <div className="glass-card rounded-[32px] p-6 border-l-4 border-l-primary">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-4 uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                Key Strengths
              </h3>
              <ul className="space-y-4">
                {analysis.keyStrengths.map((strength, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0">check_circle</span>
                    <span className="font-body-md text-body-md leading-tight">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="glass-card rounded-[32px] p-6 border-l-4 border-l-error">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-4 uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-sm">warning</span>
                Identified Gaps
              </h3>
              <ul className="space-y-4">
                {analysis.identifiedGaps.map((gapObj, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="material-symbols-outlined text-error mt-0.5 shrink-0">info</span>
                    <div>
                      <span className="font-body-md text-body-md font-semibold block">{gapObj.gap}</span>
                      <span className="text-sm text-on-surface-variant">{gapObj.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Career Trajectory Analysis */}
          <section className="glass-card rounded-[32px] p-8">
            <h3 className="font-title-md text-title-md mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">timeline</span>
              Career Trajectory Analysis
            </h3>
            <div className="relative overflow-hidden pt-4 pb-8">
              <div className="h-48 w-full bg-gradient-to-t from-primary/5 to-transparent rounded-2xl relative flex items-end">
                <svg className="w-full h-32 text-primary/20" preserveAspectRatio="none" viewBox="0 0 1000 100">
                  <path d="M0,100 C150,90 250,50 400,60 C550,70 650,20 800,10 C900,5 1000,0 1000,0 L1000,100 L0,100 Z" fill="currentColor"></path>
                  <path className="text-primary" d="M0,100 C150,90 250,50 400,60 C550,70 650,20 800,10 C900,5 1000,0 1000,0" fill="none" stroke="currentColor" strokeWidth="2"></path>
                </svg>
                
                {/* Dynamic Markers */}
                {analysis.trajectory && analysis.trajectory.map((item, index) => {
                  const leftPos = index === 0 ? '10%' : index === 1 ? '45%' : '80%';
                  const bottomPos = `${item.scorePercentage}%`;
                  return (
                    <div 
                      key={index} 
                      className="absolute group" 
                      style={{ left: leftPos, bottom: bottomPos }}
                    >
                      <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 cursor-help"></div>
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface p-2 rounded-lg shadow-lg border border-outline-variant invisible group-hover:visible whitespace-nowrap z-10 animate-fade-in">
                        <p className="text-xs font-bold">{item.role}</p>
                        <p className="text-[10px]">{item.years}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 animate-fade-in">
              <div className="flex-1 min-w-[120px] p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block mb-1">Growth Velocity</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{analysis.growthVelocity}</span>
                  <span className="text-sm text-primary">{analysis.growthLevel}</span>
                </div>
              </div>
              <div className="flex-1 min-w-[120px] p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block mb-1">Impact Rating</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{analysis.impactRating}</span>
                  <span className="text-sm text-on-surface-variant">{analysis.impactLevel}</span>
                </div>
              </div>
              <div className="flex-1 min-w-[120px] p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block mb-1">AI Recommendation</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-primary">{analysis.recommendation}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Action Section */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4">
          <button 
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-full h-12 px-8 bg-primary text-on-primary rounded-full font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            Optimize My CV <span className="material-symbols-outlined">auto_fix_high</span>
          </button>
          <button 
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-full h-12 px-8 border border-primary text-primary rounded-full font-semibold hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
          >
            Download Report <span className="material-symbols-outlined">download</span>
          </button>
        </div>
      </main>
    </div>
  );
}
