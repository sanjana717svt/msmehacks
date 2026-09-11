import { CareerRole, SkillCatalogItem, StudentProfile, UserSkill } from './types';

export const SKILLS_CATALOG: SkillCatalogItem[] = [
  { id: 'javascript', name: 'JavaScript', category: 'Frontend', description: 'Core web language for DOM manipulation, async logic, and dynamic web applications', popularWithCareers: ['fullstack-dev', 'ai-engineer'] },
  { id: 'html', name: 'HTML', category: 'Frontend', description: 'Semantic document structure, accessibility semantics, and SEO web standards', popularWithCareers: ['fullstack-dev'] },
  { id: 'css', name: 'CSS', category: 'Frontend', description: 'Cascading stylesheets, flexbox, CSS grid, and responsive design', popularWithCareers: ['fullstack-dev'] },
  { id: 'react', name: 'React.js', category: 'Frontend', description: 'Component-driven frontend UI development with hooks and modern state', popularWithCareers: ['fullstack-dev', 'ai-engineer'] },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend', description: 'Strongly typed JavaScript for robust client and server applications', popularWithCareers: ['fullstack-dev', 'ai-engineer', 'cloud-devops'] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', description: 'Utility-first CSS framework for rapid modern UI design', popularWithCareers: ['fullstack-dev'] },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend', description: 'Full-stack React framework with server-side rendering and API routes', popularWithCareers: ['fullstack-dev', 'ai-engineer'] },
  { id: 'python', name: 'Python', category: 'Backend', description: 'High-level programming language for web, AI, automation, and scripting', popularWithCareers: ['ai-engineer', 'ml-engineer', 'data-scientist'] },
  { id: 'nodejs', name: 'Node.js & Express', category: 'Backend', description: 'Event-driven server runtime for scalable REST and GraphQL APIs', popularWithCareers: ['fullstack-dev', 'cloud-devops'] },
  { id: 'postgresql', name: 'PostgreSQL / SQL', category: 'Backend', description: 'Relational database schema modeling, indexing, and complex queries', popularWithCareers: ['fullstack-dev', 'data-scientist', 'cloud-devops'] },
  { id: 'redis', name: 'Redis', category: 'Backend', description: 'In-memory key-value caching and message brokering', popularWithCareers: ['fullstack-dev', 'cloud-devops'] },
  { id: 'docker', name: 'Docker', category: 'Cloud & DevOps', description: 'Containerization standard for consistent dev and prod microservices', popularWithCareers: ['cloud-devops', 'ai-engineer', 'fullstack-dev'] },
  { id: 'kubernetes', name: 'Kubernetes (K8s)', category: 'Cloud & DevOps', description: 'Container orchestration, autoscaling, and cluster reliability', popularWithCareers: ['cloud-devops'] },
  { id: 'aws', name: 'AWS (Cloud Computing)', category: 'Cloud & DevOps', description: 'Cloud architecture: S3, EC2, Lambda, IAM, and VPC networking', popularWithCareers: ['cloud-devops', 'fullstack-dev', 'ai-engineer'] },
  { id: 'cicd', name: 'CI/CD (GitHub Actions)', category: 'Cloud & DevOps', description: 'Automated testing, build pipelines, and zero-downtime deployment', popularWithCareers: ['cloud-devops', 'fullstack-dev'] },
  { id: 'pytorch', name: 'PyTorch', category: 'AI & Data', description: 'Deep learning framework for building, training, and fine-tuning neural nets', popularWithCareers: ['ml-engineer', 'ai-engineer'] },
  { id: 'llm-engineering', name: 'LLM & Prompt Eng / RAG', category: 'AI & Data', description: 'Retrieval Augmented Generation, vector embeddings, and LangChain/LlamaIndex', popularWithCareers: ['ai-engineer'] },
  { id: 'scikit-learn', name: 'Scikit-Learn', category: 'AI & Data', description: 'Classical machine learning algorithms: regressions, clustering, and trees', popularWithCareers: ['data-scientist', 'ml-engineer'] },
  { id: 'pandas', name: 'Pandas & NumPy', category: 'AI & Data', description: 'Data wrangling, statistical analysis, and high-performance matrix math', popularWithCareers: ['data-scientist', 'ml-engineer', 'ai-engineer'] },
  { id: 'git', name: 'Git & GitHub Workflows', category: 'Mobile & Systems', description: 'Version control, branch protection, PR code reviews, and git flow', popularWithCareers: ['fullstack-dev', 'cloud-devops', 'ai-engineer'] },
  { id: 'system-design', name: 'System Design Basics', category: 'Mobile & Systems', description: 'Architecting fault-tolerant, load-balanced, low-latency distributed systems', popularWithCareers: ['fullstack-dev', 'cloud-devops', 'ai-engineer'] },
  { id: 'linux', name: 'Linux / Bash Scripting', category: 'Mobile & Systems', description: 'Command-line fluency, shell scripting, process management, and SSH', popularWithCareers: ['cloud-devops', 'ai-engineer'] },
  { id: 'product-sense', name: 'Product Strategy & Metrics', category: 'Product & Soft Skills', description: 'User empathy, OKR alignment, sprint prioritization, and KPI tracking', popularWithCareers: ['product-manager'] },
  { id: 'agile', name: 'Agile & Team Collaboration', category: 'Product & Soft Skills', description: 'Scrum rituals, cross-functional communication, and stakeholder management', popularWithCareers: ['product-manager', 'fullstack-dev'] },
  { id: 'tech-writing', name: 'Technical Documentation', category: 'Product & Soft Skills', description: 'Writing clear architecture proposals (RFCs), API specs, and runbooks', popularWithCareers: ['fullstack-dev', 'cloud-devops', 'product-manager'] },
];

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'student-alex-chen',
  name: 'Alex Chen',
  title: 'CS Undergraduate & Aspiring Software Engineer',
  university: 'UC Berkeley',
  major: 'Computer Science & Data Science Minor',
  year: 'Junior (Year 3 of 4)',
  graduationYear: 'May 2027',
  gpa: '3.78 / 4.00',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  bio: 'Passionate about bridging modern web applications with intelligent AI workflows. Looking for Summer 2027 SWE/AI internships.',
  targetCareerId: 'fullstack-dev',
  skills: [
    { id: 'html', name: 'HTML', category: 'Frontend', proficiency: 'Advanced', verified: true, verificationScore: 95, verifiedSource: 'CareerPulse Skill Assessment', lastPracticed: 'Yesterday' },
    { id: 'css', name: 'CSS', category: 'Frontend', proficiency: 'Intermediate', verified: true, verificationScore: 88, verifiedSource: 'CareerPulse Skill Assessment', lastPracticed: 'Yesterday' },
    { id: 'javascript', name: 'JavaScript', category: 'Frontend', proficiency: 'Intermediate', verified: false, verifiedSource: 'Self-claimed', lastPracticed: '2 days ago' },
    { id: 'react', name: 'React', category: 'Frontend', proficiency: 'Intermediate', verified: true, verificationScore: 86, verifiedSource: 'CareerPulse Skill Assessment', lastPracticed: 'Yesterday' },
    { id: 'nodejs', name: 'Node.js', category: 'Backend', proficiency: 'Intermediate', verified: false, verifiedSource: 'Self-claimed', lastPracticed: '1 week ago' },
    { id: 'sql', name: 'SQL', category: 'Backend', proficiency: 'Beginner', verified: false, verifiedSource: 'Self-claimed', lastPracticed: '2 weeks ago' },
    { id: 'git', name: 'Git', category: 'Mobile & Systems', proficiency: 'Advanced', verified: true, verificationScore: 92, verifiedSource: 'CareerPulse Skill Assessment', lastPracticed: 'Yesterday' },
    { id: 'python', name: 'Python', category: 'Backend', proficiency: 'Advanced', verified: true, verificationScore: 94, verifiedSource: 'CareerPulse Skill Assessment', lastPracticed: '2 days ago' },
    { id: 'typescript', name: 'TypeScript', category: 'Frontend', proficiency: 'Intermediate', verified: true, verificationScore: 82, verifiedSource: 'CareerPulse Skill Assessment', lastPracticed: '3 days ago' },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Advanced', verified: true, verificationScore: 90, verifiedSource: 'CareerPulse Skill Assessment', lastPracticed: 'Today' },
  ],
  completedMilestoneIds: ['fs-m1', 'milestone-fnd-1'],
  savedCareerIds: ['fullstack-dev', 'ai-engineer', 'cloud-devops'],
};

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'ai-engineer',
    title: 'Full-Stack AI Engineer',
    category: 'Data & AI',
    tagline: 'Combine full-stack engineering with LLMs, prompt engineering, and intelligent agents.',
    description: 'AI Engineers bridge modern user-facing applications with cutting-edge foundation models, embedding stores, and real-time generative agents to solve high-impact user problems.',
    averageSalary: '$128,000 - $168,000 / yr',
    growthRate: '+34% YoY Demand',
    openRolesCount: 1420,
    experienceLevel: 'Entry-Level',
    requiredSkills: [
      { skillId: 'python', name: 'Python', category: 'Backend', importance: 'Critical', targetProficiency: 'Advanced' },
      { skillId: 'react', name: 'React.js', category: 'Frontend', importance: 'Critical', targetProficiency: 'Intermediate' },
      { skillId: 'typescript', name: 'TypeScript', category: 'Frontend', importance: 'Important', targetProficiency: 'Intermediate' },
      { skillId: 'llm-engineering', name: 'LLM & Prompt Eng / RAG', category: 'AI & Data', importance: 'Critical', targetProficiency: 'Intermediate' },
      { skillId: 'pytorch', name: 'PyTorch', category: 'AI & Data', importance: 'Important', targetProficiency: 'Beginner' },
      { skillId: 'docker', name: 'Docker', category: 'Cloud & DevOps', importance: 'Important', targetProficiency: 'Intermediate' },
      { skillId: 'postgresql', name: 'PostgreSQL / SQL', category: 'Backend', importance: 'Important', targetProficiency: 'Intermediate' },
      { skillId: 'system-design', name: 'System Design Basics', category: 'Mobile & Systems', importance: 'Bonus', targetProficiency: 'Beginner' },
    ],
    dayInLife: [
      'Design and deploy retrieval-augmented generation (RAG) pipelines for enterprise data.',
      'Develop interactive web interfaces using React/Next.js and streaming response handles.',
      'Evaluate model hallucination rates, latency metrics, and API cost budgets.',
      'Instrument monitoring, caching with Redis, and containerized deployment with Docker.',
    ],
    topCompanies: ['Anthropic', 'OpenAI', 'Google', 'Vercel', 'Stripe', 'Scale AI'],
    roadmapPhases: [
      {
        phase: 1,
        phaseTitle: 'Phase 1: Core Full-Stack & Python Mastery',
        focus: 'Foundational Programming, Async Python, and Component Architectures',
        duration: 'Weeks 1 - 4',
        milestones: [
          {
            id: 'milestone-fnd-1',
            title: 'Modern Async Python & Typing',
            phase: 1,
            phaseTitle: 'Phase 1: Core Full-Stack & Python Mastery',
            description: 'Master async/await, Pydantic data validation schemas, and clean object-oriented Python structure.',
            estimatedWeeks: 2,
            requiredSkills: ['python'],
            resources: [
              { title: 'FastAPI & Async Python Deep Dive', type: 'Course', provider: 'FreeCodeCamp', estimatedHours: 8, badge: 'Recommended' },
              { title: 'Official Python Type Hints & Pydantic Docs', type: 'Docs', provider: 'Python.org', estimatedHours: 4 },
            ],
            projectIdea: {
              title: 'Streaming Microservice API',
              description: 'Build an async FastAPI service that streams token chunks with WebSocket and SSE fallbacks.',
              deliverables: ['FastAPI server with rate limiting', 'Pydantic validation schemas', 'Swagger OpenAPI specs'],
              portfolioHighlight: 'Demonstrates low-latency backpressure handling',
            },
          },
          {
            id: 'milestone-fnd-2',
            title: 'Production React & State Pipelines',
            phase: 1,
            phaseTitle: 'Phase 1: Core Full-Stack & Python Mastery',
            description: 'Master TypeScript interfaces, custom React hooks, and optimistic UI updates for real-time applications.',
            estimatedWeeks: 2,
            requiredSkills: ['react', 'typescript', 'tailwind'],
            resources: [
              { title: 'Modern React Patterns with TypeScript', type: 'Interactive Lab', provider: 'FullStackOpen', estimatedHours: 12, badge: 'Hands-on' },
              { title: 'Tailwind Design System Architecture', type: 'Course', provider: 'Tailwind Labs', estimatedHours: 6 },
            ],
            projectIdea: {
              title: 'Real-time AI Chat & Prompt Workbench',
              description: 'Interactive playground supporting markdown code highlighting, token counters, and prompt diffing.',
              deliverables: ['Responsive chat UI with auto-scroll', 'Streaming state reducer', 'Export to JSON/Markdown'],
              portfolioHighlight: 'Clean design system with zero layout shifting during streaming',
            },
          },
        ],
      },
      {
        phase: 2,
        phaseTitle: 'Phase 2: RAG, Embeddings & Vector Stores',
        focus: 'Information Retrieval, Vector Databases, and Semantic Search',
        duration: 'Weeks 5 - 8',
        milestones: [
          {
            id: 'milestone-rag-1',
            title: 'Semantic Search & Vector Embeddings',
            phase: 2,
            phaseTitle: 'Phase 2: RAG, Embeddings & Vector Stores',
            description: 'Understand chunking strategies, dense vector embeddings, cosine similarity, and hybrid BM25 search.',
            estimatedWeeks: 2,
            requiredSkills: ['llm-engineering', 'pandas', 'postgresql'],
            resources: [
              { title: 'Building Production RAG Systems', type: 'Course', provider: 'DeepLearning.AI', estimatedHours: 10, badge: 'Industry Standard' },
              { title: 'pgvector & PostgreSQL Vector Extension Tutorial', type: 'Docs', provider: 'PostgreSQL Community', estimatedHours: 5 },
            ],
            projectIdea: {
              title: 'University Syllabus & Notes Knowledge Base',
              description: 'Upload course PDFs and query them semantically with verified source citations and page highlights.',
              deliverables: ['Recursive character text splitter', 'pgvector database with HNSW index', 'Source attribution pills'],
              portfolioHighlight: 'Solves real student pain point with sub-100ms retrieval speed',
            },
          },
          {
            id: 'milestone-rag-2',
            title: 'Tool Use & Agentic Function Calling',
            phase: 2,
            phaseTitle: 'Phase 2: RAG, Embeddings & Vector Stores',
            description: 'Implement structured tool calling, deterministic outputs, loop mitigation, and external API hooks.',
            estimatedWeeks: 2,
            requiredSkills: ['llm-engineering', 'python'],
            resources: [
              { title: 'Agent Architectures & Function Calling Specs', type: 'Course', provider: 'DeepLearning.AI', estimatedHours: 8 },
              { title: 'LangGraph & Deterministic State Machine Patterns', type: 'Interactive Lab', provider: 'LangChain Academy', estimatedHours: 6 },
            ],
            projectIdea: {
              title: 'Automated Research Agent for Hackathons',
              description: 'An agent that searches GitHub repos, verifies live API endpoints, and generates tech stack recommendations.',
              deliverables: ['Multi-step reasoning trace logger', 'Sandboxed code executor', 'Safety validation layer'],
              portfolioHighlight: 'Shows autonomous multi-hop reasoning capability',
            },
          },
        ],
      },
      {
        phase: 3,
        phaseTitle: 'Phase 3: Production Deployment & Dockerization',
        focus: 'Containers, Caching, Observability, and Portfolio Polish',
        duration: 'Weeks 9 - 12',
        milestones: [
          {
            id: 'milestone-prod-1',
            title: 'Docker Containerization & Caching Layers',
            phase: 3,
            phaseTitle: 'Phase 3: Production Deployment & Dockerization',
            description: 'Package full-stack AI services into lightweight multi-stage Docker images and integrate Redis semantic caching.',
            estimatedWeeks: 2,
            requiredSkills: ['docker', 'redis', 'system-design'],
            resources: [
              { title: 'Docker for Web & AI Developers', type: 'Course', provider: 'Docker Official', estimatedHours: 8, badge: 'Essential' },
              { title: 'Semantic Caching Architecture Whitepaper', type: 'Docs', provider: 'Redis Labs', estimatedHours: 3 },
            ],
            projectIdea: {
              title: 'High-Throughput Generative API Gateway',
              description: 'Multi-tenant API gateway with semantic response cache that reduces duplicate LLM calls by up to 60%.',
              deliverables: ['Multi-stage Dockerfile (<150MB)', 'Docker Compose with Postgres & Redis', 'Prometheus metrics hook'],
              portfolioHighlight: 'Impressive cost-optimization case study for engineering interviews',
            },
          },
          {
            id: 'milestone-prod-2',
            title: 'End-to-End Capstone & Interview Readiness',
            phase: 3,
            phaseTitle: 'Phase 3: Production Deployment & Dockerization',
            description: 'Ship a public live application with custom domain, automated CI/CD pipeline, and structured README.',
            estimatedWeeks: 2,
            requiredSkills: ['cicd', 'git', 'tech-writing'],
            resources: [
              { title: 'Cracking the AI/SWE Portfolio Review', type: 'Video Tutorial', provider: 'Tech Interview Pro', estimatedHours: 4 },
              { title: 'Open Source Readme & Architecture Diagram Kit', type: 'Project', provider: 'GitHub Guides', estimatedHours: 5 },
            ],
            projectIdea: {
              title: 'Flagship AI Capstone: Real-Time Multimodal Assistant',
              description: 'Complete production app deployed to Cloud Run or AWS featuring authentication, vector search, and audio hooks.',
              deliverables: ['Live deployed public URL', 'GitHub repository with 100% CI pass rate', 'Architecture diagram SVG'],
              portfolioHighlight: 'The standout showcase project that secures recruiter screen calls',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Software Engineer',
    category: 'Software Engineering',
    tagline: 'Architect responsive modern web applications from intuitive client interfaces to resilient database backends.',
    description: 'Full-Stack Engineers build end-to-end user experiences, managing the full application lifecycle across client logic, REST/GraphQL APIs, relational database migrations, and cloud hosting.',
    averageSalary: '$115,000 - $150,000 / yr',
    growthRate: '+22% YoY Demand',
    openRolesCount: 3890,
    experienceLevel: 'Entry-Level',
    requiredSkills: [
      { skillId: 'javascript', name: 'JavaScript', category: 'Frontend', importance: 'Critical', targetProficiency: 'Intermediate' },
      { skillId: 'react', name: 'React.js', category: 'Frontend', importance: 'Critical', targetProficiency: 'Advanced' },
      { skillId: 'typescript', name: 'TypeScript', category: 'Frontend', importance: 'Critical', targetProficiency: 'Intermediate' },
      { skillId: 'nodejs', name: 'Node.js & Express', category: 'Backend', importance: 'Critical', targetProficiency: 'Intermediate' },
      { skillId: 'postgresql', name: 'PostgreSQL / SQL', category: 'Backend', importance: 'Critical', targetProficiency: 'Intermediate' },
      { skillId: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', importance: 'Important', targetProficiency: 'Intermediate' },
      { skillId: 'docker', name: 'Docker', category: 'Cloud & DevOps', importance: 'Important', targetProficiency: 'Beginner' },
      { skillId: 'git', name: 'Git & GitHub Workflows', category: 'Mobile & Systems', importance: 'Critical', targetProficiency: 'Advanced' },
      { skillId: 'system-design', name: 'System Design Basics', category: 'Mobile & Systems', importance: 'Important', targetProficiency: 'Beginner' },
    ],
    dayInLife: [
      'Implement component-level UI features and accessibility standards in React and Tailwind.',
      'Write transactional backend API services in TypeScript with database query optimization.',
      'Collaborate on schema migrations, database index design, and data integrity tests.',
      'Participate in sprint planning, code review pull requests, and continuous deployments.',
    ],
    topCompanies: ['Figma', 'Airbnb', 'DoorDash', 'Notion', 'Microsoft', 'Datadog'],
    roadmapPhases: [
      {
        phase: 1,
        phaseTitle: 'Phase 1: Modern Frontend Architecture',
        focus: 'React internals, custom state machines, and performant styling',
        duration: 'Weeks 1 - 4',
        milestones: [
          {
            id: 'fs-m1',
            title: 'Advanced React State & Component Patterns',
            phase: 1,
            phaseTitle: 'Phase 1: Modern Frontend Architecture',
            description: 'Master compound components, custom render props, context optimization, and accessible headless primitives.',
            estimatedWeeks: 2,
            requiredSkills: ['react', 'typescript', 'tailwind'],
            resources: [
              { title: 'Epic React Patterns & Performance', type: 'Course', provider: 'Kent C. Dodds', estimatedHours: 14 },
              { title: 'WAI-ARIA Accessibility Standards', type: 'Docs', provider: 'W3C', estimatedHours: 5 },
            ],
            projectIdea: {
              title: 'Accessible Component Library from Scratch',
              description: 'Build a zero-dependency modal, combobox, and data-table with keyboard navigation and ARIA tags.',
              deliverables: ['Tested component package', 'Interactive Storybook documentation', '100% Lighthouse A11y score'],
              portfolioHighlight: 'Shows senior-level attention to accessibility and web standards',
            },
          },
        ],
      },
      {
        phase: 2,
        phaseTitle: 'Phase 2: Relational Databases & Scalable APIs',
        focus: 'Node.js, PostgreSQL transactions, indexing, and authentication',
        duration: 'Weeks 5 - 8',
        milestones: [
          {
            id: 'fs-m2',
            title: 'PostgreSQL Transactions & ORMs',
            phase: 2,
            phaseTitle: 'Phase 2: Relational Databases & Scalable APIs',
            description: 'Master ACID transactions, connection pools, complex joins, and Drizzle/Prisma schema migrations.',
            estimatedWeeks: 2,
            requiredSkills: ['postgresql', 'nodejs'],
            resources: [
              { title: 'SQL & Relational Database Design', type: 'Course', provider: 'CMU Database Group', estimatedHours: 12 },
              { title: 'Prisma ORM & Migration Guide', type: 'Docs', provider: 'Prisma Docs', estimatedHours: 4 },
            ],
            projectIdea: {
              title: 'Collaborative Document Workspace with Version History',
              description: 'Multi-tenant database with audit logs, optimistic locking, and rollbacks.',
              deliverables: ['Relational schema with foreign keys and indexes', 'Migration scripts', 'Unit-tested transactional services'],
              portfolioHighlight: 'Demonstrates deep data modeling rigor',
            },
          },
        ],
      },
      {
        phase: 3,
        phaseTitle: 'Phase 3: Production Deployments & Observability',
        focus: 'Docker, CI/CD pipelines, rate limiting, and monitoring',
        duration: 'Weeks 9 - 12',
        milestones: [
          {
            id: 'fs-m3',
            title: 'Containerization & CI/CD Pipelines',
            phase: 3,
            phaseTitle: 'Phase 3: Production Deployments & Observability',
            description: 'Automate build workflows with GitHub Actions, multi-stage Docker builds, and zero-downtime deployment.',
            estimatedWeeks: 2,
            requiredSkills: ['docker', 'cicd', 'git'],
            resources: [
              { title: 'CI/CD Pipelines with GitHub Actions', type: 'Interactive Lab', provider: 'GitHub Skills', estimatedHours: 6 },
            ],
            projectIdea: {
              title: 'Full-Stack SaaS Starter with Automated Tests',
              description: 'Complete SaaS boilerplate with Stripe billing simulation, email magic links, and CI lint/test gates.',
              deliverables: ['Automated PR testing workflow', 'Dockerized dev & prod targets', 'Live production deployment'],
              portfolioHighlight: 'Proves readiness to write production-grade team code on day one',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Engineer',
    category: 'Cloud & Systems',
    tagline: 'Build the automated cloud infrastructure, CI/CD pipelines, and high-availability clusters.',
    description: 'Cloud & DevOps engineers ensure systems scale reliably under heavy traffic. They automate server provisioning, manage container clusters with Kubernetes, and maintain system security and uptime.',
    averageSalary: '$124,000 - $162,000 / yr',
    growthRate: '+26% YoY Demand',
    openRolesCount: 2150,
    experienceLevel: 'Entry-Level',
    requiredSkills: [
      { skillId: 'linux', name: 'Linux / Bash Scripting', category: 'Mobile & Systems', importance: 'Critical', targetProficiency: 'Advanced' },
      { skillId: 'docker', name: 'Docker', category: 'Cloud & DevOps', importance: 'Critical', targetProficiency: 'Advanced' },
      { skillId: 'kubernetes', name: 'Kubernetes (K8s)', category: 'Cloud & DevOps', importance: 'Critical', targetProficiency: 'Intermediate' },
      { skillId: 'aws', name: 'AWS (Cloud Computing)', category: 'Cloud & DevOps', importance: 'Critical', targetProficiency: 'Intermediate' },
      { skillId: 'cicd', name: 'CI/CD (GitHub Actions)', category: 'Cloud & DevOps', importance: 'Critical', targetProficiency: 'Intermediate' },
      { skillId: 'python', name: 'Python', category: 'Backend', importance: 'Important', targetProficiency: 'Intermediate' },
      { skillId: 'system-design', name: 'System Design Basics', category: 'Mobile & Systems', importance: 'Critical', targetProficiency: 'Intermediate' },
      { skillId: 'git', name: 'Git & GitHub Workflows', category: 'Mobile & Systems', importance: 'Critical', targetProficiency: 'Advanced' },
    ],
    dayInLife: [
      'Write Infrastructure-as-Code (Terraform/CloudFormation) for automated cloud resources.',
      'Configure Kubernetes manifests, Helm charts, and ingress load balancers.',
      'Set up Prometheus monitoring alerts and Grafana dashboards for incident response.',
      'Optimize build pipeline caching to slash CI build times from 15 mins to under 3 mins.',
    ],
    topCompanies: ['Amazon Web Services', 'Cloudflare', 'Palantir', 'Snowflake', 'Netflix', 'Uber'],
    roadmapPhases: [
      {
        phase: 1,
        phaseTitle: 'Phase 1: Linux & Container Foundations',
        focus: 'Kernel fundamentals, networking, and Docker internals',
        duration: 'Weeks 1 - 4',
        milestones: [
          {
            id: 'devops-m1',
            title: 'Linux Systems & Network Troubleshooting',
            phase: 1,
            phaseTitle: 'Phase 1: Linux & Container Foundations',
            description: 'Master socket inspection, DNS resolution, systemd services, and shell automation scripts.',
            estimatedWeeks: 2,
            requiredSkills: ['linux', 'git'],
            resources: [
              { title: 'The Linux Command Line Bootcamp', type: 'Course', provider: 'Linux Foundation', estimatedHours: 12 },
            ],
            projectIdea: {
              title: 'Automated Server Hardening & Health Monitor',
              description: 'Bash daemon that audits SSH configs, inspects open ports, and sends webhook alerts on RAM spikes.',
              deliverables: ['Modular Bash script with error trapping', 'Systemd service unit file', 'Discord/Slack webhook integration'],
              portfolioHighlight: 'Demonstrates deep systems hygiene and automation discipline',
            },
          },
        ],
      },
      {
        phase: 2,
        phaseTitle: 'Phase 2: Cloud Infrastructure & Kubernetes',
        focus: 'AWS core services, VPC subnets, and K8s orchestration',
        duration: 'Weeks 5 - 8',
        milestones: [
          {
            id: 'devops-m2',
            title: 'Kubernetes Cluster Architecture & Helm',
            phase: 2,
            phaseTitle: 'Phase 2: Cloud Infrastructure & Kubernetes',
            description: 'Deploy stateless and stateful workloads with Deployments, StatefulSets, Services, and ConfigMaps.',
            estimatedWeeks: 3,
            requiredSkills: ['kubernetes', 'docker', 'aws'],
            resources: [
              { title: 'Kubernetes for Beginners (CKA prep)', type: 'Course', provider: 'KodeKloud', estimatedHours: 15 },
            ],
            projectIdea: {
              title: 'Self-Healing Microservices Cluster on Minikube/EKS',
              description: 'Multi-service deployment with horizontal pod autoscaling (HPA) and rolling updates.',
              deliverables: ['Custom Helm chart package', 'Ingress controller configuration with TLS', 'Chaos test demonstration'],
              portfolioHighlight: 'Impressive live demo showing auto-recovery when pods are terminated',
            },
          },
        ],
      },
      {
        phase: 3,
        phaseTitle: 'Phase 3: GitOps & CI/CD Pipelines',
        focus: 'ArgoCD, GitHub Actions, and observability stacks',
        duration: 'Weeks 9 - 12',
        milestones: [
          {
            id: 'devops-m3',
            title: 'Automated GitOps & Zero-Downtime Deployments',
            phase: 3,
            phaseTitle: 'Phase 3: GitOps & CI/CD Pipelines',
            description: 'Implement automated canary releases and comprehensive Grafana metric dashboards.',
            estimatedWeeks: 2,
            requiredSkills: ['cicd', 'system-design'],
            resources: [
              { title: 'Prometheus & Grafana Observability Guide', type: 'Interactive Lab', provider: 'Grafana Labs', estimatedHours: 6 },
            ],
            projectIdea: {
              title: 'Production GitOps Pipeline with Slack Release Bot',
              description: 'Automated release pipeline that validates linting, tests, builds Docker images, and syncs via GitOps.',
              deliverables: ['GitHub Actions workflow file with caching', 'Grafana dashboard JSON export', 'Post-mortem incident runbook'],
              portfolioHighlight: 'Proves practical knowledge of real-world SRE practices',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist & Analytics Engineer',
    category: 'Data & AI',
    tagline: 'Transform raw data into predictive algorithms, business intelligence, and ML models.',
    description: 'Data Scientists blend statistical modeling, machine learning, and storytelling to help organizations make data-informed decisions, forecast market trends, and personalize customer experiences.',
    averageSalary: '$118,000 - $158,000 / yr',
    growthRate: '+24% YoY Demand',
    openRolesCount: 2840,
    experienceLevel: 'Entry-Level',
    requiredSkills: [
      { skillId: 'python', name: 'Python', category: 'Backend', importance: 'Critical', targetProficiency: 'Advanced' },
      { skillId: 'pandas', name: 'Pandas & NumPy', category: 'AI & Data', importance: 'Critical', targetProficiency: 'Advanced' },
      { skillId: 'postgresql', name: 'PostgreSQL / SQL', category: 'Backend', importance: 'Critical', targetProficiency: 'Advanced' },
      { skillId: 'scikit-learn', name: 'Scikit-Learn', category: 'AI & Data', importance: 'Critical', targetProficiency: 'Intermediate' },
      { skillId: 'pytorch', name: 'PyTorch', category: 'AI & Data', importance: 'Important', targetProficiency: 'Beginner' },
      { skillId: 'git', name: 'Git & GitHub Workflows', category: 'Mobile & Systems', importance: 'Important', targetProficiency: 'Intermediate' },
    ],
    dayInLife: [
      'Extract and transform terabytes of event logs using advanced SQL window functions.',
      'Train, validate, and tune predictive regression and classification models in Scikit-Learn.',
      'Formulate hypothesis tests, A/B experiments, and confidence intervals for product teams.',
      'Create interactive executive dashboards showing retention cohorts and churn drivers.',
    ],
    topCompanies: ['Spotify', 'LinkedIn', 'Capital One', 'Lyft', 'Meta', 'Duolingo'],
    roadmapPhases: [
      {
        phase: 1,
        phaseTitle: 'Phase 1: Advanced SQL & Data Wrangling',
        focus: 'Complex window queries, aggregation pipelines, and data sanitation',
        duration: 'Weeks 1 - 4',
        milestones: [
          {
            id: 'ds-m1',
            title: 'SQL Window Functions & Analytical Schemas',
            phase: 1,
            phaseTitle: 'Phase 1: Advanced SQL & Data Wrangling',
            description: 'Master PARTITION BY, LEAD/LAG, rolling averages, and star/snowflake warehouse modeling.',
            estimatedWeeks: 2,
            requiredSkills: ['postgresql', 'pandas'],
            resources: [
              { title: 'Advanced SQL for Data Scientists', type: 'Course', provider: 'Mode Analytics', estimatedHours: 8 },
            ],
            projectIdea: {
              title: 'Customer Lifetime Value & Churn Prediction Pipeline',
              description: 'Clean real-world transactional dataset and build cohort retention matrices.',
              deliverables: ['Analytical SQL scripts', 'Jupyter notebook with Seaborn plots', 'Executive summary slide deck'],
              portfolioHighlight: 'Bridges raw data engineering with commercial business impact',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'product-manager',
    title: 'Associate Product Manager (APM)',
    category: 'Product & Security',
    tagline: 'Define product vision, rally cross-functional teams, and launch user-obsessed digital products.',
    description: 'Technical Product Managers act as the glue between engineering, design, and business. They discover user needs, prioritize feature backlogs, set success metrics, and drive execution from prototype to launch.',
    averageSalary: '$110,000 - $145,000 / yr',
    growthRate: '+19% YoY Demand',
    openRolesCount: 1680,
    experienceLevel: 'Entry-Level',
    requiredSkills: [
      { skillId: 'product-sense', name: 'Product Strategy & Metrics', category: 'Product & Soft Skills', importance: 'Critical', targetProficiency: 'Advanced' },
      { skillId: 'agile', name: 'Agile & Team Collaboration', category: 'Product & Soft Skills', importance: 'Critical', targetProficiency: 'Advanced' },
      { skillId: 'tech-writing', name: 'Technical Documentation', category: 'Product & Soft Skills', importance: 'Critical', targetProficiency: 'Intermediate' },
      { skillId: 'postgresql', name: 'PostgreSQL / SQL', category: 'Backend', importance: 'Important', targetProficiency: 'Intermediate' },
      { skillId: 'system-design', name: 'System Design Basics', category: 'Mobile & Systems', importance: 'Important', targetProficiency: 'Beginner' },
    ],
    dayInLife: [
      'Conduct user interviews and analyze retention telemetry to uncover customer friction points.',
      'Write detailed Product Requirement Documents (PRDs) with clear user stories and acceptance criteria.',
      'Facilitate sprint grooming with engineering leads to evaluate trade-offs and tech debt.',
      'Coordinate go-to-market launches with marketing, customer support, and sales leads.',
    ],
    topCompanies: ['Google APM', 'Uber', 'Atlassian', 'Salesforce', 'Robinhood', 'Reddit'],
    roadmapPhases: [
      {
        phase: 1,
        phaseTitle: 'Phase 1: Product Discovery & User Research',
        focus: 'User interviews, problem framing, and North Star metric definition',
        duration: 'Weeks 1 - 4',
        milestones: [
          {
            id: 'pm-m1',
            title: 'PRD Writing & Problem Validation',
            phase: 1,
            phaseTitle: 'Phase 1: Product Discovery & User Research',
            description: 'Synthesize messy qualitative user feedback into a structured 1-pager PRD with testable hypotheses.',
            estimatedWeeks: 2,
            requiredSkills: ['product-sense', 'tech-writing'],
            resources: [
              { title: 'Product School: The Complete APM Blueprint', type: 'Course', provider: 'ProductSchool', estimatedHours: 10 },
            ],
            projectIdea: {
              title: 'Redesigning Campus Housing Discovery PRD',
              description: 'Comprehensive Product Requirement Document analyzing 50 student interviews and wireframe prototypes.',
              deliverables: ['Structured PRD document in Notion format', 'Figma user flow wireframes', 'Go-to-market rollout matrix'],
              portfolioHighlight: 'Ideal portfolio piece for APM rotational interview loops',
            },
          },
        ],
      },
    ],
  },
];

/**
 * Dynamic match calculation function:
 * Calculates match percentage, acquired skills, and missing skills for any career
 * based on the provided list of skills.
 */
export function calculateCareerMatch(
  career: CareerRole,
  currentSkills: UserSkill[]
): {
  matchPercentage: number;
  verifiedMatchPercentage: number;
  matchedSkillsCount: number;
  verifiedSkillsCount: number;
  claimedSkillsCount: number;
  totalRequiredCount: number;
  matchedSkills: {
    skillId: string;
    name: string;
    userProficiency: string;
    targetProficiency: string;
    verified: boolean;
    verificationScore?: number;
    verifiedSource?: string;
  }[];
  missingSkills: { skillId: string; name: string; importance: string; targetProficiency: string }[];
} {
  const normalizeKey = (str: string) => {
    const s = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (s.includes('postgres') || s.includes('sql')) return 'sql';
    if (s.includes('node')) return 'nodejs';
    if (s.includes('react')) return 'react';
    if (s.includes('git')) return 'git';
    if (s.includes('javascript') || s === 'js') return 'javascript';
    if (s.includes('python')) return 'python';
    if (s.includes('html')) return 'html';
    if (s.includes('css') && !s.includes('tailwind')) return 'css';
    return s;
  };

  let earnedPoints = 0;
  let earnedVerifiedPoints = 0;
  let totalPossiblePoints = 0;

  const matchedSkills: {
    skillId: string;
    name: string;
    userProficiency: string;
    targetProficiency: string;
    verified: boolean;
    verificationScore?: number;
    verifiedSource?: string;
  }[] = [];
  const missingSkills: { skillId: string; name: string; importance: string; targetProficiency: string }[] = [];

  career.requiredSkills.forEach((req) => {
    let weight = 10;
    if (req.importance === 'Critical') weight = 20;
    if (req.importance === 'Important') weight = 12;
    if (req.importance === 'Bonus') weight = 6;

    totalPossiblePoints += weight;

    const reqNorm = normalizeKey(req.skillId || req.name);
    const userSkill = currentSkills.find(
      (s) => s.id === req.skillId || normalizeKey(s.id) === reqNorm || normalizeKey(s.name) === reqNorm
    );

    if (userSkill) {
      let levelMultiplier = 0.6;
      if (userSkill.proficiency === 'Advanced') levelMultiplier = 1.0;
      else if (userSkill.proficiency === 'Intermediate') {
        levelMultiplier = req.targetProficiency === 'Advanced' ? 0.8 : 1.0;
      } else if (userSkill.proficiency === 'Beginner') {
        levelMultiplier = req.targetProficiency === 'Beginner' ? 1.0 : 0.5;
      }

      // Verified skills provide 100% confidence weight; claimed skills provide provisional 75% confidence
      const confidenceMultiplier = userSkill.verified ? 1.0 : 0.75;
      earnedPoints += weight * levelMultiplier * confidenceMultiplier;

      if (userSkill.verified) {
        earnedVerifiedPoints += weight * levelMultiplier;
      }

      matchedSkills.push({
        skillId: req.skillId,
        name: req.name,
        userProficiency: userSkill.proficiency,
        targetProficiency: req.targetProficiency,
        verified: !!userSkill.verified,
        verificationScore: userSkill.verificationScore,
        verifiedSource: userSkill.verifiedSource,
      });
    } else {
      missingSkills.push({
        skillId: req.skillId,
        name: req.name,
        importance: req.importance,
        targetProficiency: req.targetProficiency,
      });
    }
  });

  const rawPercent = totalPossiblePoints > 0 ? Math.round((earnedPoints / totalPossiblePoints) * 100) : 0;
  const matchPercentage = Math.min(100, Math.max(0, rawPercent));

  const rawVerifiedPercent = totalPossiblePoints > 0 ? Math.round((earnedVerifiedPoints / totalPossiblePoints) * 100) : 0;
  const verifiedMatchPercentage = Math.min(100, Math.max(0, rawVerifiedPercent));

  const verifiedSkillsCount = matchedSkills.filter((s) => s.verified).length;
  const claimedSkillsCount = matchedSkills.filter((s) => !s.verified).length;

  return {
    matchPercentage,
    verifiedMatchPercentage,
    matchedSkillsCount: matchedSkills.length,
    verifiedSkillsCount,
    claimedSkillsCount,
    totalRequiredCount: career.requiredSkills.length,
    matchedSkills,
    missingSkills,
  };
}
