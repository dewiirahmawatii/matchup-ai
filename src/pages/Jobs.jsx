import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Jobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Product Designer',
      company: 'Nebula Cloud Systems',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxbBmFaRupELCRS8PACJLUn_ruWppU6Ql60sITI67F1xsr4vwYNyNjCYffWp1x6lcCNuT0rOvAa94SMlsndq_p8GZcyhcgCLhEpRh6WjF8RqwL3UkUIU832WU9MA-h-oO22kCG2_AMvtXwUW0Gug1pFKykjeB6WZMHpDlyWCCbVHQ9h5EhIcR4uzYy302ETAxik8JSOAGUF6atyjZX-Nr_5mi7aZoh2qnqyRE0Dk6afHEaH9dn8aYH',
      match: 98,
      salary: '$160k - $210k',
      location: 'San Francisco, CA',
      bookmarked: false,
    },
    {
      id: 2,
      title: 'Lead UX Architect',
      company: 'Vertex Solutions',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpZCvYkfm36cNGMvfjLGkkwGS_rV_qofDtiIGEjXLfjuBfsp_mDJVhcOxnOjpwTIuZ_4GzzejS7RAm_PRgCozFJVyKBURXkX1NRYi_YevVgvKIclrSur3nVL7JF69yLU5kqhL13xOiXhevRrbCyL3fBo10X9vO9vHYma85XUf0Eqg2m0zpkhmVci2WM53pEBILqKLoiZpO-jCd0h3yU3qOcGCkUGISgaELqarOYuoJLeajG41Z8thy',
      match: 94,
      salary: '$145k - $185k',
      location: 'Remote',
      bookmarked: true,
    },
    {
      id: 3,
      title: 'Interaction Engineer',
      company: 'Flow AI',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9LxAFSmIhOX9YEh-ORzXmf1oEvvce8Sxx6vLMKNmmWA8HU0vrtzhmyvbX6-S-8n3t2UTr_cgCxYyCAn5gvXXSxwpIE7GFaMv-V93YRegAstfgbmTLWB7_iALLWk7zIxZm5eHVadnXpSG8uNw59r8yZbYNm4fSqxrAKb0tclmEc2S6NadmXhXgLAIq5sJwoGZP_a2uKoTcaZ6GSNn0AJQdsCxcqoMFZEKby6UJfIgheQNm78GlE-Uu',
      match: 91,
      salary: '$130k - $175k',
      location: 'Austin, TX',
      bookmarked: false,
    },
    {
      id: 4,
      title: 'Product Strategist',
      company: 'Stellar Data',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGTWLTBBnBk5QIjq2QrHkqnqAYQZAuKyy8R8RC260iorcK66MjNUyZy17dt74hNktJLyZEJ1SoYLCJAsovjFvN0jW39ByCZdHca3Uq58dqzrGidJdHqaEuQ_bAABx77OOLZmciUEbUz_qhBJ0hK9bW4UoDXP95jj02Zrp-QZjzA-_zHQ4kVtXJgAg_0Hxj-oWOXuhs7RsfpefhiE9HTiwaZA1WvkTOcV1QsuUHVs-Ra2pc9ljlgov9',
      match: 89,
      salary: '$155k - $190k',
      location: 'New York, NY',
      bookmarked: false,
    },
    {
      id: 5,
      title: 'UI Engineer',
      company: 'Helix Health',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARXRO46cWWsfHg_Zi9BohKgJwAaCd1nmf2dLRKBXvwyAO-vXvGau-rtghZ4foxxG1w2PW9Ovo1Byh_62JujspoH23_E1jhKnNl52QZx2cIKh0mJ2W-vcR4RSptZOclNTQVD1UmqR_QReQ-m3o1q6SCYM1ABTvbBB42RalxSxjRSi2N5PBAFLME1N8NKvjTyggPJyLFFnchywBJdziOENFY7Zoxqm_KlZMSFJZ9Wb8YTanj8x_-1c27',
      match: 87,
      salary: '$140k - $170k',
      location: 'Remote',
      bookmarked: false,
    },
    {
      id: 6,
      title: 'System Architect',
      company: 'Quantum Labs',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTXOkK8qr46Ln7yYfj36UjAH9_1N1EmEXzaVAomnXLz6KrTFPDdo_3BACOuGMDkKjckL9YF8cMV4Bfesy6SsTxAknmwLBqnAX4OZAr4Qb2-ynmmUAklsayD_DPm6lHCBaUrYm2wnn_ScmGuHDstKJZLCYwsW1N9PBGZ3FvtccSvJC1k6A1QXk-O6jLVQUHqlNQMY1b0y-0Eq-YRLdNnzzj4E7O3ibUe6N9kbkEY57TKHsvzDgBPQe_',
      match: 85,
      salary: '$175k - $225k',
      location: 'Palo Alto, CA',
      bookmarked: false,
    }
  ]);

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === id ? { ...job, bookmarked: !job.bookmarked } : job
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col relative pb-28">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-sm w-full">
        <div className="flex justify-between items-center w-full px-5 py-3 mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant bg-surface-container-highest">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv-VAtIkUND2Xt8D-FzQCamcjGuwgYwry5kGyDToEevV_gxZVjWMoaaQ4XcRQmEDCVtK59gEkitt_qV2KMBGqeByw_M6pwAa_Iwiuls7A7HRvvlrtKlttWFU5O1d4ue70pZVvoWQp0rinvzM1Ya9Ce_-uQe7aWV-W-01FHCq1RyCHS7Kie6-5vxMnuA4Kg1fQbxLTEn6Bp7GN73hwHWPUQA93TGggxKyVzyaHdzgbO9X3-uG3JDBV8" alt="Avatar" />
            </div>
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
            />
          </div>
          {/* Scrollable Chips */}
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            <button className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-sm whitespace-nowrap flex items-center gap-2 shadow-md shrink-0">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              All Filters
            </button>
            <button className="px-5 py-2.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm whitespace-nowrap hover:bg-secondary-container/80 transition-colors shrink-0">Remote</button>
            <button className="px-5 py-2.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm whitespace-nowrap hover:bg-secondary-container/80 transition-colors shrink-0">Design</button>
            <button className="px-5 py-2.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm whitespace-nowrap hover:bg-secondary-container/80 transition-colors shrink-0">Engineering</button>
            <button className="px-5 py-2.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm whitespace-nowrap hover:bg-secondary-container/80 transition-colors shrink-0">Full-time</button>
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
          {jobs.map((job) => (
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
                  <span className="text-outline text-label-sm">{job.location}</span>
                </div>
                <button className="w-full bg-primary-container text-on-primary-container py-3 rounded-xl font-label-sm hover:scale-[1.01] active:scale-95 transition-all">Quick Apply</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
