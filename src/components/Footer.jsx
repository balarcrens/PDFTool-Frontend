import React from "react";
import { FileText, Heart, Globe, Mail, Shield, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-12">
      <div className="container-professional flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-slate-900">
              PDFTool
            </span>
          </Link>
          <p className="text-slate-400 text-[13px] font-medium">
            © {new Date().getFullYear()} PDFTool. Secure local processing for professional workflows.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/blog">Blog & Guides</FooterLink>
          <FooterLink to="/security">Security Protocol</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/contact">Contact Support</FooterLink>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-slate-500 hover:text-indigo-600 transition-all text-[13px] font-medium whitespace-nowrap"
    >
      {children}
    </Link>
  );
}

function SocialLink({ href, icon }) {
  return (
    <a
      href={href}
      className="w-9 h-9 flex items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm"
    >
      {React.cloneElement(icon, { size: 16 })}
    </a>
  );
}
