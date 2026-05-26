import { ShieldCheck, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer 
      className="bg-white border-t border-slate-100 py-16 mt-auto relative z-10"
      aria-label="Site Footer"
    >
      <div className="container-professional space-y-12">
        {/* Multi-Column Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand Info */}
          <div className="space-y-4 text-left">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg py-0.5 px-0.5 inline-flex"
              aria-label="iFlexPDF Home"
            >
              <img src="/icon.png" alt="iFlexPDF Logo" className="w-8 h-8 object-contain" width="32" height="32" loading="lazy" decoding="async" />
              <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
                iFlexPDF<span className="text-indigo-600">.</span>
              </span>
            </Link>
            <p className="text-slate-500 text-[13px] font-normal leading-relaxed">
              Professional, enterprise-grade PDF tools running entirely inside your browser. Your documents never touch our servers, guaranteed.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-800 font-bold text-[10px] uppercase tracking-wider select-none">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Local Sandboxed
            </div>
          </div>

          {/* Column 1: Core Tools */}
          <div className="space-y-4 text-left">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest select-none">PDF Utility Tools</h2>
            <nav className="flex flex-col gap-2.5" aria-label="PDF Tools Footer Navigation">
              <FooterLink to="/merge">Merge PDF</FooterLink>
              <FooterLink to="/split">Split PDF</FooterLink>
              <FooterLink to="/compress">Compress PDF</FooterLink>
              <FooterLink to="/rotate">Rotate PDF</FooterLink>
              <FooterLink to="/watermark">Add Watermark</FooterLink>
              <FooterLink to="/delete-pages">Delete Pages</FooterLink>
            </nav>
          </div>

          {/* Column 2: Resources & Sitemap */}
          <div className="space-y-4 text-left">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest select-none">Platform & Security</h2>
            <nav className="flex flex-col gap-2.5" aria-label="Platform Resources Footer Navigation">
              <FooterLink to="/about">About iFlexPDF</FooterLink>
              <FooterLink to="/blog">Blog & Guides</FooterLink>
              <FooterLink to="/security">Security Protocol</FooterLink>
              <FooterLink to="/faq">Dedicated FAQ</FooterLink>
              <FooterLink to="/sitemap">Site Map Directory</FooterLink>
            </nav>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="space-y-4 text-left">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest select-none">Legal & Compliance</h2>
            <nav className="flex flex-col gap-2.5" aria-label="Legal Compliance Footer Navigation">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/cookies">Cookie Policy</FooterLink>
              <FooterLink to="/disclaimer">Disclaimer & DMCA</FooterLink>
              <FooterLink to="/contact">Contact Support</FooterLink>
            </nav>
          </div>
        </div>

        {/* Footer Bottom bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs font-medium">
            © {new Date().getFullYear()} iFlexPDF. Built with local client sandbox isolation.
          </p>
          <p className="text-slate-400 text-xs font-semibold flex items-center gap-1.5 select-none">
            Designed with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> for security first document productivity.
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
      className="text-slate-500 hover:text-indigo-600 transition-all duration-200 text-[13px] font-medium tracking-wide hover:translate-x-0.5 outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded"
    >
      {children}
    </Link>
  );
}
