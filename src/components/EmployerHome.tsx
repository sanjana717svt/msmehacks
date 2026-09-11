import React from 'react';
import { EmployerNavTab, EmployerProfile, EmployerJob } from '../types';
import { 
  Building2, 
  Users, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Target, 
  Briefcase, 
  GraduationCap, 
  Layers 
} from 'lucide-react';

interface EmployerHomeProps {
  employer: EmployerProfile;
  jobs: EmployerJob[];
  onNavigate: (tab: EmployerNavTab) => void;
  onSelectJob: (jobId: string) => void;
}

export const EmployerHome: React.FC<EmployerHomeProps> = ({
  employer,
  jobs,
  onNavigate,
  onSelectJob,
}) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Verified Early-Career Tech Talent Pipeline</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
              Find skilled candidates and discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-teal-300 to-emerald-400">right talent</span> for your roles.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Stop filtering through keyword-stuffed resumes. CareerPulse benchmarks students and recent grads directly against your job requirements with verified skill proficiency scores and coursework roadmaps.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('matches')}
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
              >
                <span>Browse Candidate Matches</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
              >
                View Employer Dashboard
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Verified Skill Proficiencies</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white">40+</div>
                <div className="text-xs text-slate-400 mt-0.5">Top CS Programs Represented</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white">&lt; 48h</div>
                <div className="text-xs text-slate-400 mt-0.5">Fast-Track Match to Interview</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Pillar Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            How CareerPulse Revolutionizes Campus Recruiting
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Move beyond static transcripts. Evaluate real project deliverables and verified GitHub/coursework competencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Precision Skill Benchmarking</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Define your exact stack (HTML, CSS, JavaScript, React, Node.js, SQL, Git) and let our matching engine calculate exact percentage alignment.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Instant Skill Gap Diagnostics</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              See what skills candidates already excel at and which specific gaps need on-the-job mentorship, saving engineering interview time.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Early-Career University Focus</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Access high-potential undergraduates and master&apos;s students from UC Berkeley, CMU, Stanford, Georgia Tech, and University of Washington.
            </p>
          </div>

        </div>
      </section>

      {/* Featured Sample Job Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Sample Featured Role
              </span>
              <h2 className="text-2xl font-display font-bold text-slate-900 mt-1">
                Junior Full Stack Developer
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Required skills: HTML &bull; CSS &bull; JavaScript &bull; React &bull; Node.js &bull; SQL &bull; Git
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onSelectJob('job-fullstack-jr');
                  onNavigate('matches');
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center gap-2"
              >
                <span>Rank Candidates for this Role</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
