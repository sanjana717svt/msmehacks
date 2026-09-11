import React, { useState } from 'react';
import { 
  NavigationTab, 
  SkillProficiency, 
  StudentProfile, 
  UserSkill, 
  UserRole, 
  EmployerNavTab, 
  Candidate, 
  EmployerJob, 
  EmployerProfile 
} from './types';
import { CAREER_ROLES, INITIAL_STUDENT_PROFILE } from './mockData';
import { 
  INITIAL_EMPLOYER_PROFILE, 
  EMPLOYER_JOBS, 
  CANDIDATES 
} from './employerMockData';

// Job Seeker (Student) Components
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { SkillsSection } from './components/SkillsSection';
import { CareerGPS } from './components/CareerGPS';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { CareerMatches } from './components/CareerMatches';
import { StudentProfileView } from './components/StudentProfileView';

// Auth, Role Selection & Employer Experience Components
import { AuthScreen } from './components/AuthScreen';
import { RoleSelection } from './components/RoleSelection';
import { EmployerNavbar } from './components/EmployerNavbar';
import { EmployerHome } from './components/EmployerHome';
import { EmployerDashboard } from './components/EmployerDashboard';
import { EmployerJobs } from './components/EmployerJobs';
import { EmployerCandidates } from './components/EmployerCandidates';
import { EmployerCandidateMatches } from './components/EmployerCandidateMatches';
import { EmployerProfileView } from './components/EmployerProfileView';
import { CandidateProfileModal } from './components/CandidateProfileModal';

import { 
  Compass, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Building2 
} from 'lucide-react';

