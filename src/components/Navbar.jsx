import { Link, useLocation } from "react-router-dom";
import { FileText, Menu, X, ChevronDown, Combine, Scissors, FileDown, Layout, ClipboardList, ImageIcon, FileCode, Lock, Unlock, RotateCw, Type, Hash, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
    const triggerRef = useRef(null);

    // Close tools dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target)
            ) {
                setIsToolsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu on Escape key down
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") {
                setIsMenuOpen(false);
            }
        }
        if (isMenuOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMenuOpen]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    return (
        <>
            <nav
                className="sticky top-0 z-40 w-full bg-white/75 backdrop-blur-xl border-b border-slate-100/90 flex items-center h-15 transition-all duration-200"
                aria-label="Main Directory"
            >
                <div className="container-professional flex items-center justify-between w-full">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex justify-center items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 rounded-xl px-1 py-1"
                        aria-label="iFlexPDF Home"
                    >
                        <img
                            src="/icon.webp"
                            alt="iFlexPDF Logo"
                            className="object-contain select-none transition-transform duration-300 group-hover:scale-105"
                            width="28"
                            height="28"
                            loading="eager"
                        />
                        <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                            iFlexPDF<span className="text-blue-600">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        <div className="relative">
                            <button
                                ref={triggerRef}
                                onClick={() => setIsToolsOpen(!isToolsOpen)}
                                aria-expanded={isToolsOpen}
                                aria-haspopup="true"
                                className={cn(
                                    "flex items-center gap-1 text-[14px] font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-lg px-2.5 py-1.5 group select-none outline-none",
                                    isToolsOpen || location.pathname.length > 1 ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-900"
                                )}
                            >
                                Tools
                                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300 text-slate-400 group-hover:text-slate-900", isToolsOpen && "rotate-180 text-blue-600")} />
                            </button>

                            {isToolsOpen && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute top-full left-0 mt-3 w-[580px] bg-white border border-slate-100 rounded-2xl shadow-premium-xl p-5 grid grid-cols-2 gap-1.5 z-50 max-h-[460px] overflow-y-auto custom-scrollbar animate-dropdown"
                                >
                                    <div className="col-span-2 px-3 pb-2 border-b border-slate-50 mb-2.5">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">All PDF Tools</p>
                                    </div>
                                    {toolsLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsToolsOpen(false)}
                                            className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-slate-50/70 transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-blue-600"
                                        >
                                            <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-500 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-md group-hover:shadow-blue-100 shrink-0">
                                                <link.icon className="w-4.5 h-4.5" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[13.5px] font-semibold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors mb-0.5">{link.name}</p>
                                                <p className="text-[10.5px] font-medium text-slate-400 uppercase tracking-wide">Processed Locally</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <NavLink to="/blog" active={location.pathname.startsWith("/blog")}>Blog</NavLink>
                        <NavLink to="/security" active={location.pathname === "/security"}>Security</NavLink>
                        <NavLink to="/about" active={location.pathname === "/about"}>About</NavLink>
                    </div>

                    {/* Action Status Indicator */}
                    <div className="hidden lg:flex items-center gap-3">
                        <span className="verified-badge px-4 py-2 flex items-center gap-2 shadow-sm bg-slate-50 border border-slate-200 select-none">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Secure Offline-Ready Engine</span>
                        </span>
                    </div>

                    {/* Mobile Hamburguer trigger */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation drawer"
                        aria-controls="mobile-drawer"
                        className="lg:hidden p-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 border border-slate-100/80 rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                        {isMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer Menu (Rendered at Body root to bypass layout/sticky restrictions) */}
            {typeof document !== "undefined" && createPortal(
                <>
                    {/* Backdrop Blur Overlay */}
                    <div
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                            "fixed inset-0 bg-slate-950/20 backdrop-blur-[3px] z-[998] lg:hidden transition-opacity duration-300",
                            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                        )}
                        aria-hidden="true"
                    />

                    {/* Sidebar Slide-out Panel */}
                    <div
                        id="mobile-drawer"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu drawer"
                        className={cn(
                            "fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-white shadow-premium-xl z-[999] flex flex-col p-6 border-l border-slate-100 lg:hidden transition-transform duration-300 ease-in-out",
                            isMenuOpen ? "translate-x-0" : "translate-x-full"
                        )}
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg py-0.5 px-0.5">
                                <img src="/icon.png" alt="iFlexPDF" className="w-7 h-7 object-contain select-none" width="28" height="28" loading="lazy" decoding="async" />
                                <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
                                    iFlexPDF<span className="text-blue-600">.</span>
                                </span>
                            </Link>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                aria-label="Close menu drawer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Navigation Area */}
                        <div className="flex-grow overflow-y-auto pr-1 flex flex-col gap-1 custom-scrollbar">
                            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
                            <MobileNavLink to="/blog" onClick={() => setIsMenuOpen(false)}>Blog Guides</MobileNavLink>
                            <MobileNavLink to="/security" onClick={() => setIsMenuOpen(false)}>Security Protocols</MobileNavLink>
                            <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About Us</MobileNavLink>

                            <div className="h-px bg-slate-100 my-4" aria-hidden="true"></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2.5 select-none">All PDF Tools</p>

                            <div className="grid grid-cols-1 gap-1 max-h-[calc(100vh-320px)] overflow-y-auto pr-0.5 custom-scrollbar">
                                {toolsLinks.map((link) => {
                                    const isToolActive = location.pathname === link.path;
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all duration-200 text-[13px] border border-transparent outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
                                                isToolActive
                                                    ? "text-blue-600 bg-blue-50/40 border-blue-100/30"
                                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/70"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 transition-colors duration-200",
                                                isToolActive
                                                    ? "bg-blue-600 text-white border-blue-600"
                                                    : "bg-slate-50 text-slate-500 border-slate-100"
                                            )}>
                                                <link.icon className="w-4 h-4" strokeWidth={2} />
                                            </div>
                                            <span>{link.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer status in mobile */}
                        <div className="pt-4 mt-4 border-t border-slate-100 bg-white">
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-2.5 select-none">
                                <div className="relative flex h-2 w-2 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                                    Local Processing Active
                                </p>
                            </div>
                        </div>
                    </div>
                </>,
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
                "text-[14px] font-semibold transition-all duration-200 py-1.5 border-b-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded px-1",
                active ? "text-blue-600 border-blue-600 font-bold" : "text-slate-500 hover:text-slate-900 border-transparent"
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
                "px-3 py-2.5 rounded-xl font-semibold transition-all duration-200 text-[13px] flex items-center justify-between outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
                active
                    ? "text-blue-600 bg-blue-50/40 border-l-2 border-blue-600 rounded-l-none"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/70"
            )}
        >
            {children}
        </Link>
    );
}
