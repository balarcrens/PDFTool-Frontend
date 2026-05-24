import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, ShieldCheck, Zap, Sparkles, BookOpen, Star, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { toolGuides } from "../data/toolGuides";

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
    <div className="w-full mt-24 border-t border-slate-100 pt-20 space-y-24 bg-slate-50/30 -mx-6 sm:-mx-8 px-6 sm:px-8 pb-20">
      <div className="max-w-[1200px] mx-auto space-y-24">
        
        {/* Section 1: Step-by-Step How to Use */}
        {howItWorksSteps.length > 0 && (
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                How to Use {toolName}
              </h2>
              <p className="text-slate-500 font-medium max-w-xl mx-auto">
                Follow these simple steps to process your documents instantly with high quality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorksSteps.map((step, idx) => (
                <div key={idx} className="relative p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
                  <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-[#0047AB] text-white flex items-center justify-center font-black text-sm shadow-lg shadow-indigo-100">
                    {idx + 1}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Features & Benefits Grid */}
        {features.length > 0 && (
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Why Choose Our {toolName} Tool?
              </h2>
              <p className="text-slate-500 font-medium max-w-xl mx-auto">
                Engineered for security, high-fidelity layouts, and extreme speed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, idx) => {
                const Icon = feat.icon || Star;
                return (
                  <div key={idx} className="p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-slate-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-[16px] text-slate-900 leading-tight">{feat.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">{feat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 3: Collapsible FAQs */}
        {faqs.length > 0 && (
          <section className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-500 font-medium">
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
                      "bg-white border rounded-2xl md:rounded-[1.5rem] overflow-hidden transition-all duration-300",
                      isOpen ? "border-indigo-600 shadow-lg shadow-indigo-100/50" : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="font-bold text-[15px] md:text-[16px] text-slate-900 pr-4 leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown 
                        className={cn(
                          "w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300", 
                          isOpen && "rotate-180 text-indigo-600"
                        )} 
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-1 text-slate-500 text-sm md:text-[14px] leading-relaxed font-medium border-t border-slate-50">
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

        {/* Section 4: Handbook & Deep Guides (AdSense Dense Content) */}
        {guide && (
          <section className="space-y-12 max-w-4xl mx-auto border-t border-slate-100/80 pt-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {guide.title}
              </h2>
              <p className="text-slate-500 font-medium">
                Comprehensive Professional Handbook & User Manual
              </p>
            </div>

            <div className="space-y-10 bg-white border border-slate-100 rounded-[2.5rem] p-10 md:p-16 shadow-sm">
              {guide.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[#0047AB] rounded-full shrink-0"></span>
                    {section.heading}
                  </h3>
                  <div className="text-slate-500 text-sm md:text-[15px] leading-relaxed font-semibold whitespace-pre-wrap pl-4 border-l border-slate-100 text-left">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Related Tools (Internal Linking) */}
        {relatedTools.length > 0 && (
          <section className="space-y-12 border-t border-slate-100/80 pt-16">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Alternative Utility Workflows
              </h2>
              <p className="text-slate-500 font-medium">
                Combine tools to achieve your ultimate workflow. All 100% secure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {relatedTools.map((tool, idx) => (
                <Link key={idx} to={tool.path} className="group">
                  <div className="p-6 bg-white border border-slate-100 rounded-2xl hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-base leading-tight">
                        {tool.name}
                      </h3>
                      <p className="text-slate-400 text-[12px] leading-relaxed font-medium">
                        {tool.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 mt-4 group-hover:gap-2.5 transition-all">
                      <span>Launch Tool</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="space-y-12 border-t border-slate-100/80 pt-16">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Recommended Productivity Guides
              </h2>
              <p className="text-slate-500 font-medium">
                Learn how to optimize your office document management from our team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedArticles.map((art, idx) => (
                <Link key={idx} to={`/blog/${art.slug}`} className="group">
                  <div className="p-6 bg-white border border-slate-100 rounded-[1.5rem] hover:border-slate-200 hover:shadow-lg transition-all duration-300 flex gap-5 items-center">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-[15px] leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-semibold">
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
