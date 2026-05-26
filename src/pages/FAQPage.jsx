import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Shield, FileText, Zap } from "lucide-react";
import SEO from "../components/SEO";
import { cn } from "../lib/utils";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is iFlexPDF completely free to use? Are there hidden fees?",
      answer: "Yes, iFlexPDF is 100% free with no signups, subscription models, or hidden fees. Since execution happens entirely on your own device rather than our servers, we have no expensive cloud hosting overhead, allowing us to keep the entire platform free of charge for students, developers, and businesses alike.",
      icon: Zap
    },
    {
      question: "How does client-side processing guarantee data security?",
      answer: "Traditional web utilities upload your documents to external cloud servers for processing. iFlexPDF uses advanced client-side scripts (PDF.js, PDF-lib) executed directly within your browser sandbox. Your files are loaded into RAM, processed locally by your computer's CPU, and saved, meaning they never touch our servers and remain 100% secure.",
      icon: Shield
    },
    {
      question: "What is the maximum file size or limit of pages I can process?",
      answer: "We enforce no artificial file size or page count limits! However, because processing uses your computer's RAM, extremely large documents (e.g. over 500MB) may depend on your device's available memory. Most documents under 200MB process instantly in standard browsers.",
      icon: FileText
    },
    {
      question: "Can I use iFlexPDF offline or in restricted network zones?",
      answer: "Absolutely! Once the page is loaded, the rendering and processing libraries are fully cached in your browser. Since no server requests or document uploads are required, the utilities will work perfectly even if you disconnect from the internet or operate in high-security intranet sectors.",
      icon: Shield
    },
    {
      question: "Does this tool store any logs or metadata of my files?",
      answer: "No. We do not inspect, log, or store file metadata, titles, content strings, or character maps. All local processing results in instantaneous memory disposal once you close the page or select another file.",
      icon: FileText
    },
    {
      question: "Does iFlexPDF support OCR for scanned documents?",
      answer: "iFlexPDF extracts digital text layers and processes existing document structures. For scanned pages (which are saved as flat images), an OCR (Optical Character Recognition) engine is required. We are currently developing a client-side OCR engine that will perform text extraction locally in a future update.",
      icon: Zap
    }
  ];

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

  return (
    <>
      <SEO
        title="Frequently Asked Questions (FAQ)"
        description="Find comprehensive answers about our browser-local PDF processing pipeline, security protocols, file limits, and privacy guarantees."
        keywords="pdf tool faq, secure pdf processing, local pdf editor, free pdf tools online, offline pdf"
        schemaData={faqSchema}
      />
      <div className="container-professional space-y-24 py-16 md:py-24 max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="badge-professional"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>Fidelity Support</span>
          </motion.div>
          <h1 className="h2-classic md:text-6xl tracking-tight text-slate-900 leading-tight">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h1>
          <p className="p-classic max-w-2xl mx-auto text-[15px] md:text-lg">
            Got questions about our browser-local PDF processing pipeline, safety protocols, or capabilities? Find your answers below.
          </p>
        </div>

        {/* FAQs Grid */}
        <div className="space-y-6">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={cn(
                  "bg-white border rounded-[2rem] overflow-hidden transition-all duration-300",
                  isOpen ? "border-indigo-600 shadow-xl shadow-indigo-100/50" : "border-slate-100 hover:border-slate-200"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4 pr-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                      isOpen ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-600 border-slate-100"
                    )}>
                      <faq.icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-[16px] text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-slate-600 shrink-0 transition-transform duration-500",
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
                      <div className="px-8 pb-8 pt-2 text-slate-500 text-[14px] leading-relaxed font-semibold border-t border-slate-50 pl-22">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
