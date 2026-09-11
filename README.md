# CareerPulse 🚀

### Your skills. Your path. Your career.

CareerPulse is a career guidance and skill-verification platform designed to help college students understand **where they are, where they can go, and what they need to learn next**.

Instead of simply listing skills on a resume, CareerPulse aims to connect **verified skills, career pathways, skill gaps, and employer requirements** into one platform.

---

## 💡 Problem

College students often struggle to answer:

* What career actually fits my current skills?
* What skills am I missing for a particular role?
* What should I learn next?
* Are the skills on my resume actually verified?
* How would learning a new skill change my career options?
* Which opportunities are a realistic match for me?

At the same time, employers have difficulty identifying candidates based on **actual demonstrated skills** rather than resumes alone.

CareerPulse aims to bridge this gap.

---

## 🎯 Our Solution

CareerPulse provides a unified platform with:

### 🧭 Career GPS

Helps students understand their current skill profile and identify potential career paths.

### 🔮 What-If Simulator

Allows students to explore scenarios such as:

> "What happens to my career options if I learn React?"

The platform can show how adding or improving skills can affect potential career matches and pathways.

### 🧪 Skill Verification

Students can verify their claimed skills through assessments rather than simply listing them.

Skills can move from:

**Claimed → Assessed → Verified**

This creates a more reliable representation of a student's capabilities.

### 🤝 Career Matching

Matches students with relevant career opportunities based on their skills and identifies:

* Matching skills
* Missing skills
* Skill gaps
* Potential areas for improvement

### 🏢 Employer Dashboard

Employers can explore candidates based on their demonstrated and verified skills rather than relying only on traditional resumes.

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### AI Layer

* LLM API

### Development & Deployment

* Git & GitHub
* Vercel (Frontend)
* Backend deployment planned separately

---

## 🏗️ Current Implementation

The current hackathon build focuses on the **frontend prototype and core user experience**.

Implemented frontend flows include:

* Role selection
* Job Seeker experience
* Employer experience
* Authentication UI
* Job Seeker dashboard
* Employer dashboard
* Skill management
* Skill verification workflow
* Career GPS
* What-If Simulator
* Career matching
* Employer candidate exploration
* Profile views

The current prototype uses **frontend state and mock data** to demonstrate the product workflow.

Backend services, persistent database storage and AI API integration are being developed as the next phase.

---

## 🔐 Authentication

The current authentication flow is implemented as a frontend prototype.

The intended flow is:

```text
Role Selection
      ↓
Job Seeker / Employer
      ↓
Role-specific Login
      ↓
Role-specific Dashboard
```

Production authentication and persistent user accounts will be handled by the backend layer.

---

## 🧠 Planned Architecture

```text
                    ┌─────────────────────┐
                    │     CareerPulse      │
                    │      Frontend        │
                    │ React + Vite + TS    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Node.js +         │
                    │      Express        │
                    │      REST API       │
                    └──────┬───────┬──────┘
                           │       │
                 ┌─────────┘       └──────────┐
                 ▼                            ▼
        ┌─────────────────┐         ┌─────────────────┐
        │   PostgreSQL    │         │    LLM API      │
        │    Database     │         │   AI Features   │
        └─────────────────┘         └─────────────────┘
```

---

## 🌱 Future Scope

Future versions of CareerPulse will include:

* Persistent user accounts
* Real skill-verification records
* AI-powered career recommendations
* Personalized learning roadmaps
* AI-powered What-If analysis
* Real employer/job data
* Advanced candidate-job matching
* Skill-gap analysis
* Analytics for students and employers

---

## 👥 Target Users

### Students / Job Seekers

Students can understand their current capabilities, verify their skills and discover realistic career paths.

### Employers

Employers can discover candidates based on relevant and verified skills.

---

## 🌍 Impact

CareerPulse aims to reduce the gap between **what students learn, what they can demonstrate, and what employers actually need**.

By focusing on skills and skill gaps rather than credentials alone, the platform can help students make more informed career decisions and continuously improve their employability.

---

## 🚀 Getting Started

### Prerequisites

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
```

Navigate to the project:

```bash
cd careerpulse
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local development URL shown in the terminal.

---

## 📌 Project Status

**Hackathon Prototype — Frontend MVP**

The current version demonstrates the core CareerPulse user experience and product workflow. Backend, database and AI integrations are part of the ongoing implementation.

---

## 👩‍💻 Built For

**Hackathon 2026**

Built with the goal of making career exploration more **skill-based, transparent and actionable**.
