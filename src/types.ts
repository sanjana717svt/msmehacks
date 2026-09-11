export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'AI & Data'
  | 'Cloud & DevOps'
  | 'Mobile & Systems'
  | 'Product & Soft Skills';

export type SkillProficiency = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserSkill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: SkillProficiency;
  verified: boolean;
  verifiedSource?: string;
  verificationScore?: number;
  verificationDate?: string;
  lastPracticed?: string;
}

export interface AssessmentQuestion {
  id: string;
  type: 'multiple-choice' | 'code-output' | 'debugging' | 'coding-challenge';
  topic: string;
  prompt: string;
  codeSnippet?: string;
  language?: string;
  options?: { id: string; text: string; isCorrect: boolean }[];
  correctOptionId?: string;
  explanation?: string;
  starterCode?: string;
  expectedOutputHint?: string;
}

export interface SkillAssessmentConfig {
  skillId: string;
  skillName: string;
  category: SkillCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  passingScore: number;
  topics: string[];
  questions: AssessmentQuestion[];
}

export interface AssessmentResult {
  skillId: string;
  skillName: string;
  score: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
  skillLevelAchieved: string;
  strongTopics: string[];
  weakTopics: string[];
  timestamp: string;
}

export interface SkillCatalogItem {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  popularWithCareers: string[];
}

export interface RoadmapResource {
  title: string;
  type: 'Course' | 'Project' | 'Docs' | 'Interactive Lab' | 'Video Tutorial';
  provider: string;
  estimatedHours: number;
  badge?: string;
  link?: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  phase: number;
  phaseTitle: string;
  description: string;
  estimatedWeeks: number;
  requiredSkills: string[];
  resources: RoadmapResource[];
  projectIdea: {
    title: string;
    description: string;
    deliverables: string[];
    portfolioHighlight: string;
  };
}

export interface CareerRole {
  id: string;
  title: string;
  category: 'Software Engineering' | 'Data & AI' | 'Cloud & Systems' | 'Product & Security';
  tagline: string;
  description: string;
  averageSalary: string;
  growthRate: string;
  openRolesCount: number;
  experienceLevel: 'Entry-Level' | 'Associate' | 'Mid-Level';
  requiredSkills: {
    skillId: string;
    name: string;
    category: SkillCategory;
    importance: 'Critical' | 'Important' | 'Bonus';
    targetProficiency: SkillProficiency;
  }[];
  dayInLife: string[];
  topCompanies: string[];
  roadmapPhases: {
    phase: number;
    phaseTitle: string;
    focus: string;
    duration: string;
    milestones: RoadmapMilestone[];
  }[];
}

export interface StudentProfile {
  id: string;
  name: string;
  title: string;
  university: string;
  major: string;
  year: string;
  graduationYear: string;
  gpa: string;
  avatarUrl: string;
  bio: string;
  targetCareerId: string;
  skills: UserSkill[];
  completedMilestoneIds: string[];
  savedCareerIds: string[];
}

export type NavigationTab =
  | 'landing'
  | 'dashboard'
  | 'skills'
  | 'career-gps'
  | 'what-if'
  | 'career-matches'
  | 'profile';

export type UserRole = 'selection' | 'job-seeker' | 'employer';

export type EmployerNavTab =
  | 'home'
  | 'dashboard'
  | 'jobs'
  | 'candidates'
  | 'matches'
  | 'profile';

export interface CandidateSkill {
  name: string;
  category: SkillCategory;
  proficiency: SkillProficiency;
  verified: boolean;
  score?: number;
  verifiedSource?: string;
}

export interface CandidateProject {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface CandidateExperience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Candidate {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  university: string;
  graduationYear: string;
  gpa: string;
  experienceLevel: 'Entry-Level' | 'Internship' | 'Junior (1-2 yrs)' | 'Associate';
  bio: string;
  primaryDomain: 'Frontend' | 'Backend' | 'Full Stack' | 'AI & Data';
  skills: CandidateSkill[];
  projects: CandidateProject[];
  experience: CandidateExperience[];
  status: 'New Applicant' | 'Under Review' | 'Interview Scheduled' | 'Shortlisted';
  appliedDate: string;
  appliedRole: string;
}

export interface EmployerJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract';
  salaryRange: string;
  experienceLevel: string;
  postedDate: string;
  applicantCount: number;
  reviewedCount: number;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
}

export interface EmployerProfile {
  companyName: string;
  tagline: string;
  industry: string;
  companySize: string;
  location: string;
  website: string;
  logoUrl: string;
  description: string;
  techStack: string[];
  hiringManagerName: string;
  hiringManagerTitle: string;
  hiringManagerAvatar: string;
  hiringManagerEmail: string;
}
