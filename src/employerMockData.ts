import { Candidate, EmployerJob, EmployerProfile } from './types';

export const INITIAL_EMPLOYER_PROFILE: EmployerProfile = {
  companyName: 'NexusTech Labs',
  tagline: 'Building next-generation intelligent enterprise cloud infrastructure',
  industry: 'Enterprise Software & Cloud AI',
  companySize: '150 - 500 Employees',
  location: 'San Francisco, CA & Remote',
  website: 'https://nexustechlabs.example.com',
  logoUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=200',
  description: 'NexusTech Labs builds developer acceleration tools and high-scale cloud platforms. We actively recruit early-career engineers from top university programs and non-traditional engineering backgrounds.',
  techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Python', 'Go', 'Kubernetes'],
  hiringManagerName: 'Elena Rostova',
  hiringManagerTitle: 'Head of Engineering Talent & Early Careers',
  hiringManagerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  hiringManagerEmail: 'elena.rostova@nexustechlabs.example.com',
};

export const EMPLOYER_JOBS: EmployerJob[] = [
  {
    id: 'job-fullstack-jr',
    title: 'Junior Full Stack Developer',
    department: 'Core Product Engineering',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    salaryRange: '$95,000 - $125,000 / yr',
    experienceLevel: 'Entry-Level / 0-2 yrs',
    postedDate: '3 days ago',
    applicantCount: 42,
    reviewedCount: 18,
    description: 'We are seeking an enthusiastic Junior Full Stack Developer to build delightful end-to-end customer features. You will craft responsive user interfaces in React, engineer reliable microservice APIs in Node.js, and interact with relational databases using SQL.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
    preferredSkills: ['TypeScript', 'Tailwind CSS', 'Docker', 'PostgreSQL', 'RESTful APIs'],
    responsibilities: [
      'Implement reusable UI components and client-side application workflows with React',
      'Design and maintain robust server-side APIs in Node.js and Express',
      'Write optimized SQL queries, manage database migrations, and ensure data integrity',
      'Collaborate via Git pull requests, peer reviews, and automated CI/CD checks',
      'Participate in agile sprint ceremonies and collaborate closely with product designers',
    ],
  },
  {
    id: 'job-ai-engineer-jr',
    title: 'Junior AI & Data Engineer',
    department: 'Applied Intelligence Team',
    location: 'San Francisco, CA or Remote',
    type: 'Full-time',
    salaryRange: '$110,000 - $138,000 / yr',
    experienceLevel: 'Entry-Level / 0-2 yrs',
    postedDate: '1 week ago',
    applicantCount: 56,
    reviewedCount: 24,
    description: 'Join our Applied AI team to bridge modern generative models with production infrastructure. You will work on data ingestion pipelines, vector search indexing, and high-performance inference APIs.',
    requiredSkills: ['Python', 'SQL', 'Git', 'Pandas', 'Node.js', 'Docker'],
    preferredSkills: ['PyTorch', 'Vector Databases', 'AWS', 'FastAPI', 'LLM Prompt Engineering'],
    responsibilities: [
      'Develop scalable ETL pipelines and vector search indexing jobs in Python',
      'Integrate foundation model endpoints into production web applications',
      'Write unit and integration tests for data processing workflows',
      'Monitor inference latencies, token consumption, and embedding accuracy',
    ],
  },
  {
    id: 'job-frontend-intern',
    title: 'Frontend Developer Intern',
    department: 'Growth & Web Experience',
    location: 'Remote (US)',
    type: 'Internship',
    salaryRange: '$48 - $55 / hr',
    experienceLevel: 'Undergraduate / Co-op',
    postedDate: '2 weeks ago',
    applicantCount: 78,
    reviewedCount: 42,
    description: 'A 12-week summer internship where you will ship customer-facing web experiences, improve core web vitals, and work directly with senior staff engineers.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
    preferredSkills: ['TypeScript', 'Tailwind CSS', 'Next.js', 'Figma'],
    responsibilities: [
      'Ship polished UI features using modern React and CSS frameworks',
      'Partner with UX designers to translate wireframes into accessible interfaces',
      'Optimize web page loading speeds and responsiveness across mobile viewports',
    ],
  },
];

