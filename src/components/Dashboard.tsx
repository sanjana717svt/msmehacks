import React, { useState } from 'react';
import { CareerRole, NavigationTab, StudentProfile } from '../types';
import { calculateCareerMatch } from '../mockData';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Briefcase, 
  Zap,
  Flame,
  CheckSquare,
  Square,
  ShieldCheck,
  Circle,
  XCircle,
  Info
} from 'lucide-react';

interface DashboardProps {
  student: StudentProfile;
  targetCareer: CareerRole;
  allCareers: CareerRole[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectTargetCareer: (careerId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  student,
  targetCareer,
  allCareers,
  onNavigate,
  onSelectTargetCareer,
}) => {
  const matchResult = calculateCareerMatch(targetCareer, student.skills);

  // Interactive weekly sprint tasks state
  const [weeklyTasks, setWeeklyTasks] = useState([
    { id: 'task-1', title: 'Complete FastAPI async streaming tutorial (FreeCodeCamp)', completed: true, hours: '3 hrs' },
    { id: 'task-2', title: 'Build pgvector PostgreSQL Docker container locally', completed: false, hours: '2 hrs' },
    { id: 'task-3', title: 'Draft technical architecture diagram for AI Capstone project', completed: false, hours: '4 hrs' },
  ]);

  const toggleTask = (taskId: string) => {
    setWeeklyTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedTaskCount = weeklyTasks.filter((t) => t.completed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Student Profile Hero Header */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={student.avatarUrl}
            alt={student.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-emerald-500/20 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                {student.name}
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                {student.year}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                GPA {student.gpa}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 font-medium">
              <GraduationCap className="w-4 h-4 text-slate-500" />
              <span>{student.university} &bull; {student.major}</span>
            </p>

            <p className="text-xs text-slate-500 max-w-xl line-clamp-1 sm:line-clamp-none">
              {student.bio}
            </p>
          </div>
        </div>

        {/* Target Career Quick Switcher Pill */}
        <div className="flex flex-col sm:items-end gap-2 shrink-0 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Target Career Objective
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-slate-900 text-sm">
              {targetCareer.title}
            </span>
            <button
              onClick={() => onNavigate('career-matches')}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2"
            >
              Change
            </button>
          </div>
          <div className="text-xs text-slate-500">
            Avg Salary: <span className="font-semibold text-slate-800">{targetCareer.averageSalary}</span>
          </div>
        </div>

      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Readiness Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Target Readiness</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-slate-900 font-display">{matchResult.matchPercentage}%</span>
              <span className="text-xs font-semibold text-emerald-600">Match</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {matchResult.verifiedSkillsCount} verified &bull; {matchResult.claimedSkillsCount} claimed
            </p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center text-emerald-700 font-bold text-xs bg-emerald-50">
            {matchResult.matchPercentage}%
          </div>
        </div>

        {/* Metric 2: Skills Count */}
        <div 
          onClick={() => onNavigate('skills')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Skills Inventory</span>
            <span className="text-xs font-semibold text-emerald-600">Verify &rarr;</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">{student.skills.length}</div>
          <p className="text-[11px] text-slate-500">
            <span className="text-emerald-700 font-bold">{student.skills.filter((s) => s.verified).length} verified</span>
            {' &bull; '}
            <span className="text-amber-700 font-semibold">{student.skills.filter((s) => !s.verified).length} claimed</span>
          </p>
        </div>

        {/* Metric 3: GPS Milestone Progress */}
        <div 
          onClick={() => onNavigate('career-gps')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">GPS Milestones</span>
            <span className="text-xs font-semibold text-emerald-600">GPS Map &rarr;</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">
            {student.completedMilestoneIds.length} <span className="text-sm font-medium text-slate-400">/ 6 Completed</span>
          </div>
          <p className="text-[11px] text-slate-500">Phase 2 In Progress: Vector & RAG</p>
        </div>

        {/* Metric 4: What-If Teaser */}
        <div 
          onClick={() => onNavigate('what-if')}
          className="bg-gradient-to-br from-amber-50/70 to-orange-50/40 p-5 rounded-2xl border border-amber-200 shadow-xs hover:border-amber-300 transition-colors cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              What-If Potential
            </span>
            <span className="text-xs font-bold text-amber-700">Simulate &rarr;</span>
          </div>
          <div className="text-2xl font-extrabold text-amber-900 font-display">+18% Match</div>
          <p className="text-[11px] text-amber-800/80">If you learn PyTorch + Docker this term</p>
        </div>

      </div>

      {/* Main Grid: Active GPS Roadmap Sprint + Skill Gap Action Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Active Learning Milestone + Missing Skills */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Milestone Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Current GPS Sprint</span>
                  <h2 className="text-lg font-bold text-slate-900">Phase 2: Semantic Search & Vector Embeddings</h2>
                </div>
              </div>
              <button
                onClick={() => onNavigate('career-gps')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
              >
                <span>Full Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              You are currently working on chunking strategies, dense vector embeddings, cosine similarity, and hybrid BM25 search to unlock production RAG capabilities.
            </p>

            {/* Recommended Learning Resources */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>Course &bull; DeepLearning.AI</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">Free</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">Building Production RAG Systems</h4>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 10 hours</span>
                  <span className="text-emerald-700 font-semibold">Start Lab &rarr;</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>Interactive Project Idea</span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px]">Resume Capstone</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">University Syllabus Knowledge Base</h4>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                  <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" /> pgvector + React</span>
                  <span className="text-indigo-700 font-semibold">View Specs &rarr;</span>
                </div>
              </div>
            </div>

          </div>

          {/* Target Role Skill Verification Breakdown Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Target Role Skill Verification ({targetCareer.title})
                </h3>
                <p className="text-xs text-slate-500">
                  Proof-of-skill breakdown for your active career target.
                </p>
              </div>
              <button
                onClick={() => onNavigate('skills')}
                className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
              >
                Open Verification Hub &rarr;
              </button>
            </div>

            {/* Explanatory Banner (Requirement 7) */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-900">
              <Info className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Confidence Scoring:</strong> Verified skills provide higher confidence in your CareerPulse match and prioritize your candidacy with employers.
              </span>
            </div>

            {/* List of Required Skills showing Verified vs Claimed vs Missing */}
            <div className="space-y-2 divide-y divide-slate-100">
              {targetCareer.requiredSkills.map((req) => {
                const matched = matchResult.matchedSkills.find((m) => m.skillId === req.skillId || m.name.toLowerCase() === req.name.toLowerCase());
                const isVerified = matched?.verified;
                const isClaimed = matched && !matched.verified;
                const isMissing = !matched;

                return (
                  <div key={req.skillId} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {isVerified ? (
                        <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                          ✓
                        </div>
                      ) : isClaimed ? (
                        <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">
                          ○
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-md bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold shrink-0">
                          ✕
                        </div>
                      )}

                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{req.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({req.targetProficiency})</span>
                        </div>
                        <div className="text-[11px]">
                          {isVerified ? (
                            <span className="text-emerald-700 font-semibold">
                              Verified {matched?.verificationScore ? `(${matched.verificationScore}%)` : ''}
                            </span>
                          ) : isClaimed ? (
                            <span className="text-amber-700 font-medium">Claimed &bull; Unverified</span>
                          ) : (
                            <span className="text-rose-600 font-medium">Missing &bull; Required for role</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      {isVerified ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Verified
                        </span>
                      ) : isClaimed ? (
                        <button
                          onClick={() => onNavigate('skills')}
                          className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1 shadow-2xs transition-colors"
                        >
                          <Zap className="w-3 h-3 text-white" />
                          <span>Verify</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onNavigate('skills')}
                          className="text-[11px] font-medium px-2 py-0.5 rounded border border-slate-300 text-slate-600 hover:text-emerald-700 hover:border-emerald-400 transition-colors"
                        >
                          + Claim
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Target Skill Gaps Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Target Skill Gaps for {targetCareer.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Acquiring these missing skills will boost your candidacy score to 90%+
                </p>
              </div>
              <button
                onClick={() => onNavigate('what-if')}
                className="text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Simulate in What-If</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {matchResult.missingSkills.map((missing) => (
                <div
                  key={missing.skillId}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{missing.name}</div>
                      <div className="text-[11px] text-slate-500">
                        Required level: <span className="font-semibold text-slate-700">{missing.targetProficiency}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      missing.importance === 'Critical'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {missing.importance} Priority
                    </span>
                    <button
                      onClick={() => onNavigate('career-gps')}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 px-2 py-1 rounded hover:bg-emerald-50"
                    >
                      Find Resources
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Weekly Action Tasks + Career Matches Overview */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Weekly Task Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-bold text-slate-900">Weekly Sprint Goals</h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {completedTaskCount} / {weeklyTasks.length} Done
              </span>
            </div>

            <div className="space-y-2">
              {weeklyTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                    task.completed
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-500 line-through'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <button className="mt-0.5 text-emerald-600 focus:outline-hidden">
                    {task.completed ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  <div className="text-xs font-medium leading-snug flex-1">
                    {task.title}
                    <div className="text-[10px] text-slate-400 no-underline mt-0.5">{task.hours}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Alternative Career Matches List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-500" />
                All Career Matches
              </h3>
              <button
                onClick={() => onNavigate('career-matches')}
                className="text-xs text-emerald-700 font-semibold hover:underline"
              >
                Compare &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {allCareers.map((c) => {
                const roleMatch = calculateCareerMatch(c, student.skills);
                const isTarget = c.id === targetCareer.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      onSelectTargetCareer(c.id);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isTarget
                        ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-500/20'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">{c.title}</span>
                        {isTarget && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-600 text-white">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">{c.averageSalary}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-slate-900 font-display">
                        {roleMatch.matchPercentage}%
                      </div>
                      <div className="text-[10px] text-slate-400">match</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
