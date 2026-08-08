import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, saveUserProfile, deleteUserProfile, getUserProfileStats, getAppliedJobs } from '../services/db';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    full_name: 'Alex Sterling',
    domicile: 'San Francisco, CA',
    readiness_score: 92,
    avatar_url: '',
    phone_number: '',
    highest_degree: 'Master of Human-Computer Interaction',
    institution: 'Stanford University'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });
  const [stats, setStats] = useState({
    cvCount: 1,
    applyCount: 0,
    bookmarkCount: 0
  });

  const [appliedJobsList, setAppliedJobsList] = useState([]);
  const [profileTitle, setProfileTitle] = useState('Senior Product Designer & AI Strategist');
  const [cvFilename, setCvFilename] = useState('Alex_Sterling_Product_Designer_2024.pdf');
  const [cvUpdatedTime, setCvUpdatedTime] = useState('Updated 2 days ago');

  useEffect(() => {
    async function loadProfile() {
      const activeEmail = localStorage.getItem('currentUserEmail') || 'alex.sterling@example.com';
      const data = await getUserProfile(activeEmail);
      if (data) {
        setProfile(data);
        setEditForm(data);
      }
      const s = await getUserProfileStats(activeEmail);
      if (s) {
        setStats(s);
      }

      const appliedData = await getAppliedJobs(activeEmail);
      if (Array.isArray(appliedData) && appliedData.length > 0) {
        setAppliedJobsList(appliedData);
      }

      const filename = localStorage.getItem('cv_filename');
      if (filename) {
        setCvFilename(filename);
        setCvUpdatedTime('Updated just now');
      } else {
        const localCVs = JSON.parse(localStorage.getItem('user_cvs_local_alex.sterling@example.com') || '[]');
        if (localCVs.length > 0) {
          setCvFilename(localCVs[localCVs.length - 1]);
          setCvUpdatedTime('Updated recently');
        }
      }

      const savedTitle = localStorage.getItem('cv_target_role');
      if (savedTitle) {
        setProfileTitle(savedTitle);
      }
    }
    loadProfile();
  }, []);

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const newAvatarUrl = reader.result;
        const updated = { ...profile, avatar_url: newAvatarUrl };
        setProfile(updated);
        await saveUserProfile(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModalAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, avatar_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const updated = { ...profile, ...editForm };
    setProfile(updated);
    await saveUserProfile(updated);
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to PERMANENTLY delete your profile and account data? This action cannot be undone.")) {
      await deleteUserProfile(profile.email);
      navigate('/signup');
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('currentUserEmail');
      navigate('/login');
    }
  };

  return (
    <div className="flex-1 flex flex-col relative pb-28">
      {/* Top Header Bar */}
      <header className="bg-surface/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm flex justify-between items-center w-full px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">MatchUp AI</h1>
        </div>
        <button className="text-on-surface-variant p-2 hover:bg-primary-container/20 transition-colors rounded-full active:scale-95">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-8 w-full">
        {/* Hero Profile Section with Avatar & Edit */}
        <section className="mb-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-5">
              {/* Profile Avatar Upload */}
              <div className="relative group w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary-container bg-surface-container flex items-center justify-center shrink-0 shadow-md">
                {profile.avatar_url ? (
                  <img className="w-full h-full object-cover" src={profile.avatar_url} alt={profile.full_name} />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-primary font-bold">account_circle</span>
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-[10px] font-bold">
                  <span className="material-symbols-outlined text-base">photo_camera</span>
                  <span>Upload</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </label>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1 truncate">{profile.full_name || 'Alex Sterling'}</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant truncate">{profileTitle}</p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-surface-container-high px-3 py-1 rounded-full text-label-sm font-label-sm text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">location_on</span> {profile.domicile || 'San Francisco, CA'}
                  </span>
                  <span className="bg-surface-container-high px-3 py-1 rounded-full text-label-sm font-label-sm text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span> Open to Work
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => { setEditForm({ ...profile }); setIsEditing(true); }}
                className="flex-1 h-12 px-6 bg-primary text-on-primary rounded-full font-title-md text-title-md flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-md"
              >
                <span className="material-symbols-outlined">edit</span> Edit Profile
              </button>
              <button className="h-12 px-5 border border-outline text-on-surface rounded-full font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-surface-container transition-all active:scale-95">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
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
                  <p className="text-label-sm font-label-sm text-on-surface-variant">Jumlah CV</p>
                  <p className="text-title-md font-title-md text-primary">{stats.cvCount}</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="text-label-sm font-label-sm text-on-surface-variant">Jumlah Apply</p>
                  <p className="text-title-md font-title-md text-primary">{stats.applyCount}</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="text-label-sm font-label-sm text-on-surface-variant">Jumlah Bookmark</p>
                  <p className="text-title-md font-title-md text-primary">{stats.bookmarkCount}</p>
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
                  <p className="text-body-md font-title-md truncate text-[14px]">{cvFilename}</p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant text-[11px]">{cvUpdatedTime}</p>
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
              <button 
                onClick={() => { setEditForm({ ...profile }); setIsEditing(true); }}
                className="text-primary hover:bg-primary-container/20 p-2 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-outline">school</span>
                </div>
                <div>
                  <p className="font-title-md text-title-md text-on-surface leading-tight text-[15px]">{profile.highest_degree || "Master of Human-Computer Interaction"}</p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-[13px]">{profile.institution || "Stanford University"}</p>
                  <p className="font-label-sm text-label-sm text-outline mt-1 text-[11px]">2020 - 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Applied Jobs */}
          <div className="glass-card rounded-[24px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-title-md text-title-md text-on-surface">Applied Jobs</h3>
              <button onClick={() => navigate('/jobs')} className="text-primary font-label-sm text-label-sm hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {appliedJobsList.length > 0 ? (
                appliedJobsList.map((app) => {
                  const job = app.jobs || {};
                  return (
                    <div 
                      key={app.id || app.job_id}
                      onClick={() => navigate(`/job-detail/${app.job_id}`)}
                      className="flex items-center justify-between p-3 border border-outline-variant rounded-2xl hover:border-primary transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 flex items-center justify-center text-primary font-bold">
                          {job.logo ? (
                            <img className="w-full h-full object-contain" src={job.logo} alt={job.company} />
                          ) : (
                            <span className="material-symbols-outlined">work</span>
                          )}
                        </div>
                        <div>
                          <p className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors text-[14px]">
                            {job.title || 'Applied Position'}
                          </p>
                          <p className="text-label-sm font-label-sm text-on-surface-variant text-[11px]">
                            {job.company || 'Company'} • Applied {new Date(app.applied_at || Date.now()).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className="bg-surface-container-high px-3 py-1 rounded-full text-label-sm font-label-sm text-on-surface-variant text-[11px]">
                        {app.status || 'Under Review'}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-between p-3 border border-outline-variant rounded-2xl hover:border-primary transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 flex items-center justify-center text-primary font-bold">
                      <span className="material-symbols-outlined">work</span>
                    </div>
                    <div>
                      <p className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors text-[14px]">Senior Designer</p>
                      <p className="text-label-sm font-label-sm text-on-surface-variant text-[11px]">Stellar Tech • Applied 3d ago</p>
                    </div>
                  </div>
                  <span className="bg-surface-container-high px-3 py-1 rounded-full text-label-sm font-label-sm text-on-surface-variant text-[11px]">Under Review</span>
                </div>
              )}
            </div>
          </div>

          {/* Settings & Account */}
          <div className="glass-card rounded-[24px] p-6 mb-8">
            <h3 className="font-title-md text-title-md text-on-surface mb-6">Account Settings</h3>
            <div className="space-y-4">
              <button 
                onClick={() => { setEditForm({ ...profile }); setIsEditing(true); }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-left w-full"
              >
                <div className="w-12 h-12 bg-primary-container/10 text-primary flex items-center justify-center rounded-full shrink-0">
                  <span className="material-symbols-outlined">person_outline</span>
                </div>
                <div>
                  <p className="font-title-md text-title-md text-on-surface text-[15px]">Personal Info</p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant text-[12px]">Edit name, photo, domicile, education</p>
                </div>
              </button>
              
              <button 
                onClick={handleDeleteAccount}
                className="flex items-center gap-4 p-4 rounded-2xl bg-error-container/10 hover:bg-error-container/20 border border-error/30 transition-colors text-left w-full"
              >
                <div className="w-12 h-12 bg-error-container text-error flex items-center justify-center rounded-full shrink-0">
                  <span className="material-symbols-outlined">delete_forever</span>
                </div>
                <div>
                  <p className="font-title-md text-title-md text-error text-[15px]">Delete Profile Data</p>
                  <p className="text-label-sm font-label-sm text-error/80 text-[12px]">Permanently remove user data and account</p>
                </div>
              </button>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-left w-full"
              >
                <div className="w-12 h-12 bg-surface-container-highest text-on-surface flex items-center justify-center rounded-full shrink-0">
                  <span className="material-symbols-outlined">logout</span>
                </div>
                <div>
                  <p className="font-title-md text-title-md text-on-surface text-[15px]">Log Out</p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant text-[12px]">Sign out of your account</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-[32px] p-6 w-full max-w-lg shadow-2xl border border-outline-variant my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-lg-mobile text-[20px] font-bold text-on-surface">Edit Profile Data</h3>
              <button 
                onClick={() => setIsEditing(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Profile Photo Field inside Edit Modal */}
              <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/60 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-surface-container flex items-center justify-center border border-outline-variant shrink-0 shadow-sm">
                  {editForm.avatar_url ? (
                    <img className="w-full h-full object-cover" src={editForm.avatar_url} alt="Preview" />
                  ) : (
                    <span className="material-symbols-outlined text-3xl text-outline">account_circle</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-bold text-on-surface mb-1">Foto Profil / Avatar</label>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="px-3 py-1.5 bg-primary text-on-primary text-xs font-bold rounded-lg cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">upload</span>
                      <span>Pilih Foto</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleModalAvatarUpload} />
                    </label>
                    {editForm.avatar_url && (
                      <button
                        type="button"
                        onClick={() => setEditForm({ ...editForm, avatar_url: '' })}
                        className="px-2.5 py-1.5 bg-error-container text-error text-xs font-bold rounded-lg hover:opacity-90"
                      >
                        Hapus Foto
                      </button>
                    )}
                  </div>
                  <input 
                    type="url"
                    className="w-full px-3 py-1.5 rounded-lg border border-outline-variant text-xs outline-none focus:border-primary bg-white"
                    placeholder="atau tempel URL foto..."
                    value={editForm.avatar_url || ''}
                    onChange={(e) => setEditForm({ ...editForm, avatar_url: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline mb-1">Full Name</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none text-body-md"
                  value={editForm.full_name || ''}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline mb-1">Domicile / City</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none text-body-md"
                  value={editForm.domicile || ''}
                  onChange={(e) => setEditForm({ ...editForm, domicile: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline mb-1">Phone Number</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none text-body-md"
                  value={editForm.phone_number || ''}
                  onChange={(e) => setEditForm({ ...editForm, phone_number: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline mb-1">Highest Degree / Education</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none text-body-md"
                  value={editForm.highest_degree || ''}
                  onChange={(e) => setEditForm({ ...editForm, highest_degree: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline mb-1">Institution / University</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none text-body-md"
                  value={editForm.institution || ''}
                  onChange={(e) => setEditForm({ ...editForm, institution: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 border border-outline-variant text-on-surface rounded-xl font-label-sm font-bold hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-primary text-on-primary rounded-xl font-label-sm font-bold hover:opacity-90 shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
