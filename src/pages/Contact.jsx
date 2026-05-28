import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Send, Globe, ShieldCheck } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";
import SEO from "../components/SEO";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [identity, setIdentity] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("Technical Inquiries");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
        });
    };

    return (
        <>
            <SEO
                title="Contact Us - iFlexPDF Professional Support"
                description="Have technical inquiries or corporate feedback regarding our client-side PDF tools? Get in touch with our remote, digital-first team online."
                keywords="contact pdf support, remote pdf development team, client-side tools feedback"
            />

            <div className="container-professional py-16 md:py-24 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Information Column */}
                    <div className="lg:col-span-6 space-y-10">
                        <div className="space-y-6 text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-widest shadow-sm select-none"
                            >
                                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                                <span>Direct Support Channel</span>
                            </motion.div>

                            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                                Expert Support for <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Your PDF Workflows</span>
                            </h1>

                            <p className="text-slate-500 font-medium text-base leading-relaxed">
                                Have technical inquiries, feature suggestions, or enterprise compliance questions?
                                Our remote engineering team is available online to assist with your requirements.
                            </p>
                        </div>

                        {/* Info Cards */}
                        <div className="space-y-4">
                            <ContactInfo
                                icon={<Mail className="w-5 h-5" />}
                                title="Official Communications"
                                detail="iflexpdf@gmail.com"
                                description="Expected reply within 12-24 hours"
                            />
                            <ContactInfo
                                icon={<Globe className="w-5 h-5" />}
                                title="Operations Location"
                                detail="Fully Remote / Digital-First"
                                description="Serving secure local utilities globally"
                            />
                            <ContactInfo
                                icon={<ShieldCheck className="w-5 h-5" />}
                                title="Data Privacy Officer"
                                detail="Local-First Sandbox"
                                description="100% serverless compliance protocol"
                            />
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="lg:col-span-6">
                        <div className="card-ref !p-6 sm:!p-10 border border-slate-200 bg-white shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-600 to-indigo-650"></div>

                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col items-center justify-center text-center space-y-6 py-12"
                                    >
                                        <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                                            <Send className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-black text-slate-900">Message Dispatched</h2>
                                            <p className="text-slate-500 font-medium text-sm max-w-xs mx-auto">
                                                Your communication has been securely compiled. Our remote team will review it shortly.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSubmitted(false);
                                                setIdentity("");
                                                setEmail("");
                                                setMessage("");
                                            }}
                                            className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:text-blue-800 transition-colors flex items-center gap-1.5"
                                        >
                                            Send Another Message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form key="form" onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5 text-left">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Your Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={identity}
                                                    onChange={(e) => setIdentity(e.target.value)}
                                                    placeholder="Full Name"
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 outline-none transition-all font-semibold text-sm"
                                                />
                                            </div>
                                            <div className="space-y-1.5 text-left">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Email Address</label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="example@gmail.com"
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 outline-none transition-all font-semibold text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 text-left">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Department</label>
                                            <div className="relative">
                                                <select
                                                    value={department}
                                                    onChange={(e) => setDepartment(e.target.value)}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-sm appearance-none cursor-pointer"
                                                >
                                                    <option>Technical Inquiries</option>
                                                    <option>Feature Development</option>
                                                    <option>Data Security & Privacy</option>
                                                    <option>Strategic Partnerships</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500 w-0 h-0"></div>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 text-left">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Message Details</label>
                                            <textarea
                                                required
                                                rows="5"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Describe your requirements, feature requests, or technical feedback here..."
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 outline-none transition-all font-semibold text-sm resize-none"
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn-primary-ref w-full py-3.5 text-xs uppercase tracking-widest font-black flex items-center justify-center gap-2 shadow-md cursor-pointer"
                                        >
                                            <span>Dispatch Message</span>
                                            <Send className="w-4 h-4 text-white/80" />
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

function ContactInfo({ icon, title, detail, description }) {
    return (
        <div className="flex items-start gap-4 p-4.5 rounded-xl bg-white border border-slate-200/90 hover:border-blue-600 hover:shadow-sm transition-all duration-200 text-left group">
            <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                {icon}
            </div>
            <div className="min-w-0">
                <h4 className="font-bold text-[15px] text-slate-900 mb-0.5 leading-tight">{title}</h4>
                <p className="text-blue-600 font-bold text-sm mb-1 truncate">{detail}</p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-none select-none">{description}</p>
            </div>
        </div>
    );
}
