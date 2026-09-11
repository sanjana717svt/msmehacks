import React, { useState } from 'react';
import { 
  Compass, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Sparkles, 
  GraduationCap, 
  Building2,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

interface AuthScreenProps {
  role: 'job-seeker' | 'employer';
  onBackToRoleSelection: () => void;
  onAuthenticate: (userData?: { name: string; email: string; isNewUser?: boolean }) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ 
  role, 
  onBackToRoleSelection, 
  onAuthenticate 
}) => {
  const isJobSeeker = role === 'job-seeker';
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Login form state - completely empty by default
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');

  // Sign Up form state - completely empty by default
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupError, setSignupError] = useState('');

  // Validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setForgotPasswordMessage('');

    if (!loginEmail.trim()) {
      setLoginError('Please enter your email address.');
      return;
    }

    if (!emailRegex.test(loginEmail.trim())) {
      setLoginError('Please enter a valid email address.');
      return;
    }

    if (!loginPassword) {
      setLoginError('Please enter your password.');
      return;
    }

    // Frontend-only authentication for prototype
    const fallbackName = isJobSeeker ? 'Alex Chen' : 'Nexus Hiring Team';
    onAuthenticate({
      name: fallbackName,
      email: loginEmail.trim(),
      isNewUser: false
    });
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!signupName.trim()) {
      setSignupError(isJobSeeker ? 'Please enter your full name.' : 'Please enter your name or company name.');
      return;
    }

    if (!signupEmail.trim()) {
      setSignupError('Please enter your email address.');
      return;
    }

    if (!emailRegex.test(signupEmail.trim())) {
      setSignupError('Please enter a valid email address.');
      return;
    }

    if (!signupPassword) {
      setSignupError('Please choose a password.');
      return;
    }

    if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters long.');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Passwords do not match. Please re-check.');
      return;
    }

    // Frontend-only registration for prototype
    onAuthenticate({
      name: signupName.trim(),
      email: signupEmail.trim(),
      isNewUser: true
    });
  };

  const handleForgotPassword = () => {
    if (!loginEmail.trim()) {
      setForgotPasswordMessage(
        'Please enter your email address above to receive reset instructions. For this prototype, any password will log you in!'
      );
    } else {
      setForgotPasswordMessage(
        `Password reset link simulated for ${loginEmail.trim()}. In this prototype demo, you can log in directly!`
      );
    }
  };

  const accentColor = isJobSeeker ? 'emerald' : 'indigo';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-slate-200">
      
      {/* Top Demo Notification Strip */}
      <div className="bg-slate-950 text-slate-300 py-2 px-4 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isJobSeeker ? 'bg-emerald-400' : 'bg-indigo-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isJobSeeker ? 'bg-emerald-500' : 'bg-indigo-500'}`}></span>
            </span>
            <span className="font-semibold text-white">
              CareerPulse &bull; {isJobSeeker ? 'Job Seeker Portal' : 'Employer Portal'}
            </span>
            <span className="text-slate-500 hidden sm:inline">&bull;</span>
            <span className="text-slate-400 hidden sm:inline">Frontend prototype authentication</span>
          </div>

          <button
            type="button"
            onClick={onBackToRoleSelection}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change role</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          
          {/* Card Wrapper */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-7 sm:p-9 space-y-6">
            
            {/* Back link to Role Selection */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                id="back-to-role-selection-btn"
                onClick={onBackToRoleSelection}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Role Selection</span>
              </button>

              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                isJobSeeker 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}>
                {isJobSeeker ? 'Job Seeker' : 'Employer'}
              </span>
            </div>

            {/* Platform Branding & Role Header */}
            <div className="text-center space-y-2">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl text-white shadow-lg mb-1 ${
                isJobSeeker 
                  ? 'bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 shadow-emerald-600/20' 
                  : 'bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-600 shadow-indigo-600/20'
              }`}>
                {isJobSeeker ? (
                  <GraduationCap className="w-7 h-7" />
                ) : (
                  <Building2 className="w-7 h-7" />
                )}
              </div>
              
              <div className="flex items-center justify-center gap-1.5">
                <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900">
                  {isJobSeeker ? 'Job Seeker' : 'Employer'} {authMode === 'login' ? 'Log In' : 'Sign Up'}
                </span>
              </div>

              {/* Role-specific Subtitle */}
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                {isJobSeeker
                  ? authMode === 'login'
                    ? 'Access your skill assessments, turn-by-turn Career GPS, and matched jobs.'
                    : 'Create your account to discover career paths and verify your technical skills.'
                  : authMode === 'login'
                    ? 'Sign in to review candidate pipelines and verified skill matches.'
                    : 'Create your employer account to find verified technical candidates.'}
              </p>
            </div>

            {/* Mode Toggle Tabs (Log In / Sign Up) */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
              <button
                type="button"
                id="auth-tab-login"
                onClick={() => {
                  setAuthMode('login');
                  setLoginError('');
                  setForgotPasswordMessage('');
                }}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                id="auth-tab-signup"
                onClick={() => {
                  setAuthMode('signup');
                  setSignupError('');
                }}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* ========================================================= */}
            {/* LOGIN FORM */}
            {/* ========================================================= */}
            {authMode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* Error Banner */}
                {loginError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{loginError}</span>
                  </div>
                )}

                {/* Forgot Password Note */}
                {forgotPasswordMessage && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                    <span>{forgotPasswordMessage}</span>
                  </div>
                )}

                {/* Email Input */}
                <div className="space-y-1.5 text-left">
                  <label 
                    htmlFor="login-email" 
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                  >
                    {isJobSeeker ? 'Email Address' : 'Work Email'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder={isJobSeeker ? "Enter your student/personal email" : "name@company.com"}
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        isJobSeeker ? 'focus:ring-emerald-500' : 'focus:ring-indigo-500'
                      } focus:bg-white transition-all`}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <label 
                      htmlFor="login-password" 
                      className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className={`text-xs font-semibold hover:underline cursor-pointer ${
                        isJobSeeker ? 'text-emerald-600 hover:text-emerald-700' : 'text-indigo-600 hover:text-indigo-700'
                      }`}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        isJobSeeker ? 'focus:ring-emerald-500' : 'focus:ring-indigo-500'
                      } focus:bg-white transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Log In Button */}
                <button
                  type="submit"
                  id="login-submit-button"
                  className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:gap-3 cursor-pointer ${
                    isJobSeeker 
                      ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800' 
                      : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
                  }`}
                >
                  <span>Log In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Switch to Sign Up */}
                <div className="text-center pt-2 text-xs text-slate-600">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setSignupError('');
                    }}
                    className={`font-bold hover:underline cursor-pointer ${
                      isJobSeeker ? 'text-emerald-600 hover:text-emerald-700' : 'text-indigo-600 hover:text-indigo-700'
                    }`}
                  >
                    Sign up
                  </button>
                </div>
              </form>
            )}

            {/* ========================================================= */}
            {/* SIGN UP FORM */}
            {/* ========================================================= */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                
                {/* Heading */}
                <div className="text-left pb-1">
                  <h2 className="text-base font-bold text-slate-900">
                    {isJobSeeker ? 'Create your Student / Candidate Profile' : 'Create your Employer Account'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isJobSeeker 
                      ? 'Start verifying your skills and tracking job matches.'
                      : 'Post roles and discover candidates with verified skill proficiencies.'}
                  </p>
                </div>

                {/* Error Banner */}
                {signupError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{signupError}</span>
                  </div>
                )}

                {/* Full Name / Organization */}
                <div className="space-y-1.5 text-left">
                  <label 
                    htmlFor="signup-fullname" 
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                  >
                    {isJobSeeker ? 'Full Name' : 'Company or Recruiter Name'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="signup-fullname"
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder={isJobSeeker ? "e.g. Alex Chen" : "e.g. NexusTech Labs"}
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        isJobSeeker ? 'focus:ring-emerald-500' : 'focus:ring-indigo-500'
                      } focus:bg-white transition-all`}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 text-left">
                  <label 
                    htmlFor="signup-email" 
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                  >
                    {isJobSeeker ? 'Email Address' : 'Work Email Address'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="signup-email"
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder={isJobSeeker ? "e.g. alex@university.edu" : "e.g. hiring@company.com"}
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        isJobSeeker ? 'focus:ring-emerald-500' : 'focus:ring-indigo-500'
                      } focus:bg-white transition-all`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5 text-left">
                  <label 
                    htmlFor="signup-password" 
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="signup-password"
                      type={showSignupPassword ? 'text' : 'password'}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Create a password (min 6 characters)"
                      className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        isJobSeeker ? 'focus:ring-emerald-500' : 'focus:ring-indigo-500'
                      } focus:bg-white transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5 text-left">
                  <label 
                    htmlFor="signup-confirm-password" 
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="signup-confirm-password"
                      type={showSignupPassword ? 'text' : 'password'}
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        isJobSeeker ? 'focus:ring-emerald-500' : 'focus:ring-indigo-500'
                      } focus:bg-white transition-all`}
                    />
                  </div>
                </div>

                {/* Create Account Button */}
                <button
                  type="submit"
                  id="signup-submit-button"
                  className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:gap-3 cursor-pointer ${
                    isJobSeeker 
                      ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800' 
                      : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
                  }`}
                >
                  <span>{isJobSeeker ? 'Create Job Seeker Account' : 'Create Employer Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Switch to Log In */}
                <div className="text-center pt-2 text-xs text-slate-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setLoginError('');
                    }}
                    className={`font-bold hover:underline cursor-pointer ${
                      isJobSeeker ? 'text-emerald-600 hover:text-emerald-700' : 'text-indigo-600 hover:text-indigo-700'
                    }`}
                  >
                    Log in
                  </button>
                </div>
              </form>
            )}

            {/* Prototype Demo Hint Callout */}
            <div className="pt-2 border-t border-slate-100 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-medium text-slate-600">
                <ShieldCheck className={`w-3.5 h-3.5 ${isJobSeeker ? 'text-emerald-600' : 'text-indigo-600'}`} />
                <span>Prototype demo &bull; Frontend-only simulated authentication</span>
              </div>
            </div>

          </div>

          {/* Bottom Footer Note */}
          <div className="mt-6 text-center text-xs text-slate-400">
            CareerPulse Hackathon Edition &bull; College-to-Career Navigation
          </div>

        </div>
      </main>

    </div>
  );
};
