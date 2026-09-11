import React, { useState, useMemo } from 'react';
import { Candidate, EmployerJob } from '../types';
import { calculateCandidateMatch } from '../employerMockData';
import { 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  GraduationCap, 
  Briefcase, 
  ArrowUpDown, 
  Sparkles, 
  ChevronRight,
  Eye,
  SlidersHorizontal,
  Layers,
  Award
} from 'lucide-react';

interface EmployerCandidateMatchesProps {
  candidates: Candidate[];
  jobs: EmployerJob[];
  selectedJobId: string;
  onSelectJob: (jobId: string) => void;
  onViewProfile: (candidate: Candidate) => void;
}

type FilterCategory = 'All candidates' | 'High match' | 'Frontend' | 'Backend' | 'Full Stack';

export const EmployerCandidateMatches: React.FC<EmployerCandidateMatchesProps> = ({
  candidates,
  jobs,
  selectedJobId,
  onSelectJob,
  onViewProfile,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All candidates');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'match-desc' | 'match-asc' | 'name' | 'gpa'>('match-desc');

  const currentJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  // Calculate match data for all candidates against the selected job
  const candidatesWithMatch = useMemo(() => {
    return candidates.map((candidate) => {
      const match = calculateCandidateMatch(candidate, currentJob.requiredSkills);
      return {
        ...candidate,
        matchPercentage: match.matchPercentage,
        matchingSkills: match.matchingSkills,
        missingSkills: match.missingSkills,
      };
    });
  }, [candidates, currentJob]);

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    let result = candidatesWithMatch.filter((c) => {
      // Search
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Filter tabs
      if (activeFilter === 'High match') {
        return c.matchPercentage >= 80;
      }
      if (activeFilter === 'Frontend') {
        return c.primaryDomain === 'Frontend' || c.skills.some((s) => s.category === 'Frontend');
      }
      if (activeFilter === 'Backend') {
        return c.primaryDomain === 'Backend' || c.skills.some((s) => s.category === 'Backend');
      }
      if (activeFilter === 'Full Stack') {
        return c.primaryDomain === 'Full Stack';
      }
      return true;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'match-desc') return b.matchPercentage - a.matchPercentage;
      if (sortBy === 'match-asc') return a.matchPercentage - b.matchPercentage;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'gpa') return parseFloat(b.gpa) - parseFloat(a.gpa);
      return 0;
    });

    return result;
  }, [candidatesWithMatch, activeFilter, searchQuery, sortBy]);

  const filterOptions: FilterCategory[] = [
    'All candidates',
    'High match',
    'Frontend',
    'Backend',
    'Full Stack',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            AI-Powered Candidate Match Ranking
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            Candidate Matches
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            Rank applicants by skill alignment percentage against your role&apos;s exact requirements.
          </p>
        </div>

        {/* Active Role Selector Dropdown */}
        <div className="flex flex-col sm:items-end gap-1">
          <label htmlFor="job-selector" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Active Evaluation Job
          </label>
          <select
            id="job-selector"
            value={currentJob.id}
            onChange={(e) => onSelectJob(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs cursor-pointer"
          >
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title} ({job.experienceLevel})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Role Requirement Bar */}
      <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                Benchmarking Requirements
              </span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-xs text-slate-400">{currentJob.department}</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">{currentJob.title}</h2>
          </div>

          {/* Required Skills Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-1">Required Skills ({currentJob.requiredSkills.length}):</span>
            {currentJob.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-medium text-emerald-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter;
            const count = candidatesWithMatch.filter((c) => {
              if (filter === 'High match') return c.matchPercentage >= 80;
              if (filter === 'Frontend') return c.primaryDomain === 'Frontend' || c.skills.some((s) => s.category === 'Frontend');
              if (filter === 'Backend') return c.primaryDomain === 'Backend' || c.skills.some((s) => s.category === 'Backend');
              if (filter === 'Full Stack') return c.primaryDomain === 'Full Stack';
              return true;
            }).length;

            return (
              <button
                key={filter}
                id={`filter-tab-${filter.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span>{filter}</span>
                <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="match-desc">Highest Match</option>
              <option value="match-asc">Lowest Match</option>
              <option value="name">Name (A-Z)</option>
              <option value="gpa">Highest GPA</option>
            </select>
          </div>
        </div>

      </div>

      {/* Candidate Matches Ranked List */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate, index) => {
          const isTopMatch = candidate.matchPercentage >= 80;

          return (
            <div
              key={candidate.id}
              id={`candidate-card-${candidate.id}`}
              className={`bg-white rounded-2xl border transition-all duration-200 p-6 shadow-xs hover:shadow-md ${
                isTopMatch ? 'border-emerald-300 ring-1 ring-emerald-400/30' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                
                {/* Left: Avatar & Candidate Information */}
                <div className="flex items-start gap-4 flex-1">
                  
                  {/* Rank Badge + Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={candidate.avatarUrl}
                      alt={candidate.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100"
                    />
                    <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-display font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => onViewProfile(candidate)}>
                        {candidate.name}
                      </h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        candidate.status === 'Shortlisted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : candidate.status === 'Interview Scheduled'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {candidate.status}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{candidate.education} &bull; {candidate.university}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        Experience: <strong className="text-slate-700">{candidate.experienceLevel}</strong>
                      </span>
                      <span>&bull;</span>
                      <span>Grad: {candidate.graduationYear}</span>
                      <span>&bull;</span>
                      <span>GPA: <strong className="text-slate-700">{candidate.gpa}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Center: Skill Match Gauge & Breakdown */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full lg:w-auto">
                  
                  {/* Match Score Badge */}
                  <div className="text-center sm:text-right shrink-0 bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl w-full sm:w-auto">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Skill Match
                    </div>
                    <div className={`text-3xl font-display font-extrabold ${
                      candidate.matchPercentage >= 80
                        ? 'text-emerald-600'
                        : candidate.matchPercentage >= 60
                        ? 'text-amber-600'
                        : 'text-slate-600'
                    }`}>
                      {candidate.matchPercentage}%
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {candidate.matchingSkills.length} of {currentJob.requiredSkills.length} skills
                    </div>
                  </div>

                  {/* Matching vs Missing Skills Box */}
                  <div className="w-full sm:w-80 space-y-2 text-xs">
                    {/* Matching */}
                    <div>
                      <span className="font-semibold text-emerald-800 flex items-center gap-1 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Matching Skills ({candidate.matchingSkills.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {candidate.matchingSkills.map((s) => {
                          const candidateSkill = candidate.skills.find(
                            (cs) => cs.name.toLowerCase() === s.toLowerCase()
                          );
                          const isVerified = candidateSkill?.verified;
                          const score = candidateSkill?.score;

                          return (
                            <span
                              key={s}
                              className={`px-2 py-0.5 rounded border text-[11px] font-medium flex items-center gap-1 ${
                                isVerified
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                  : 'bg-amber-50 border-amber-200 text-amber-800'
                              }`}
                              title={isVerified ? `Verified Assessment (${score || 85}%)` : 'Claimed skill'}
                            >
                              {isVerified ? (
                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                              ) : (
                                <span className="w-2 h-2 rounded-full border border-amber-500 shrink-0" />
                              )}
                              <span>{s}</span>
                              {isVerified && score ? (
                                <span className="font-bold text-emerald-700">({score}%)</span>
                              ) : !isVerified ? (
                                <span className="text-[9px] text-amber-700">(Claimed)</span>
                              ) : null}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Missing */}
                    {candidate.missingSkills.length > 0 && (
                      <div>
                        <span className="font-semibold text-amber-800 flex items-center gap-1 mb-1">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          Missing Skills ({candidate.missingSkills.length}):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {candidate.missingSkills.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-medium text-[11px]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: View Profile Button */}
                  <div className="shrink-0 w-full sm:w-auto">
                    <button
                      id={`btn-view-profile-${candidate.id}`}
                      onClick={() => onViewProfile(candidate)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Profile</span>
                    </button>
                  </div>

                </div>

              </div>

              {/* Candidate Bio snippet & Top Project */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
                <p className="line-clamp-1 flex-1 text-slate-500">
                  <span className="font-semibold text-slate-700">Bio:</span> {candidate.bio}
                </p>
                {candidate.projects[0] && (
                  <div className="shrink-0 flex items-center gap-1.5 text-indigo-700 font-medium">
                    <span className="text-slate-400">Featured:</span>
                    <span>{candidate.projects[0].title}</span>
                  </div>
                )}
              </div>

            </div>
          );
        })}

        {filteredCandidates.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <UserCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No candidates match your current filter</h3>
            <p className="text-sm text-slate-500 mt-1">Try resetting the filter or changing your search query.</p>
            <button
              onClick={() => {
                setActiveFilter('All candidates');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
