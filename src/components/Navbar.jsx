import { Link, useLocation } from "react-router-dom";
import { FileText, Globe, Menu, X, ChevronDown, Combine, Scissors, FileDown, Layout, ClipboardList, ImageIcon, FileCode, Lock, Unlock, RotateCw, Type, Hash, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

const toolsLinks = [
  { name: "Merge PDF", path: "/merge", icon: Combine },
  { name: "Split PDF", path: "/split", icon: Scissors },
  { name: "Compress PDF", path: "/compress", icon: FileDown },
  { name: "Image to PDF", path: "/image-to-pdf", icon: ImageIcon },
  { name: "PDF to Image", path: "/pdf-to-image", icon: Layout },
  { name: "Word to PDF", path: "/word-to-pdf", icon: FileCode },
  { name: "PDF to Word", path: "/pdf-to-word", icon: FileText },
  { name: "Organize PDF", path: "/organize", icon: Layout },
  { name: "PDF to Text", path: "/pdf-to-text", icon: ClipboardList },
  { name: "Protect PDF", path: "/protect", icon: Lock },
  { name: "Unlock PDF", path: "/unlock", icon: Unlock },
  { name: "Rotate PDF", path: "/rotate", icon: RotateCw },
  { name: "Add Watermark", path: "/watermark", icon: Type },
  { name: "Add Page Numbers", path: "/page-numbers", icon: Hash },
  { name: "Delete Pages", path: "/delete-pages", icon: Trash2 },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 flex items-center h-20">
        <div className="container-professional flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/icon.png" alt="iFlexPDF" className="w-10 h-10 " />
            <span className="text-xl font-black tracking-tight text-slate-900">
              iFlexPDF<span className="text-[#0047AB]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={cn(
                  "flex items-center gap-1.5 text-[14px] font-bold transition-all outline-none py-1 group",
                  isToolsOpen || location.pathname.length > 1 ? "text-[#0047AB]" : "text-slate-500 hover:text-slate-900"
                )}
              >
                Tools
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-500", isToolsOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isToolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-4 w-[580px] bg-white border border-slate-100 rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-2 z-50 max-h-[480px] overflow-y-auto custom-scrollbar"
                  >
                    <div className="col-span-2 px-3 pb-3 border-b border-slate-50 mb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Toolbox</p>
                    </div>
                    {toolsLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsToolsOpen(false)}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all group"
                      >
                        <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 transition-all group-hover:bg-[#0047AB] group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-100">
                          <link.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-slate-900 mb-0.5">{link.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fast & Secure</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/blog" active={location.pathname.startsWith("/blog")}>Blog</NavLink>
            <NavLink to="/security" active={location.pathname === "/security"}>Security</NavLink>
          </div>

          {/* Actions - Clean Local UI */}
          <div className="hidden lg:flex items-center gap-3">
            <span className="verified-badge px-4 py-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-1"></span>
              100% Client-Side Engine Active
            </span>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2.5 text-slate-600 hover:text-[#0047AB] bg-slate-50 rounded-xl border border-slate-100 transition-all"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu (Rendered at Body root to bypass layout/sticky restrictions) */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop Blur Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-[999] lg:hidden"
              />

              {/* Sidebar Slide-out Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[310px] max-w-[85vw] bg-white shadow-2xl z-[1000] flex flex-col p-6 border-l border-slate-100 lg:hidden"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3">
                    <img src="/icon.png" alt="iFlexPDF" className="w-8 h-8" />
                    <span className="text-lg font-black tracking-tight text-slate-900">
                      iFlexPDF<span className="text-[#0047AB]">.</span>
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
                    aria-label="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable Navigation Area */}
                <div className="flex-grow overflow-y-auto pr-1 flex flex-col gap-1.5 scrollbar-thin">
                  <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
                  <MobileNavLink to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</MobileNavLink>
                  <MobileNavLink to="/security" onClick={() => setIsMenuOpen(false)}>Security</MobileNavLink>

                  <div className="h-px bg-slate-100 my-4"></div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Professional Toolbox</p>

                  <div className="grid grid-cols-1 gap-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                    {toolsLinks.map((link) => {
                      const isToolActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-bold transition-all text-[13px] border border-transparent",
                            isToolActive
                              ? "text-[#0047AB] bg-indigo-50/40"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/70"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center border shrink-0",
                            isToolActive
                              ? "bg-[#0047AB] text-white border-[#0047AB]"
                              : "bg-slate-50 text-slate-400 border-slate-100"
                          )}>
                            <link.icon className="w-4 h-4" strokeWidth={2} />
                          </div>
                          <span>{link.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Pinned Bottom CTA Actions - Updated for Security Banner */}
                <div className="pt-5 mt-4 border-t border-slate-100 bg-white">
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shrink-0"></div>
                    <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                      Fully Secure Client Sandbox
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

function NavLink({ to, children, active }) {
  return (
    <Link
      to={to}
      className={cn(
        "text-[14px] font-bold transition-all py-1 border-b-2",
        active ? "text-[#0047AB] border-[#0047AB]" : "text-slate-500 hover:text-slate-900 border-transparent"
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children, onClick }) {
  const location = useLocation();
  const active = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "px-4 py-3 rounded-xl font-bold transition-all text-[13px] flex items-center justify-between",
        active
          ? "text-[#0047AB] bg-indigo-50/40"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/70"
      )}
    >
      {children}
    </Link>
  );
}
