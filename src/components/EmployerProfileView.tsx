import React from 'react';
import { EmployerProfile } from '../types';
import { Building2, MapPin, Globe, Users, Briefcase, Mail, CheckCircle2, Award, Sparkles, LogOut } from 'lucide-react';

interface EmployerProfileViewProps {
  employer: EmployerProfile;
  onLogout?: () => void;
}

export const EmployerProfileView: React.FC<EmployerProfileViewProps> = ({
  employer,
  onLogout,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 text-3xl font-bold font-display shrink-0">
              NT
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                  {employer.companyName}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Verified Employer
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{employer.tagline}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  {employer.industry}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {employer.location}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {employer.companySize}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Description */}
        <div className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">About the Company</h2>
          <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
            {employer.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Company Tech Stack</h2>
          <div className="flex flex-wrap gap-1.5">
            {employer.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hiring Manager & Campus Talent Team */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg font-display font-bold text-slate-900 mb-4">
          Campus Talent & Recruiting Lead
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-4">
            <img
              src={employer.hiringManagerAvatar}
              alt={employer.hiringManagerName}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20"
            />
            <div>
              <h3 className="font-bold text-slate-900 text-base">{employer.hiringManagerName}</h3>
              <p className="text-xs text-slate-600">{employer.hiringManagerTitle}</p>
              <p className="text-xs text-indigo-600 font-medium mt-0.5">{employer.hiringManagerEmail}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
              Active Recruiter
            </span>
          </div>
        </div>
      </div>

      {/* Account & Session Settings */}
      {onLogout && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Account & Session</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Logged in as <strong className="text-slate-700">{employer.hiringManagerEmail}</strong> &bull; Employer Portal
              </p>
            </div>

            <button
              id="employer-logout-button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors shrink-0 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
