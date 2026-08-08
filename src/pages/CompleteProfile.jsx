import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Onboarding Form States
  const [fullName, setFullName] = useState('');
  const [currentCity, setCurrentCity] = useState('');
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

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finish onboarding flow -> redirect to upload-cv page
      navigate('/upload-cv');
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
            className="h-full bg-primary-container transition-all duration-500 ease-out" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Onboarding Canvas */}
      <main className="w-full flex-1 px-5 py-12">
        <div className="space-y-12">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <section className="fade-in">
              <div className="space-y-2 mb-8">
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Let's start with the basics</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">Tell us a bit about yourself to begin your intelligent career journey.</p>
              </div>
              <div className="space-y-6">
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-outline mb-1 ml-1 group-focus-within:text-primary transition-colors">Full Name</label>
                  <input 
                    className="w-full h-14 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 text-body-md focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 outline-none transition-all" 
                    placeholder="e.g. Alex Rivera" 
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-outline mb-1 ml-1 group-focus-within:text-primary transition-colors">Current City</label>
                  <input 
                    className="w-full h-14 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 text-body-md focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 outline-none transition-all" 
                    placeholder="e.g. San Francisco, CA" 
                    type="text"
                    value={currentCity}
                    onChange={(e) => setCurrentCity(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-outline-variant rounded-2xl bg-surface-container/30 hover:bg-surface-container/50 transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3">cloud_upload</span>
                  <p className="font-title-md text-title-md text-on-surface">Upload Profile Photo</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 text-center">JPG, PNG or GIF. Max 5MB.</p>
                </div>
              </div>
            </section>
          )}

          {/* Step 2: Education */}
          {currentStep === 2 && (
            <section className="fade-in">
              <div className="space-y-2 mb-8">
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Your Academic Path</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">Education helps MatchUp AI understand your foundational expertise.</p>
              </div>
              <div className="space-y-6">
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-outline mb-1 ml-1 group-focus-within:text-primary transition-colors">Highest Degree</label>
                  <div className="relative">
                    <select 
                      className="w-full h-14 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 text-body-md focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 outline-none transition-all appearance-none"
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
                  <label className="block font-label-sm text-label-sm text-outline mb-1 ml-1 group-focus-within:text-primary transition-colors">Field of Study</label>
                  <input 
                    className="w-full h-14 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 text-body-md focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 outline-none transition-all" 
                    placeholder="e.g. Computer Science" 
                    type="text"
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                  />
                </div>
                <div className="relative group">
                  <label className="block font-label-sm text-label-sm text-outline mb-1 ml-1 group-focus-within:text-primary transition-colors">Institution</label>
                  <input 
                    className="w-full h-14 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 text-body-md focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 outline-none transition-all" 
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
            <section className="fade-in">
              <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2 text-primary ai-pulse">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest">AI Tuning Active</span>
                </div>
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Career Aspirations</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">Choose your focus areas. We'll find jobs that match your passion.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Interest Cards */}
                <label className={`flex flex-col items-center justify-center p-6 bg-surface-container-lowest border rounded-2xl cursor-pointer hover:border-primary-container/40 transition-all group ${interests.engineering ? 'border-primary-container bg-primary-container/5' : 'border-outline-variant'}`}>
                  <input 
                    className="hidden" 
                    type="checkbox" 
                    checked={interests.engineering} 
                    onChange={() => toggleInterest('engineering')}
                  />
                  <span className={`material-symbols-outlined text-3xl mb-2 group-hover:text-primary transition-colors ${interests.engineering ? 'text-primary' : 'text-on-surface-variant'}`}>code</span>
                  <span className="font-title-md text-title-md text-on-surface">Engineering</span>
                </label>

                <label className={`flex flex-col items-center justify-center p-6 bg-surface-container-lowest border rounded-2xl cursor-pointer hover:border-primary-container/40 transition-all group ${interests.design ? 'border-primary-container bg-primary-container/5' : 'border-outline-variant'}`}>
                  <input 
                    className="hidden" 
                    type="checkbox" 
                    checked={interests.design} 
                    onChange={() => toggleInterest('design')}
                  />
                  <span className={`material-symbols-outlined text-3xl mb-2 group-hover:text-primary transition-colors ${interests.design ? 'text-primary' : 'text-on-surface-variant'}`}>brush</span>
                  <span className="font-title-md text-title-md text-on-surface">Design</span>
                </label>

                <label className={`flex flex-col items-center justify-center p-6 bg-surface-container-lowest border rounded-2xl cursor-pointer hover:border-primary-container/40 transition-all group ${interests.marketing ? 'border-primary-container bg-primary-container/5' : 'border-outline-variant'}`}>
                  <input 
                    className="hidden" 
                    type="checkbox" 
                    checked={interests.marketing} 
                    onChange={() => toggleInterest('marketing')}
                  />
                  <span className={`material-symbols-outlined text-3xl mb-2 group-hover:text-primary transition-colors ${interests.marketing ? 'text-primary' : 'text-on-surface-variant'}`}>trending_up</span>
                  <span className="font-title-md text-title-md text-on-surface">Marketing</span>
                </label>

                <label className={`flex flex-col items-center justify-center p-6 bg-surface-container-lowest border rounded-2xl cursor-pointer hover:border-primary-container/40 transition-all group ${interests.management ? 'border-primary-container bg-primary-container/5' : 'border-outline-variant'}`}>
                  <input 
                    className="hidden" 
                    type="checkbox" 
                    checked={interests.management} 
                    onChange={() => toggleInterest('management')}
                  />
                  <span className={`material-symbols-outlined text-3xl mb-2 group-hover:text-primary transition-colors ${interests.management ? 'text-primary' : 'text-on-surface-variant'}`}>groups</span>
                  <span className="font-title-md text-title-md text-on-surface">Management</span>
                </label>
              </div>

              <div className="mt-10 space-y-4">
                <p className="font-label-sm text-label-sm text-outline uppercase tracking-widest">Preferred Workplace</p>
                <div className="flex flex-wrap gap-3">
                  {['Remote Only', 'Hybrid', 'On-site'].map((type) => (
                    <span 
                      key={type}
                      onClick={() => setWorkplace(type)}
                      className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-colors cursor-pointer ${workplace === type ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container hover:bg-primary-container/10'}`}
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
            className={`px-8 h-12 rounded-full border border-outline text-on-surface font-title-md text-title-md hover:bg-surface-container transition-all active:scale-95 ${currentStep === 1 ? 'invisible' : ''}`}
            onClick={handleBack}
          >
            Back
          </button>
          <div className="flex-1"></div>
          <button 
            type="button"
            className={`px-10 h-12 rounded-full font-title-md text-title-md shadow-lg hover:shadow-xl active:scale-95 transition-all ${currentStep === totalSteps ? 'bg-tertiary text-white hover:bg-tertiary/90' : 'bg-primary-container text-on-primary-container'}`}
            onClick={handleNext}
          >
            {currentStep === totalSteps ? 'Finish Setup' : 'Next'}
          </button>
        </div>
      </main>

      {/* Side Atmospheric Elements */}
      <div className="fixed top-1/4 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10"></div>
      <div className="fixed bottom-1/4 -left-20 w-64 h-64 bg-tertiary/5 blur-[100px] rounded-full -z-10"></div>
    </div>
  );
}
