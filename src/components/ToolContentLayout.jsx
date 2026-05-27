import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, ShieldCheck, Zap, Sparkles, BookOpen, Star, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { toolGuides } from "../data/toolGuides";
import AdSense from "./AdSense";

export default function ToolContentLayout({
  toolName,
  howItWorksSteps = [],
  features = [],
  faqs = [],
  relatedTools = [],
  relatedArticles = []
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const guide = toolGuides[toolName];

  return (
    <div className="w-full mt-24 border-t border-slate-100 pt-16 space-y-20 bg-slate-50/20 pb-16 rounded-3xl px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto space-y-20">
        
        {/* Section 1: Step-by-Step How to Use */}
        {howItWorksSteps.length > 0 && (
          <section className="space-y-12 text-left" aria-label={`How to use ${toolName}`}>
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                How to Use {toolName}
              </h2>
              <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm sm:text-base">
                Follow these simple steps to process your documents instantly with high quality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorksSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="relative p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4 pt-10"
                >
                  <div 
                    className="absolute -top-4 left-6 w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-blue-100 select-none"
                    aria-hidden="true"
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-slate-800 mb-2 leading-snug">{step.title}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Features & Benefits Grid */}
        {features.length > 0 && (
          <section className="space-y-12 text-left" aria-label={`Features of ${toolName}`}>
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Why Choose Our {toolName} Tool?
              </h2>
              <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm sm:text-base">
                Engineered for security, high-fidelity layouts, and extreme speed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, idx) => {
                const Icon = feat.icon || Star;
                return (
                  <div 
                    key={idx} 
                    className="p-6 bg-white border border-slate-100 rounded-2xl transition-all duration-300 flex items-start gap-4 hover:border-slate-200 hover:shadow-md"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 select-none"
                      aria-hidden="true"
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 min-w-0">
                      <h3 className="font-bold text-[15px] text-slate-800 leading-tight">{feat.title}</h3>
                      <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed font-medium">{feat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* AdSense Slot C - Middle Page Tool Banner */}
        <div className="w-full max-w-[970px] mx-auto select-none">
          <AdSense adSlot="9573820485" adFormat="horizontal" />
        </div>

        {/* Section 3: Collapsible FAQs */}
        {faqs.length > 0 && (
          <section className="max-w-3xl mx-auto space-y-12 text-left" aria-label="Frequently Asked Questions">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-500 font-medium text-sm sm:text-base">
                Got questions? We have expert-backed answers regarding privacy, limits, and processing.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className={cn(
                      "bg-white border rounded-2xl overflow-hidden transition-all duration-200",
                      isOpen ? "border-blue-600 shadow-md" : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="w-full px-6 py-4.5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="font-bold text-[14.5px] sm:text-[15px] text-slate-800 pr-4 leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown 
                        className={cn(
                          "w-4.5 h-4.5 text-slate-400 shrink-0 transition-transform duration-300", 
                          isOpen && "rotate-180 text-blue-600"
                        )} 
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium border-t border-slate-50">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* AdSense Slot D - Handbook Header Banner */}
        <div className="w-full max-w-[970px] mx-auto select-none">
          <AdSense adSlot="4382940285" adFormat="horizontal" />
        </div>

        {/* Section 4: Handbook & Deep Guides (AdSense Dense Content) */}
        {guide && (
          <section className="space-y-12 max-w-4xl mx-auto border-t border-slate-100 pt-16 text-left" aria-label={`Handbook guide for ${toolName}`}>
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {guide.title}
              </h2>
              <p className="text-slate-500 font-medium text-sm sm:text-base">
                Comprehensive Professional Handbook & User Manual
              </p>
            </div>

            <div className="space-y-10 bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm">
              {guide.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2.5">
                    <span className="w-1.5 h-5.5 bg-blue-600 rounded-full shrink-0" aria-hidden="true"></span>
                    {section.heading}
                  </h3>
                  <div className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium whitespace-pre-wrap pl-4 border-l-2 border-slate-100">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Related Tools (Internal Linking) */}
        {relatedTools.length > 0 && (
          <section className="space-y-12 border-t border-slate-100 pt-16 text-left" aria-label="Alternative Utility Workflows">
            <div className="text-center space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Alternative Utility Workflows
              </h2>
              <p className="text-slate-500 font-medium text-xs sm:text-sm">
                Combine tools to achieve your ultimate workflow. All 100% secure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {relatedTools.map((tool, idx) => (
                <Link key={idx} to={tool.path} className="group outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-2xl">
                  <div className="p-5 bg-white border border-slate-100 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-[14.5px] leading-tight">
                        {tool.name}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed font-medium">
                        {tool.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-blue-600 mt-4 transition-all">
                      <span>Launch Tool</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 duration-200 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="space-y-12 border-t border-slate-100 pt-16 text-left" aria-label="Recommended Productivity Guides">
            <div className="text-center space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Recommended Productivity Guides
              </h2>
              <p className="text-slate-500 font-medium text-xs sm:text-sm">
                Learn how to optimize your office document management from our team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {relatedArticles.map((art, idx) => (
                <Link key={idx} to={`/blog/${art.slug}`} className="group outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-2xl">
                  <div className="p-5 bg-white border border-slate-100 rounded-2xl hover:border-slate-200 hover:shadow-md transition-all duration-300 flex gap-4 items-center">
                    <div 
                      className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all select-none"
                      aria-hidden="true"
                    >
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-[14.5px] leading-snug truncate">
                        {art.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-semibold leading-none">
                        Read Comprehensive Article &rarr;
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
