import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Mail, ShieldAlert, CheckCircle2, Printer, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import { cn } from "../lib/utils";

export default function Disclaimer() {
	const [activeSection, setActiveSection] = useState("general-disclaimer");

	const sections = [
		{ id: "general-disclaimer", label: "1. General Disclaimer" },
		{ id: "dmca-policy", label: "2. DMCA & Copyright" },
		{ id: "legal-desk", label: "3. Contact Legal Desk" }
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
				title="Disclaimer & DMCA Policy - iFlexPDF Professional"
				description="Review the legal disclaimers, liability exemptions, and official DMCA copyright reporting procedures for iFlexPDF's browser-local document suite."
				keywords="legal disclaimer, DMCA compliance, copyright infringement, file processing liability, AdSense legal compliance"
			/>
			
			<div className="container-professional py-12 md:py-20 max-w-6xl mx-auto">
				{/* Top Header Row with Print Utility */}
				<div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 pb-8 mb-12 gap-4 select-none">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600">
							<ShieldAlert className="w-5 h-5" />
						</div>
						<div className="text-left">
							<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Legal Guidelines</span>
							<p className="text-xs font-bold text-slate-500">Effective Date: May 2026</p>
						</div>
					</div>
					<button
						onClick={handlePrint}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-500 bg-white transition-all active:scale-95 shadow-sm"
					>
						<Printer className="w-3.5 h-3.5" />
						Print Disclaimer
					</button>
				</div>

				{/* Page Header */}
				<div className="text-center space-y-6 mb-16 max-w-3xl mx-auto">
					<h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
						Disclaimer & <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-650">DMCA Policy</span>
					</h1>
					<p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">
						Important legal clarifications regarding services, liability exemptions, and copyright reporting protocols at iFlexPDF.
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
						<section id="general-disclaimer" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
									<AlertTriangle className="w-4.5 h-4.5" />
								</div>
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">1. General Software Disclaimer</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									iFlexPDF is a client-side document processing suite offering PDF merging, compression, rotation, conversions, and metadata utility systems. **All processing operations execute entirely inside the user's private browser thread** utilizing sandboxed memory channels.
								</p>
								<p>
									Because we do not upload, host, review, or store any of your files on external server infrastructures, we take zero responsibility for the content, classification, legal validity, or structural integrity of your files.
								</p>
							</div>
						</section>

						{/* Section 2 */}
						<section id="dmca-policy" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
									<ShieldAlert className="w-4.5 h-4.5" />
								</div>
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">2. DMCA & Copyright Policy</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									Since **our web servers do not transmit, cache, upload, or archive document bytes**, copyright-infringing materials cannot physically exist on our infrastructure. However, we highly respect intellectual property rights. If you believe any tools, images, or assets on our website infringe upon your copyrights, you may submit a formal complaint including:
								</p>
								
								<div className="grid grid-cols-1 gap-3 pt-2">
									<DocItem text="Identification of the copyrighted work claimed to have been infringed." />
									<DocItem text="A clear identification of the specific assets or software files on our website that you claim are infringing." />
									<DocItem text="Valid contact credentials, including an active email address and telephone number." />
									<DocItem text="A signed statement stating in good faith that use of the material is not authorized by the copyright owner." />
								</div>
							</div>
						</section>

						{/* Section 3 */}
						<section id="legal-desk" className="space-y-6 scroll-mt-24">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
									<Mail className="w-4.5 h-4.5" />
								</div>
								<h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">3. Legal Support Desk</h2>
							</div>
							
							<div className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed space-y-4">
								<p>
									For all legal inquiries, licensing compliance audits, or copyright notifications, please contact our support desk directly. We investigate all formal complaints thoroughly and promptly.
								</p>
								
								<div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 mt-6 select-none relative overflow-hidden shadow-md">
									<div className="relative z-10 text-center sm:text-left">
										<h4 className="text-white font-bold text-base mb-1">Corporate Legal Desk</h4>
										<p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Average response: &lt; 24 Hours</p>
									</div>
									<a
										href="mailto:iflexpdf@gmail.com"
										className="px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-all text-xs shadow-md select-none shrink-0 relative z-10"
									>
										iflexpdf@gmail.com
									</a>
									<div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-xl rounded-full pointer-events-none" />
								</div>
							</div>
						</section>

						{/* Bottom Copyright Notice */}
						<div className="pt-8 border-t border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest text-center select-none">
							iFlexPDF Legal Disclaimers Updated: May 2026
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function DocItem({ text }) {
	return (
		<div className="flex items-start gap-3 p-4 border border-slate-200/90 rounded-xl bg-white shadow-sm hover:border-blue-600/30 transition-all select-none">
			<CheckCircle2 className="w-4.5 h-4.5 text-blue-600 flex-shrink-0 mt-0.5" />
			<span className="font-bold text-slate-600 text-xs sm:text-sm leading-relaxed">{text}</span>
		</div>
	);
}
