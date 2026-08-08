import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../services/db';

export default function SignUp() {
  const navigate = useNavigate();
  
  // Field states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+62');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('Male');
  const [domicile, setDomicile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Focused state styles
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [domicileFocused, setDomicileFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    await signUpUser(email, password, {
      full_name: fullName,
      country_code: countryCode,
      phone_number: phoneNumber,
      gender,
      domicile
    });
    navigate('/dashboard');
  };

  const handleGoogleSignUp = async () => {
    const googleEmail = 'user.google@example.com';
    await signUpUser(googleEmail, 'password123', {
      full_name: 'Google User',
      domicile: 'Jakarta, Indonesia'
    });
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 flex flex-col relative pt-20 pb-12 px-margin-mobile">
      {/* Sticky Header Branding */}
      <header className="absolute top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-xl px-5 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          <span className="font-headline-lg-mobile text-[24px] font-bold text-primary">MatchUp AI</span>
        </div>
        <button className="font-label-sm text-label-sm text-primary px-4 py-2 hover:bg-primary-container/10 transition-colors rounded-full">
          Help
        </button>
      </header>

      {/* Atmospheric Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-primary-fixed opacity-20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-tertiary-fixed-dim opacity-15 blur-[100px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md mx-auto my-auto" id="auth-container">
        <div className="auth-card glass-panel rounded-[32px] p-8 border border-outline-variant/40 animate-fade-in">
          {/* Tabs */}
          <div className="flex p-1 bg-surface-container-high rounded-full mb-8">
            <button 
              type="button"
              className="flex-1 py-2 rounded-full font-label-sm text-label-sm transition-all duration-300 text-on-surface-variant hover:bg-surface-container-highest"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button 
              type="button"
              className="flex-1 py-2 rounded-full font-label-sm text-label-sm transition-all duration-300 bg-primary-container text-on-primary-container shadow-sm"
            >
              Register
            </button>
          </div>

          <div className="mb-8" id="auth-header">
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">
              Create your account
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Start matching with top opportunities today.
            </p>
          </div>

          {/* Form Content */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="relative">
              <label className={`absolute -top-2 left-3 px-1 bg-white text-xs font-medium z-10 transition-colors ${fullNameFocused ? 'text-primary' : 'text-outline'}`}>
                Full Name
              </label>
              <input 
                className="w-full h-[56px] px-4 rounded-xl border border-outline hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent" 
                placeholder="e.g. Alex Sterling" 
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onFocus={() => setFullNameFocused(true)}
                onBlur={() => setFullNameFocused(false)}
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className={`absolute -top-2 left-3 px-1 bg-white text-xs font-medium z-10 transition-colors ${emailFocused ? 'text-primary' : 'text-outline'}`}>
                Email Address
              </label>
              <input 
                className="w-full h-[56px] px-4 rounded-xl border border-outline hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent" 
                placeholder="name@company.com" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                required
              />
            </div>

            {/* Phone Number with Country Code Picker */}
            <div className="relative">
              <label className={`absolute -top-2 left-3 px-1 bg-white text-xs font-medium z-10 transition-colors ${phoneFocused ? 'text-primary' : 'text-outline'}`}>
                Phone Number
              </label>
              <div className="flex gap-2 w-full h-[56px]">
                <div className="relative w-24 shrink-0">
                  <select 
                    className="w-full h-full px-3 rounded-xl border border-outline bg-transparent hover:border-primary focus:border-primary outline-none transition-all appearance-none"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    <option value="+62">🇮🇩 +62</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+61">🇦🇺 +61</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-sm">expand_more</span>
                  </div>
                </div>
                <input 
                  className="flex-1 h-full px-4 rounded-xl border border-outline hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent" 
                  placeholder="812 3456 7890" 
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => setPhoneFocused(false)}
                  required
                />
              </div>
            </div>

            {/* Gender Selection */}
            <div className="relative">
              <label className="block text-xs font-medium text-outline mb-1.5 ml-1">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('Male')}
                  className={`h-[48px] rounded-xl border flex items-center justify-center gap-2 font-label-sm transition-all ${gender === 'Male' ? 'border-primary bg-primary-container/10 text-primary font-bold' : 'border-outline text-on-surface-variant hover:border-primary/50'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">male</span>
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('Female')}
                  className={`h-[48px] rounded-xl border flex items-center justify-center gap-2 font-label-sm transition-all ${gender === 'Female' ? 'border-primary bg-primary-container/10 text-primary font-bold' : 'border-outline text-on-surface-variant hover:border-primary/50'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">female</span>
                  Female
                </button>
              </div>
            </div>

            {/* Domicile / City */}
            <div className="relative">
              <label className={`absolute -top-2 left-3 px-1 bg-white text-xs font-medium z-10 transition-colors ${domicileFocused ? 'text-primary' : 'text-outline'}`}>
                Domicile / City
              </label>
              <input 
                className="w-full h-[56px] px-4 rounded-xl border border-outline hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent" 
                placeholder="e.g. Jakarta, Indonesia" 
                type="text"
                value={domicile}
                onChange={(e) => setDomicile(e.target.value)}
                onFocus={() => setDomicileFocused(true)}
                onBlur={() => setDomicileFocused(false)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className={`absolute -top-2 left-3 px-1 bg-white text-xs font-medium z-10 transition-colors ${passwordFocused ? 'text-primary' : 'text-outline'}`}>
                Password
              </label>
              <input 
                className="w-full h-[56px] px-4 rounded-xl border border-outline hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent" 
                placeholder="••••••••" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label className={`absolute -top-2 left-3 px-1 bg-white text-xs font-medium z-10 transition-colors ${confirmPasswordFocused ? 'text-primary' : 'text-outline'}`}>
                Confirm Password
              </label>
              <input 
                className="w-full h-[56px] px-4 rounded-xl border border-outline hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent" 
                placeholder="••••••••" 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
                required
              />
            </div>

            {/* Submit Button */}
            <button className="w-full h-[56px] bg-primary text-on-primary rounded-xl font-title-md text-title-md hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4" type="submit">
              <span>Create Account</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-outline-variant"></div>
            <span className="px-4 font-label-sm text-label-sm text-outline">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-outline-variant"></div>
          </div>

          {/* Google Sign Up */}
          <div className="w-full">
            <button onClick={handleGoogleSignUp} className="w-full h-[56px] flex items-center justify-center gap-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors active:scale-95 duration-150">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="font-label-sm text-label-sm font-semibold">Google Sign Up</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => navigate('/login')} 
                className="text-primary font-bold hover:underline ml-1"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
