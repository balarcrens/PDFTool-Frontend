import React from "react";
import { ShieldCheck, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-16 mt-auto">
      <div className="container-professional space-y-12">
        {/* Multi-Column Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/icon.png" alt="iFlexPDF Logo" className="w-8 h-8" />
              <span className="text-lg font-black tracking-tight text-slate-900">
                iFlexPDF<span className="text-[#0047AB]">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs font-semibold leading-relaxed">
              Professional, enterprise-grade PDF tools running entirely inside your browser. Your documents never touch our servers, guaranteed.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-600 font-bold text-[9px] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Local Sandboxed
            </div>
          </div>

          {/* Column 1: Core Tools */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">PDF Tools</h4>
            <div className="flex flex-col gap-2.5">
              <FooterLink to="/merge">Merge PDF</FooterLink>
              <FooterLink to="/split">Split PDF</FooterLink>
              <FooterLink to="/compress">Compress PDF</FooterLink>
              <FooterLink to="/rotate">Rotate PDF</FooterLink>
              <FooterLink to="/watermark">Add Watermark</FooterLink>
              <FooterLink to="/delete-pages">Delete Pages</FooterLink>
            </div>
          </div>

          {/* Column 2: Resources & Sitemap */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Resources</h4>
            <div className="flex flex-col gap-2.5">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/blog">Blog & Guides</FooterLink>
              <FooterLink to="/security">Security Protocol</FooterLink>
              <FooterLink to="/faq">Dedicated FAQ</FooterLink>
              <FooterLink to="/sitemap">Site Directory (Sitemap)</FooterLink>
            </div>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Legal & Help</h4>
            <div className="flex flex-col gap-2.5">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/cookies">Cookie Policy</FooterLink>
              <FooterLink to="/disclaimer">Disclaimer & DMCA</FooterLink>
              <FooterLink to="/contact">Contact Support</FooterLink>
            </div>
          </div>
        </div>

        {/* Footer Bottom bar */}
        <div className="pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs font-semibold">
            © {new Date().getFullYear()} iFlexPDF. All rights reserved.
          </p>
          <p className="text-slate-400 text-[11px] font-bold flex items-center gap-1.5">
            Designed with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for security first document productivity.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-slate-500 hover:text-indigo-600 transition-all text-xs font-semibold tracking-wide hover:translate-x-0.5 duration-300"
    >
      {children}
    </Link>
  );
}
