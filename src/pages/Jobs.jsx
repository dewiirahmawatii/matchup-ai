import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toggleSaveJob, DEFAULT_JOBS } from '../services/db';
import { getMatchedJobs } from '../services/matching';

export default function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(DEFAULT_JOBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    async function loadJobs() {
      const data = await getMatchedJobs('alex.sterling@example.com');
      if (data && data.length > 0) {
        setJobs(data);
      }
    }
    loadJobs();
  }, []);

  const toggleBookmark = async (id, e) => {
    e.stopPropagation();
    const targetJob = jobs.find(j => j.id === id);
    if (!targetJob) return;

    // Optimistic UI update
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === id ? { ...job, bookmarked: !job.bookmarked } : job
      )
    );

    await toggleSaveJob('alex.sterling@example.com', id, targetJob.bookmarked);
  };

  const handleQuickApply = (jobId, e) => {
    e.stopPropagation();
    window.open(`https://example.com/apply-dummy-job-${jobId}`, '_blank');
  };

  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      (job.tags || []).some(t => t.toLowerCase().includes(query));

    if (!matchesSearch) return false;

    if (activeFilter === 'All') return true;
    if (activeFilter === 'Remote') return job.location.toLowerCase().includes('remote') || (job.type || '').toLowerCase().includes('remote');
    if (activeFilter === 'Design') return job.title.toLowerCase().includes('design') || job.title.toLowerCase().includes('ux') || job.title.toLowerCase().includes('ui');
    if (activeFilter === 'Engineering') return job.title.toLowerCase().includes('engineer') || job.title.toLowerCase().includes('architect') || job.title.toLowerCase().includes('developer');
    if (activeFilter === 'Full-time') return (job.type || '').toLowerCase().includes('full-time') || (job.type || '').toLowerCase().includes('fulltime');

    return true;
  });

  return (
    <div className="flex-1 flex flex-col relative pb-28">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-sm w-full">
        <div className="flex justify-between items-center w-full px-5 py-3 mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">MatchUp AI</h1>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-container/20 transition-colors active:scale-95 duration-200 text-primary">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 mt-8 w-full">
        {/* Search & Filters */}
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Explore Opportunities</h2>
            <p className="text-on-surface-variant font-body-md">AI-powered matches tailored to your career path.</p>
          </div>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-outline-variant bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-body-md shadow-sm"
              placeholder="Search job titles, skills, or companies..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Scrollable Chips */}
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            <button
              onClick={() => setActiveFilter('All')}
              className={`px-5 py-2.5 rounded-full font-label-sm whitespace-nowrap flex items-center gap-2 shadow-md shrink-0 transition-colors ${activeFilter === 'All' ? 'bg-primary text-on-primary' : 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80'}`}
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              All Filters
            </button>
            {['Remote', 'Design', 'Engineering', 'Full-time'].map((filterName) => (
              <button
                key={filterName}
                onClick={() => setActiveFilter(activeFilter === filterName ? 'All' : filterName)}
                className={`px-5 py-2.5 rounded-full font-label-sm whitespace-nowrap shrink-0 transition-colors ${activeFilter === filterName ? 'bg-primary text-on-primary shadow-md' : 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80'}`}
              >
                {filterName}
              </button>
            ))}
          </div>
        </section>

        {/* AI Match Indicator */}
        <div className="mb-10 flex items-center gap-4 bg-primary-container/10 p-4 rounded-2xl border border-primary/20">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-on-primary-container shrink-0">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <span className="absolute inset-0 rounded-full animate-ping bg-primary-container opacity-20"></span>
          </div>
          <div>
            <p className="font-title-md text-title-md text-primary">Matches for You</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">AI analyzed 452 new roles today to find your best fits.</p>
          </div>
        </div>

        {/* Vertical Job List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => navigate(`/job-detail/${job.id}`)}
              className="bg-white rounded-[24px] p-6 border border-[#E2E8F0] job-card-shadow transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-outline-variant flex items-center justify-center p-2">
                    <img className="w-full h-full object-contain" src={job.logo} alt={job.company} />
                  </div>
                  <button
                    onClick={(e) => toggleBookmark(job.id, e)}
                    className={`p-2 transition-colors ${job.bookmarked ? 'text-primary' : 'text-outline hover:text-primary'}`}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={job.bookmarked ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      bookmark
                    </span>
                  </button>
                </div>

                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] font-label-sm mb-3">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                    {job.match}% Match
                  </div>
                  <h3 className="font-title-md text-title-md text-on-surface mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-on-surface-variant font-body-md">{job.company}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-outline-variant/30">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-on-surface font-bold font-body-md">{job.salary}</span>
                  <span className="text-outline text-label-sm">{job.location} • {job.type || 'Full-time'}</span>
                </div>
                <button
                  onClick={(e) => handleQuickApply(job.id, e)}
                  className="w-full bg-primary-container text-on-primary-container py-3 rounded-xl font-label-sm hover:scale-[1.01] active:scale-95 transition-all"
                >
                  Quick Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
