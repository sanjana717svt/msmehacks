import React, { useState } from 'react';
import { NavigationTab, StudentProfile } from '../types';
import { CAREER_ROLES, calculateCareerMatch } from '../mockData';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  BookOpen, 
  Award, 
  Target,
  Zap
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: NavigationTab) => void;
  student: StudentProfile;
  onSelectTargetCareer: (careerId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  student,
  onSelectTargetCareer,
}) => {
  const [selectedPreviewRole, setSelectedPreviewRole] = useState(CAREER_ROLES[0].id);

  const activeRole = CAREER_ROLES.find((c) => c.id === selectedPreviewRole) || CAREER_ROLES[0];
  const matchResult = calculateCareerMatch(activeRole, student.skills);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Next-Gen Student Career Intelligence</span>
                <span className="h-1 w-1 rounded-full bg-emerald-600" />
                <span className="text-emerald-700 font-medium">Built for Hackathon Demo</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Turn your college courses & side projects into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600">bulletproof career path.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                CareerPulse analyzes your verified university skills, pinpoints exact hiring gaps for competitive tech roles, and lets you run <span className="font-semibold text-slate-800">What-If simulations</span> to maximize internship offers before graduation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-dashboard-cta"
                  onClick={() => onNavigate('dashboard')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Open Student Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-what-if-cta"
                  onClick={() => onNavigate('what-if')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm shadow-xs transition-all hover:border-slate-400 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Launch What-If Simulator</span>
                </button>
              </div>

              {/* Trust & Persona Indicators */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Interactive Real-Time Engine</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>No Backend Required</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Demo Profile: {student.name} ({student.university})</span>
                </div>
              </div>

            </div>

            {/* Right Column: Live Interactive Preview Widget */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-200/90 space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">Live Match Preview</span>
                  </div>
                  <span className="text-xs text-slate-500">Demo Persona: {student.year.split(' ')[0]}</span>
                </div>

                {/* Role Switcher Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {CAREER_ROLES.map((role) => {
                    const isSelected = role.id === selectedPreviewRole;
                    return (
                      <button
                        key={role.id}
                        onClick={() => setSelectedPreviewRole(role.id)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                          isSelected
                            ? 'bg-slate-900 text-white font-semibold shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {role.title.split(' ')[0]} {role.title.split(' ')[1] || ''}
                      </button>
                    );
                  })}
                </div>

                {/* Preview Match Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-slate-200 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-900">{activeRole.title}</h3>
                      <p className="text-xs text-slate-500">{activeRole.averageSalary}</p>
                    </div>
                    
                    {/* Ring Percentage */}
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-emerald-500 shadow-xs">
                      <span className="text-base font-extrabold text-emerald-700">{matchResult.matchPercentage}%</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Match</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Skills Coverage</span>
                      <span className="font-bold text-slate-800">
                        {matchResult.matchedSkillsCount} of {matchResult.totalRequiredCount} Skills
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${matchResult.matchPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Skills tags preview */}
                  <div className="pt-2 border-t border-slate-200/80 space-y-2">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Target Role Top Requirements:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeRole.requiredSkills.slice(0, 5).map((req) => {
                        const isPossessed = student.skills.some((s) => s.id === req.skillId);
                        return (
                          <span
                            key={req.skillId}
                            className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md font-medium ${
                              isPossessed
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {isPossessed ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <AlertCircle className="w-3 h-3 text-amber-600" />
                            )}
                            {req.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Navigate to GPS for this role */}
                  <button
                    onClick={() => {
                      onSelectTargetCareer(activeRole.id);
                      onNavigate('career-gps');
                    }}
                    className="w-full mt-2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Inspect Career GPS for {activeRole.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Built specifically for college students navigating tech recruiting
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Everything you need to transform university coursework into high-paying internship and new-grad job offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Career GPS */}
          <div 
            onClick={() => onNavigate('career-gps')}
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Career GPS Roadmap
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step milestone curriculum from sophomore coursework to production-ready portfolio capstones with curated free courses.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>View Your Route</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: What-If Simulator */}
          <div 
            onClick={() => onNavigate('what-if')}
            className="group p-6 rounded-2xl bg-gradient-to-br from-amber-50/40 via-white to-white border border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Top Demo Feature
              </span>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                What-If Simulator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Simulate adding skills like PyTorch or Docker. Watch your career match score jump from 65% to 92% in real-time.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-800">
              <span>Test New Skills</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Skills Inventory */}
          <div 
            onClick={() => onNavigate('skills')}
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                Skill Gap Diagnostic
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Categorize your verified proficiencies across Frontend, Backend, AI/ML, and DevOps. Never enter an interview unprepared.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
              <span>Manage Skills</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Career Recommendations */}
          <div 
            onClick={() => onNavigate('career-matches')}
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                Smart Career Matching
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compare starting compensation, YoY demand growth, and day-in-the-life tasks across high-impact tech specializations.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-700">
              <span>Browse 5+ Roles</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* Demo Walkthrough Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-emerald-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Hackathon Live Demo Guide</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              Ready to see the platform in action?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore the student dashboard for Alex Chen, inspect the GPS roadmap for Full-Stack AI Engineer, or try the What-If Simulator to see live match recalculations.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2"
              >
                <span>Launch Alex Chen&apos;s Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('what-if')}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
              >
                Test What-If Sandbox
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
