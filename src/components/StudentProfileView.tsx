import React from 'react';
import { StudentProfile, CareerRole, NavigationTab } from '../types';
import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  Phone, 
  Award, 
  ShieldCheck, 
  Circle, 
  Target, 
  CheckCircle2, 
  LogOut, 
  ExternalLink,
  Sparkles,
  User,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface StudentProfileViewProps {
  student: StudentProfile;
  targetCareer: CareerRole;
  onLogout: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  student,
  targetCareer,
  onLogout,
  onNavigate,
}) => {
  const verifiedSkills = student.skills.filter((s) => s.verified);
  const claimedSkills = student.skills.filter((s) => !s.verified);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          <div className="flex items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-500/20 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                  {student.name}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active Job Seeker
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-600">{student.title}</p>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                  {student.university} &bull; Class of {student.graduationYear}
                </span>
                <span>&bull;</span>
                <span className="font-semibold text-slate-700">GPA: {student.gpa}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <button
              onClick={() => onNavigate('skills')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Verify More Skills</span>
            </button>
          </div>

        </div>

        {/* Bio */}
        <div className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">About Alex</h2>
          <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
            {student.bio}
          </p>
        </div>
      </div>

      {/* Target Role & Skills Diagnostic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Target Role Spotlight */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">Active Career Objective</h2>
            </div>
            <button
              onClick={() => onNavigate('career-gps')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View GPS</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Role</span>
                <h3 className="text-base font-bold text-slate-900">{targetCareer.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{targetCareer.averageSalary} starting salary</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-medium">Growth</span>
                <div className="text-sm font-bold text-emerald-600">{targetCareer.growthRate}</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-600 block">Critical Role Competencies:</span>
            <div className="flex flex-wrap gap-1.5">
              {targetCareer.requiredSkills.slice(0, 6).map((req) => {
                const userSkill = student.skills.find(
                  (s) => s.name.toLowerCase() === req.name.toLowerCase()
                );
                const isVerified = userSkill?.verified;
                return (
                  <span
                    key={req.name}
                    className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${
                      isVerified
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold'
                        : userSkill
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {isVerified ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    ) : userSkill ? (
                      <Circle className="w-2.5 h-2.5 text-amber-500" />
                    ) : null}
                    <span>{req.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Skills Verification Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">Skills Verification Diagnostic</h2>
            </div>
            <button
              onClick={() => onNavigate('skills')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Skills Page</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                Verified Skills
              </span>
              <div className="text-2xl font-extrabold text-emerald-800 font-display mt-0.5">
                {verifiedSkills.length}
              </div>
              <span className="text-[10px] text-emerald-600 font-medium">100% Recruiter Trust</span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                Claimed Skills
              </span>
              <div className="text-2xl font-extrabold text-amber-800 font-display mt-0.5">
                {claimedSkills.length}
              </div>
              <span className="text-[10px] text-amber-600 font-medium">Awaiting Assessment</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-600 mb-2 block">Recent Verifications:</span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {verifiedSkills.slice(0, 3).map((v) => (
                <div 
                  key={v.id} 
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{v.name}</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {v.verificationScore || 85}% Assessed
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Account Settings & Log Out Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Account & Session</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Logged in as <strong className="text-slate-700">alex.chen@berkeley.edu</strong> &bull; Hackathon Prototype Demo
            </p>
          </div>

          <button
            id="student-logout-button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors shrink-0 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

    </div>
  );
};
