/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, AlertCircle, Printer, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import { cn } from "../lib/utils";

export default function Terms() {
	const [activeSection, setActiveSection] = useState("acceptable-use");

	const sections = [
		{ id: "acceptable-use", label: "1. Acceptable Utilization" },
		{ id: "service-continuity", label: "2. Service Continuity" },
		{ id: "liability-exclusion", label: "3. Limitation of Liability" },
		{ id: "compliance-updates", label: "4. Regulatory Revisions" }
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
				title="Terms of Service - iFlexPDF Professional"
				description="Read the operational terms, acceptable use policies, and legal framework governing the use of iFlexPDF's browser-local document tools."
				keywords="terms of service, legal terms, pdf tool agreement, user agreement, software usage terms"
			/>
			
			<div className="container-professional py-12 md:py-20 max-w-6xl mx-auto">
				<div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 pb-8 mb-12 gap-4 select-none">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600">
							<FileText className="w-5 h-5" />
						</div>
						<div className="text-left">
							<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Operational Framework</span>
							<p className="text-xs font-bold text-slate-500">Effective Date: May 2026</p>
						</div>
					</div>
					<button
						onClick={handlePrint}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-500 bg-white transition-all active:scale-95 shadow-sm"
					>
						<Printer className="w-3.5 h-3.5" />
						Print Terms
					</button>
				</div>

				<div className="text-center space-y-6 mb-16 max-w-3xl mx-auto">
					<h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
						Terms of <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-650">Service</span>
					</h1>
					<p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">
						Please read the legal guidelines and acceptable use parameters governing your interaction with iFlexPDF's browser-local tools.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
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

					<div className="md:col-span-8 space-y-16">
						<section id="acceptable-use" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">1. Acceptable Utilization</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									By accessing iFlexPDF Professional, you agree to utilize our tools exclusively for legitimate, lawful purposes. Since document rendering, merging, encryption, and editing occur entirely client-side on your local device, you hold exclusive responsibility and absolute sovereignty over any files processed.
								</p>
								<p>
									You agree not to use the platform to process documents containing malicious code, Trojan horses, or illegal materials. Any automated scraping, reverse engineering of client-side assets, or systematic harvesting of codebase tools is strictly prohibited.
								</p>
							</div>
						</section>

						<section id="service-continuity" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">2. Service Continuity</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									iFlexPDF is designed as a serverless static web utility. Once files and libraries compile into your local browser active cache, you can process documents without relying on server uploads. While we strive to maintain high web accessibility, the platform is provided on an "as is" and "as available" basis.
								</p>
								<p>
									We reserve the right to perform system optimizations, library updates, or minor operational modifications at any time and without prior notification to ensure long-term tool stability and security.
								</p>
							</div>
						</section>

						<section id="liability-exclusion" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">3. Limitation of Liability</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									Because the entire toolchain executes entirely within your browser's private memory thread, we do not store, review, or inspect your documents. You assume all operational outcomes of document compilation, cropping, formatting, or encryption.
								</p>
								
								<div className="p-6 bg-slate-50 border-l-4 border-blue-600 rounded-r-xl flex items-start gap-4 shadow-sm mt-4 select-none">
									<AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
									<p className="text-slate-700 font-bold leading-relaxed text-xs sm:text-sm">
										iFlexPDF, its contributors, and developers assume zero liability for direct, indirect, special, or consequential damages resulting from document formatting errors, local data losses, or temporary browser tab crashes.
									</p>
								</div>
							</div>
						</section>

						<section id="compliance-updates" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">4. Regulatory Revisions</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									We reserve the right to refine, modify, or update these operational terms at our sole discretion. Any changes will be posted directly on this page with an updated effective date. Continued engagement with iFlexPDF signifies your voluntary agreement and absolute acceptance of the revised Terms of Service.
								</p>
							</div>
						</section>

						<div className="pt-8 border-t border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest text-center select-none">
							iFlexPDF Protocol Revision: May 2026
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
