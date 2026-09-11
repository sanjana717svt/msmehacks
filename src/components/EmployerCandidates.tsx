import React, { useState, useMemo } from 'react';
import { Candidate, EmployerJob } from '../types';
import { 
  Users, 
  Search, 
  Filter, 
  GraduationCap, 
  Briefcase, 
  Eye, 
  MapPin, 
  Award, 
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Circle
} from 'lucide-react';

interface EmployerCandidatesProps {
  candidates: Candidate[];
  jobs: EmployerJob[];
  onViewProfile: (candidate: Candidate) => void;
}

export const EmployerCandidates: React.FC<EmployerCandidatesProps> = ({
  candidates,
  jobs,
  onViewProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (domainFilter !== 'All' && c.primaryDomain !== domainFilter) {
        return false;
      }

      if (statusFilter !== 'All' && c.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [candidates, searchQuery, domainFilter, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            Candidate Directory
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            All Early-Career Applicants
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Browse student profiles, universities, projects, and verified skills.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
          {filteredCandidates.length} of {candidates.length} candidates shown
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate by name, university (e.g. Berkeley, Stanford), or skill (e.g. React)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-semibold text-slate-500">Domain:</span>
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Domains</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="AI & Data">AI & Data</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-semibold text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Under Review">Under Review</option>
              <option value="New Applicant">New Applicant</option>
            </select>
          </div>
        </div>

      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              
              {/* Header */}
              <div className="flex items-start gap-3.5">
                <img
                  src={candidate.avatarUrl}
                  alt={candidate.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 shrink-0"
                />
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-base">
                    {candidate.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{candidate.title}</p>
                  <span className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    candidate.status === 'Shortlisted'
                      ? 'bg-emerald-100 text-emerald-800'
                      : candidate.status === 'Interview Scheduled'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {candidate.status}
                  </span>
                </div>
              </div>

              {/* Education & Info */}
              <div className="text-xs text-slate-600 space-y-1 pt-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{candidate.university}</span>
                </div>
                <p className="text-slate-500">{candidate.education}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>Grad: {candidate.graduationYear}</span>
                  <span>&bull;</span>
                  <span>GPA: <strong className="text-slate-600">{candidate.gpa}</strong></span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {candidate.bio}
              </p>

              {/* Top Skills Preview with Verification Status */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>Skills ({candidate.skills.length}):</span>
                  <span className="text-emerald-700 font-semibold lowercase first-letter:uppercase">
                    {candidate.skills.filter((s) => s.verified).length} verified
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 5).map((s) => (
                    <span
                      key={s.name}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 ${
                        s.verified
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                      title={s.verified ? `Verified (${s.score || 85}%)` : 'Claimed'}
                    >
                      {s.verified ? (
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                      ) : null}
                      <span>{s.name}</span>
                      {s.verified && s.score ? (
                        <span className="font-bold text-emerald-700">({s.score}%)</span>
                      ) : null}
                    </span>
                  ))}
                  {candidate.skills.length > 5 && (
                    <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-400 text-[10px]">
                      +{candidate.skills.length - 5}
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* View Profile Action */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <button
                onClick={() => onViewProfile(candidate)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Full Profile</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
