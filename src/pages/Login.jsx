import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../services/db';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Input active state styling trackers
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInUser(email, password);
    navigate('/dashboard');
  };

  const handleSocialLogin = async (provider) => {
    const socialEmail = `user.${provider.toLowerCase()}@example.com`;
    await signInUser(socialEmail, 'password123');
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
              className="flex-1 py-2 rounded-full font-label-sm text-label-sm transition-all duration-300 bg-primary-container text-on-primary-container shadow-sm"
            >
              Login
            </button>
            <button 
              type="button"
              className="flex-1 py-2 rounded-full font-label-sm text-label-sm transition-all duration-300 text-on-surface-variant hover:bg-surface-container-highest"
              onClick={() => navigate('/signup')}
            >
              Register
            </button>
          </div>

          <div className="mb-8" id="auth-header">
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">
              Welcome back
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Sign in to continue your career journey.
            </p>
          </div>

          {/* Form Content */}
          <form className="space-y-6" onSubmit={handleSubmit}>
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

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="rounded text-primary focus:ring-primary/20 border-outline" />
                <span className="font-label-sm text-label-sm text-on-surface-variant">Remember me</span>
              </label>
              <a className="font-label-sm text-label-sm text-primary hover:underline" href="#">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <button className="w-full h-[56px] bg-primary text-on-primary rounded-xl font-title-md text-title-md hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2" type="submit">
              <span>Sign In</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-outline-variant"></div>
            <span className="px-4 font-label-sm text-label-sm text-outline">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-outline-variant"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => handleSocialLogin('Google')} className="h-[56px] flex items-center justify-center gap-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors active:scale-95 duration-150">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="font-label-sm text-label-sm font-semibold">Google</span>
            </button>
            <button onClick={() => handleSocialLogin('Apple')} className="h-[56px] flex items-center justify-center gap-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors active:scale-95 duration-150">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.96.95-2.04 1.72-3.23 1.72-1.16 0-1.53-.73-2.91-.73-1.39 0-1.8.72-2.91.73-1.16.01-2.21-.75-3.21-1.74-2.04-2.01-3.59-5.69-1.5-9.33 1.04-1.8 2.89-2.94 4.88-2.97 1.48-.03 2.88 1.02 3.79 1.02.9 0 2.58-1.25 4.36-1.07 1.16.05 2.14.47 2.89 1.19-2.31 1.34-1.92 4.41.43 5.42-.71 1.69-1.63 3.34-2.59 4.76zM12.03 7.25c-.02-2.21 1.83-4.04 4.04-4.25.24 2.45-2.11 4.45-4.04 4.25z"></path>
              </svg>
              <span className="font-label-sm text-label-sm font-semibold">Apple</span>
            </button>
          </div>

          <div className="mt-10 pt-6 border-t border-outline-variant/30 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary ai-pulse">arrow_back_ios_new</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant italic">MatchUp AI will personalize your experience in seconds.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
