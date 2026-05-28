import { motion } from "framer-motion";
import { ShieldCheck, Zap, Heart, Globe, Award, Lock, FileText, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";

export default function About() {
    return (
        <>
            <SEO
                title="About Us - iFlexPDF Professional"
                description="Learn about iFlexPDF's browser-local document processing architecture. Complete privacy, enterprise-grade security, and zero server uploads."
                keywords="about pdf tools, private document converter, secure local conversion, client-side conversion"
            />

            <div className="container-professional space-y-20 py-16 md:py-24">
                {/* Page Header */}
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-widest shadow-sm select-none"
                    >
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span>Established 2026</span>
                    </motion.div>

                    <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.1]">
                        Defining the Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Document Productivity</span>
                    </h1>

                    <p className="text-slate-500 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        iFlexPDF is dedicated to providing high-fidelity, client-side, and
                        unrestricted document utilities optimized for secure enterprise performance.
                    </p>
                </div>

                {/* Narrative Section: Why We Are Different */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-slate-100 max-w-6xl mx-auto">
                    <div className="lg:col-span-7 space-y-6 text-left">
                        <span className="badge-professional select-none">
                            Why We Are Different
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            The danger of traditional cloud tools.
                        </h2>
                        <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">
                            Most online PDF utilities force you to upload your sensitive contracts, financial logs, and medical records to their external cloud clusters. This introduces severe compliance risks and exposes private details to network breaches.
                        </p>
                        <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">
                            iFlexPDF operates on a completely different model. We believe your documents belong to you. Our engineering is focused entirely on **100% browser-local computation**.
                        </p>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="card-ref hover:border-slate-200 shadow-sm p-8 space-y-6 bg-slate-50/50">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 select-none">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 leading-none">Security Architecture</h3>
                            <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                                By loading all compiling tools into your local browser active RAM, your files are processed immediately by your CPU and never touch our servers. Absolute security by default.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Global Statistics Banner */}
                <div className="bg-[#0f172a] rounded-2xl p-12 md:p-16 relative overflow-hidden shadow-xl border border-slate-800 text-center max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10 select-none">
                        <div className="space-y-2">
                            <div className="text-4xl sm:text-5xl font-black text-white">100%</div>
                            <div className="font-bold text-blue-500 uppercase tracking-widest text-[10px]">Browser-Local Processing</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl sm:text-5xl font-black text-white">Pure</div>
                            <div className="font-bold text-blue-500 uppercase tracking-widest text-[10px]">Zero Tracking & Logs</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl sm:text-5xl font-black text-white">Ultra</div>
                            <div className="font-bold text-blue-500 uppercase tracking-widest text-[10px]">GPU-Native Rendering</div>
                        </div>
                    </div>
                </div>

                {/* Our Engineering Core Pillars */}
                <div className="space-y-12 text-center pt-8">
                    <div className="space-y-3">
                        <span className="badge-professional select-none">
                            Engineering Core
                        </span>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Our Core Principles</h2>
                        <p className="text-slate-500 font-semibold text-xs uppercase tracking-widest">The values that drive our development</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <div className="card-ref flex flex-col justify-between text-left p-6 sm:p-8">
                            <div className="space-y-4">
                                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-blue-600 select-none">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-[17px] text-slate-900 leading-none">User-Centric Design</h3>
                                <p className="text-slate-500 text-xs sm:text-[13.5px] leading-relaxed font-medium">
                                    We prioritize the needs of professional users, keeping our platform clutter-free, responsive, and completely devoid of aggressive popups.
                                </p>
                            </div>
                        </div>

                        <div className="card-ref flex flex-col justify-between text-left p-6 sm:p-8">
                            <div className="space-y-4">
                                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-blue-600 select-none">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-[17px] text-slate-900 leading-none">Global Accessibility</h3>
                                <p className="text-slate-500 text-xs sm:text-[13.5px] leading-relaxed font-medium">
                                    Elite document manipulation tools should be accessible to everyone, everywhere, in any country, with zero premium limits.
                                </p>
                            </div>
                        </div>

                        <div className="card-ref flex flex-col justify-between text-left p-6 sm:p-8">
                            <div className="space-y-4">
                                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-blue-600 select-none">
                                    <Award className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-[17px] text-slate-900 leading-none">Pixel-Perfect Quality</h3>
                                <p className="text-slate-500 text-xs sm:text-[13.5px] leading-relaxed font-medium">
                                    We leverage state-of-the-art vector parsers and PDF processors to guarantee maximum pixel fidelity and quality in every single save.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Clearances Footer */}
                <div className="pt-12 border-t border-slate-100 text-center max-w-2xl mx-auto space-y-4 select-none">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Guaranteed Data Security Standards</p>
                    <div className="flex justify-center items-center gap-6 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                            100% Offline Active
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                            Zero Network Cookies
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                            Enterprise Compliant
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
