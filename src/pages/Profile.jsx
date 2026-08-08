import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate('/login');
    }
  };

  return (
    <div className="flex-1 flex flex-col relative pb-28">
      {/* Top Header Bar */}
      <header className="bg-surface/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm flex justify-between items-center w-full px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB76RUL1uTVLe5VyCjVzkutfx4CdLsSdHFLUV3-QfUV2eueL-USc-oeaK3hvQWDuL4iBzpGncrpthEzF_U_jttVwhw4BtA5kXHiTaDwJGg75uY1Ni9qC-9_S-LqseWAcQUuikWPh7MtrgH7eC8nEQWxMub3KYbthu_sCho__Bv7JOVEsvfpHxFu56SXiXo1poZoMN1vaHzQqoCbnjnZIIVidQkmkrhUqc3_GK84zvV1hcw-rCn8xziD" alt="Avatar" />
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">MatchUp AI</h1>
        </div>
        <button className="text-on-surface-variant p-2 hover:bg-primary-container/20 transition-colors rounded-full active:scale-95">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-8 w-full">
        {/* Hero Profile Section */}
        <section className="mb-10">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Alex Sterling</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Senior Product Designer &amp; AI Strategist</p>
              
              <div className="flex gap-2 mt-3">
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-label-sm font-label-sm text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span> San Francisco, CA
                </span>
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-label-sm font-label-sm text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span> Open to Work
                </span>
              </div>
            </div>
            
            <button className="h-12 px-6 bg-primary text-on-primary rounded-full font-title-md text-title-md flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-lg w-full">
              <span className="material-symbols-outlined">share</span> Share Profile
            </button>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="space-y-6">
          {/* Career Readiness Score Card */}
          <div className="glass-card rounded-[24px] p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
                    Career Readiness Score <span className="material-symbols-outlined text-primary ai-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">MatchUp AI analysis based on current market trends</p>
                </div>
                <span className="text-display-lg font-display-lg text-primary text-[32px] font-bold">92%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-3 mb-6">
                <div className="career-gradient h-3 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="text-label-sm font-label-sm text-on-surface-variant">Skills Match</p>
                  <p className="text-title-md font-title-md text-primary">High</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="text-label-sm font-label-sm text-on-surface-variant">CV Strength</p>
                  <p className="text-title-md font-title-md text-primary">Optimized</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="text-label-sm font-label-sm text-on-surface-variant">Network</p>
                  <p className="text-title-md font-title-md text-primary">Strong</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="text-label-sm font-label-sm text-on-surface-variant">Market Demand</p>
                  <p className="text-title-md font-title-md text-primary">Rising</p>
                </div>
              </div>
            </div>
          </div>

          {/* CV Management */}
          <div className="glass-card rounded-[24px] p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-title-md text-title-md text-on-surface mb-4">Uploaded CV</h3>
              <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-error-container text-error flex items-center justify-center rounded-lg">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-body-md font-title-md truncate text-[14px]">Alex_Sterling_Product_Designer_2024.pdf</p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant text-[11px]">Updated 2 days ago</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/upload-cv')}
              className="w-full h-12 border border-primary text-primary rounded-full font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-primary/5 transition-all"
            >
              <span className="material-symbols-outlined">upload_file</span> Update Resume
            </button>
          </div>

          {/* Education Section */}
          <div className="glass-card rounded-[24px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-title-md text-title-md text-on-surface">Education</h3>
              <button className="text-primary hover:bg-primary-container/20 p-2 rounded-full transition-colors">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-outline">school</span>
                </div>
                <div>
                  <p className="font-title-md text-title-md text-on-surface leading-tight text-[15px]">Master of Human-Computer Interaction</p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-[13px]">Stanford University</p>
                  <p className="font-label-sm text-label-sm text-outline mt-1 text-[11px]">2018 - 2020</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-outline">school</span>
                </div>
                <div>
                  <p className="font-title-md text-title-md text-on-surface leading-tight text-[15px]">B.S. in Cognitive Science</p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-[13px]">University of California, Berkeley</p>
                  <p className="font-label-sm text-label-sm text-outline mt-1 text-[11px]">2014 - 2018</p>
                </div>
              </div>
            </div>
          </div>

          {/* Applied Jobs */}
          <div className="glass-card rounded-[24px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-title-md text-title-md text-on-surface">Applied Jobs</h3>
              <button className="text-primary font-label-sm text-label-sm hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-outline-variant rounded-2xl hover:border-primary transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_iHfQz6zeSqiKfuDY-9AAd7o8hZK9JeWh0UE5p-xg4BM9Ves9N6mklG6Ly1lAJ6MtiCsuncfDuaxHFloZf6lZD8IlZEsKMgv3ag5J94Sm3b2NmL6us2kHt2ePhANS1h8Vfm0Cq2oBmeg6n_MF5joLw6d-MNkwyZz84hznVYMTAkDnzGCtpdyKzhOjT1DOJtGl839mGef5LIfmzUusiH-_w8gYNzTtt0SYKJQpckHn-exKtFbaBCJc" alt="Logo" />
                  </div>
                  <div>
                    <p className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors text-[14px]">Senior Designer</p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant text-[11px]">Stellar Tech • Applied 3d ago</p>
                  </div>
                </div>
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-label-sm font-label-sm text-on-surface-variant text-[11px]">Under Review</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-outline-variant rounded-2xl hover:border-primary transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF0uFXU6LjyMsW5Te58UCJhnecGfvTrPk4ydB3S4p_A6CSkNi3XWtruAS9sNsi_INE1KBDA1sD2rwwgHJ4DtH8seoSvr1jz9OkmSQrTZ7mYdxGI6xo4zTNhKAOAunH7U3nFSfxIkoYXoDSUOfNgX1O5rVZxUlwelcaVeCQxwQK84Q1t2ra-pvVVAJvqe0Jl9BILv7hU2imBNXvRHqqB8kiSCH-AuloeCLRGAO3gEuR7rUe18ADCwPw" alt="Logo" />
                  </div>
                  <div>
                    <p className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors text-[14px]">UX Architect</p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant text-[11px]">Pulse AI • Applied 1w ago</p>
                  </div>
                </div>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-label-sm font-label-sm text-[11px]">Interviewing</span>
              </div>
            </div>
          </div>

          {/* Settings & Account */}
          <div className="glass-card rounded-[24px] p-6 mb-8">
            <h3 className="font-title-md text-title-md text-on-surface mb-6">Account Settings</h3>
            <div className="space-y-4">
              <button className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-left w-full">
                <div className="w-12 h-12 bg-primary-container/10 text-primary flex items-center justify-center rounded-full shrink-0">
                  <span className="material-symbols-outlined">person_outline</span>
                </div>
                <div>
                  <p className="font-title-md text-title-md text-on-surface text-[15px]">Personal Info</p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant text-[12px]">Edit name, contact, bio</p>
                </div>
              </button>
              
              <button className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-left w-full">
                <div className="w-12 h-12 bg-primary-container/10 text-primary flex items-center justify-center rounded-full shrink-0">
                  <span className="material-symbols-outlined">notifications_active</span>
                </div>
                <div>
                  <p className="font-title-md text-title-md text-on-surface text-[15px]">Job Alerts</p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant text-[12px]">Manage push &amp; email alerts</p>
                </div>
              </button>
              
              <button className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-left w-full">
                <div className="w-12 h-12 bg-primary-container/10 text-primary flex items-center justify-center rounded-full shrink-0">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <div>
                  <p className="font-title-md text-title-md text-on-surface text-[15px]">Security</p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant text-[12px]">Password &amp; Auth</p>
                </div>
              </button>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-4 p-4 rounded-2xl bg-error-container/20 hover:bg-error-container/30 transition-colors text-left w-full"
              >
                <div className="w-12 h-12 bg-error-container text-error flex items-center justify-center rounded-full shrink-0">
                  <span className="material-symbols-outlined">logout</span>
                </div>
                <div>
                  <p className="font-title-md text-title-md text-error text-[15px]">Log Out</p>
                  <p className="text-label-sm font-label-sm text-error/80 text-[12px]">Sign out of your account</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
