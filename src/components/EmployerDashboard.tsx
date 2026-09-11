import React from 'react';
import { Candidate, EmployerJob, EmployerNavTab, EmployerProfile } from '../types';
import { calculateCandidateMatch } from '../employerMockData';
import { 
  Briefcase, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Award, 
  GraduationCap, 
  Eye, 
  Target,
  FileCheck2,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';

interface EmployerDashboardProps {
  employer: EmployerProfile;
  jobs: EmployerJob[];
  candidates: Candidate[];
  selectedJobId: string;
  onSelectJob: (jobId: string) => void;
  onViewProfile: (candidate: Candidate) => void;
  onNavigate: (tab: EmployerNavTab) => void;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  employer,
  jobs,
  candidates,
  selectedJobId,
  onSelectJob,
  onViewProfile,
  onNavigate,
}) => {
  const currentJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  // Calculate candidate matches for the currently active job
  const candidatesWithMatch = candidates.map((candidate) => {
    const match = calculateCandidateMatch(candidate, currentJob.requiredSkills);
    return {
      ...candidate,
      matchPercentage: match.matchPercentage,
      matchingSkills: match.matchingSkills,
      missingSkills: match.missingSkills,
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  const totalApplicants = jobs.reduce((acc, j) => acc + j.applicantCount, 0);
  const totalReviewed = jobs.reduce((acc, j) => acc + j.reviewedCount, 0);
  const topCandidates = candidatesWithMatch.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome & Summary Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">
              <Building2Icon className="w-3.5 h-3.5" />
              <span>{employer.companyName} &bull; Talent Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
              Early-Career Talent Dashboard
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              Discover verified candidates ranked by skill alignment, review technical portfolios, and fast-track interviews for early-career engineering positions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('matches')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-xs transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>View Candidate Matches</span>
            </button>
            <button
              onClick={() => onNavigate('jobs')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
            >
              Manage Jobs ({jobs.length})
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Active Job Openings */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Job Openings</span>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-display font-extrabold text-slate-900">{jobs.length}</span>
            <span className="text-xs text-slate-500 ml-2">Roles published</span>
          </div>
          <p className="text-xs text-indigo-600 mt-2 font-medium">All roles actively accepting applicants</p>
        </div>

        {/* Total Applicants */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Applicants</span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-display font-extrabold text-slate-900">{totalApplicants}</span>
            <span className="text-xs text-emerald-600 font-semibold ml-2">+24 this week</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Across 3 open junior positions</p>
        </div>

        {/* Candidates Reviewed */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Candidates Reviewed</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-display font-extrabold text-slate-900">{totalReviewed}</span>
            <span className="text-xs text-slate-500 ml-2">({Math.round((totalReviewed / totalApplicants) * 100)}% of pool)</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">84 evaluated against skills</p>
        </div>

        {/* Top Skill Match */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Highest Match %</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-display font-extrabold text-emerald-600">
              {candidatesWithMatch[0]?.matchPercentage || 100}%
            </span>
            <span className="text-xs text-slate-500 ml-2">Top candidate</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Perfect match on required stack</p>
        </div>

      </div>

      {/* Active Evaluation Role & Skill Requirements Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Featured Job Benchmark
            </span>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                {currentJob.title}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {currentJob.type}
              </span>
              <span className="text-xs text-slate-400">
                {currentJob.salaryRange}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl">
              {currentJob.description}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <label htmlFor="dashboard-job-select" className="text-xs text-slate-400">Switch Job to Evaluate:</label>
            <select
              id="dashboard-job-select"
              value={currentJob.id}
              onChange={(e) => onSelectJob(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} ({j.applicantCount} applicants)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Skill Requirements Breakdown */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Skill Requirements ({currentJob.requiredSkills.length} Core Skills)
            </span>
            <span className="text-xs text-emerald-400 font-medium">Used for automatic candidate ranking</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {currentJob.requiredSkills.map((skill) => (
              <div
                key={skill}
                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-emerald-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{skill}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Preferred bonus skills:</span>
            {currentJob.preferredSkills.map((ps) => (
              <span key={ps} className="px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 text-[11px]">
                {ps}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top Matching Candidates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900">
              Top Matching Candidates for {currentJob.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Ranked dynamically by verified skill alignment with {currentJob.title} requirements
            </p>
          </div>

          <button
            onClick={() => onNavigate('matches')}
            className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>See All Candidates</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCandidates.map((candidate, idx) => (
            <div
              key={candidate.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative"
            >
              <div className="space-y-4">
                {/* Header with Avatar & Rank */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={candidate.avatarUrl}
                      alt={candidate.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{candidate.name}</h3>
                      <p className="text-xs text-slate-500">{candidate.university}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Match</div>
                    <div className="text-lg font-extrabold text-emerald-600">{candidate.matchPercentage}%</div>
                  </div>
                </div>

                {/* Candidate Education & Level */}
                <div className="text-xs text-slate-600 space-y-1">
                  <p className="font-medium text-slate-700">{candidate.education}</p>
                  <p className="text-slate-500">Grad: {candidate.graduationYear} &bull; GPA: {candidate.gpa}</p>
                </div>

                {/* Matching Skills */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Matching Skills ({candidate.matchingSkills.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {candidate.matchingSkills.slice(0, 4).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-medium border border-emerald-200">
                        {s}
                      </span>
                    ))}
                    {candidate.matchingSkills.length > 4 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{candidate.matchingSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Missing Skills */}
                {candidate.missingSkills.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-amber-800">
                      Missing Gaps ({candidate.missingSkills.length}):
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {candidate.missingSkills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-medium border border-amber-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* View Profile Button */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onViewProfile(candidate)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Profile</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

function Building2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
      <path d="M10 6h4"/>
      <path d="M10 10h4"/>
      <path d="M10 14h4"/>
      <path d="M10 18h4"/>
    </svg>
  );
}
