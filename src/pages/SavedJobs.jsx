import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SavedJobs() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  
  const [savedJobs, setSavedJobs] = useState([
    {
      id: 1,
      title: 'Senior Product Designer',
      company: 'Lumina Systems',
      location: 'Remote',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA45XNrAZPqsoHjn7t5utS6TQYzypICLuLYpPtS8xCtinb_wYW7Km13hP4R9eGyV01Ebl_909jIhiU1QZaKbO_3viAD6JIY_jB5lvhcX5yaNRj3jnZ-pFrrJHXNEA4NOlYrQBA7kq8havdc5gTWzR-GfpAeCLrNKdnJEFCCD4HquIc35F3V9vHdzuyaf5MfktLEa4z083TDv2X7FX1baFHfjTW2l6Y3QtQYF6qwxCk_ZAdUWAndP9J8',
      match: 94,
      tags: ['Figma', 'Design Systems', 'SaaS'],
      bookmarked: true,
      category: 'Remote Only',
    },
    {
      id: 2,
      title: 'Frontend Engineer (React)',
      company: 'FinFlow',
      location: 'New York, NY',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7NP5hS04qqVAwB-KFt1osnzn8j75AocPvD1TnNtsLrhvjBrIsEO8NXmHmERTsQZTVu4snmoDUpL4jKA64vRYzG8MuDd2IzfA-l_K4DBfIKC4cM66Nk2Y8rO3Yej-Bf9pOEVdDDvdBGARoL2t1lJBJOBCnezKOpoRbdmwulR81DqSciHyIfQyDnyBS4vMDD_6hN-TPKAEmrgwkg7WdJ6zlKvbsay570bZXY1DjF8spjyRDv8Ri0ezk',
      match: 88,
      tags: ['React', 'TypeScript', 'Tailwind'],
      bookmarked: true,
      category: 'High Match Score',
    }
  ]);

  const toggleBookmark = (id) => {
    setSavedJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === id ? { ...job, bookmarked: !job.bookmarked } : job
      )
    );
  };

  const filteredJobs = savedJobs.filter(job => {
    if (!job.bookmarked) return false;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filter === 'All') return matchesSearch;
    if (filter === 'Remote Only') return matchesSearch && job.location === 'Remote';
    if (filter === 'High Match Score') return matchesSearch && job.match >= 90;
    return matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col relative pb-28">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-surface/85 backdrop-blur-xl shadow-sm px-5 py-3 flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container/20 bg-slate-100">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAITdEjgD3efljtl11r8movClwKRbatemBBQAalECsISOsJw1jHl7KZDiAlYfiXY8IWKVYlpTMtyyixfgHOmLkB5DOE8boPIHWLwkZ5nGLUOxGWrIB3yuW6I2eisHyjlXal6qCy7KufvwU4p6-OGSEPKap0_2W4oCYZ9Mqjb1E92WVYYzxc0y1HWhJebhAGt-T5yjk6FAjhk6WhrDg6RmALqLbPPeJZ6mw6x_NNe_Bl9Xuv0R8ysaSJ" alt="Avatar" />
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">MatchUp AI</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-container/20 transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined text-primary">notifications</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="px-5 py-8 w-full">
        {/* Header & Search */}
        <section className="mb-10">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Saved Opportunities</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Track and manage the roles that caught your eye. MatchUp AI monitors these for deadline changes and application windows.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative flex-grow">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md outline-none" 
                  placeholder="Search saved jobs..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="h-12 w-12 flex items-center justify-center border border-outline-variant rounded-xl bg-surface-container-lowest hover:bg-surface-container transition-colors flex-shrink-0">
                <span className="material-symbols-outlined text-on-surface-variant">tune</span>
              </button>
            </div>
          </div>
        </section>

        {/* Filter Chips */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 hide-scrollbar">
          {['All', 'Expiring Soon', 'High Match Score', 'Remote Only'].map(opt => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-5 py-2 rounded-full font-label-sm text-label-sm shadow-sm whitespace-nowrap transition-colors ${filter === opt ? 'match-score-pill text-on-primary font-bold' : 'bg-secondary-container text-on-secondary-container hover:bg-outline-variant'}`}
            >
              {opt === 'All' ? `All (${savedJobs.filter(j => j.bookmarked).length})` : opt}
            </button>
          ))}
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                onClick={() => navigate(`/job-detail/${job.id}`)}
                className="glass-card p-6 rounded-[24px] hover:shadow-lg transition-all group relative overflow-hidden cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-outline-variant shadow-sm p-2">
                      <img className="w-full h-full object-contain" src={job.logo} alt={job.company} />
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface truncate max-w-[200px]">{job.title}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">{job.company} • {job.location}</p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(job.id);
                    }}
                    className="text-primary hover:scale-110 transition-transform active:scale-95"
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full font-label-sm text-label-sm">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Match Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full match-score-pill" style={{ width: `${job.match}%` }}></div>
                      </div>
                      <span className="font-title-md text-title-md text-primary">{job.match}%</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Application submitted!");
                    }}
                    className="bg-primary hover:bg-primary-container text-on-primary px-6 py-3 rounded-xl font-title-md text-title-md transition-all active:scale-95 flex items-center gap-2 shadow-md"
                  >
                    Apply Now
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-64 h-64 mb-8">
              <img className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHMaeE9qK02Wud0HjAysNvdHNCmSpOMMjYB-ChWW2oZgd9bkziQNrHA_eSqEa3nUCXDbIfxA5Vdo6-tO55UMow_zYgUEAkMAtUrYtEV-uKB-UGKo3N8sgcVrFXKpfWfG9lGhFAdsIZ2GiG-8Kc1DxJITo14JZFmyMDdy1h3cMgTlJb4_UZacRXCWPz4Fpr5y6I_2H_sHKNjRUFJlJgGQVxpZd2vGQMbDN2jDScnVg9YTc7vg0tJMwr" alt="Empty Box" />
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">No saved jobs found</h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-8">Explore the job board to find roles tailored to your unique profile and AI matching score.</p>
            <button 
              onClick={() => navigate('/jobs')}
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-title-md text-title-md shadow-lg active:scale-95 transition-transform"
            >
              Discover Jobs
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
