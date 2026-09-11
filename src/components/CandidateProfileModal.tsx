import React from 'react';
import { Candidate, EmployerJob } from '../types';
import { calculateCandidateMatch } from '../employerMockData';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Award, 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Github, 
  Star,
  Sparkles,
  Calendar,
  Layers,
  ShieldCheck,
  Circle
} from 'lucide-react';

interface CandidateProfileModalProps {
  candidate: Candidate | null;
  job: EmployerJob;
  onClose: () => void;
  onUpdateStatus?: (candidateId: string, newStatus: Candidate['status']) => void;
}

export const CandidateProfileModal: React.FC<CandidateProfileModalProps> = ({
  candidate,
  job,
  onClose,
  onUpdateStatus,
}) => {
  if (!candidate) return null;

  const { matchPercentage, matchingSkills, missingSkills } = calculateCandidateMatch(
    candidate,
    job.requiredSkills
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="candidate-profile-modal"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden text-left"
      >
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-6 relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={candidate.avatarUrl}
              alt={candidate.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/20 shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {candidate.name}
                </h2>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  candidate.status === 'Shortlisted'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : candidate.status === 'Interview Scheduled'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}>
                  {candidate.status}
                </span>
              </div>
              <p className="text-sm text-slate-300 font-medium mt-0.5">{candidate.title}</p>
              
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {candidate.location}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {candidate.email}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {candidate.phone}
                </span>
              </div>
            </div>
          </div>

          <button
            id="modal-close-button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Match Score & Skill Comparison Highlight Banner */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Target Evaluation Role
                </span>
                <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium">Overall Match</div>
                  <div className={`text-xl font-bold font-display ${
                    matchPercentage >= 80 ? 'text-emerald-600' : matchPercentage >= 60 ? 'text-amber-600' : 'text-slate-600'
                  }`}>
                    {matchPercentage}%
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-sm shadow-xs">
                  {matchingSkills.length}/{job.requiredSkills.length}
                </div>
              </div>
            </div>

            {/* Matching Skills vs Missing Gaps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-200/80">
              
              {/* Matching Skills */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Matching Skills ({matchingSkills.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {matchingSkills.map((s) => {
                    const candidateSkill = candidate.skills.find(
                      (cs) => cs.name.toLowerCase() === s.toLowerCase()
                    );
                    const isVerified = candidateSkill?.verified;
                    const score = candidateSkill?.score;

                    return (
                      <span 
                        key={s} 
                        className={`px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1 ${
                          isVerified
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                        title={isVerified ? `Verified Assessment Score: ${score || 85}%` : 'Claimed skill (unverified)'}
                      >
                        {isVerified ? (
                          <span>✓ {s} {score ? `(${score}%)` : ''}</span>
                        ) : (
                          <span>○ {s} (Claimed)</span>
                        )}
                      </span>
                    );
                  })}
                  {matchingSkills.length === 0 && (
                    <span className="text-xs text-slate-500 italic">No direct required matches</span>
                  )}
                </div>
              </div>

              {/* Skill Gaps / Missing */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Skill Gaps ({missingSkills.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.map((s) => (
                    <span 
                      key={s} 
                      className="px-2 py-0.5 rounded bg-white border border-amber-300 text-amber-900 text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                  {missingSkills.length === 0 && (
                    <span className="text-xs text-emerald-700 font-medium">100% of required skills covered!</span>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Education & Bio Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Education */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>Education</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{candidate.education}</p>
                <p className="text-xs text-slate-600 font-medium">{candidate.university}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span>Graduation: {candidate.graduationYear}</span>
                  <span>&bull;</span>
                  <span className="font-semibold text-slate-700">GPA: {candidate.gpa}</span>
                </div>
              </div>
            </div>

            {/* Experience Level & Domain */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>Experience Level</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{candidate.experienceLevel}</p>
                <p className="text-xs text-slate-600">Primary Domain: <span className="font-semibold text-slate-800">{candidate.primaryDomain}</span></p>
                <p className="text-xs text-slate-500 mt-1">Applied: {candidate.appliedDate}</p>
              </div>
            </div>

          </div>

          {/* Candidate Bio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Candidate Summary</h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
              {candidate.bio}
            </p>
          </div>

          {/* Full Skills with Proficiency */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Skills Diagnostic: Verified vs Claimed</span>
              </h4>
              <div className="text-xs space-x-2">
                <span className="font-semibold text-emerald-700">
                  {candidate.skills.filter((s) => s.verified).length} Verified
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="font-semibold text-amber-700">
                  {candidate.skills.filter((s) => !s.verified).length} Claimed
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {candidate.skills.map((skill) => (
                <div 
                  key={skill.name}
                  className={`p-3 rounded-xl border flex flex-col justify-between ${
                    skill.verified
                      ? 'bg-emerald-50/30 border-emerald-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                      <div className="text-[11px] text-slate-500">{skill.category} &bull; {skill.proficiency}</div>
                    </div>
                    {skill.verified ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{skill.score ? `${skill.score}%` : 'Verified'}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 shrink-0 flex items-center gap-1">
                        <Circle className="w-2.5 h-2.5 text-amber-600" />
                        <span>Claimed</span>
                      </span>
                    )}
                  </div>
                  {skill.verifiedSource && (
                    <div className="text-[10px] text-emerald-700 font-medium mt-2 pt-1 border-t border-emerald-100/60">
                      via {skill.verifiedSource}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          {candidate.projects.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                <FolderGit2 className="w-4 h-4 text-indigo-600" />
                <span>Featured Projects</span>
              </h4>

              <div className="space-y-3">
                {candidate.projects.map((proj, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="text-sm font-bold text-slate-900">{proj.title}</h5>
                      <div className="flex items-center gap-2">
                        {proj.githubUrl && (
                          <a 
                            href={proj.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-slate-500 hover:text-slate-900 text-xs flex items-center gap-1 font-medium"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Repo</span>
                          </a>
                        )}
                        {proj.demoUrl && (
                          <a 
                            href={proj.demoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-emerald-600 hover:text-emerald-700 text-xs flex items-center gap-1 font-medium"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Section */}
          {candidate.experience.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-slate-600" />
                <span>Work & Leadership Experience</span>
              </h4>

              <div className="space-y-3">
                {candidate.experience.map((exp, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h5 className="text-sm font-bold text-slate-900">{exp.role}</h5>
                        <p className="text-xs font-semibold text-emerald-700">{exp.company}</p>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">{exp.period}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Application Status:</span>
            <select
              value={candidate.status}
              onChange={(e) => onUpdateStatus?.(candidate.id, e.target.value as Candidate['status'])}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="New Applicant">New Applicant</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Shortlisted">Shortlisted</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onUpdateStatus?.(candidate.id, 'Interview Scheduled');
                onClose();
              }}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
            >
              Schedule Interview
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
