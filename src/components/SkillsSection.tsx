import React, { useState } from 'react';
import { CareerRole, SkillCategory, SkillProficiency, StudentProfile, UserSkill } from '../types';
import { SKILLS_CATALOG, calculateCareerMatch } from '../mockData';
import { getAssessmentForSkill } from '../assessmentData';
import { SkillAssessmentModal } from './SkillAssessmentModal';
import { 
  Award, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  BookOpen,
  Filter,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  Clock,
  ArrowRight,
  Circle,
  XCircle,
  Check,
  Zap,
  Info
} from 'lucide-react';

interface SkillsSectionProps {
  student: StudentProfile;
  targetCareer: CareerRole;
  onAddSkill: (skill: UserSkill) => void;
  onUpdateSkillProficiency: (skillId: string, proficiency: SkillProficiency) => void;
  onRemoveSkill: (skillId: string) => void;
  onVerifySkill?: (skillId: string, score: number, verifiedSource?: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  student,
  targetCareer,
  onAddSkill,
  onUpdateSkillProficiency,
  onRemoveSkill,
  onVerifySkill,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'claimed'>('all');
  
  // New Skill form state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>('Frontend');
  const [newSkillProficiency, setNewSkillProficiency] = useState<SkillProficiency>('Intermediate');
  const [showAddForm, setShowAddForm] = useState(false);

  // Active Assessment Modal State
  const [activeAssessmentSkill, setActiveAssessmentSkill] = useState<string | null>(null);

  const categories: string[] = [
    'All',
    'Frontend',
    'Backend',
    'AI & Data',
    'Cloud & DevOps',
    'Mobile & Systems',
    'Product & Soft Skills',
  ];

  const matchResult = calculateCareerMatch(targetCareer, student.skills);

  // Categorize skills
  const verifiedSkills = student.skills.filter((s) => s.verified);
  const claimedSkills = student.skills.filter((s) => !s.verified);
  const missingTargetSkills = matchResult.missingSkills;

  // Filter skills for the main inventory grid
  const filteredSkills = student.skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesQuery = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = 
      statusFilter === 'all' 
        ? true 
        : statusFilter === 'verified' 
        ? skill.verified 
        : !skill.verified;
    return matchesCategory && matchesQuery && matchesStatus;
  });

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    if (student.skills.some((s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      alert('This skill is already in your profile!');
      return;
    }

    const matchedCatalog = SKILLS_CATALOG.find(
      (c) => c.name.toLowerCase() === newSkillName.trim().toLowerCase()
    );

    const newSkill: UserSkill = {
      id: matchedCatalog ? matchedCatalog.id : `custom-${Date.now()}`,
      name: matchedCatalog ? matchedCatalog.name : newSkillName.trim(),
      category: matchedCatalog ? matchedCatalog.category : newSkillCategory,
      proficiency: newSkillProficiency,
      verified: false, // New skills default to Claimed until verified through assessment!
      verifiedSource: 'Self-Claimed',
      lastPracticed: 'Today',
    };

    onAddSkill(newSkill);
    setNewSkillName('');
    setShowAddForm(false);
  };

  const handleQuickAdd = (missingSkillId: string, name: string) => {
    const catalogItem = SKILLS_CATALOG.find((s) => s.id === missingSkillId);
    const newSkill: UserSkill = {
      id: missingSkillId,
      name: name,
      category: catalogItem ? catalogItem.category : 'Frontend',
      proficiency: 'Intermediate',
      verified: false, // Starts as claimed
      verifiedSource: 'Self-Claimed',
      lastPracticed: 'Today',
    };
    onAddSkill(newSkill);
  };

  const handleOpenAssessment = (skillName: string) => {
    setActiveAssessmentSkill(skillName);
  };

  const handleAssessmentPassed = (result: { skillId: string; score: number }) => {
    if (onVerifySkill) {
      onVerifySkill(result.skillId, result.score, 'Verified via CareerPulse Assessment');
    }
  };

  return (
    <div id="skills-inventory-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">Skills &amp; Verification Hub</h1>
              <p className="text-xs text-slate-500">CareerPulse Proof-of-Skill Engine</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl">
            Distinguish your self-reported skills from assessed proficiencies. Verified skills earn official credentials, unlock higher matching confidence, and stand out directly to hiring employers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="javascript-quick-assessment-btn"
            onClick={() => handleOpenAssessment('JavaScript')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-xs hover:scale-102"
          >
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Verify JavaScript</span>
            <span className="text-[10px] bg-amber-400/20 text-amber-300 font-mono px-1.5 py-0.5 rounded">
              Demo Test
            </span>
          </button>

          <button
            id="add-skill-button-toggle"
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Close Form' : 'Claim New Skill'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* DEDICATED SKILL VERIFICATION SECTION (REQUIREMENT 1)      */}
      {/* Three distinct categories: VERIFIED, CLAIMED, MISSING     */}
      {/* ========================================================= */}
      <section id="skill-verification-panel" className="space-y-4">
        
        {/* Verification Status Header Bar */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white border border-slate-800 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Skill Verification Status</span>
              </div>
              <h2 className="text-xl font-bold font-display mt-0.5">
                {verifiedSkills.length} Verified &bull; {claimedSkills.length} Claimed &bull; {missingTargetSkills.length} Target Gaps
              </h2>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Claimed ≠ Verified:</strong> Self-reported skills remain provisional until assessed. Pass an assessment (70%+) to earn verified status and boost your CareerPulse match.
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Verified Rate</div>
                <div className="text-lg font-bold text-emerald-400">
                  {Math.round((verifiedSkills.length / Math.max(1, student.skills.length)) * 100)}%
                </div>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Match Confidence</div>
                <div className="text-lg font-bold text-amber-400">
                  {matchResult.matchPercentage}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 3-Column Verification Category Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLUMN 1: VERIFIED SKILLS */}
          <div className="bg-white rounded-2xl border border-emerald-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                      Verified Skills
                    </h3>
                    <p className="text-[11px] text-slate-500">Backed by proctored assessments</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {verifiedSkills.length} Total
                </span>
              </div>

              {/* Verified Skills List */}
              <div className="divide-y divide-slate-100 mt-3 space-y-0.5">
                {verifiedSkills.map((skill) => (
                  <div key={skill.id} className="py-2.5 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-bold text-slate-800 truncate">{skill.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">({skill.category})</span>
                      </div>
                      <div className="text-[11px] text-emerald-700 font-medium pl-5.5 flex items-center gap-1">
                        <span>Verified</span>
                        {skill.verificationScore && (
                          <>
                            <span>&bull;</span>
                            <span className="font-bold">{skill.verificationScore}% Score</span>
                          </>
                        )}
                      </div>
                    </div>

                    <span className="shrink-0 text-[10px] font-bold px-2 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {skill.proficiency}
                    </span>
                  </div>
                ))}

                {verifiedSkills.length === 0 && (
                  <div className="py-6 text-center text-xs text-slate-400">
                    No verified skills yet. Take an assessment below!
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Visible to employers with verified badge</span>
            </div>
          </div>

          {/* COLUMN 2: CLAIMED SKILLS (Unverified, Self-Reported) */}
          <div className="bg-white rounded-2xl border border-amber-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    ○
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                      Claimed Skills
                    </h3>
                    <p className="text-[11px] text-amber-700">Self-reported &bull; Unverified</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {claimedSkills.length} Unverified
                </span>
              </div>

              {/* Claimed Skills List */}
              <div className="divide-y divide-slate-100 mt-3 space-y-0.5">
                {claimedSkills.map((skill) => (
                  <div key={skill.id} className="py-2.5 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Circle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-800 truncate">{skill.name}</span>
                      </div>
                      <div className="text-[11px] text-amber-700 pl-5">
                        Claimed &bull; Not yet verified
                      </div>
                    </div>

                    <button
                      id={`verify-skill-btn-${skill.id}`}
                      onClick={() => handleOpenAssessment(skill.name)}
                      className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs transition-all hover:scale-102"
                    >
                      <Zap className="w-3 h-3 text-white" />
                      <span>Take Assessment</span>
                    </button>
                  </div>
                ))}

                {claimedSkills.length === 0 && (
                  <div className="py-6 text-center text-xs text-slate-400">
                    All your current skills are verified!
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Provisional weight (0.75x)</span>
              <span className="text-amber-700 font-semibold">Verify to boost match</span>
            </div>
          </div>

          {/* COLUMN 3: MISSING SKILLS (Needed for Target Career) */}
          <div className="bg-white rounded-2xl border border-rose-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                    ✕
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                      Missing Skills
                    </h3>
                    <p className="text-[11px] text-slate-500">Needed for {targetCareer.title}</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  {missingTargetSkills.length} Needed
                </span>
              </div>

              {/* Missing Skills List */}
              <div className="divide-y divide-slate-100 mt-3 space-y-0.5">
                {missingTargetSkills.slice(0, 5).map((missing) => (
                  <div key={missing.skillId} className="py-2.5 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-800 truncate">{missing.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 pl-5">
                        <span className={`font-semibold ${missing.importance === 'Critical' ? 'text-rose-600' : 'text-slate-600'}`}>
                          {missing.importance}
                        </span>
                        <span> &bull; Target: {missing.targetProficiency}</span>
                      </div>
                    </div>

                    <button
                      id={`add-missing-skill-btn-${missing.skillId}`}
                      onClick={() => handleQuickAdd(missing.skillId, missing.name)}
                      className="shrink-0 px-2.5 py-1 rounded-lg border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-semibold text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3 h-3 text-emerald-600" />
                      <span>Claim</span>
                    </button>
                  </div>
                ))}

                {missingTargetSkills.length === 0 && (
                  <div className="py-6 text-center text-xs text-emerald-600 font-medium">
                    ✓ You meet all skill requirements for this target role!
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>GPS Roadmap integrations</span>
              <span className="text-rose-700 font-semibold">Priority Gaps</span>
            </div>
          </div>

        </div>

      </section>

      {/* Add Skill Form Collapsible */}
      {showAddForm && (
        <div className="rounded-2xl bg-white border border-emerald-300 p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Claim a New Skill to Your Profile</h3>
              <p className="text-xs text-slate-500">Newly added skills will start as Claimed until you take the assessment.</p>
            </div>
            <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Starts as Claimed
            </span>
          </div>

          <form onSubmit={handleCreateSkill} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            <div className="sm:col-span-5 space-y-1">
              <label className="text-xs font-bold text-slate-700">Skill Name</label>
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="e.g. JavaScript, Python, Docker, Redis..."
                list="skills-suggestions"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                required
              />
              <datalist id="skills-suggestions">
                {SKILLS_CATALOG.map((s) => (
                  <option key={s.id} value={s.name} />
                ))}
              </datalist>
            </div>

            <div className="sm:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Category</label>
              <select
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value as SkillCategory)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-500 bg-slate-50"
              >
                {categories.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700">Self-Reported Level</label>
              <select
                value={newSkillProficiency}
                onChange={(e) => setNewSkillProficiency(e.target.value as SkillProficiency)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-500 bg-slate-50"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
              >
                Claim Skill
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Inventory Title & Controls */}
      <div className="pt-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">Full Skills Inventory ({filteredSkills.length})</h2>
            <p className="text-xs text-slate-500">Adjust self-reported proficiency and manage assessments</p>
          </div>

          {/* Verification Status Filter Tabs */}
          <div className="inline-flex rounded-xl bg-slate-200/70 p-1 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                statusFilter === 'all' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({student.skills.length})
            </button>
            <button
              onClick={() => setStatusFilter('verified')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                statusFilter === 'verified' ? 'bg-white text-emerald-800 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ✓ Verified ({verifiedSkills.length})
            </button>
            <button
              onClick={() => setStatusFilter('claimed')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                statusFilter === 'claimed' ? 'bg-white text-amber-800 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ○ Claimed ({claimedSkills.length})
            </button>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills by name..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Skills Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            id={`skill-card-${skill.id}`}
            className={`bg-white rounded-2xl border p-5 shadow-xs transition-all flex flex-col justify-between space-y-4 ${
              skill.verified 
                ? 'border-slate-200 hover:border-emerald-300' 
                : 'border-amber-200/90 bg-amber-50/20 hover:border-amber-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-slate-900">{skill.name}</h3>
                    {skill.verified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified {skill.verificationScore ? `${skill.verificationScore}%` : ''}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        <Circle className="w-2.5 h-2.5 text-amber-500" />
                        Claimed
                      </span>
                    )}
                  </div>

                  <span className="inline-block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                    {skill.category}
                  </span>
                </div>

                <button
                  onClick={() => onRemoveSkill(skill.id)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded hover:bg-rose-50"
                  title="Remove skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Verified Source vs Take Assessment CTA */}
              {skill.verified ? (
                <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50/80 px-2.5 py-1.5 rounded-xl border border-emerald-100">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate text-[11px] font-medium">
                      {skill.verifiedSource || 'Verified by CareerPulse Assessment'}
                    </span>
                  </div>
                  {skill.verificationScore && (
                    <span className="font-bold text-[11px] text-emerald-700 shrink-0 ml-2">
                      {skill.verificationScore}%
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200/80 p-2 rounded-xl text-xs">
                  <div className="text-[11px] text-amber-800 font-medium">
                    Unverified &bull; Self-Reported
                  </div>
                  <button
                    id={`card-verify-btn-${skill.id}`}
                    onClick={() => handleOpenAssessment(skill.name)}
                    className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs transition-colors"
                  >
                    <Zap className="w-3 h-3" />
                    <span>Take Assessment</span>
                  </button>
                </div>
              )}
            </div>

            {/* Proficiency Adjuster */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Current Level</span>
                <span className="font-bold text-slate-800">{skill.proficiency}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
                {(['Beginner', 'Intermediate', 'Advanced'] as SkillProficiency[]).map((level) => {
                  const isActive = skill.proficiency === level;
                  return (
                    <button
                      key={level}
                      onClick={() => onUpdateSkillProficiency(skill.id, level)}
                      className={`text-[10px] py-1 rounded font-semibold transition-all ${
                        isActive
                          ? 'bg-white text-emerald-700 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-6">
          <p className="text-sm text-slate-500">No skills match the selected filter.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setStatusFilter('all'); }}
            className="mt-2 text-xs font-semibold text-emerald-700 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Interactive Assessment Modal */}
      {activeAssessmentSkill && (
        <SkillAssessmentModal
          config={getAssessmentForSkill(activeAssessmentSkill)}
          isOpen={!!activeAssessmentSkill}
          onClose={() => setActiveAssessmentSkill(null)}
          onAssessmentPassed={(result) => {
            handleAssessmentPassed({
              skillId: activeAssessmentSkill.toLowerCase().replace(/[^a-z0-9]/g, ''),
              score: result.score,
            });
          }}
        />
      )}

    </div>
  );
};
