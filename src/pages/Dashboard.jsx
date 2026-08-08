import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const [hasUploadedCV, setHasUploadedCV] = useState(() => {
    return localStorage.getItem('hasUploadedCV') === 'true';
  });

  const recommendedJobs = [
    {
      id: 1,
      title: 'Senior Backend Engineer',
      company: 'Vortex Systems',
      location: 'Remote',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANjKKTL_YmNv5CF97mQ7-YZtrVtSkpM8hvPsvXfxYrY3rVn01b91xh3PoI7AXTcSGPkrMejhfTHOWFFC74k2FW_d7p6UqBWVIeB0wFoePP_U3w9yHtli05tLgXBntGvBVB0bHpkjgLgaWSNysEDqS3QjqnZBRaq8IHtMuQkzyXETaFpyg6GiUF_PkU24I3X0-0IgCBGAJlT16YP9vyReGiJg4zTiOqM1xcsT00hfHHYPgF2EAhbwsX',
      match: 95,
      tags: ['Go', 'Kubernetes', 'gRPC'],
      salary: '$160k - $210k',
    },
    {
      id: 2,
      title: 'Lead Systems Architect',
      company: 'Cura Studio',
      location: 'Hybrid',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVAqffLeE_yV_0DN5-oEozACQ6hqUjdijIXr0jVFeK6jWRsY1JA4UPKquL_MXGsecpk4vpriQJl-WNLD6bPWvYMAKCPVL27Icn-v8DmN2D8UAe82IA7Ln59R6tW-Dl9KjFOv25hvtnf6E57y_OVh3GELp7xCGIxhjGCn0SaMwhggEQSX2Ww_olwv_GdvPtSHFvv2VIzfWO4bESi7McbWf4NNgWWG-9EqYzom2vN_FMST23N6sFXixy',
      match: 92,
      tags: ['Python', 'AWS', 'Terraform'],
      salary: '$185k - $230k',
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Lumina Finance',
      location: 'NYC',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyatrxmzSctGjgwVXZiNwgFPmGxp_KEpeZ9X3AkCBmIkoDko9d3Zz1aFYdIWtF1zG7F_ADfcwhylSL7rKgB5DQCt4n7XZg9CAi63vfxm4FBAUo8V77gMT2CiWc1oBcugZHllqxIdS7yxu0wg_MUpam7r648E9AfYCuuN2PuZGLrO9XuX1Lu4uZIM8qhYdmzaGRSYPKuNWWNWGOxxK5_ommMtKPRnJtZUJ2YdrgVGRhf-j07-wA6dyB',
      match: 89,
      tags: ['React', 'Node.js', 'PostgreSQL'],
      salary: '$145k - $190k',
    }
  ];

  return (
    <div className="flex-1 flex flex-col relative pb-24">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 w-full flex justify-between items-center px-5 py-3 bg-surface/80 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-outline-variant">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8EBpeQTbq4o-Rr3_2-koldhoXOIgMKCzXdON3bHeDoifr6BFwl9wjJgzf7f_jfXXVlPAEy-V3eGNnNcqd0phU9f1fmh5_SnN_W3J9T_EWBlzuOWN0EWxtvc8JThP3lDCi5KdVe25JCIRZRwZkkR6vD1TVJmxgloTwOPvWEF3eXYzLjA5EyrU96AzrVIREzJuUHQ3K3C071CxeeP-lbVk6QCIKmCZCHjNMtG1myHvKNGqfG8Ney9fR" alt="Profile" />
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">MatchUp AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-container/20 transition-colors text-primary">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 py-8 w-full">
        {/* Greeting & Search */}
        <section className="mb-10">
          <div className="mb-6">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Hi, Alex!</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Ready to find your next career leap today?</p>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="w-full h-[56px] pl-12 pr-4 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary-container/50 transition-all font-body-md text-on-surface placeholder:text-outline-variant outline-none" 
              placeholder="Search for jobs, companies, or roles..." 
              type="text"
            />
          </div>
          
          {/* Quick Filters */}
          <div className="flex gap-3 mt-4 overflow-x-auto hide-scrollbar pb-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container rounded-full font-label-sm text-label-sm shrink-0">
              <span className="material-symbols-outlined text-[18px]">remote_gen</span> Remote
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm hover:bg-secondary-container/80 transition-all shrink-0">
              <span className="material-symbols-outlined text-[18px]">hub</span> Hybrid
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm hover:bg-secondary-container/80 transition-all shrink-0">
              <span className="material-symbols-outlined text-[18px]">payments</span> $120k+
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm hover:bg-secondary-container/80 transition-all shrink-0">
              <span className="material-symbols-outlined text-[18px]">schedule</span> Full-time
            </button>
          </div>
        </section>

        {/* Bento Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Career Readiness */}
          <div className="glass-card rounded-[24px] p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-title-md text-title-md text-on-surface mb-2">Career Readiness</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Profile strength based on current market trends</p>
            </div>
            <div className="py-8 flex flex-col items-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle className="text-surface-container-highest" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                  <circle 
                    className="text-primary-container" 
                    cx="64" 
                    cy="64" 
                    fill="transparent" 
                    r="58" 
                    stroke="currentColor" 
                    strokeDasharray="364.4" 
                    strokeDashoffset={hasUploadedCV ? "54.6" : "364.4"} 
                    strokeLinecap="round" 
                    strokeWidth="8"
                    style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-headline-lg text-headline-lg text-primary">
                    {hasUploadedCV ? "85" : "0"}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {hasUploadedCV ? "Score" : "Pending CV"}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate(hasUploadedCV ? '/skill-gap' : '/upload-cv')} 
              className="w-full py-3 bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-sm text-label-sm rounded-xl transition-colors"
            >
              {hasUploadedCV ? "Improve Score" : "Upload CV to Begin"}
            </button>
          </div>

          {/* AI Insight */}
          <div className="bg-tertiary text-on-tertiary rounded-[24px] p-8 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary-container/30 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-on-tertiary/20 rounded-lg ai-pulse">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </div>
                <h3 className="font-title-md text-title-md">AI Career Companion</h3>
              </div>
              {hasUploadedCV ? (
                <>
                  <p className="font-headline-lg text-headline-lg mb-4 max-w-md leading-tight text-[22px]">
                    "You're a great fit for <span className="underline decoration-tertiary-fixed decoration-2 underline-offset-4">Backend roles</span> at Series B startups."
                  </p>
                  <p className="font-body-md text-body-md text-on-tertiary/80 mb-6 max-w-lg">
                    Our analysis shows your Node.js and AWS skills are in the top 5% for current openings. We've prioritized 12 new matches for you.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => navigate('/jobs')} 
                      className="px-4 py-2 bg-on-tertiary text-tertiary rounded-full font-label-sm text-label-sm font-bold active:scale-95 transition-all"
                    >
                      View Roles
                    </button>
                    <button 
                      onClick={() => navigate('/skill-gap')} 
                      className="px-4 py-2 border border-on-tertiary/40 rounded-full font-label-sm text-label-sm active:scale-95 transition-all"
                    >
                      Skill Gap Map
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-headline-lg text-headline-lg mb-4 max-w-md leading-tight text-[22px]">
                    "Awaiting your CV upload..."
                  </p>
                  <p className="font-body-md text-body-md text-on-tertiary/80 mb-6 max-w-lg">
                    Upload your resume now to unlock our AI Matching Engine, skill evaluations, and personalized career pathways.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => navigate('/upload-cv')} 
                      className="px-6 py-2 bg-on-tertiary text-tertiary rounded-full font-label-sm text-label-sm font-bold active:scale-95 transition-all"
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
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-lg text-headline-lg text-on-surface">Top Recommended</h3>
              <button onClick={() => navigate('/jobs')} className="font-label-sm text-label-sm text-primary hover:underline">View All</button>
            </div>
            
            <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:overflow-visible -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
              {recommendedJobs.map((job) => (
                <div 
                  key={job.id} 
                  onClick={() => navigate(`/job-detail/${job.id}`)}
                  className="min-w-[300px] snap-start glass-card rounded-[24px] p-6 group transition-all hover:scale-[1.01] active:scale-95 cursor-pointer flex-shrink-0"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center p-2">
                      <img className="w-full object-contain" src={job.logo} alt={job.company} />
                    </div>
                    <div className="bg-primary-container/10 text-primary-container px-3 py-1.5 rounded-full font-label-sm text-label-sm flex items-center gap-1.5 match-glow">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      {job.match}% Match
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-title-md text-title-md text-on-surface mb-1 truncate">{job.title}</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">{job.company} • {job.location}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm font-bold text-on-surface">{job.salary}</span>
                    <button className="bg-primary px-6 py-3 text-on-primary rounded-xl font-label-sm text-label-sm hover:bg-primary-container transition-colors">Apply</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* Upload Your CV Hero Banner */
          <section className="mb-12">
            <div className="w-full p-8 rounded-[32px] bg-gradient-to-br from-primary via-[#2563eb] to-tertiary text-white relative overflow-hidden shadow-xl shadow-primary/10">
              {/* Aurora light overlay */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-16 -translate-y-16 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col items-start space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <span className="material-symbols-outlined text-white text-3xl">auto_awesome</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-title-md text-title-md text-white text-[22px] font-bold">Upload Your CV</h3>
                  <p className="text-white/80 font-body-md text-sm leading-relaxed max-w-sm">
                    Unlock tailored job matches, automated resume parsing, and expert career suggestions from MatchUp AI.
                  </p>
                </div>
                
                <button 
                  onClick={() => navigate('/upload-cv')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white text-primary rounded-xl font-label-sm text-label-sm font-bold shadow-md hover:bg-surface-container transition-all active:scale-95 duration-100 flex items-center justify-center gap-2"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