export default function App() {
  // Navigation screen stage:
  // 1. 'role-selection' -> "Who are you?" with Job Seeker & Employer cards. NO login form.
  // 2. 'job-seeker-auth' -> Job Seeker Login & Sign Up. Empty fields.
  // 3. 'employer-auth' -> Employer Login & Sign Up. Empty fields.
  // 4. 'job-seeker-app' -> Job Seeker Experience.
  // 5. 'employer-app' -> Employer Experience.
  const [currentScreen, setCurrentScreen] = useState<
    'role-selection' | 'job-seeker-auth' | 'employer-auth' | 'job-seeker-app' | 'employer-app'
  >('role-selection');

  // Job Seeker State
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');

  // Employer State
  const [employerTab, setEmployerTab] = useState<EmployerNavTab>('dashboard');
  const [employerProfile, setEmployerProfile] = useState<EmployerProfile>(INITIAL_EMPLOYER_PROFILE);
  const [jobs, setJobs] = useState<EmployerJob[]>(EMPLOYER_JOBS);
  const [selectedJobId, setSelectedJobId] = useState<string>('job-fullstack-jr');
  const [candidates, setCandidates] = useState<Candidate[]>(CANDIDATES);
  const [modalCandidate, setModalCandidate] = useState<Candidate | null>(null);

  // Active target career for Job Seeker
  const targetCareer =
    CAREER_ROLES.find((c) => c.id === student.targetCareerId) || CAREER_ROLES[0];

  // Currently selected job for Employer matching
  const currentSelectedJob =
    jobs.find((j) => j.id === selectedJobId) || jobs[0];

  // Handlers for Skills (Job Seeker)
  const handleAddSkill = (newSkill: UserSkill) => {
    setStudent((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const handleUpdateSkillProficiency = (skillId: string, proficiency: SkillProficiency) => {
    setStudent((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === skillId ? { ...s, proficiency } : s)),
    }));
  };

  const handleRemoveSkill = (skillId: string) => {
    setStudent((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== skillId),
    }));
  };

  const handleVerifySkill = (skillId: string, score: number, verifiedSource: string = 'Verified via CareerPulse Assessment') => {
    const normKey = skillId.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    setStudent((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => {
        const sNorm = s.id.toLowerCase().replace(/[^a-z0-9]/g, '');
        const sNameNorm = s.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (s.id === skillId || sNorm === normKey || sNameNorm === normKey || sNameNorm.includes(normKey)) {
          return {
            ...s,
            verified: true,
            verificationScore: score,
            verificationDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            verifiedSource,
            lastPracticed: 'Today',
          };
        }
        return s;
      }),
    }));

    // Also sync candidate profile if Alex Chen is in candidates
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.name.toLowerCase().includes('alex chen')) {
          return {
            ...c,
            skills: c.skills.map((sk) => {
              const skNorm = sk.name.toLowerCase().replace(/[^a-z0-9]/g, '');
              if (skNorm === normKey || skNorm.includes(normKey)) {
                return {
                  ...sk,
                  verified: true,
                  score,
                  verifiedSource: 'CareerPulse Assessment',
                };
              }
              return sk;
            }),
          };
        }
        return c;
      })
    );
  };

  // Handler for Milestone completion in Career GPS (Job Seeker)
  const handleToggleMilestone = (milestoneId: string) => {
    setStudent((prev) => {
      const exists = prev.completedMilestoneIds.includes(milestoneId);
      return {
        ...prev,
        completedMilestoneIds: exists
          ? prev.completedMilestoneIds.filter((id) => id !== milestoneId)
          : [...prev.completedMilestoneIds, milestoneId],
      };
    });
  };

  // Handler for Target Career Selection (Job Seeker)
  const handleSelectTargetCareer = (careerId: string) => {
    setStudent((prev) => ({
      ...prev,
      targetCareerId: careerId,
    }));
  };

  // Handler for committing simulated skills from What-If Simulator (Job Seeker)
  const handleCommitSkills = (newSkills: UserSkill[]) => {
    setStudent((prev) => ({
      ...prev,
      skills: newSkills.map((s) => ({
        ...s,
        verified: true,
        verifiedSource: s.verifiedSource || 'Simulated & Committed',
        lastPracticed: 'Today',
      })),
    }));
  };

  // Handler for updating candidate status (Employer)
  const handleUpdateCandidateStatus = (candidateId: string, newStatus: Candidate['status']) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    );
    if (modalCandidate && modalCandidate.id === candidateId) {
      setModalCandidate((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Handler for Log Out (available in Profile for Job Seeker and Employer)
  // Per requirements: returns directly to the FIRST screen: Role Selection ("Who are you?")
  const handleLogout = () => {
    setCurrentScreen('role-selection');
    setActiveTab('dashboard');
    setEmployerTab('dashboard');
  };

  // ==========================================
  // VIEW 1: ROLE SELECTION SCREEN (FIRST SCREEN)
  // Asks "Who are you?" with Job Seeker & Employer options.
  // NO login form on this first screen.
  // ==========================================
  if (currentScreen === 'role-selection') {
    return (
      <RoleSelection
        onSelectRole={(role) => {
          if (role === 'job-seeker') {
            setCurrentScreen('job-seeker-auth');
          } else {
            setCurrentScreen('employer-auth');
          }
        }}
      />
    );
  }

  // ==========================================
  // VIEW 2A: JOB SEEKER AUTHENTICATION (LOGIN / SIGN UP)
  // Empty fields by default, no pre-filled credentials.
  // Navigates directly to Job Seeker Dashboard upon submit.
  // ==========================================
  if (currentScreen === 'job-seeker-auth') {
    return (
      <AuthScreen
        role="job-seeker"
        onBackToRoleSelection={() => setCurrentScreen('role-selection')}
        onAuthenticate={(userData) => {
          if (userData?.name && userData.name !== 'Alex Chen') {
            setStudent((prev) => ({
              ...prev,
              name: userData.name,
            }));
          }
          setActiveTab('dashboard');
          setCurrentScreen('job-seeker-app');
        }}
      />
    );
  }

  // ==========================================
  // VIEW 2B: EMPLOYER AUTHENTICATION (LOGIN / SIGN UP)
  // Empty fields by default, no pre-filled credentials.
  // Navigates directly to Employer Dashboard upon submit.
  // ==========================================
  if (currentScreen === 'employer-auth') {
    return (
      <AuthScreen
        role="employer"
        onBackToRoleSelection={() => setCurrentScreen('role-selection')}
        onAuthenticate={(userData) => {
          if (userData?.email) {
            setEmployerProfile((prev) => ({
              ...prev,
              hiringManagerEmail: userData.email,
              hiringManagerName: userData.name || prev.hiringManagerName,
            }));
          }
          setEmployerTab('dashboard');
          setCurrentScreen('employer-app');
        }}
      />
    );
  }

  // ==========================================
  // VIEW 3: EMPLOYER EXPERIENCE
  // ==========================================
  if (currentScreen === 'employer-app') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        
        {/* Top Hackathon Demo Bar */}
        <div className="bg-slate-950 text-slate-300 py-1.5 px-4 text-xs font-medium border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="font-semibold text-white">CareerPulse &bull; Employer Portal</span>
              <span className="text-slate-500 hidden sm:inline">&bull;</span>
              <span className="text-slate-400 hidden sm:inline">Active Company: {employerProfile.companyName}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Hiring Manager: {employerProfile.hiringManagerName}</span>
            </div>
          </div>
        </div>

        {/* Employer Navbar */}
        <EmployerNavbar
          activeTab={employerTab}
          setActiveTab={setEmployerTab}
          employer={employerProfile}
          totalApplicants={jobs.reduce((acc, j) => acc + j.applicantCount, 0)}
        />

        {/* Employer Main View */}
        <main className="flex-1">
          {employerTab === 'home' && (
            <EmployerHome
              employer={employerProfile}
              jobs={jobs}
              onNavigate={setEmployerTab}
              onSelectJob={setSelectedJobId}
            />
          )}

          {employerTab === 'dashboard' && (
            <EmployerDashboard
              employer={employerProfile}
              jobs={jobs}
              candidates={candidates}
              selectedJobId={selectedJobId}
              onSelectJob={setSelectedJobId}
              onViewProfile={(c) => setModalCandidate(c)}
              onNavigate={setEmployerTab}
            />
          )}

          {employerTab === 'jobs' && (
            <EmployerJobs
              jobs={jobs}
              selectedJobId={selectedJobId}
              onSelectJob={setSelectedJobId}
              onNavigate={setEmployerTab}
            />
          )}

          {employerTab === 'candidates' && (
            <EmployerCandidates
              candidates={candidates}
              jobs={jobs}
              onViewProfile={(c) => setModalCandidate(c)}
            />
          )}

          {employerTab === 'matches' && (
            <EmployerCandidateMatches
              candidates={candidates}
              jobs={jobs}
              selectedJobId={selectedJobId}
              onSelectJob={setSelectedJobId}
              onViewProfile={(c) => setModalCandidate(c)}
            />
          )}

          {employerTab === 'profile' && (
            <EmployerProfileView
              employer={employerProfile}
              onLogout={handleLogout}
            />
          )}
        </main>

        {/* Candidate Profile Modal */}
        <CandidateProfileModal
          candidate={modalCandidate}
          job={currentSelectedJob}
          onClose={() => setModalCandidate(null)}
          onUpdateStatus={handleUpdateCandidateStatus}
        />

        {/* Employer Footer */}
        <footer className="bg-white border-t border-slate-200 mt-auto py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-sm text-slate-800">
                CareerPulse for Employers
              </span>
              <span className="text-xs text-slate-500 ml-1">
                &bull; Verified Tech Talent Discovery
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <button onClick={() => setEmployerTab('home')} className="hover:text-slate-900">Home</button>
              <button onClick={() => setEmployerTab('dashboard')} className="hover:text-slate-900">Dashboard</button>
              <button onClick={() => setEmployerTab('jobs')} className="hover:text-slate-900">Jobs</button>
              <button onClick={() => setEmployerTab('candidates')} className="hover:text-slate-900">Candidates</button>
              <button onClick={() => setEmployerTab('matches')} className="hover:text-slate-900">Candidate Matches</button>
              <button onClick={() => setEmployerTab('profile')} className="hover:text-slate-900">Profile</button>
              <button onClick={handleLogout} className="text-rose-600 hover:text-rose-700 font-semibold cursor-pointer">Log Out</button>
            </div>

            <div className="text-xs text-slate-400">
              Hackathon Edition &bull; 100% Client-Side Interactive
            </div>
          </div>
        </footer>

      </div>
    );
  }

  // ==========================================
  // VIEW 4: JOB SEEKER (STUDENT) EXPERIENCE
  // (Preserves 100% of existing functionality)
  // ==========================================
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Hackathon Demo Bar */}
      <div className="bg-slate-950 text-slate-300 py-1.5 px-4 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white">CareerPulse &bull; Job Seeker Portal</span>
            <span className="text-slate-500 hidden sm:inline">&bull;</span>
            <span className="text-slate-400 hidden sm:inline">{student.name} ({student.university})</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`hover:text-white transition-colors ${activeTab === 'dashboard' ? 'text-emerald-400 font-bold' : ''}`}
            >
              Dashboard
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setActiveTab('career-gps')}
              className={`hover:text-white transition-colors ${activeTab === 'career-gps' ? 'text-emerald-400 font-bold' : ''}`}
            >
              Career GPS
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setActiveTab('what-if')}
              className={`hover:text-white transition-colors flex items-center gap-1 ${activeTab === 'what-if' ? 'text-amber-400 font-bold' : ''}`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              What-If Simulator
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        student={student}
        targetCareerTitle={targetCareer.title}
      />

      {/* Main App View Area */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onNavigate={setActiveTab}
            student={student}
            onSelectTargetCareer={handleSelectTargetCareer}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            student={student}
            targetCareer={targetCareer}
            allCareers={CAREER_ROLES}
            onNavigate={setActiveTab}
            onSelectTargetCareer={handleSelectTargetCareer}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsSection
            student={student}
            targetCareer={targetCareer}
            onAddSkill={handleAddSkill}
            onUpdateSkillProficiency={handleUpdateSkillProficiency}
            onRemoveSkill={handleRemoveSkill}
            onVerifySkill={handleVerifySkill}
          />
        )}

        {activeTab === 'career-gps' && (
          <CareerGPS
            student={student}
            targetCareer={targetCareer}
            allCareers={CAREER_ROLES}
            onSelectTargetCareer={handleSelectTargetCareer}
            onToggleMilestone={handleToggleMilestone}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'what-if' && (
          <WhatIfSimulator
            student={student}
            targetCareer={targetCareer}
            allCareers={CAREER_ROLES}
            onCommitSkills={handleCommitSkills}
            onNavigate={setActiveTab}
            onSelectTargetCareer={handleSelectTargetCareer}
          />
        )}

        {activeTab === 'career-matches' && (
          <CareerMatches
            student={student}
            targetCareerId={student.targetCareerId}
            allCareers={CAREER_ROLES}
            onSelectTargetCareer={handleSelectTargetCareer}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'profile' && (
          <StudentProfileView
            student={student}
            targetCareer={targetCareer}
            onLogout={handleLogout}
            onNavigate={setActiveTab}
          />
        )}
      </main>

      {/* Global Application Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-sm text-slate-800">
              CareerPulse
            </span>
            <span className="text-xs text-slate-500 ml-1">
              &bull; College-to-Tech Career Navigation Platform
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <button onClick={() => setActiveTab('landing')} className="hover:text-slate-900">Home</button>
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-slate-900">Dashboard</button>
            <button onClick={() => setActiveTab('skills')} className="hover:text-slate-900">Skills</button>
            <button onClick={() => setActiveTab('career-gps')} className="hover:text-slate-900">Career GPS</button>
            <button onClick={() => setActiveTab('what-if')} className="hover:text-slate-900">What-If Simulator</button>
            <button onClick={() => setActiveTab('career-matches')} className="hover:text-slate-900">Matches</button>
            <button onClick={() => setActiveTab('profile')} className="hover:text-slate-900">Profile</button>
            <button onClick={handleLogout} className="text-rose-600 hover:text-rose-700 font-semibold cursor-pointer">Log Out</button>
          </div>

          <div className="text-xs text-slate-400">
            Hackathon Edition &bull; 100% Client-Side Interactive
          </div>
        </div>
      </footer>

    </div>
  );
}
