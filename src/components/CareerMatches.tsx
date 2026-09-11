import React, { useState } from 'react';
import { CareerRole, NavigationTab, StudentProfile } from '../types';
import { calculateCareerMatch } from '../mockData';
import { 
  Briefcase, 
  Search, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Building2, 
  Sparkles, 
  Compass, 
  SlidersHorizontal,
  X,
  ShieldCheck,
  Circle,
  XCircle,
  Info
} from 'lucide-react';

interface CareerMatchesProps {
  student: StudentProfile;
  targetCareerId: string;
  allCareers: CareerRole[];
  onSelectTargetCareer: (careerId: string) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const CareerMatches: React.FC<CareerMatchesProps> = ({
  student,
  targetCareerId,
  allCareers,
  onSelectTargetCareer,
  onNavigate,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'match' | 'salary' | 'growth'>('match');
  const [selectedDetailRole, setSelectedDetailRole] = useState<CareerRole | null>(null);

  const categories = ['All', 'Data & AI', 'Software Engineering', 'Cloud & Systems', 'Product & Security'];

  // Calculate match for each career
  const enrichedCareers = allCareers.map((career) => {
    const match = calculateCareerMatch(career, student.skills);
    return {
      career,
      match,
    };
  });

  // Filter
  const filteredCareers = enrichedCareers.filter(({ career }) => {
    const matchesCategory = categoryFilter === 'All' || career.category === categoryFilter;
    const matchesSearch =
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.requiredSkills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort
  filteredCareers.sort((a, b) => {
    if (sortBy === 'match') {
      return b.match.matchPercentage - a.match.matchPercentage;
    }
    if (sortBy === 'growth') {
      return parseInt(b.career.growthRate) - parseInt(a.career.growthRate);
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900 font-display">
              Career Recommendations & Matches
            </h1>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Calculated against your {student.skills.length} verified skills. Set any role as your Career GPS destination.
          </p>
        </div>

        <button
          onClick={() => onNavigate('what-if')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs transition-colors self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Simulate Skill Boosts in What-If</span>
        </button>
      </div>

      {/* Toolbar: Search, Category Filter, and Sorting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles, skills (e.g. Python, Docker)..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-emerald-500"
          />
        </div>

        {/* Categories & Sorting */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                  categoryFilter === cat
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-hidden font-medium"
            >
              <option value="match">Sort by Match %</option>
              <option value="growth">Sort by Growth</option>
            </select>
          </div>
        </div>

      </div>

      {/* Career Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCareers.map(({ career, match }) => {
          const isCurrentTarget = career.id === targetCareerId;

          return (
            <div
              key={career.id}
              className={`rounded-2xl border bg-white p-6 shadow-xs flex flex-col justify-between space-y-5 transition-all duration-200 hover:shadow-md ${
                isCurrentTarget
                  ? 'border-emerald-300 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 py-0.5 rounded bg-slate-100">
                        {career.category}
                      </span>
                      {isCurrentTarget && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white">
                          Active Target
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-display mt-1">
                      {career.title}
                    </h3>
                  </div>

                  {/* Match Percentage Badge */}
                  <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl shrink-0 font-display ${
                    match.matchPercentage >= 70
                      ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-700'
                      : match.matchPercentage >= 50
                      ? 'bg-amber-50 border-2 border-amber-500 text-amber-700'
                      : 'bg-slate-50 border-2 border-slate-300 text-slate-600'
                  }`}>
                    <span className="text-lg font-extrabold leading-none">{match.matchPercentage}%</span>
                    <span className="text-[9px] font-bold uppercase tracking-tighter mt-0.5">Match</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {career.tagline}
                </p>

                {/* Key Metrics: Salary & Growth */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50">
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Avg Entry Salary</span>
                    <span className="font-bold text-slate-800">{career.averageSalary}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50">
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Demand Growth</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {career.growthRate}
                    </span>
                  </div>
                </div>

                {/* Skills Match Overview */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">Skill Alignment &bull; Confidence</span>
                    <span className="font-bold text-slate-700">
                      {match.verifiedSkillsCount} verified &bull; {match.claimedSkillsCount} claimed
                    </span>
                  </div>
                  
                  {/* Visual Skills Tags (Requirement 7 format) */}
                  <div className="flex flex-wrap gap-1.5">
                    {career.requiredSkills.map((req) => {
                      const matched = match.matchedSkills.find(
                        (m) => m.skillId === req.skillId || m.name.toLowerCase() === req.name.toLowerCase()
                      );
                      const isVerified = matched?.verified;
                      const isClaimed = matched && !matched.verified;

                      if (isVerified) {
                        return (
                          <span
                            key={req.skillId}
                            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>{req.name} &bull; Verified</span>
                          </span>
                        );
                      }

                      if (isClaimed) {
                        return (
                          <span
                            key={req.skillId}
                            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-medium"
                          >
                            <Circle className="w-2.5 h-2.5 text-amber-500" />
                            <span>{req.name} &bull; Claimed</span>
                          </span>
                        );
                      }

                      return (
                        <span
                          key={req.skillId}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 font-medium"
                        >
                          <XCircle className="w-3 h-3 text-rose-500" />
                          <span>{req.name} &bull; Missing</span>
                        </span>
                      );
                    })}
                  </div>

                  <p className="text-[10px] text-slate-500 italic pt-0.5">
                    Verified skills provide higher confidence in your CareerPulse match.
                  </p>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedDetailRole(career)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-2"
                >
                  View Details & Hiring
                </button>

                <div className="flex items-center gap-2">
                  {!isCurrentTarget && (
                    <button
                      onClick={() => onSelectTargetCareer(career.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
                    >
                      Set as Target
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onSelectTargetCareer(career.id);
                      onNavigate('career-gps');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                  >
                    <span>GPS Map</span>
                    <Compass className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Detailed Career Modal */}
      {selectedDetailRole && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            <button
              onClick={() => setSelectedDetailRole(null)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pr-6">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {selectedDetailRole.category}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                {selectedDetailRole.title}
              </h2>
              <p className="text-xs text-slate-500">{selectedDetailRole.tagline}</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedDetailRole.description}
            </p>

            {/* Top Hiring Companies */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-500" />
                Companies Actively Hiring College Interns & Grads:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedDetailRole.topCompanies.map((comp) => (
                  <span
                    key={comp}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Day in the Life */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800">Day in the Life of a Junior:</span>
              <ul className="space-y-1.5">
                {selectedDetailRole.dayInLife.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Skills Verification Status Breakdown */}
            <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Required Skills Verification Diagnostic</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {calculateCareerMatch(selectedDetailRole, student.skills).matchPercentage}% Match
                </span>
              </div>

              <div className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verified skills provide higher confidence in your CareerPulse match.</span>
              </div>

              <div className="space-y-1.5 pt-1">
                {selectedDetailRole.requiredSkills.map((req) => {
                  const matched = student.skills.find(
                    (s) => s.id === req.skillId || s.name.toLowerCase() === req.name.toLowerCase()
                  );
                  const isVerified = matched?.verified;
                  const isClaimed = matched && !matched.verified;

                  return (
                    <div key={req.skillId} className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60 last:border-0">
                      <div className="flex items-center gap-2">
                        {isVerified ? (
                          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                        ) : isClaimed ? (
                          <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold">○</span>
                        ) : (
                          <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold">✕</span>
                        )}
                        <span className="font-semibold text-slate-800">{req.name}</span>
                        <span className="text-[10px] text-slate-400">({req.targetProficiency})</span>
                      </div>

                      <div>
                        {isVerified ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Verified {matched?.verificationScore ? `(${matched.verificationScore}%)` : ''}
                          </span>
                        ) : isClaimed ? (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Claimed
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            Missing
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedDetailRole(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onSelectTargetCareer(selectedDetailRole.id);
                  setSelectedDetailRole(null);
                  onNavigate('career-gps');
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>Navigate via Career GPS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
