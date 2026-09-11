# CareerPulse

### Your skills. Your path. Your career.

CareerPulse is a career guidance and skill-verification platform designed to help college students understand their current skills, identify career opportunities, and determine what they need to learn next.

The platform connects skill verification, career pathways, skill-gap analysis, and employer matching into a single experience.

---

## Problem

College students often struggle to answer questions such as:

* Which career paths align with my current skills?
* What skills am I missing for a particular role?
* What should I learn next?
* How can I demonstrate that I actually possess a skill?
* How would learning a new skill affect my career opportunities?

Employers also face challenges when evaluating candidates based primarily on resumes and self-reported skills.

CareerPulse aims to address both sides of this problem through a skills-focused approach.

---

## Solution

CareerPulse provides the following core features:

### Career GPS

Helps students understand their current skill profile and explore potential career paths based on their capabilities and interests.

### What-If Simulator

Allows students to explore hypothetical scenarios and understand how learning or improving a skill could affect their potential career opportunities.

For example:

> "What happens to my career options if I learn React?"

### Skill Verification

Allows students to demonstrate their knowledge through assessments instead of relying entirely on self-reported skills.

Skills can progress through:

```text
Claimed → Assessed → Verified
```

### Career Matching

Matches students with relevant career opportunities based on their skills while identifying:

* Matching skills
* Missing skills
* Skill gaps
* Areas for improvement

### Employer Dashboard

Provides employers with a structured way to explore candidates based on their skills and verification status.

---

## Tech Stack

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

### Development and Deployment

* Git
* GitHub
* Vercel

---

## Current Implementation

The current hackathon build focuses on the frontend prototype and core user experience.

Implemented features include:

* Role selection
* Job Seeker experience
* Employer experience
* Authentication interface
* Job Seeker dashboard
* Employer dashboard
* Skill management
* Skill verification workflow
* Career GPS
* What-If Simulator
* Career matching
* Employer candidate exploration
* Profile views

The current prototype uses frontend state and mock data to demonstrate the product workflow.

Backend services, persistent database storage, and AI API integration are part of the next implementation phase.

---

## User Flow

The intended authentication and role-based flow is:

```text
Role Selection
      |
      +-- Job Seeker
      |      |
      |      +-- Login / Sign Up
      |             |
      |             +-- Job Seeker Dashboard
      |
      +-- Employer
             |
             +-- Login / Sign Up
                    |
                    +-- Employer Dashboard
```

Once a role is selected, the user remains within that role's experience.

---

## System Architecture

```text
                  CareerPulse Frontend
                 React + Vite + TypeScript
                           |
                           |
                    REST API Layer
                           |
                    Node.js + Express
                       /           \
                      /             \
                     /               \
              PostgreSQL           LLM API
               Database          AI Services
```

---

## Future Scope

Future versions of CareerPulse will include:

* Persistent user accounts
* Production authentication
* Persistent skill-verification records
* AI-powered career recommendations
* Personalized learning roadmaps
* AI-powered What-If analysis
* Real-time job and employer data
* Advanced candidate-job matching
* Automated skill-gap analysis
* Student and employer analytics

---

## Target Users

### Students and Job Seekers

Students can evaluate their current capabilities, verify their skills, identify gaps, and explore potential career paths.

### Employers

Employers can discover candidates based on relevant skills and verification status.

---

## Impact

CareerPulse aims to reduce the gap between what students learn, what they can demonstrate, and what employers actually need.

By focusing on demonstrated skills and actionable skill gaps, the platform aims to help students make more informed career decisions and improve their employability.

---

## Getting Started

### Prerequisites

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
```

Navigate to the project directory:

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

Open the local development URL provided by the development server.

---

## Project Status

**Hackathon Prototype — Frontend MVP**

The current version demonstrates the core CareerPulse user experience and product workflow. Backend, database, and AI integrations are currently under development.

---

## Hackathon

CareerPulse was developed as a hackathon project with the goal of making career exploration more skill-focused, transparent, and actionable.