export const CANDIDATES: Candidate[] = [
  {
    id: 'candidate-alex-chen',
    name: 'Alex Chen',
    title: 'CS Junior & Full-Stack AI Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    email: 'alex.chen@berkeley.edu',
    phone: '(510) 842-1980',
    location: 'Berkeley, CA',
    education: 'B.S. in Computer Science & Data Science Minor',
    university: 'UC Berkeley',
    graduationYear: 'May 2027',
    gpa: '3.78 / 4.00',
    experienceLevel: 'Internship',
    bio: 'Passionate junior software engineer proficient in modern TypeScript/React frontends and Node.js/Python server architectures. Lead builder in CalHacks with high attention to clean architecture and UI craft.',
    primaryDomain: 'Full Stack',
    appliedRole: 'Junior Full Stack Developer',
    appliedDate: '2 days ago',
    status: 'Shortlisted',
    skills: [
      { name: 'HTML', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'CSS', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'JavaScript', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'React', category: 'Frontend', proficiency: 'Intermediate', verified: true },
      { name: 'Node.js', category: 'Backend', proficiency: 'Intermediate', verified: true },
      { name: 'SQL', category: 'Backend', proficiency: 'Intermediate', verified: true },
      { name: 'Git', category: 'Mobile & Systems', proficiency: 'Advanced', verified: true },
      { name: 'TypeScript', category: 'Frontend', proficiency: 'Intermediate', verified: true },
      { name: 'Python', category: 'Backend', proficiency: 'Advanced', verified: true },
      { name: 'Pandas', category: 'AI & Data', proficiency: 'Intermediate', verified: true },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'PostgreSQL', category: 'Backend', proficiency: 'Intermediate', verified: true },
    ],
    projects: [
      {
        title: 'CareerPulse Navigation Engine',
        description: 'Interactive career guidance web app with real-time skill gap analysis, What-If simulator, and responsive roadmaps.',
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
        githubUrl: 'https://github.com/alexchen/careerpulse',
        demoUrl: 'https://careerpulse.demo',
      },
      {
        title: 'Berkeley Course Review & Schedule Planner',
        description: 'Full-stack web application serving 4,000+ monthly students with course evaluation rankings and timetable conflict solver.',
        techStack: ['Node.js', 'Express', 'PostgreSQL', 'React', 'SQL'],
        githubUrl: 'https://github.com/alexchen/cal-schedule',
      },
      {
        title: 'DocuQuery RAG Vector Engine',
        description: 'Semantic PDF search and question-answering assistant using hybrid dense-sparse embeddings and vector indexing.',
        techStack: ['Python', 'FastAPI', 'Pandas', 'Docker'],
      },
    ],
    experience: [
      {
        role: 'Software Engineering Fellow',
        company: 'CalHacks Open Source Guild',
        period: 'Jun 2025 - Aug 2025',
        description: 'Architected full-stack event check-in system used by 2,200 attendees. Reduced query latency by 45% using Postgres index optimization.',
      },
      {
        role: 'Undergraduate Course Tutor',
        company: 'UC Berkeley EECS Dept',
        period: 'Aug 2025 - Present',
        description: 'Taught weekly lab sections on Data Structures, OOP, and Git collaboration workflows for 60+ computer science students.',
      },
    ],
  },
  {
    id: 'candidate-maya-patel',
    name: 'Maya Patel',
    title: 'Software Engineer & Full-Stack Builder',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=250',
    email: 'mayapatel@andrew.cmu.edu',
    phone: '(412) 693-4412',
    location: 'Pittsburgh, PA (Open to relocate)',
    education: 'B.S. in Software Engineering',
    university: 'Carnegie Mellon University',
    graduationYear: 'May 2026',
    gpa: '3.85 / 4.00',
    experienceLevel: 'Associate',
    bio: 'Software engineer with 8 months of co-op experience building production React micro-frontends, robust GraphQL/REST services, and high-volume SQL databases. Enthusiastic about design systems and test-driven development.',
    primaryDomain: 'Full Stack',
    appliedRole: 'Junior Full Stack Developer',
    appliedDate: 'Yesterday',
    status: 'Under Review',
    skills: [
      { name: 'HTML', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'CSS', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'JavaScript', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'React', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'Node.js', category: 'Backend', proficiency: 'Advanced', verified: true },
      { name: 'SQL', category: 'Backend', proficiency: 'Intermediate', verified: true },
      { name: 'Git', category: 'Mobile & Systems', proficiency: 'Advanced', verified: true },
      { name: 'TypeScript', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'Next.js', category: 'Frontend', proficiency: 'Intermediate', verified: true },
      { name: 'GraphQL', category: 'Backend', proficiency: 'Intermediate', verified: true },
      { name: 'Docker', category: 'Cloud & DevOps', proficiency: 'Beginner', verified: false },
    ],
    projects: [
      {
        title: 'DevFlow Agile Sprint Tracker',
        description: 'Real-time collaborative Kanban board with instant WebSocket synchronization and automated Burndown metrics.',
        techStack: ['React', 'Node.js', 'SQL', 'TypeScript', 'Socket.io'],
        githubUrl: 'https://github.com/mayapatel/devflow',
      },
      {
        title: 'Distributed Distributed In-Memory Key-Value Store',
        description: 'Replicated in-memory database implementing Raft consensus for high availability and fault-tolerant partitions.',
        techStack: ['Go', 'Docker', 'Git'],
      },
    ],
    experience: [
      {
        role: 'Software Engineering Co-op',
        company: 'Stripe',
        period: 'Jan 2025 - Jun 2025',
        description: 'Engineered reusable payment checkout components used across merchant dashboards. Automated unit test suites increasing coverage from 72% to 94%.',
      },
      {
        role: 'Full-Stack Developer Intern',
        company: 'Robotics Institute CMU',
        period: 'Summer 2024',
        description: 'Created telemetry dashboard for autonomous vehicle test fleet streaming live GPS coordinates and LiDAR health checks.',
      },
    ],
  },
  {
    id: 'candidate-marcus-vance',
    name: 'Marcus Vance',
    title: 'Backend & Systems Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    email: 'm.vance@uw.edu',
    phone: '(206) 555-0199',
    location: 'Seattle, WA',
    education: 'B.S. in Computer Engineering',
    university: 'University of Washington',
    graduationYear: 'June 2026',
    gpa: '3.65 / 4.00',
    experienceLevel: 'Junior (1-2 yrs)',
    bio: 'Systems-focused software engineer with deep interest in distributed backends, database query optimization, and Linux kernel programming. Proficient in Node.js, SQL, Go, and Python.',
    primaryDomain: 'Backend',
    appliedRole: 'Junior Full Stack Developer',
    appliedDate: '4 days ago',
    status: 'New Applicant',
    skills: [
      { name: 'Node.js', category: 'Backend', proficiency: 'Advanced', verified: true },
      { name: 'SQL', category: 'Backend', proficiency: 'Advanced', verified: true },
      { name: 'Git', category: 'Mobile & Systems', proficiency: 'Advanced', verified: true },
      { name: 'JavaScript', category: 'Frontend', proficiency: 'Intermediate', verified: true },
      { name: 'HTML', category: 'Frontend', proficiency: 'Beginner', verified: true },
      { name: 'Python', category: 'Backend', proficiency: 'Advanced', verified: true },
      { name: 'Docker', category: 'Cloud & DevOps', proficiency: 'Intermediate', verified: true },
      { name: 'PostgreSQL', category: 'Backend', proficiency: 'Advanced', verified: true },
      { name: 'Linux', category: 'Mobile & Systems', proficiency: 'Advanced', verified: true },
    ],
    projects: [
      {
        title: 'High-Throughput Log Aggregator',
        description: 'Event ingest pipeline processing 25,000 JSON messages/sec with batched disk writes and SQL analytics indexing.',
        techStack: ['Node.js', 'SQL', 'PostgreSQL', 'Docker', 'Git'],
        githubUrl: 'https://github.com/marcusvance/logstream',
      },
      {
        title: 'Microservices Payment Gateway Mock',
        description: 'Simulated multi-currency settlement gateway with idempotency keys and transactional retry queues.',
        techStack: ['Go', 'Node.js', 'SQL', 'Docker'],
      },
    ],
    experience: [
      {
        role: 'Backend Engineering Intern',
        company: 'Nordstrom Technology',
        period: 'Jun 2025 - Sep 2025',
        description: 'Refactored legacy inventory REST APIs to Node.js microservices. Decreased 99th percentile response time by 38ms.',
      },
    ],
  },
  {
    id: 'candidate-sofia-rodriguez',
    name: 'Sofia Rodriguez',
    title: 'Frontend & UI Systems Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    email: 'sofia.rodriguez@stanford.edu',
    phone: '(650) 723-2300',
    location: 'Palo Alto, CA',
    education: 'B.S. in Symbolic Systems (HCI & CS)',
    university: 'Stanford University',
    graduationYear: 'June 2027',
    gpa: '3.92 / 4.00',
    experienceLevel: 'Entry-Level',
    bio: 'Product-minded frontend engineer obsessive about typography, interaction physics, accessibility, and design tokens. Extensive experience building enterprise component libraries with React and modern CSS.',
    primaryDomain: 'Frontend',
    appliedRole: 'Junior Full Stack Developer',
    appliedDate: '5 days ago',
    status: 'Interview Scheduled',
    skills: [
      { name: 'HTML', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'CSS', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'JavaScript', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'React', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'Git', category: 'Mobile & Systems', proficiency: 'Advanced', verified: true },
      { name: 'TypeScript', category: 'Frontend', proficiency: 'Intermediate', verified: true },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'Figma', category: 'Product & Soft Skills', proficiency: 'Advanced', verified: true },
    ],
    projects: [
      {
        title: 'Aurora Design System',
        description: 'Open-source, WCAG 2.1 AAA accessible React component library with automated token documentation and storybook test suite.',
        techStack: ['React', 'CSS', 'HTML', 'TypeScript', 'Git'],
        githubUrl: 'https://github.com/sofiarodriguez/aurora-ui',
      },
      {
        title: 'Student Wellness Portal',
        description: 'Responsive mental wellness mood logging interface with SVG progress rings and offline IndexedDB sync.',
        techStack: ['React', 'JavaScript', 'Tailwind CSS', 'HTML'],
      },
    ],
    experience: [
      {
        role: 'Frontend UI/UX Intern',
        company: 'Khan Academy',
        period: 'Jun 2025 - Aug 2025',
        description: 'Implemented accessible math keypad components for screen-reader learners across desktop and tablet formats.',
      },
    ],
  },
  {
    id: 'candidate-david-kim',
    name: 'David Kim',
    title: 'Full-Stack Developer & Cloud Enthusiast',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    email: 'dkim45@gatech.edu',
    phone: '(404) 894-2000',
    location: 'Atlanta, GA (Open to relocate)',
    education: 'B.S. in Computer Science',
    university: 'Georgia Institute of Technology',
    graduationYear: 'Dec 2026',
    gpa: '3.72 / 4.00',
    experienceLevel: 'Junior (1-2 yrs)',
    bio: 'Proactive builder skilled in React, Node.js, and cloud containerization. Built multiple deployed SaaS prototypes with automated CI/CD pipelines and responsive mobile-first interfaces.',
    primaryDomain: 'Full Stack',
    appliedRole: 'Junior Full Stack Developer',
    appliedDate: '3 days ago',
    status: 'Shortlisted',
    skills: [
      { name: 'HTML', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'CSS', category: 'Frontend', proficiency: 'Intermediate', verified: true },
      { name: 'JavaScript', category: 'Frontend', proficiency: 'Advanced', verified: true },
      { name: 'React', category: 'Frontend', proficiency: 'Intermediate', verified: true },
      { name: 'Node.js', category: 'Backend', proficiency: 'Intermediate', verified: true },
      { name: 'Git', category: 'Mobile & Systems', proficiency: 'Advanced', verified: true },
      { name: 'SQL', category: 'Backend', proficiency: 'Beginner', verified: true },
      { name: 'AWS', category: 'Cloud & DevOps', proficiency: 'Intermediate', verified: true },
      { name: 'Docker', category: 'Cloud & DevOps', proficiency: 'Intermediate', verified: true },
    ],
    projects: [
      {
        title: 'CloudMedia Transcoder Service',
        description: 'Automated video compression pipeline utilizing Node.js worker threads and AWS S3 signed upload triggers.',
        techStack: ['Node.js', 'React', 'AWS', 'Docker', 'Git'],
        githubUrl: 'https://github.com/davidkim/transcoder',
      },
      {
        title: 'Campus Food Truck Locator',
        description: 'Live geolocation mapping app showing campus vendor schedules, menu prices, and wait-time estimations.',
        techStack: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js'],
      },
    ],
    experience: [
      {
        role: 'Full-Stack Developer Intern',
        company: 'Delta Air Lines IT',
        period: 'May 2025 - Aug 2025',
        description: 'Assisted in migration of internal ground operations portal to React and Node.js REST services.',
      },
    ],
  },
];

/**
 * Normalizes and calculates skill matching between candidate and required job skills
 */
export function calculateCandidateMatch(
  candidate: Candidate,
  requiredSkills: string[]
): {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
} {
  const candidateSkillNames = candidate.skills.map((s) => s.name.toLowerCase().trim());

  const matchingSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const req of requiredSkills) {
    const reqNormalized = req.toLowerCase().trim();
    // Check direct equality or substring inclusion (e.g. SQL in PostgreSQL / SQL)
    const hasSkill = candidateSkillNames.some(
      (cs) => cs === reqNormalized || cs.includes(reqNormalized) || reqNormalized.includes(cs)
    );

    if (hasSkill) {
      matchingSkills.push(req);
    } else {
      missingSkills.push(req);
    }
  }

  const matchPercentage =
    requiredSkills.length > 0
      ? Math.round((matchingSkills.length / requiredSkills.length) * 100)
      : 0;

  return {
    matchPercentage,
    matchingSkills,
    missingSkills,
  };
}
