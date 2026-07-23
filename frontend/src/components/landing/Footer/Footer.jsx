import { Car, BookOpen, Mail, Phone, MapPin, Globe, Shield, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          {/* Col 1: Brand (2 cols span) */}
          <div className="lg:col-span-2 flex flex-col gap-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Car className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                Autovance Motors OS
              </span>
            </div>
            <p className="text-slate-400 font-normal leading-relaxed max-w-sm">
              The premier dealership inventory & purchase management platform engineered for luxury, multi-brand, and commercial automotive networks across India.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors flex items-center justify-center"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="text-slate-300" />
              </a>
              <a
                href="#docs"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
                aria-label="Documentation"
              >
                <BookOpen className="w-4 h-4" />
              </a>
              <a
                href="#global"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
                aria-label="Global Network"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="flex flex-col gap-3 text-left">
            <h4 className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">Product</h4>
            <a href="#categories" className="hover:text-white transition-colors">Vehicle Segments</a>
            <a href="#inventory" className="hover:text-white transition-colors">Live Stock Inventory</a>
            <a href="#search" className="hover:text-white transition-colors">Dealership Search</a>
            <a href="#why-us" className="hover:text-white transition-colors">OS Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a>
          </div>

          {/* Col 3: Resources & Docs */}
          <div className="flex flex-col gap-3 text-left">
            <h4 className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">Resources</h4>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <span>GitHub Repository</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </a>
            <a href="#docs" className="hover:text-white transition-colors">API Documentation</a>
            <a href="#fastapi" className="hover:text-white transition-colors">FastAPI Specs</a>
            <a href="#jwt" className="hover:text-white transition-colors">JWT Security Whitepaper</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ & Support</a>
          </div>

          {/* Col 4: Contact */}
          <div className="flex flex-col gap-3 text-left">
            <h4 className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">Contact & Hubs</h4>
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Mumbai • Bengaluru • Delhi</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>sales@autovance.io</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>+91 1800-419-8800</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Autovance Motors OS Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-slate-300 transition-colors">Sign In</Link>
            <Link to="/register" className="hover:text-slate-300 transition-colors">Register</Link>
            <Link to="/dashboard" className="hover:text-slate-300 transition-colors">Dealership Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
