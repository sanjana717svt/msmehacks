import React, { useState } from 'react';
import { CareerRole, NavigationTab, SkillProficiency, StudentProfile, UserSkill } from '../types';
import { SKILLS_CATALOG, calculateCareerMatch } from '../mockData';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  RotateCcw, 
  Check, 
  Plus, 
  Zap, 
  CheckCircle2, 
  Target,
  Layers,
  Award,
  ShieldCheck,
  Circle,
  Info
} from 'lucide-react';

interface WhatIfSimulatorProps {
  student: StudentProfile;
  targetCareer: CareerRole;
  allCareers: CareerRole[];
  onCommitSkills: (newSkills: UserSkill[]) => void;
  onNavigate: (tab: NavigationTab) => void;
  onSelectTargetCareer: (careerId: string) => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  student,
  targetCareer,
  allCareers,
  onCommitSkills,
  onNavigate,
  onSelectTargetCareer,
}) => {
  // Start with student's current skills
  const [simulatedSkills, setSimulatedSkills] = useState<UserSkill[]>([...student.skills]);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [justCommitted, setJustCommitted] = useState(false);

  // Helper to test if a skill is in simulated list
  const hasSkill = (skillId: string) => simulatedSkills.some((s) => s.id === skillId);
  const getSimulatedSkill = (skillId: string) => simulatedSkills.find((s) => s.id === skillId);

  const toggleCatalogSkill = (skillId: string, name: string, defaultCategory: any) => {
    if (hasSkill(skillId)) {
      setSimulatedSkills((prev) => prev.filter((s) => s.id !== skillId));
    } else {
      const newSkill: UserSkill = {
        id: skillId,
        name: name,
        category: defaultCategory || 'AI & Data',
        proficiency: 'Intermediate',
        verified: false,
        verifiedSource: 'What-If Simulation',
      };
      setSimulatedSkills((prev) => [...prev, newSkill]);
    }
  };

  const updateSimulatedProficiency = (skillId: string, prof: SkillProficiency) => {
    setSimulatedSkills((prev) =>
      prev.map((s) => (s.id === skillId ? { ...s, proficiency: prof } : s))
    );
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;

    const matched = SKILLS_CATALOG.find(
      (s) => s.name.toLowerCase() === customSkillInput.trim().toLowerCase()
    );

    const id = matched ? matched.id : `custom-${Date.now()}`;
    if (hasSkill(id)) {
      alert('Skill is already in the simulation sandbox!');
      return;
    }

    const newSkill: UserSkill = {
      id,
      name: matched ? matched.name : customSkillInput.trim(),
      category: matched ? matched.category : 'AI & Data',
      proficiency: 'Intermediate',
      verified: false,
      verifiedSource: 'What-If Simulation',
    };

    setSimulatedSkills((prev) => [...prev, newSkill]);
    setCustomSkillInput('');
  };

  // Presets
  const applyPreset = (presetName: 'ai' | 'cloud' | 'fullstack' | 'reset') => {
    if (presetName === 'reset') {
      setSimulatedSkills([...student.skills]);
      return;
    }

    const currentMap = new Map(student.skills.map((s) => [s.id, s]));

    if (presetName === 'ai') {
      const aiSkills = ['pytorch', 'llm-engineering', 'docker', 'system-design'];
      aiSkills.forEach((id) => {
        const catItem = SKILLS_CATALOG.find((s) => s.id === id);
        if (catItem && !currentMap.has(id)) {
          currentMap.set(id, {
            id,
            name: catItem.name,
            category: catItem.category,
            proficiency: 'Intermediate',
            verified: false,
            verifiedSource: 'Simulation Preset',
          });
        }
      });
    } else if (presetName === 'cloud') {
      const cloudSkills = ['docker', 'kubernetes', 'aws', 'cicd', 'linux'];
      cloudSkills.forEach((id) => {
        const catItem = SKILLS_CATALOG.find((s) => s.id === id);
        if (catItem && !currentMap.has(id)) {
          currentMap.set(id, {
            id,
            name: catItem.name,
            category: catItem.category,
            proficiency: 'Intermediate',
            verified: false,
            verifiedSource: 'Simulation Preset',
          });
        }
      });
    } else if (presetName === 'fullstack') {
      const fsSkills = ['nextjs', 'nodejs', 'postgresql', 'redis'];
      fsSkills.forEach((id) => {
        const catItem = SKILLS_CATALOG.find((s) => s.id === id);
        if (catItem && !currentMap.has(id)) {
          currentMap.set(id, {
            id,
            name: catItem.name,
            category: catItem.category,
            proficiency: 'Intermediate',
            verified: false,
            verifiedSource: 'Simulation Preset',
          });
        }
      });
    }

    setSimulatedSkills(Array.from(currentMap.values()));
  };

  // Compare Target Career Before vs After
  const targetBefore = calculateCareerMatch(targetCareer, student.skills);
  const targetAfter = calculateCareerMatch(targetCareer, simulatedSkills);
  const targetDelta = targetAfter.matchPercentage - targetBefore.matchPercentage;

  // New simulated skills count (skills in simulatedSkills that were not in student.skills)
  const newlyAddedSkills = simulatedSkills.filter(
    (sim) => !student.skills.some((curr) => curr.id === sim.id)
  );

  const handleCommit = () => {
    onCommitSkills(simulatedSkills);
    setJustCommitted(true);
    setTimeout(() => setJustCommitted(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-display">
              What-If Career Simulator
            </h1>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Test adding skills or advancing your proficiency. Watch real-time match scores recalculate across all tech career tracks.
          </p>
        </div>

        {/* Action button: Commit simulated skills to real profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => applyPreset('reset')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sandbox</span>
          </button>

          <button
            onClick={handleCommit}
            disabled={newlyAddedSkills.length === 0}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-xs ${
              newlyAddedSkills.length > 0
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer hover:scale-102'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>Commit ({newlyAddedSkills.length}) to Real Profile</span>
          </button>
        </div>
      </div>

      {/* Success Banner when Committed */}
      {justCommitted && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Successfully synced simulated skills to your real profile and updated Career GPS!</span>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-bold text-emerald-700 underline"
          >
            View Dashboard &rarr;
          </button>
        </div>
      )}

      {/* Preset Quick-Test Scenarios */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            1-Click Summer Hackathon Scenarios
          </span>
          <span className="text-[11px] text-slate-400">Quick sandbox scenarios</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => applyPreset('ai')}
            className="p-3.5 rounded-xl text-left border border-slate-200 hover:border-amber-400 bg-gradient-to-br from-amber-50/50 to-white transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 group-hover:text-amber-700">AI & RAG Specialist</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">+4 Skills</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">PyTorch, LLM RAG, Docker, System Design</p>
          </button>

          <button
            onClick={() => applyPreset('cloud')}
            className="p-3.5 rounded-xl text-left border border-slate-200 hover:border-indigo-400 bg-gradient-to-br from-indigo-50/50 to-white transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">DevOps & Cloud Sprint</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">+5 Skills</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Docker, Kubernetes, AWS, CI/CD, Linux</p>
          </button>

          <button
            onClick={() => applyPreset('fullstack')}
            className="p-3.5 rounded-xl text-left border border-slate-200 hover:border-emerald-400 bg-gradient-to-br from-emerald-50/50 to-white transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">Full-Stack Modernization</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">+4 Skills</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Next.js, Node.js, Postgres, Redis</p>
          </button>
        </div>
      </div>

      {/* Main Simulator Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (5 cols): Skills Sandbox Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900">Interactive Skill Toggles</h3>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {newlyAddedSkills.length} Simulated Added
              </span>
            </div>

            {/* Add Custom Skill Form */}
            <form onSubmit={handleAddCustomSkill} className="flex gap-2">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                placeholder="Type skill (e.g. Docker, Rust)..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-hidden focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shrink-0"
              >
                + Add
              </button>
            </form>

            {/* Catalog Skills Checklist */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {SKILLS_CATALOG.map((item) => {
                const isSelected = hasSkill(item.id);
                const skillInstance = getSimulatedSkill(item.id);
                const isOriginal = student.skills.some((s) => s.id === item.id);

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border transition-all ${
                      isSelected
                        ? isOriginal
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-amber-50/60 border-amber-300 ring-1 ring-amber-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer flex-1 select-none">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleCatalogSkill(item.id, item.name, item.category)}
                          className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{item.name}</span>
                            {isOriginal ? (
                              student.skills.find((s) => s.id === item.id)?.verified ? (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                                  ✓ Verified
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200">
                                  ○ Claimed
                                </span>
                              )
                            ) : isSelected ? (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                                ⚡ Simulated
                              </span>
                            ) : null}
                          </div>
                          <div className="text-[10px] text-slate-500">{item.category}</div>
                        </div>
                      </label>

                      {isSelected && skillInstance && (
                        <select
                          value={skillInstance.proficiency}
                          onChange={(e) =>
                            updateSimulatedProficiency(item.id, e.target.value as SkillProficiency)
                          }
                          className="text-[10px] font-semibold bg-white border border-slate-300 rounded px-1.5 py-1 text-slate-700"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Right Column (7 cols): Live Dynamic Comparison Engine */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Target Role Before vs After Impact Box */}
          <div className="bg-gradient-to-br from-white via-slate-50 to-amber-50/30 rounded-2xl border border-amber-300 p-6 shadow-sm space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  Target Objective Spotlight
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-display">{targetCareer.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">Starting Salary</span>
                <div className="text-xs font-bold text-slate-800">{targetCareer.averageSalary}</div>
              </div>
            </div>

            {/* Score Comparison Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-white p-4 rounded-xl border border-slate-200">
              
              {/* Before */}
              <div className="text-center sm:text-left">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Current Match</span>
                <div className="text-2xl font-extrabold text-slate-600 font-display">
                  {targetBefore.matchPercentage}%
                </div>
                <div className="text-[11px] text-slate-400">
                  {targetBefore.matchedSkillsCount}/{targetBefore.totalRequiredCount} Skills
                </div>
              </div>

              {/* Delta Arrow */}
              <div className="flex flex-col items-center justify-center py-2 sm:py-0">
                <div className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 ${
                  targetDelta > 0
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : targetDelta < 0
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{targetDelta > 0 ? `+${targetDelta}% Boost` : `${targetDelta}%`}</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Recruiter Score Impact</span>
              </div>

              {/* After */}
              <div className="text-center sm:text-right">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase">Simulated Match</span>
                <div className="text-3xl font-extrabold text-emerald-700 font-display">
                  {targetAfter.matchPercentage}%
                </div>
                <div className="text-[11px] text-emerald-800 font-semibold">
                  {targetAfter.matchedSkillsCount}/{targetAfter.totalRequiredCount} Skills Covered
                </div>
              </div>

            </div>

            {/* Newly Covered Missing Skills */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700">
                Missing Requirements Addressed in this Simulation:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {targetAfter.matchedSkills
                  .filter((m) => !targetBefore.matchedSkills.some((b) => b.skillId === m.skillId))
                  .map((unlocked) => (
                    <span
                      key={unlocked.skillId}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold border border-emerald-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {unlocked.name} ({unlocked.userProficiency})
                    </span>
                  ))}
                {targetAfter.matchedSkills.filter(
                  (m) => !targetBefore.matchedSkills.some((b) => b.skillId === m.skillId)
                ).length === 0 && (
                  <span className="text-xs text-slate-400 italic">
                    Toggle target skills on the left (e.g. Docker, PyTorch) to see instant unlock status.
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Across-the-Board Career Impact Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-slate-500" />
                All Tech Careers: Recalculated Scores
              </h4>
              <span className="text-xs text-slate-500">Live comparison</span>
            </div>

            <div className="space-y-3">
              {allCareers.map((c) => {
                const before = calculateCareerMatch(c, student.skills);
                const after = calculateCareerMatch(c, simulatedSkills);
                const delta = after.matchPercentage - before.matchPercentage;
                const isTarget = c.id === targetCareer.id;

                return (
                  <div
                    key={c.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      isTarget
                        ? 'bg-amber-50/40 border-amber-300'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">{c.title}</span>
                        {after.matchPercentage >= 75 && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                            Interview Ready
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">{c.averageSalary}</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-slate-400 line-through">
                          {before.matchPercentage}%
                        </div>
                        <div className="text-base font-extrabold text-slate-900 font-display">
                          {after.matchPercentage}%
                        </div>
                      </div>

                      <div className="w-16 text-right">
                        {delta !== 0 ? (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                            delta > 0
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {delta > 0 ? `+${delta}%` : `${delta}%`}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">No Change</span>
                        )}
                      </div>
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
