import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
	ChevronDown, 
	HelpCircle, 
	Shield, 
	FileText, 
	Zap, 
	Laptop, 
	Search, 
	X, 
	MessageSquare, 
	ThumbsUp, 
	ThumbsDown, 
	Check 
} from "lucide-react";
import SEO from "../components/SEO";
import { cn } from "../lib/utils";

export default function FAQPage() {
	const [openIndex, setOpenIndex] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState("all");
	const [feedbackState, setFeedbackState] = useState({}); // Stores 'yes' or 'no' per FAQ index

	const faqs = [
		{
			question: "Is iFlexPDF completely free to use? Are there hidden fees?",
			answer: "Yes, iFlexPDF is 100% free with no signups, subscription models, or hidden fees. Since execution happens entirely on your own device rather than our servers, we have no expensive cloud hosting overhead, allowing us to keep the entire platform free of charge for students, developers, and businesses alike.",
			category: "general",
			icon: HelpCircle
		},
		{
			question: "How does client-side processing guarantee data security?",
			answer: "Traditional web utilities upload your documents to external cloud servers for processing. iFlexPDF uses advanced client-side scripts (PDF.js, PDF-lib) executed directly within your browser sandbox. Your files are loaded into RAM, processed locally by your computer's CPU, and saved, meaning they never touch our servers and remain 100% secure.",
			category: "security",
			icon: Shield
		},
		{
			question: "What is the maximum file size or limit of pages I can process?",
			answer: "We enforce no artificial file size or page count limits! However, because processing uses your computer's RAM, extremely large documents (e.g. over 500MB) may depend on your device's available memory. Most documents under 200MB process instantly in standard browsers.",
			category: "limits",
			icon: FileText
		},
		{
			question: "Can I use iFlexPDF offline or in restricted network zones?",
			answer: "Absolutely! Once the page is loaded, the rendering and processing libraries are fully cached in your browser. Since no server requests or document uploads are required, the utilities will work perfectly even if you disconnect from the internet or operate in high-security intranet sectors.",
			category: "tech",
			icon: Zap
		},
		{
			question: "Does this tool store any logs or metadata of my files?",
			answer: "No. We do not inspect, log, or store file metadata, titles, content strings, or character maps. All local processing results in instantaneous memory disposal once you close the page or select another file.",
			category: "security",
			icon: Shield
		},
		{
			question: "Does iFlexPDF support OCR for scanned documents?",
			answer: "iFlexPDF extracts digital text layers and processes existing document structures. For scanned pages (which are saved as flat images), an OCR (Optical Character Recognition) engine is required. We are currently developing a client-side OCR engine that will perform text extraction locally in a future update.",
			category: "tech",
			icon: Zap
		},
		{
			question: "Which browsers and operating systems are compatible?",
			answer: "iFlexPDF is fully compatible with all modern, secure evergreen browsers including Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and Brave. It runs natively across Windows, macOS, Linux, iOS, and Android without requiring any additional installation or extensions.",
			category: "tech",
			icon: Laptop
		},
		{
			question: "Are my files processed in batch or one-by-one?",
			answer: "Both! You can upload and process multiple PDF files simultaneously. Our batch processing engine operates concurrently, utilizing your browser's asynchronous capabilities to merge, rotate, compress, or convert multiple files in parallel for maximum efficiency.",
			category: "limits",
			icon: FileText
		}
	];

	const categories = [
		{ id: "all", label: "All Questions" },
		{ id: "security", label: "Security & Privacy" },
		{ id: "limits", label: "Usage & Limits" },
		{ id: "tech", label: "Technology & Offline" }
	];

	// Filter FAQs based on category and search query
	const filteredFaqs = useMemo(() => {
		return faqs.filter(faq => {
			const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
			const matchesSearch = 
				faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
				faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		});
	}, [activeCategory, searchQuery]);

	// Schema data for SEO compliance
	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {
				"@type": "Answer",
				"text": faq.answer
			}
		}))
	};

	const handleFeedback = (idx, value) => {
		setFeedbackState(prev => ({
			...prev,
			[idx]: value
		}));
	};

	return (
		<>
			<SEO
				title="Frequently Asked Questions (FAQ) - iFlexPDF"
				description="Find comprehensive answers about our browser-local PDF processing pipeline, security protocols, file limits, and privacy guarantees."
				keywords="pdf tool faq, secure pdf processing, local pdf editor, free pdf tools online, offline pdf"
				schemaData={faqSchema}
			/>
			
			<div className="container-professional space-y-16 py-16 md:py-24 max-w-4xl mx-auto">
				{/* Page Header */}
				<div className="text-center space-y-6">
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-widest shadow-sm select-none"
					>
						<HelpCircle className="w-4 h-4 text-blue-600" />
						<span>Customer Support Hub</span>
					</motion.div>
					
					<h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
						Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-650">Questions</span>
					</h1>
					
					<p className="text-slate-500 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
						Clear, transparent answers regarding client-side data security, local RAM files compiling, and tool framework mechanics.
					</p>
				</div>

				{/* Search Bar */}
				<div className="max-w-xl mx-auto relative select-none">
					<div className="relative rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all duration-200 shadow-sm focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
							<Search className="w-5 h-5" />
						</div>
						<input
							type="text"
							placeholder="Search for answers..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-11 pr-10 py-3.5 bg-transparent rounded-xl text-slate-800 placeholder-slate-400 font-semibold text-[15px] focus:outline-none"
						/>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery("")}
								className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
								aria-label="Clear search"
							>
								<X className="w-4 h-4" />
							</button>
						)}
					</div>
				</div>

				{/* Category Tabs */}
				<div className="flex flex-wrap justify-center gap-2 select-none">
					{categories.map((cat) => {
						const isActive = activeCategory === cat.id;
						return (
							<button
								key={cat.id}
								onClick={() => {
									setActiveCategory(cat.id);
									setOpenIndex(null); // Reset open states on category change
								}}
								className={cn(
									"px-5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 active:scale-[0.98]",
									isActive 
										? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-100" 
										: "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-800"
								)}
							>
								{cat.label}
							</button>
						);
					})}
				</div>

				{/* FAQs List */}
				<div className="space-y-4">
					<AnimatePresence mode="wait">
						{filteredFaqs.length > 0 ? (
							<div className="space-y-4">
								{filteredFaqs.map((faq, idx) => {
									const isOpen = openIndex === idx;
									const IconComponent = faq.icon;
									const feedback = feedbackState[idx];

									return (
										<div
											key={idx}
											className={cn(
												"bg-white border rounded-xl overflow-hidden transition-all duration-300 shadow-sm",
												isOpen 
													? "border-blue-600 shadow-md shadow-blue-100/40" 
													: "border-slate-200/90 hover:border-blue-600/50"
											)}
										>
											<button
												onClick={() => setOpenIndex(isOpen ? null : idx)}
												className="w-full px-6 py-5 sm:px-8 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30 group"
											>
												<div className="flex items-center gap-4 pr-4">
													<div className={cn(
														"w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-300",
														isOpen 
															? "bg-blue-600 text-white border-blue-600" 
															: "bg-slate-50 text-slate-600 border-slate-100/50 group-hover:bg-slate-100"
													)}>
														<IconComponent className="w-4.5 h-4.5" />
													</div>
													<span className="font-bold text-[15px] sm:text-[16px] text-slate-800 group-hover:text-slate-900 leading-snug">
														{faq.question}
													</span>
												</div>
												<ChevronDown
													className={cn(
														"w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300",
														isOpen && "rotate-180 text-blue-600"
													)}
												/>
											</button>

											{/* High-performance CSS Grid auto-rows collapse */}
											<div
												className={cn(
													"grid transition-all duration-300 ease-in-out",
													isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
												)}
											>
												<div className="overflow-hidden">
													<div className="px-6 pb-6 pt-1 sm:px-8 text-slate-500 text-[13.5px] sm:text-[14px] leading-relaxed font-semibold border-t border-slate-50 text-left">
														<div className="pl-0 sm:pl-14">
															<p>{faq.answer}</p>
															
															{/* Feedback System */}
															<div className="border-t border-slate-100/80 mt-6 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-400 text-xs select-none">
																<span>Was this helpful?</span>
																<div className="flex items-center gap-2">
																	{feedback ? (
																		<span className="text-blue-600 font-bold flex items-center gap-1.5">
																			<Check className="w-3.5 h-3.5" />
																			Thank you for your feedback!
																		</span>
																	) : (
																		<>
																			<button
																				onClick={() => handleFeedback(idx, "yes")}
																				className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95 hover:bg-blue-50/20"
																			>
																				<ThumbsUp className="w-3.5 h-3.5" />
																				Yes
																			</button>
																			<button
																				onClick={() => handleFeedback(idx, "no")}
																				className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-red-600 hover:text-red-600 transition-all active:scale-95 hover:bg-red-50/20"
																			>
																				<ThumbsDown className="w-3.5 h-3.5" />
																				No
																			</button>
																		</>
																	)}
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0 }}
								className="text-center py-16 bg-white border border-slate-200/90 rounded-xl shadow-sm space-y-4 max-w-md mx-auto select-none"
							>
								<div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-slate-400">
									<Search className="w-5 h-5" />
								</div>
								<div className="space-y-1">
									<h3 className="text-slate-800 font-bold text-[16px]">No results found</h3>
									<p className="text-slate-400 font-medium text-sm">
										We couldn't find any match for "{searchQuery}".
									</p>
								</div>
								<button
									onClick={() => {
										setSearchQuery("");
										setActiveCategory("all");
									}}
									className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 active:scale-95 transition-all"
								>
									Reset search query
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* bottom Help CTA Card */}
				<div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-800 text-center mt-16 max-w-3xl mx-auto select-none">
					<div className="relative z-10 space-y-4">
						<div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
							<MessageSquare className="w-5 h-5" />
						</div>
						<h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Still have questions?</h3>
						<p className="text-slate-400 font-medium text-sm sm:text-base max-w-md mx-auto leading-relaxed">
							Our support team is fully digital and operates online. Reach out anytime, and we'll resolve your issues within 24 hours.
						</p>
						<div className="pt-2">
							<Link
								to="/contact"
								className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-650 text-white font-bold text-sm shadow-md hover:from-blue-500 hover:to-indigo-600 hover:shadow-lg hover:shadow-blue-500/10 active:scale-[0.98] transition-all duration-200"
							>
								Contact Support Team
							</Link>
						</div>
					</div>
					
					{/* Glowing backgrounds */}
					<div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
					<div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
				</div>
			</div>
		</>
	);
}
