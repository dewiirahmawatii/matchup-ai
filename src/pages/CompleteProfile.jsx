import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserProfile } from '../services/db';

export default function CompleteProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Onboarding Form States
  const [fullName, setFullName] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [highestDegree, setHighestDegree] = useState("Bachelor's Degree");
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [institution, setInstitution] = useState('');
  const [interests, setInterests] = useState({
    engineering: true,
    design: false,
    marketing: false,
    management: false,
  });
  const [workplace, setWorkplace] = useState('Remote Only');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save profile to Supabase database
      await saveUserProfile({
        email: 'alex.sterling@example.com',
        full_name: fullName || 'Alex Sterling',
        domicile: currentCity || 'San Francisco, CA',
        highest_degree: highestDegree,
        field_of_study: fieldOfStudy,
        institution: institution,
        interests: interests,
        workplace: workplace,
        readiness_score: 92
      });
      // Finish onboarding flow -> redirect to Dashboard (Home) as requested
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleInterest = (key) => {
    setInterests(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerBrowse = () => {
    fileInputRef.current.click();
  };

  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="flex-1 flex flex-col relative pb-12">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full flex justify-between items-center px-5 py-3 bg-surface/80 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-headline-lg-mobile text-[24px] font-bold text-primary">MatchUp AI</span>
        </div>
        <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary-container/20 transition-colors">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
      </header>

      {/* Progress Indicator Wrapper */}
      <div className="w-full mt-8 px-5">
        <div className="flex justify-between items-center mb-2">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="font-label-sm text-label-sm text-primary font-bold">
            {percentage}%
          </span>
        </div>
        <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Onboarding Canvas */}
      <main className="w-full flex-grow px-5 py-10 max-w-xl mx-auto flex flex-col justify-between">
        <div className="space-y-10">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <section className="animate-fade-in space-y-6">
              <div className="space-y-2">
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Let's start with the basics</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">Tell us a bit about yourself to begin your intelligent career journey.</p>
              </div>
              
              <div className="space-y-6">
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-outline mb-1.5 ml-1 transition-colors">Full Name</label>
                  <input 
                    className="w-full h-14 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="e.g. Alex Rivera" 
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-outline mb-1.5 ml-1 transition-colors">Current City</label>
                  <input 
                    className="w-full h-14 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="e.g. San Francisco, CA" 
                    type="text"
                    value={currentCity}
                    onChange={(e) => setCurrentCity(e.target.value)}
                  />
                </div>
                
                {/* Upload Photo Dropzone */}
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-outline mb-1.5 ml-1 transition-colors">Profile Photo</label>
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerBrowse}
                    className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden bg-white ${
                      isDragOver ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary'
                    }`}
                  >
                    {photoPreview ? (
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-outline-variant">
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-title-md text-sm text-on-surface">Photo loaded successfully</p>
                          <p className="text-xs text-outline">Tap to change</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-4xl text-outline group-hover:text-primary transition-colors mb-2">cloud_upload</span>
                        <p className="font-title-md text-sm text-on-surface">Upload Profile Photo</p>
                        <p className="font-label-sm text-[11px] text-on-surface-variant mt-1 text-center">JPG, PNG or GIF. Max 5MB.</p>
                      </>
                    )}
                    <input 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*" 
                      className="hidden" 
                      type="file"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Step 2: Education */}
          {currentStep === 2 && (
            <section className="animate-fade-in space-y-6">
              <div className="space-y-2">
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Your Academic Path</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">Education helps MatchUp AI understand your foundational expertise.</p>
              </div>
              <div className="space-y-6">
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-outline mb-1.5 ml-1 transition-colors">Highest Degree</label>
                  <div className="relative">
                    <select 
                      className="w-full h-14 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                      value={highestDegree}
                      onChange={(e) => setHighestDegree(e.target.value)}
                    >
                      <option>Bachelor's Degree</option>
                      <option>Master's Degree</option>
                      <option>PhD</option>
                      <option>Associate's Degree</option>
                      <option>High School</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <span className="material-symbols-outlined text-outline">expand_more</span>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-outline mb-1.5 ml-1 transition-colors">Field of Study</label>
                  <input 
                    className="w-full h-14 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="e.g. Computer Science" 
                    type="text"
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                  />
                </div>
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-outline mb-1.5 ml-1 transition-colors">Institution</label>
                  <input 
                    className="w-full h-14 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="e.g. Stanford University" 
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Step 3: Career Interests */}
          {currentStep === 3 && (
            <section className="animate-fade-in space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary ai-pulse mb-1">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest">AI Tuning Active</span>
                </div>
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Career Aspirations</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">Choose your focus areas. We'll find jobs that match your passion.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Interest Cards */}
                <label className={`flex flex-col items-center justify-center p-6 bg-surface-container-lowest border rounded-2xl cursor-pointer hover:border-primary/40 transition-all group ${interests.engineering ? 'border-primary bg-primary/5' : 'border-outline-variant'}`}>
                  <input 
                    className="hidden" 
                    type="checkbox" 
                    checked={interests.engineering} 
                    onChange={() => toggleInterest('engineering')}
                  />
                  <span className={`material-symbols-outlined text-3xl mb-2 group-hover:text-primary transition-colors ${interests.engineering ? 'text-primary' : 'text-on-surface-variant'}`}>code</span>
                  <span className="font-title-md text-sm text-on-surface font-semibold">Engineering</span>
                </label>

                <label className={`flex flex-col items-center justify-center p-6 bg-surface-container-lowest border rounded-2xl cursor-pointer hover:border-primary/40 transition-all group ${interests.design ? 'border-primary bg-primary/5' : 'border-outline-variant'}`}>
                  <input 
                    className="hidden" 
                    type="checkbox" 
                    checked={interests.design} 
                    onChange={() => toggleInterest('design')}
                  />
                  <span className={`material-symbols-outlined text-3xl mb-2 group-hover:text-primary transition-colors ${interests.design ? 'text-primary' : 'text-on-surface-variant'}`}>brush</span>
                  <span className="font-title-md text-sm text-on-surface font-semibold">Design</span>
                </label>

                <label className={`flex flex-col items-center justify-center p-6 bg-surface-container-lowest border rounded-2xl cursor-pointer hover:border-primary/40 transition-all group ${interests.marketing ? 'border-primary bg-primary/5' : 'border-outline-variant'}`}>
                  <input 
                    className="hidden" 
                    type="checkbox" 
                    checked={interests.marketing} 
                    onChange={() => toggleInterest('marketing')}
                  />
                  <span className={`material-symbols-outlined text-3xl mb-2 group-hover:text-primary transition-colors ${interests.marketing ? 'text-primary' : 'text-on-surface-variant'}`}>trending_up</span>
                  <span className="font-title-md text-sm text-on-surface font-semibold">Marketing</span>
                </label>

                <label className={`flex flex-col items-center justify-center p-6 bg-surface-container-lowest border rounded-2xl cursor-pointer hover:border-primary/40 transition-all group ${interests.management ? 'border-primary bg-primary/5' : 'border-outline-variant'}`}>
                  <input 
                    className="hidden" 
                    type="checkbox" 
                    checked={interests.management} 
                    onChange={() => toggleInterest('management')}
                  />
                  <span className={`material-symbols-outlined text-3xl mb-2 group-hover:text-primary transition-colors ${interests.management ? 'text-primary' : 'text-on-surface-variant'}`}>groups</span>
                  <span className="font-title-md text-sm text-on-surface font-semibold">Management</span>
                </label>
              </div>

              <div className="mt-6 space-y-4">
                <p className="font-label-sm text-label-sm text-outline uppercase tracking-widest">Preferred Workplace</p>
                <div className="flex flex-wrap gap-3">
                  {['Remote Only', 'Hybrid', 'On-site'].map((type) => (
                    <span 
                      key={type}
                      onClick={() => setWorkplace(type)}
                      className={`px-4 py-2 rounded-full font-label-sm text-xs font-bold transition-colors cursor-pointer ${workplace === type ? 'bg-primary text-white shadow-sm' : 'bg-secondary-container text-on-secondary-container hover:bg-primary/10'}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="mt-16 flex items-center justify-between gap-4">
          <button 
            type="button"
            className={`px-8 h-12 rounded-xl border border-outline text-on-surface font-title-md text-sm hover:bg-surface-container transition-all active:scale-95 ${currentStep === 1 ? 'invisible' : ''}`}
            onClick={handleBack}
          >
            Back
          </button>
          <button 
            type="button"
            className="px-10 h-12 bg-primary hover:bg-blue-700 text-white rounded-xl font-title-md text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
            onClick={handleNext}
          >
            <span>{currentStep === totalSteps ? 'Continue' : 'Next'}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </main>

      {/* Side Atmospheric Elements */}
      <div className="fixed top-1/4 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10"></div>
      <div className="fixed bottom-1/4 -left-20 w-64 h-64 bg-tertiary/5 blur-[100px] rounded-full -z-10"></div>
    </div>
  );
}
