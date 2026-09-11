import React, { useState } from 'react';
import { EmployerNavTab, EmployerProfile } from '../types';
import { 
  Building2, 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  UserCheck, 
  Home, 
  Menu, 
  X, 
  User
} from 'lucide-react';

interface EmployerNavbarProps {
  activeTab: EmployerNavTab;
  setActiveTab: (tab: EmployerNavTab) => void;
  employer: EmployerProfile;
  totalApplicants: number;
}

export const EmployerNavbar: React.FC<EmployerNavbarProps> = ({
  activeTab,
  setActiveTab,
  employer,
  totalApplicants,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: EmployerNavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'candidates', label: 'Candidates', icon: <Users className="w-4 h-4" /> },
    { 
      id: 'matches', 
      label: 'Candidate Matches', 
      icon: <UserCheck className="w-4 h-4 text-emerald-600" />,
      badge: 'AI Rank'
    },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Employer Branding */}
          <div 
            id="employer-nav-brand-logo"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                  Career<span className="text-indigo-600">Pulse</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Employer
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">Talent Discovery & Skill Matchmaker</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`employer-nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area: Hiring Manager Chip */}
          <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-slate-200">
            {/* Hiring Manager Profile Chip */}
            <button
              id="employer-profile-chip"
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors text-left"
            >
              <img
                src={employer.hiringManagerAvatar}
                alt={employer.hiringManagerName}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <div className="text-xs">
                <div className="font-semibold text-slate-800 flex items-center gap-1">
                  {employer.hiringManagerName}
                </div>
                <div className="text-[11px] text-slate-500 truncate max-w-[120px]">
                  {employer.companyName}
                </div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              id="employer-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          <div className="px-3 py-2 mb-2 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={employer.hiringManagerAvatar} alt={employer.hiringManagerName} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold text-slate-800">{employer.hiringManagerName}</p>
                <p className="text-[11px] text-indigo-700">{employer.companyName} &bull; {employer.industry}</p>
              </div>
            </div>
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
