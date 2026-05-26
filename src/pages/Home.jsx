import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Combine,
  Scissors,
  Image as ImageIcon,
  FileImage,
  Layout,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCw,
  FileDown,
  ClipboardList,
  Unlock,
  Shield,
  FileCode,
  CheckCircle2,
  ChevronDown,
  BookOpen,
  Clock,
  FileText,
  Type,
  Hash,
  Trash2
} from "lucide-react";
import { cn } from "../lib/utils";
import SEO from "../components/SEO";
import { blogArticles } from "../data/blogArticles";
import AdSense from "../components/AdSense";

const tools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one single document in any order.",
    icon: Combine,
    path: "/merge",
  },
  {
    title: "Split PDF",
    description: "Extract specific pages or separate every page into individual PDFs.",
    icon: Scissors,
    path: "/split",
  },
  {
    title: "Compress PDF",
    description: "Reduce file size while maintaining the best possible document quality.",
    icon: FileDown,
    path: "/compress",
  },
  {
    title: "Word to PDF",
    description: "Convert Word documents (.docx) to high-quality PDF files instantly.",
    icon: FileCode,
    path: "/word-to-pdf",
  },
  {
    title: "PDF to Word",
    description: "Convert PDF documents back to editable Microsoft Word files locally.",
    icon: FileText,
    path: "/pdf-to-word",
  },
  {
    title: "PDF to Text",
    description: "Extract text content from your PDF documents with high accuracy.",
    icon: ClipboardList,
    path: "/pdf-to-text",
  },
  {
    title: "Image to PDF",
    description: "Convert JPG, PNG, and WebP images to high-quality PDFs instantly.",
    icon: ImageIcon,
    path: "/image-to-pdf",
  },
  {
    title: "PDF to Image",
    description: "Convert each PDF page into high-quality JPG or PNG images.",
    icon: FileImage,
    path: "/pdf-to-image",
  },
  {
    title: "Organize PDF",
    description: "Rearrange, rotate, or delete pages in your PDF document visually.",
    icon: Layout,
    path: "/organize",
  },
  {
    title: "Protect PDF",
    description: "Encrypt your PDF with a strong password to secure sensitive data.",
    icon: Shield,
    path: "/protect",
  },
  {
    title: "Unlock PDF",
    description: "Remove password protection and restrictions from your PDF files.",
    icon: Unlock,
    path: "/unlock",
  },
  {
    title: "Rotate PDF",
    description: "Spin individual or all PDF pages clockwise or counter-clockwise visually.",
    icon: RotateCw,
    path: "/rotate",
  },
  {
    title: "Add Watermark",
    description: "Add professional text stamps and watermark layers with custom fonts.",
    icon: Type,
    path: "/watermark",
  },
  {
    title: "Add Page Numbers",
    description: "Number PDF pages visually with custom alignments and font sizes.",
    icon: Hash,
    path: "/page-numbers",
  },
  {
    title: "Delete Pages",
    description: "Remove pages from your PDF documents visually and compile optimized files.",
    icon: Trash2,
    path: "/delete-pages",
  },
];

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqs = [
    {
      question: "Is iFlexPDF completely free to use?",
      answer: "Yes, iFlexPDF is 100% free with no signups, subscription models, or hidden fees. Since execution happens on your own device rather than our servers, we have no recurring hosting overhead, allowing us to keep the entire platform free of charge."
    },
    {
      question: "How does browser-local processing work?",
      answer: "Traditional utility sites upload your documents to external cloud clusters for processing. iFlexPDF uses advanced client-side scripts (PDF.js, PDF-lib) executed directly within your browser window. Your files are loaded into RAM, processed locally by your computer's CPU, and saved, meaning they never touch our servers and remain 100% secure."
    },
    {
      question: "What file formats does iFlexPDF support?",
      answer: "Currently, we support merging, splitting, compressing, organizing, protecting, and unlocking PDF files. We also support conversions: JPG/PNG/WebP images to PDF, PDF pages to JPG images, Microsoft Word (.docx) to PDF, PDF to text extraction, and PDF to Microsoft Word (.docx) conversion."
    },
    {
      question: "Is there a file size limit for processing?",
      answer: "We enforce no artificial file size limits! However, because processing uses your computer's RAM, extremely large documents (e.g. over 500MB) may depend on your device's available memory. Most documents under 200MB process instantly."
    }
  ];

  const latestArticles = blogArticles.slice(0, 3);

  const handleScrollToToolkit = () => {
    const toolkitSection = document.getElementById("toolkit");
    if (toolkitSection) {
      toolkitSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <SEO
        title="iFlexPDF - Free Secure Browser PDF Solutions"
        description="Professional-grade, local-first browser PDF utilities. Process your PDFs entirely in your browser with zero server uploads for 100% security."
        keywords="pdf, compress pdf, merge pdf, split pdf, word to pdf, local pdf tools, secure pdf converter, free online pdf tools, organize pdf, protect pdf, unlock pdf, watermark pdf, add page numbers, delete pages, extract text pdf, pdf to image, pdf to word, word to pdf"
      />
      <div className="space-y-24 md:space-y-36 py-12 md:py-20 relative bg-grid-pattern">
        
        {/* Glow Radial Accents */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-radial-glow -z-10 pointer-events-none" aria-hidden="true" />

        {/* Hero Section */}
        <header className="container-professional text-center space-y-8 relative pt-8 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-500 font-semibold text-xs tracking-wide shadow-sm select-none"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>100% Local In-Browser Sandbox</span>
          </motion.div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] pr-1"
            >
              Do anything with PDF. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600">
                Guaranteed Secure.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              Enterprise-grade document utilities executed entirely on your CPU. No uploads, no servers, zero bandwidth delays, and complete data privacy.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={handleScrollToToolkit}
              className="btn-primary-ref px-8 py-3.5 text-[15px]"
              aria-label="Explore secure PDF tools"
            >
              Explore Tools
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <button 
              onClick={handleScrollToToolkit}
              className="btn-outline-ref px-8 py-3.5 text-[15px]"
              aria-label="Drop a file inside any specific utility tool"
            >
              <FileDown className="w-4.5 h-4.5 text-indigo-600" />
              Launch Sandbox Engine
            </button>
          </motion.div>
        </header>

        {/* AdSense Slot A - Hero Banner */}
        <div className="container-professional max-w-[970px] mx-auto select-none">
          <AdSense adSlot="8116403558" adFormat="horizontal" />
        </div>

        {/* Tools Grid */}
        <section 
          id="toolkit" 
          className="container-professional pt-4 scroll-mt-24"
          aria-label="PDF Toolbox"
        >
          <div className="mb-10 text-left border-b border-slate-100 pb-5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
              Essential PDF Tools
            </h2>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-widest leading-none select-none">Native Browser Processing</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Link 
                to={tool.path} 
                key={index} 
                className="group outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-[22px]"
                aria-label={`Open ${tool.title} tool - ${tool.description}`}
              >
                <motion.article
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                  className="tool-card"
                >
                  <div className="tool-card-shape" aria-hidden="true" />
                  
                  <div className="tool-card-icon select-none" aria-hidden="true">
                    <tool.icon className="w-5 h-5" />
                  </div>

                  <div className="relative z-10 flex flex-col flex-grow">
                    <h3 className="tool-card-title">
                      {tool.title}
                    </h3>
                    <p className="tool-card-description flex-grow">
                      {tool.description}
                    </p>
                    <div className="mt-5 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors uppercase tracking-wider select-none">
                      <span>Launch Utility</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </section>

        {/* Privacy Architecture Section */}
        <section 
          className="container-professional py-16 md:py-24 relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-premium"
          aria-label="Security & Privacy Protocol"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-radial-glow -z-10 opacity-60 pointer-events-none" aria-hidden="true" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4">
                <span className="badge-professional select-none">
                  Security Architecture
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                  Your files never touch the cloud.
                </h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
                  Conventional online converters upload your tax forms, corporate contracts, and ID scans to external cloud nodes. iFlexPDF runs on advanced Javascript sandbox engines compiled inside your browser, keeping your critical business layouts entirely localized.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 select-none" aria-hidden="true">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[15px] text-slate-800 leading-none">100% Private</h3>
                  <p className="text-slate-400 text-xs font-semibold leading-relaxed">No tracking, no logs, zero trace on servers.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 select-none" aria-hidden="true">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[15px] text-slate-800 leading-none">Zero Delay</h3>
                  <p className="text-slate-400 text-xs font-semibold leading-relaxed">Instant compile speeds powered by your CPU.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 select-none" aria-hidden="true">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[15px] text-slate-800 leading-none">Offline Ready</h3>
                  <p className="text-slate-400 text-xs font-semibold leading-relaxed">Runs entirely in offline mode after boot.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm p-1.5 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] shadow-sm select-none">
                <div className="card-dotted h-full flex flex-col items-center justify-center text-center space-y-6 py-12 md:py-16">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900">Sandbox Isolation Active</h3>
                    <p className="text-slate-400 text-xs font-semibold px-6 leading-relaxed">All active edits are isolated within your secure browser session RAM.</p>
                  </div>
                  <div className="w-full px-8 space-y-3.5">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Active System: Encrypted Sandbox</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AdSense Slot B - Midsite Banner */}
        <div className="container-professional max-w-[970px] mx-auto select-none">
          <AdSense adSlot="6372857492" adFormat="horizontal" />
        </div>

        {/* Blog Articles Section */}
        <section 
          className="container-professional pt-8"
          aria-label="Insights & Productivity Blog"
        >
          <div className="text-center space-y-3 mb-12">
            <span className="badge-professional select-none">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              Latest Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Guides & Productivity Tips
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm sm:text-base">
              Expert-vetted manuals regarding PDF size compressions, legal compliance, and office layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {latestArticles.map((art, idx) => (
              <Link 
                to={`/blog/${art.slug}`} 
                key={idx} 
                className="group flex outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-[22px]"
                aria-label={`Read article: ${art.title}`}
              >
                <motion.article
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="card-ref flex flex-col justify-between h-full w-full"
                >
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-2 select-none">
                      <span className="px-2.5 py-0.5 bg-indigo-50 border border-indigo-100/50 text-indigo-600 rounded-full font-bold text-[9px] uppercase tracking-wider">
                        {art.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {art.readTime}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-slate-400 text-[12.5px] leading-relaxed font-medium line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider group-hover:text-indigo-600 transition-colors select-none">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section 
          className="container-professional max-w-4xl mx-auto pt-8"
          aria-label="Frequently Asked Questions"
        >
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base max-w-md mx-auto">
              Clear, transparent answers regarding local data compiles, RAM limitations, and tool frameworks.
            </p>
          </div>

          <div className="space-y-4" role="presentation">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={cn(
                    "bg-white border rounded-2xl overflow-hidden transition-all duration-200",
                    isOpen ? "border-indigo-600 shadow-md" : "border-slate-100 hover:border-slate-200"
                  )}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/30"
                  >
                    <span className="font-bold text-[15px] sm:text-[16px] text-slate-800 pr-4 leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4.5 h-4.5 text-slate-400 shrink-0 transition-transform duration-300",
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
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-500 text-[13.5px] sm:text-[14px] leading-relaxed font-medium border-t border-slate-50 text-left">
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

        {/* Final CTA Section */}
        <section 
          className="container-professional pb-12"
          aria-label="Secure Your Workflow CTA"
        >
          <div className="bg-[#0f172a] rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-premium-xl border border-slate-800">
            {/* CTA Background Radial shape */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_60%)] pointer-events-none" aria-hidden="true" />
            
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Secure your document workflow.
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                Eliminate the risk of server breaches. Switch to our 100% in-browser sandbox and process documents with infinite speed and privacy.
              </p>
              <div className="flex justify-center pt-2 select-none">
                <button 
                  onClick={handleScrollToToolkit}
                  className="px-8 py-3.5 bg-white text-[#0f172a] hover:bg-slate-50 active:scale-95 rounded-xl font-bold text-xs uppercase tracking-widest shadow-md transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  aria-label="Launch local sandbox toolbox"
                >
                  Get Started for Free
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
