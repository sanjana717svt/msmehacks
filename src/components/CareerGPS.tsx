import React, { useState } from 'react';
import { CareerRole, NavigationTab, StudentProfile } from '../types';
import { calculateCareerMatch } from '../mockData';
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  ExternalLink, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  FolderGit2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Flag,
  Award,
  ShieldCheck,
  XCircle,
  Zap
} from 'lucide-react';

interface CareerGPSProps {
  student: StudentProfile;
  targetCareer: CareerRole;
  allCareers: CareerRole[];
  onSelectTargetCareer: (careerId: string) => void;
  onToggleMilestone: (milestoneId: string) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const CareerGPS: React.FC<CareerGPSProps> = ({
  student,
  targetCareer,
  allCareers,
  onSelectTargetCareer,
  onToggleMilestone,
  onNavigate,
}) => {
  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({
    'milestone-rag-1': true,
    'milestone-fnd-1': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedMilestones((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const matchResult = calculateCareerMatch(targetCareer, student.skills);

  // Collect all milestones from roadmap phases
  const allMilestones = targetCareer.roadmapPhases.flatMap((p) => p.milestones);
  const totalMilestonesCount = allMilestones.length;
  const completedCount = allMilestones.filter((m) =>
    student.completedMilestoneIds.includes(m.id)
  ).length;

  const progressPercent = totalMilestonesCount > 0
    ? Math.round((completedCount / totalMilestonesCount) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header with Career Switcher */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <Compass className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                Career GPS: Navigation Roadmap
              </h1>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Your personalized turn-by-turn roadmap from current coursework to entry-level hire.
            </p>
          </div>

          {/* Select Target Career Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Destination:</span>
            <select
              value={targetCareer.id}
              onChange={(e) => onSelectTargetCareer(e.target.value)}
              className="text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-emerald-500 shadow-2xs"
            >
              {allCareers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Visual Route Progress Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Origin</div>
              <div className="text-xs font-bold text-slate-800">
                {student.university} ({student.year.split(' ')[0]})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
              {matchResult.matchPercentage}%
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Current Match</div>
              <div className="text-xs font-bold text-emerald-700">
                {matchResult.matchedSkillsCount} of {matchResult.totalRequiredCount} Skills Covered
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs shrink-0">
              {completedCount}/{totalMilestonesCount}
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Roadmap Progress</div>
              <div className="text-xs font-bold text-indigo-900">
                {progressPercent}% Milestones Done
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Target Role</div>
              <div className="text-xs font-bold text-slate-900 truncate max-w-[140px]">
                {targetCareer.title}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Missing Skills Diagnostic Bar */}
      {matchResult.missingSkills.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Identified Skill Gaps to Close for {targetCareer.title}
              </h3>
            </div>
            <button
              onClick={() => onNavigate('what-if')}
              className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate Learning These in What-If &rarr;</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {matchResult.missingSkills.map((missing) => (
              <div
                key={missing.skillId}
                className="p-3 rounded-xl bg-white border border-amber-200 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{missing.name}</div>
                  <div className="text-[11px] text-slate-500">Target: {missing.targetProficiency}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  missing.importance === 'Critical'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {missing.importance}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GPS Road Phases & Milestones */}
      <div className="space-y-8">
        {targetCareer.roadmapPhases.map((phase) => (
          <div key={phase.phase} className="space-y-4">
            
            {/* Phase Header Waypoint */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  {phase.phase}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    {phase.phaseTitle}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {phase.focus} &bull; <span className="text-emerald-700 font-semibold">{phase.duration}</span>
                  </p>
                </div>
              </div>

              {/* Phase Skill Verification Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pl-11 sm:pl-0">
                {targetCareer.requiredSkills.slice((phase.phase - 1) * 2, (phase.phase - 1) * 2 + 2).map((req) => {
                  const matched = student.skills.find(
                    (s) => s.id === req.skillId || s.name.toLowerCase() === req.name.toLowerCase()
                  );
                  const isVerified = matched?.verified;
                  const isClaimed = matched && !matched.verified;

                  if (isVerified) {
                    return (
                      <span
                        key={req.skillId}
                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200"
                        title={`Verified at ${matched.verificationScore || 85}%`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{req.name}: Verified</span>
                      </span>
                    );
                  }

                  if (isClaimed) {
                    return (
                      <button
                        key={req.skillId}
                        onClick={() => onNavigate('skills')}
                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 cursor-pointer"
                        title="Claimed skill. Click to take assessment."
                      >
                        <Circle className="w-2.5 h-2.5 text-amber-500" />
                        <span>{req.name}: Claimed (Verify &rarr;)</span>
                      </button>
                    );
                  }

                  return (
                    <span
                      key={req.skillId}
                      className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200"
                    >
                      <XCircle className="w-2.5 h-2.5 text-rose-500" />
                      <span>{req.name}: Missing</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Milestones Cards */}
            <div className="space-y-4 pl-4 sm:pl-11 border-l-2 border-slate-200">
              {phase.milestones.map((milestone) => {
                const isCompleted = student.completedMilestoneIds.includes(milestone.id);
                const isExpanded = !!expandedMilestones[milestone.id];

                return (
                  <div
                    key={milestone.id}
                    className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden shadow-xs ${
                      isCompleted
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Milestone Card Summary Bar */}
                    <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => onToggleMilestone(milestone.id)}
                          className="mt-0.5 text-emerald-600 focus:outline-hidden shrink-0 hover:scale-110 transition-transform"
                          title={isCompleted ? 'Mark Incomplete' : 'Mark as Completed'}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                          ) : (
                            <Circle className="w-6 h-6 text-slate-300 hover:text-emerald-500" />
                          )}
                        </button>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className={`text-sm sm:text-base font-bold ${isCompleted ? 'text-slate-700 line-through' : 'text-slate-900'}`}>
                              {milestone.title}
                            </h4>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              ~{milestone.estimatedWeeks} weeks
                            </span>
                            {isCompleted && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                Completed
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Expand / Collapse and Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => onToggleMilestone(milestone.id)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                            isCompleted
                              ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                              : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                          }`}
                        >
                          {isCompleted ? 'Completed' : 'Mark Done'}
                        </button>

                        <button
                          onClick={() => toggleExpand(milestone.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 border border-slate-200"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                    </div>

                    {/* Milestone Expanded Details (Curated Resources + Capstone Project Idea) */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 bg-slate-50/50">
                        
                        {/* Learning Resources */}
                        <div className="space-y-2">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                            <span>Recommended Learning Resources</span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {milestone.resources.map((res, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between"
                              >
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-slate-900">{res.title}</span>
                                    {res.badge && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        {res.badge}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-500 mt-0.5">
                                    {res.provider} &bull; {res.type}
                                  </div>
                                </div>
                                <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0 ml-2">
                                  <Clock className="w-3 h-3" />
                                  {res.estimatedHours}h
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Portfolio Project Idea */}
                        {milestone.projectIdea && (
                          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/60 to-slate-50 border border-indigo-100 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FolderGit2 className="w-4 h-4 text-indigo-600" />
                                <h5 className="text-xs font-bold text-slate-900">
                                  Portfolio Capstone: {milestone.projectIdea.title}
                                </h5>
                              </div>
                              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                                Recruiter Showcase
                              </span>
                            </div>

                            <p className="text-xs text-slate-600">
                              {milestone.projectIdea.description}
                            </p>

                            <div className="pt-2 border-t border-indigo-100/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                              <div className="flex items-center gap-1.5 text-slate-500">
                                <span className="font-semibold text-slate-700">Deliverables:</span>
                                {milestone.projectIdea.deliverables.join(' • ')}
                              </div>
                              <span className="text-indigo-800 font-semibold text-[11px] bg-white px-2 py-0.5 rounded border border-indigo-200">
                                Tip: {milestone.projectIdea.portfolioHighlight}
                              </span>
                            </div>
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
