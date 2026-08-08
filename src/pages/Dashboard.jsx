import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getMatchedJobs } from '../services/matching';
import { getUserProfile } from '../services/db';

export default function Dashboard() {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const layoutMode = outletContext ? outletContext[0] : 'desktop';
  const isMobileMode = layoutMode === 'mobile';

  const [profile, setProfile] = useState(null);

  const [hasUploadedCV, setHasUploadedCV] = useState(() => {
    return localStorage.getItem('hasUploadedCV') === 'true';
  });

  const [recommendedJobs, setRecommendedJobs] = useState([
    {
      id: 1,
      title: 'Senior Backend Engineer',
      company: 'Vortex Systems',
      location: 'Remote',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANjKKTL_YmNv5CF97mQ7-YZtrVtSkpM8hvPsvXfxYrY3rVn01b91xh3PoI7AXTcSGPkrMejhfTHOWFFC74k2FW_d7p6UqBWVIeB0wFoePP_U3w9yHtli05tLgXBntGvBVB0bHpkjgLgaWSNysEDqS3QjqnZBRaq8IHtMuQkzyXETaFpyg6GiUF_PkU24I3X0-0IgCBGAJlT16YP9vyReGiJg4zTiOqM1xcsT00hfHHYPgF2EAhbwsX',
      match: 98,
      tags: ['Go', 'Kubernetes', 'gRPC'],
      salary: '$160k - $210k',
    },
    {
      id: 2,
      title: 'Lead Systems Architect',
      company: 'Cura Studio',
      location: 'Hybrid',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVAqffLeE_yV_0DN5-oEozACQ6hqUjdijIXr0jVFeK6jWRsY1JA4UPKquL_MXGsecpk4vpriQJl-WNLD6bPWvYMAKCPVL27Icn-v8DmN2D8UAe82IA7Ln59R6tW-Dl9KjFOv25hvtnf6E57y_OVh3GELp7xCGIxhjGCn0SaMwhggEQSX2Ww_olwv_GdvPtSHFvv2VIzfWO4bESi7McbWf4NNgWWG-9EqYzom2vN_FMST23N6sFXixy',
      match: 94,
      tags: ['Python', 'AWS', 'Terraform'],
      salary: '$185k - $230k',
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Lumina Finance',
      location: 'NYC',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyatrxmzSctGjgwVXZiNwgFPmGxp_KEpeZ9X3AkCBmIkoDko9d3Zz1aFYdIWtF1zG7F_ADfcwhylSL7rKgB5DQCt4n7XZg9CAi63vfxm4FBAUo8V77gMT2CiWc1oBcugZHllqxIdS7yxu0wg_MUpam7r648E9AfYCuuN2PuZGLrO9XuX1Lu4uZIM8qhYdmzaGRSYPKuNWWNWGOxxK5_ommMtKPRnJtZUJ2YdrgVGRhf-j07-wA6dyB',
      match: 88,
      tags: ['React', 'Node.js', 'PostgreSQL'],
      salary: '$145k - $190k',
    }
  ]);

  useEffect(() => {
    async function loadRecommended() {
      const user = await getUserProfile();
      if (user) {
        setProfile(user);
      }
      const activeEmail = user?.email || localStorage.getItem('currentUserEmail') || 'alex.sterling@example.com';
      const jobs = await getMatchedJobs(activeEmail);
      if (jobs && jobs.length > 0) {
        setRecommendedJobs(jobs.slice(0, 3));
      }
    }
    loadRecommended();
  }, []);

  const getFirstName = () => {
    if (!profile?.full_name) return 'User';
    return profile.full_name.split(' ')[0];
  };

  return (
    <div className="flex-1 flex flex-col relative pb-28">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 w-full flex justify-between items-center px-5 py-3 bg-surface/80 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">MatchUp AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-container/20 transition-colors text-primary">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 py-6 w-full max-w-full overflow-x-hidden">
        {/* Greeting & Search */}
        <section className="mb-8">
          <div className="mb-5">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1 text-[26px] sm:text-[32px]">Hi, {getFirstName()}!</h2>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">Ready to find your next career leap today?</p>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="w-full h-[52px] pl-12 pr-4 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary-container/50 transition-all font-body-md text-on-surface placeholder:text-outline-variant outline-none text-sm" 
              placeholder="Search for jobs, companies, or roles..." 
              type="text"
            />
          </div>
          
          {/* Quick Filters */}
          <div className="flex gap-2.5 mt-4 overflow-x-auto hide-scrollbar pb-1 -mx-5 px-5">
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-container text-on-primary-container rounded-full font-label-sm text-xs shrink-0">
              <span className="material-symbols-outlined text-[16px]">remote_gen</span> Remote
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-xs hover:bg-secondary-container/80 transition-all shrink-0">
              <span className="material-symbols-outlined text-[16px]">hub</span> Hybrid
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-xs hover:bg-secondary-container/80 transition-all shrink-0">
              <span className="material-symbols-outlined text-[16px]">payments</span> $120k+
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-xs hover:bg-secondary-container/80 transition-all shrink-0">
              <span className="material-symbols-outlined text-[16px]">schedule</span> Full-time
            </button>
          </div>
        </section>

        {/* Bento Section */}
        <div className={isMobileMode ? "flex flex-col gap-5 mb-10 w-full" : "grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 w-full"}>
          {/* Career Readiness */}
          <div className="glass-card rounded-[24px] p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-title-md text-title-md text-on-surface mb-1">Career Readiness</h3>
              <p className="font-label-sm text-xs text-on-surface-variant">Profile strength based on current market trends</p>
            </div>
            <div className="py-6 flex flex-col items-center justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                  <circle className="text-surface-container-highest" cx="64" cy="64" fill="transparent" r="52" stroke="currentColor" strokeWidth="8"></circle>
                  <circle 
                    className="text-primary-container text-primary" 
                    cx="64" 
                    cy="64" 
                    fill="transparent" 
                    r="52" 
                    stroke="currentColor" 
                    strokeDasharray="326.7" 
                    strokeDashoffset={hasUploadedCV ? "49" : "326.7"} 
                    strokeLinecap="round" 
                    strokeWidth="8"
                    style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="font-headline-lg text-3xl font-bold text-primary leading-none">
                    {hasUploadedCV ? "85" : "0"}
                  </span>
                  <span className="font-label-sm text-xs text-on-surface-variant font-medium mt-1">
                    {hasUploadedCV ? "Score" : "Pending CV"}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate(hasUploadedCV ? '/skill-gap' : '/upload-cv')} 
              className="w-full py-3 bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-sm text-xs rounded-xl transition-colors font-bold"
            >
              {hasUploadedCV ? "Improve Score" : "Upload CV to Begin"}
            </button>
          </div>

          {/* AI Insight */}
          <div className="bg-tertiary text-on-tertiary rounded-[24px] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary-container/30 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-on-tertiary/20 rounded-lg ai-pulse">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </div>
                <h3 className="font-title-md text-title-md text-sm sm:text-base font-bold">AI Career Companion</h3>
              </div>
              {hasUploadedCV ? (
                <>
                  <p className="font-headline-lg text-headline-lg mb-3 max-w-md leading-snug text-[18px] sm:text-[22px]">
                    "You're a great fit for <span className="underline decoration-tertiary-fixed decoration-2 underline-offset-4">Backend roles</span> at Series B startups."
                  </p>
                  <p className="font-body-md text-xs sm:text-body-md text-on-tertiary/80 mb-5 max-w-lg">
                    Our analysis shows your Node.js and AWS skills are in the top 5% for current openings. We've prioritized 12 new matches for you.
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <button 
                      onClick={() => navigate('/jobs')} 
                      className="px-4 py-2 bg-on-tertiary text-tertiary rounded-full font-label-sm text-xs font-bold active:scale-95 transition-all shadow-sm"
                    >
                      View Roles
                    </button>
                    <button 
                      onClick={() => navigate('/skill-gap')} 
                      className="px-4 py-2 border border-on-tertiary/40 rounded-full font-label-sm text-xs active:scale-95 transition-all"
                    >
                      Skill Gap Map
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-headline-lg text-headline-lg mb-3 max-w-md leading-snug text-[18px] sm:text-[22px]">
                    "Awaiting your CV upload..."
                  </p>
                  <p className="font-body-md text-xs sm:text-body-md text-on-tertiary/80 mb-5 max-w-lg">
                    Upload your resume now to unlock our AI Matching Engine, skill evaluations, and personalized career pathways.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => navigate('/upload-cv')} 
                      className="px-5 py-2 bg-on-tertiary text-tertiary rounded-full font-label-sm text-xs font-bold active:scale-95 transition-all shadow-sm"
                    >
                      Upload CV
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Job recommendations or Upload CV Banner */}
        {hasUploadedCV ? (
          /* Recommended Jobs */
          <section className="mb-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface text-[22px] md:text-[24px]">Top Recommended</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs md:text-sm mt-0.5">Handpicked for your profile by MatchUp AI</p>
              </div>
              <button 
                onClick={() => navigate('/jobs')} 
                className="font-label-sm text-label-sm text-primary hover:underline font-bold flex items-center gap-1"
              >
                <span>View All</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
            
            <div className={isMobileMode ? "flex flex-col gap-4 w-full" : "grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 w-full"}>
              {recommendedJobs.map((job) => (
                <div 
                  key={job.id} 
                  onClick={() => navigate(`/job-detail/${job.id}`)}
                  className="w-full glass-card rounded-[24px] p-6 group transition-all hover:scale-[1.02] active:scale-95 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center p-2.5 border border-outline-variant/30 shadow-sm">
                        <img className="w-full h-full object-contain" src={job.logo} alt={job.company} />
                      </div>
                      <div className="bg-primary-container/10 text-primary-container px-3 py-1.5 rounded-full font-label-sm text-xs flex items-center gap-1.5 font-bold match-glow">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        {job.match}% Match
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-title-md text-title-md text-on-surface mb-1 text-[17px] font-bold group-hover:text-primary transition-colors leading-snug">{job.title}</h4>
                      <p className="font-body-md text-xs md:text-sm text-on-surface-variant">{job.company} • {job.location}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-surface-container rounded-full font-label-sm text-xs text-on-surface-variant">{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
                    <span className="font-title-md text-sm md:text-base font-bold text-on-surface">{job.salary}</span>
                    <button className="bg-primary px-5 py-2.5 text-on-primary rounded-xl font-label-sm text-xs md:text-sm font-bold hover:bg-primary-container transition-colors shadow-sm">
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* Upload Your CV Hero Banner */
          <section className="mb-10">
            <div className="w-full p-6 sm:p-8 rounded-[28px] bg-gradient-to-br from-primary via-[#2563eb] to-tertiary text-white relative overflow-hidden shadow-xl shadow-primary/10">
              {/* Aurora light overlay */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-16 -translate-y-16 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col items-start space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <span className="material-symbols-outlined text-white text-2xl">auto_awesome</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-title-md text-title-md text-white text-[20px] font-bold">Upload Your CV</h3>
                  <p className="text-white/80 font-body-md text-xs sm:text-sm leading-relaxed max-w-sm">
                    Unlock tailored job matches, automated resume parsing, and expert career suggestions from MatchUp AI.
                  </p>
                </div>
                
                <button 
                  onClick={() => navigate('/upload-cv')}
                  className="w-full sm:w-auto px-5 py-3 bg-white text-primary rounded-xl font-label-sm text-xs font-bold shadow-md hover:bg-surface-container transition-all active:scale-95 duration-100 flex items-center justify-center gap-2"
                >
                  <span>Upload CV</span>
                  <span className="material-symbols-outlined text-sm">cloud_upload</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Skill Mastery Progress */}
        <section className="mb-12">
          <h3 className="font-headline-lg text-headline-lg text-on-surface mb-6">Skill Upgrades</h3>
          <div className={isMobileMode ? "flex flex-col gap-4 w-full" : "grid grid-cols-1 md:grid-cols-2 gap-4 w-full"}>
            {/* Upgrade 1 */}
            <div className="p-6 bg-surface-container-low rounded-[24px] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                <span className="material-symbols-outlined">api</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-title-md text-title-md text-on-surface">GraphQL APIs</span>
                  <span className="font-label-sm text-label-sm text-primary">{hasUploadedCV ? "80%" : "0%"}</span>
                </div>
                <div className="h-2 w-full bg-outline-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container" style={{ width: hasUploadedCV ? '80%' : '0%' }}></div>
                </div>
              </div>
            </div>
            
            {/* Upgrade 2 */}
            <div className="p-6 bg-surface-container-low rounded-[24px] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined">cloud</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-title-md text-title-md text-on-surface">AWS Lambda</span>
                  <span className="font-label-sm text-label-sm text-primary">{hasUploadedCV ? "45%" : "0%"}</span>
                </div>
                <div className="h-2 w-full bg-outline-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container" style={{ width: hasUploadedCV ? '45%' : '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
