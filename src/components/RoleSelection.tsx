import React from 'react';
import { Compass, Briefcase, GraduationCap, Users, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Target, ChevronRight } from 'lucide-react';
import { UserRole } from '../types';

interface RoleSelectionProps {
  onSelectRole: (role: 'job-seeker' | 'employer') => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Banner Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                  Career<span className="text-emerald-600">Pulse</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Platform
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Verified Skills & Career Matchmaking</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Hackathon Demo Edition</span>
          </div>
        </div>
      </header>

      {/* Main Role Selection Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">
          
          {/* Main Question Heading */}
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Role Selection
            </div>
            <h1 
              id="role-selection-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 tracking-tight"
            >
              Who are you?
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Select whether you are a job seeker building verified skills or an employer seeking verified technical talent.
            </p>
          </div>

          {/* Two Large Clickable Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* CARD 1: JOB SEEKER */}
            <div
              id="role-card-job-seeker"
              onClick={() => onSelectRole('job-seeker')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectRole('job-seeker');
                }
              }}
              className="group relative flex flex-col bg-white rounded-2xl border-2 border-slate-200 hover:border-emerald-500 p-7 sm:p-8 cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/10 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 text-left"
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200 shadow-sm">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  For Students & Grads
                </span>
              </div>

              {/* Title & Core Copy */}
              <h2 className="text-2xl font-display font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                JOB SEEKER
              </h2>

              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                Build your skills, discover career paths, and find opportunities that match your potential.
              </p>

              {/* Feature Highlights */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-2.5 flex-1">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Turn-by-turn <strong>Career GPS</strong> & coursework roadmaps</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Interactive <strong>What-If Simulator</strong> for fast upskilling</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real-time match scoring against top junior tech roles</span>
                </div>
              </div>

              {/* CTA Button / Action */}
              <div className="mt-8 pt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  Career roadmap & skill verification
                </span>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm group-hover:bg-emerald-700 shadow-sm transition-colors">
                  <span>Continue as Job Seeker</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* CARD 2: EMPLOYER */}
            <div
              id="role-card-employer"
              onClick={() => onSelectRole('employer')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectRole('employer');
                }
              }}
              className="group relative flex flex-col bg-white rounded-2xl border-2 border-slate-200 hover:border-indigo-500 p-7 sm:p-8 cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/10 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 text-left"
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200 shadow-sm">
                  <Briefcase className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                  For Recruiters & Teams
                </span>
              </div>

              {/* Title & Core Copy */}
              <h2 className="text-2xl font-display font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                EMPLOYER
              </h2>

              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                Find verified candidates whose skills match your job requirements.
              </p>

              {/* Feature Highlights */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-2.5 flex-1">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Rank candidates by <strong>verified skill match %</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Identify exact matching skills and missing skill gaps</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Browse candidate profiles, repositories, and coursework</span>
                </div>
              </div>

              {/* CTA Button / Action */}
              <div className="mt-8 pt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  Candidate pipeline & skill matching
                </span>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm group-hover:bg-indigo-700 shadow-sm transition-colors">
                  <span>Continue as Employer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom helper note */}
          <div className="mt-10 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Select your path to launch your tailored CareerPulse workspace.</span>
          </div>

        </div>
      </main>

      {/* Simple Clean Footer */}
      <footer className="py-5 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        <p>CareerPulse &bull; AI Studio Hackathon Edition &bull; 100% Client-Side Interactive</p>
      </footer>

    </div>
  );
};
