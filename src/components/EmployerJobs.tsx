import React from 'react';
import { EmployerJob, EmployerNavTab } from '../types';
import { Briefcase, MapPin, DollarSign, Users, CheckCircle2, ArrowRight, Plus, Sparkles } from 'lucide-react';

interface EmployerJobsProps {
  jobs: EmployerJob[];
  selectedJobId: string;
  onSelectJob: (jobId: string) => void;
  onNavigate: (tab: EmployerNavTab) => void;
}

export const EmployerJobs: React.FC<EmployerJobsProps> = ({
  jobs,
  selectedJobId,
  onSelectJob,
  onNavigate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            Active Postings
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            Open Tech Positions
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage required skill stacks and evaluate applicant pools for each open role.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">{jobs.length} Active Positions</span>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-6">
        {jobs.map((job) => {
          const isSelected = job.id === selectedJobId;

          return (
            <div
              key={job.id}
              className={`bg-white rounded-2xl border p-6 sm:p-8 shadow-xs transition-all ${
                isSelected ? 'border-indigo-400 ring-2 ring-indigo-500/10' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left: Job Info */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-display font-bold text-slate-900">
                      {job.title}
                    </h2>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {job.type}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {job.experienceLevel}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {job.department}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      {job.salaryRange}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {job.description}
                  </p>

                  {/* Required Skills Badges */}
                  <div className="pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Required Skills ({job.requiredSkills.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {job.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Applicants & Action */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                  <div className="text-left lg:text-right">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Users className="w-4 h-4 text-indigo-600" />
                      <span>{job.applicantCount} total applicants</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {job.reviewedCount} candidates evaluated
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectJob(job.id);
                      onNavigate('matches');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>View Candidate Matches</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
