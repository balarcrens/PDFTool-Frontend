import { useState } from "react";
import { motion } from "framer-motion";
import { Cookie, Info, ShieldCheck, AlertCircle, Printer, ArrowRight, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";
import { cn } from "../lib/utils";

export default function Cookies() {
	const [activeSection, setActiveSection] = useState("what-are-cookies");

	const sections = [
		{ id: "what-are-cookies", label: "1. Cookies vs Local Storage" },
		{ id: "usage-details", label: "2. How We Use Cookies" },
		{ id: "preference-management", label: "3. Manage Storage Options" }
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
				title="Cookie Policy - iFlexPDF Professional"
				description="Learn about iFlexPDF's non-tracking policy. Understand how we use secure local storage and sandboxed browser sessions to process files offline."
				keywords="cookies policy, local storage, browser cache, offline tools, cookie compliance, AdSense compliance"
			/>
			
			<div className="container-professional py-12 md:py-20 max-w-6xl mx-auto">
				{/* Top Header Row with Print Utility */}
				<div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 pb-8 mb-12 gap-4 select-none">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600">
							<Cookie className="w-5 h-5" />
						</div>
						<div className="text-left">
							<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Compliance Directive</span>
							<p className="text-xs font-bold text-slate-500">Effective Date: May 2026</p>
						</div>
					</div>
					<button
						onClick={handlePrint}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-500 bg-white transition-all active:scale-95 shadow-sm"
					>
						<Printer className="w-3.5 h-3.5" />
						Print Policy
					</button>
				</div>

				{/* Page Header */}
				<div className="text-center space-y-6 mb-16 max-w-3xl mx-auto">
					<h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
						Cookie & Local <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-650">Storage Policy</span>
					</h1>
					<p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">
						We are fully committed to complete user transparency. Discover how we utilize localized storage techniques to support browser-based file conversion.
					</p>
				</div>

				{/* 2-Column Responsive Layout */}
				<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
					{/* Left Sticky Sidebar Index */}
					<aside className="md:col-span-4 sticky top-24 hidden md:block select-none">
						<div className="border-r border-slate-100 pr-6 mr-6 space-y-1">
							<h3 className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-4 pl-3">Sections</h3>
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
						<section id="what-are-cookies" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
									<Info className="w-4.5 h-4.5" />
								</div>
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">1. Cookies vs Local Storage</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									Cookies are small files written onto your device by modern websites to track preferences. **Local Storage** is a highly efficient, sandboxed browser technology that stores secure values directly in your browser's dedicated local sandbox. Unlike cookies, Local Storage values are never transmitted to any external server.
								</p>
								<p>
									Because iFlexPDF operates entirely client-side, we use browser Local Storage to temporarily cache layout coordinates, organize your PDF queues, and render page thumbnails offline in active RAM.
								</p>
							</div>
						</section>

						{/* Section 2 */}
						<section id="usage-details" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
									<ShieldCheck className="w-4.5 h-4.5" />
								</div>
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">2. How We Use Cookies & Storage</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									We adhere to a non-intrusive privacy standard. **We do not deploy marketing or behavioral trackers** to build demographic profiles. Any storage utilized on our domain falls under functional operational requirements:
								</p>
								
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
									<CookieCard
										title="Strictly Functional Session"
										desc="Securely holds your document workspace queues and rotation commands in your local browser sandbox. Destroyed immediately upon closing the page."
									/>
									<CookieCard
										title="Tool Layout Preferences"
										desc="Remembers UI choices like grid view scaling, compression levels, page number alignments, and custom watermarking text presets."
									/>
								</div>
							</div>
						</section>

						{/* Section 3 */}
						<section id="preference-management" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
									<AlertCircle className="w-4.5 h-4.5" />
								</div>
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">3. Manage Your Preferences</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									You hold sovereign control over your browser's disk storage and cookies. You can inspect, modify, or block domain storage directly through your browser's native developer panels or security settings at any time.
								</p>
								
								<div className="p-6 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-4 mt-4 select-none">
									<CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
									<p className="text-slate-600 font-bold leading-relaxed text-xs sm:text-sm">
										By engaging with iFlexPDF's browser utilities, you acknowledge and agree to this local functional storage design. We remain fully committed to local-first privacy architectures.
									</p>
								</div>
							</div>
						</section>

						{/* Bottom Copyright Notice */}
						<div className="pt-8 border-t border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest text-center select-none">
							iFlexPDF Cookie directives updated: May 2026
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function CookieCard({ title, desc }) {
	return (
		<div className="p-6 border border-slate-200/90 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-blue-600/30 transition-all flex flex-col gap-2 select-none">
			<h4 className="font-bold text-base text-slate-800 leading-tight">{title}</h4>
			<p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">{desc}</p>
		</div>
	);
}
