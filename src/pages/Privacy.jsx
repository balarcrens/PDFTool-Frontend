import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, ServerOff, CheckCircle2, Printer, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import { cn } from "../lib/utils";

export default function Privacy() {
	const [activeSection, setActiveSection] = useState("decentralized-processing");

	const sections = [
		{ id: "decentralized-processing", label: "Decentralized Processing" },
		{ id: "data-integrity", label: "Data Integrity & Logs" },
		{ id: "enterprise-security", label: "Enterprise Security Sandbox" },
		{ id: "user-rights", label: "User Sovereignty & Rights" }
	];

	const handlePrint = () => {
		window.print();
	};

	const scrollToSection = (id) => {
		setActiveSection(id);
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<>
			<SEO
				title="Privacy Policy - iFlexPDF Professional"
				description="Discover iFlexPDF's secure, zero-trust, browser-local PDF processing. Read our strict data protection strategy and AdSense privacy compliance guarantees."
				keywords="privacy policy, secure pdf tool, local-first conversion, browser sandbox, zero tracking, AdSense compliance"
			/>
			
			<div className="container-professional py-12 md:py-20 max-w-6xl mx-auto">
				{/* Top Header Row with Print Utility */}
				<div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 pb-8 mb-12 gap-4 select-none">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600">
							<ShieldCheck className="w-5 h-5" />
						</div>
						<div className="text-left">
							<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Security Directive</span>
							<p className="text-xs font-bold text-slate-500">Effective Date: May 2026</p>
						</div>
					</div>
					<button
						onClick={handlePrint}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-500 bg-white transition-all active:scale-95 shadow-sm"
					>
						<Printer className="w-3.5 h-3.5" />
						Print Document
					</button>
				</div>

				{/* Page Header */}
				<div className="text-center space-y-6 mb-16 max-w-3xl mx-auto">
					<h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
						Privacy Policy & <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-650">Data Protection Strategy</span>
					</h1>
					<p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">
						At iFlexPDF Professional, we implement a strict zero-trust operational model where your documents remain entirely under your local sovereign control.
					</p>
				</div>

				{/* 2-Column Responsive Layout */}
				<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
					{/* Left Sticky Sidebar Index */}
					<aside className="md:col-span-4 sticky top-24 hidden md:block select-none">
						<div className="border-r border-slate-100 pr-6 mr-6 space-y-1">
							<h3 className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-4 pl-3">Table of Contents</h3>
							{sections.map((sec) => {
								const isActive = activeSection === sec.id;
								return (
									<button
										key={sec.id}
										onClick={() => scrollToSection(sec.id)}
										className={cn(
											"w-full text-left px-4 py-3 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-between group",
											isActive 
												? "bg-blue-50 text-blue-600 shadow-sm" 
												: "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
										)}
									>
										<span>{sec.label}</span>
										<ArrowRight className={cn(
											"w-3 h-3 transition-all duration-300 opacity-0 -translate-x-2 shrink-0",
											isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-40 group-hover:translate-x-0"
										)} />
									</button>
								);
							})}
						</div>
					</aside>

					{/* Right Content Panel */}
					<div className="md:col-span-8 space-y-16">
						{/* Section 1 */}
						<section id="decentralized-processing" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
									<ServerOff className="w-4.5 h-4.5" />
								</div>
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">1. Decentralized Local Processing</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									Traditional web applications require you to upload your sensitive contracts, tax transcripts, and reports to their external cloud clusters. This architecture introduces severe network security concerns and exposes personal information to third-party server databases.
								</p>
								<div className="p-6 bg-slate-50 border border-slate-200/60 rounded-xl text-slate-700 font-bold border-l-4 border-l-blue-600">
									iFlexPDF operates on an entirely client-side computing architecture. By leveraging native browser resources (HTML5, PDF-lib, WebAssembly), all file inputs are processed locally in your machine's active RAM sandbox.
								</div>
								<ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
									<PrivacyItem text="100% Client-Side Processing" />
									<PrivacyItem text="Zero External Database Uploads" />
									<PrivacyItem text="Non-Persistent Memory States" />
									<PrivacyItem text="Session-Based RAM Erasure" />
								</ul>
							</div>
						</section>

						{/* Section 2 */}
						<section id="data-integrity" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
									<EyeOff className="w-4.5 h-4.5" />
								</div>
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">2. Data Integrity & AdSense Terms Compliance</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									We operate a strict, verified non-collection protocol. We do not store, inspect, transmit, or cache your document files, metadata, or character strings. Your files stay under your control at all times.
								</p>
								<p>
									To monetize and keep this software completely free, we utilize Google AdSense advertisements. Google AdSense and third-party advertising partners may serve context-specific cookies, web beacons, or unique device identifiers to compile non-personal browsing trends. This information is used strictly to deliver relevant advertisements. You can opt-out of personalized advertising by updating your browser settings or visiting Google's ad-choice networks.
								</p>
							</div>
						</section>

						{/* Section 3 */}
						<section id="enterprise-security" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
									<Lock className="w-4.5 h-4.5" />
								</div>
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">3. Enterprise Security Sandbox</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									By computing all data within the strict confines of your local browser sandboxed runtime environment, we eliminate potential risks associated with data interception, server-side code execution leaks, or unauthorized system access. Your documents are safely kept in your browser thread, avoiding exposure to third-party databases.
								</p>
								<div className="p-6 bg-blue-950 text-white rounded-xl space-y-3 relative overflow-hidden shadow-md">
									<h4 className="font-bold text-base flex items-center gap-2 relative z-10">
										<Lock className="w-4 h-4 text-blue-400" />
										Sovereign Sandbox Execution
									</h4>
									<p className="text-slate-300 text-xs sm:text-sm leading-relaxed relative z-10">
										Your files are held exclusively in temporary CPU registers. Closing your web browser tab automatically clears all allocated memory blocks, ensuring absolute data sanitation.
									</p>
									<div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-xl rounded-full pointer-events-none" />
								</div>
							</div>
						</section>

						{/* Section 4 */}
						<section id="user-rights" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
									<ShieldCheck className="w-4.5 h-4.5" />
								</div>
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">4. User Sovereignty & Rights</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									As an internet user, you possess sovereign rights regarding your data privacy. Under regulations like GDPR and CCPA, you maintain total ownership over your processing cycles. Because iFlexPDF does not host or retain any personal data, there is no physical profile records to delete, edit, or migrate. Your sovereignty is fully preserved by default.
								</p>
							</div>
						</section>

						{/* Bottom Copyright Notice */}
						<div className="pt-8 border-t border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest text-center select-none">
							iFlexPDF Security Protocol Revision: May 2026
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function PrivacyItem({ text }) {
	return (
		<div className="flex items-center gap-3 p-4 bg-white border border-slate-200/90 rounded-xl shadow-sm hover:border-blue-600/30 transition-all select-none">
			<CheckCircle2 className="w-4.5 h-4.5 text-blue-600 flex-shrink-0" />
			<span className="font-bold text-slate-700 text-[13px]">{text}</span>
		</div>
	);
}
