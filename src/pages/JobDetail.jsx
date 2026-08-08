import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobById, toggleSaveJob, getUserProfile } from '../services/db';
import { getMatchedJobs } from '../services/matching';
import { analyzeJobCompatibility } from '../services/careerCoach';

export default function JobDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [coachAnalysis, setCoachAnalysis] = useState(null);
  const [jobDetail, setJobDetail] = useState({
    title: 'Senior Product Designer',
    company: 'FintechFlow Inc.',
    location: 'San Francisco, CA',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYu0ByxNYVaDpkw1rS1FDIQrkCtWrYC8tcT7G9upS8S3_YA8Zpf7I_pxoMPfrJxRJdBF3AiXX9xrEQu4T8P-uia4vxKqjFamk-rUyf88enurs-7NtKpfw0po_cGYgZwTeAlfn8kuQXGUPD0cz702IoorJKhA3uw5ZnKd3eH0runxpjhX6oohliyAfViqlqVP4e5wEp010HARQu0TmVH0b3mqtg8L4bv0afTdOu3ye9tLglTgJuTOra',
    match: 94,
    type: 'Remote',
    salary: '$140k - $180k',
    posted: '2 days ago',
    applicants: 128,
  });

  useEffect(() => {
    async function loadJob() {
      if (id) {
        const matched = await getMatchedJobs();
        const found = matched.find(j => j.id === Number(id));
        let activeJob = found;
        if (found) {
          setJobDetail(found);
        } else {
          const fallback = await getJobById(id);
          if (fallback) {
            setJobDetail(fallback);
            activeJob = fallback;
          }
        }
        
        const userProfile = await getUserProfile();
        const analysis = await analyzeJobCompatibility(activeJob, userProfile);
        setCoachAnalysis(analysis);
      }
    }
    loadJob();
  }, [id]);

  const handleToggleSave = async () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    if (id) {
      await toggleSaveJob('alex.sterling@example.com', Number(id), isSaved);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative pb-32">
      {/* Top Header Bar */}
      <header className="bg-surface/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm flex justify-between items-center w-full px-5 py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-container/20 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">MatchUp AI</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-container/20 transition-colors active:scale-95">
            <span className="material-symbols-outlined text-on-surface-variant">share</span>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Ck3sPJlg5MrS0prScDCQsEG-KkrIaye6bJKKFHdk8Yc8qpVwfIk_AkADaQqQ2fPfockTzO4rls3z_aThGo7_YpmKyFMF4DPwu0SKRKx-fEzHyvrrqsUh8CdxomskxibUHxziDty7-lCYc8893BCYFkvDqyyG-WTyVUs-tDeLKQ3jsZuilIsRsnNBHofvOW1ji8qoz9yqy1tJ8eWOIuS0sxr3ZCGo-18Bo-Tcfa39MSn4uWyGmi8T" alt="Avatar" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 py-6 w-full">
        {/* Job Header Section */}
        <section className="mb-10 fade-in">
          <div className="flex gap-6 items-start">
            <div className="w-20 h-20 rounded-3xl overflow-hidden bg-white shadow-sm border border-outline-variant p-4 flex items-center justify-center">
              <img className="w-full h-full object-contain" src={jobDetail.logo} alt={jobDetail.company} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  {jobDetail.match}% Match
                </span>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-label-sm">{jobDetail.type}</span>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-label-sm">{jobDetail.salary}</span>
              </div>
              <h2 className="font-headline-lg-mobile text-[22px] font-bold text-on-surface mb-1">{jobDetail.title}</h2>
              <p className="font-title-md text-[16px] text-outline font-medium">{jobDetail.company} • {jobDetail.location}</p>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          {/* Why This Matches (AI Analysis) */}
          <section className="glass-card rounded-[24px] p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-primary-container ai-spark-pulse">auto_awesome</span>
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              Why This Matches
            </h3>
            <div className="space-y-6">
              {/* Skills Analysis */}
              <div className="flex gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
                </div>
                <div>
                  <h4 className="font-body-md text-body-md font-semibold text-on-surface">Skills Alignment</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    {coachAnalysis?.whyMatches || "Your expertise in Figma and Design Systems directly overlaps with their core requirements. Your recent portfolio projects showcase the exact complex dashboard logic they need."}
                  </p>
                </div>
              </div>
              {/* Education Analysis */}
              <div className="flex gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[20px]">school</span>
                </div>
                <div>
                  <h4 className="font-body-md text-body-md font-semibold text-on-surface">Education</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">Your degree meets their preferred qualifications, putting you in the top candidate tier.</p>
                </div>
              </div>
              {/* Domain Experience */}
              <div className="flex gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[20px]">history_edu</span>
                </div>
                <div>
                  <h4 className="font-body-md text-body-md font-semibold text-on-surface">Domain Experience</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">Having worked at tech startups, you possess the Agile-first mindset and fast delivery highlighted in the job description.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Missing Skills */}
          <section className="glass-card rounded-[24px] p-6 border-l-4 border-l-error">
            <h3 className="font-title-md text-title-md text-on-surface mb-4">Potential Gaps</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              MatchUp AI identified a few areas where learning missing skills can boost your acceptance probability by <strong className="text-primary">+{coachAnalysis?.boostPercentage || 22}%</strong>:
            </p>
            <div className="flex flex-col gap-3">
              {(coachAnalysis?.missingSkills || ['Docker', 'CI/CD Pipelines', 'Enterprise Stakeholder Management']).map((skill, i) => (
                <div key={i} className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-xl border border-outline-variant">
                  <span className="material-symbols-outlined text-error text-[18px]">warning</span>
                  <span className="font-label-sm text-label-sm text-on-surface">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* AI Recommendation */}
          <section className="bg-primary-container rounded-[24px] p-8 text-on-primary-container shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[24px]">lightbulb</span>
                <h3 className="font-title-md text-title-md">MatchUp AI Recommendation</h3>
              </div>
              <p className="font-body-lg text-body-lg italic leading-relaxed text-[15px]">
                "{coachAnalysis?.recommendationMessage || jobDetail.aiMatchDetails?.reason || "You are an exceptionally strong fit for this role. Based on current applicant data, your match score is higher than 92% of the pool. We recommend highlighting your core projects in your first interview."}"
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-20">
              <span className="material-symbols-outlined text-[180px]">auto_awesome</span>
            </div>
          </section>

          {/* Apply Card */}
          <div className="glass-card rounded-[24px] p-6">
            <h4 className="font-title-md text-title-md text-on-surface mb-6">Interested?</h4>
            <div className="space-y-4">
              <button 
                onClick={() => {
                  alert("Application submitted!");
                  navigate('/jobs');
                }}
                className="w-full h-14 bg-primary text-on-primary font-title-md text-title-md rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition-all active:scale-95"
              >
                Apply Now
                <span className="material-symbols-outlined">north_east</span>
              </button>
              <button 
                onClick={handleToggleSave}
                className="w-full h-14 bg-transparent border-2 border-primary text-primary font-title-md text-title-md rounded-full flex items-center justify-center gap-2 hover:bg-primary/5 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined" style={isSaved ? { fontVariationSettings: "'FILL' 1" } : {}}>{isSaved ? 'bookmark' : 'bookmark_border'}</span>
                {isSaved ? 'Saved' : 'Save Job'}
              </button>
            </div>
            <div className="mt-8 pt-8 border-t border-outline-variant">
              <h5 className="font-label-sm text-label-sm text-outline uppercase mb-4 tracking-wider">Job Details</h5>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="font-body-md text-body-md text-on-surface-variant">Posted</span>
                  <span className="font-body-md text-body-md text-on-surface font-semibold">{jobDetail.posted}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-body-md text-body-md text-on-surface-variant">Applicants</span>
                  <span className="font-body-md text-body-md text-on-surface font-semibold">{jobDetail.applicants}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-body-md text-body-md text-on-surface-variant">Type</span>
                  <span className="font-body-md text-body-md text-on-surface font-semibold">Full-time</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Insights Card */}
          <div className="glass-card rounded-[24px] p-6">
            <h4 className="font-label-sm text-label-sm text-outline uppercase mb-4 tracking-wider">Company Insights</h4>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-500"></div>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant">3 people from your network work here</p>
            </div>
            <button className="text-primary font-label-sm text-label-sm font-semibold hover:underline">View 1st degree connections</button>
          </div>
        </div>
      </main>
    </div>
  );
}
