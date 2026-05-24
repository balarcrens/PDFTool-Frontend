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
    description: "Add professional text stamps and watermark layers with custom fonts and transparency.",
    icon: Type,
    path: "/watermark",
  },
  {
    title: "Add Page Numbers",
    description: "Number PDF pages visually with options for layout alignments, margin paddings, and font sizes.",
    icon: Hash,
    path: "/page-numbers",
  },
  {
    title: "Delete Pages",
    description: "Remove pages from your PDF documents visually and compile optimized files in-memory.",
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
      answer: "Currently, we support merging, splitting, compressing, organizing, protecting, and unlocking PDF files. We also support conversions: JPG/PNG/WebP images to PDF, PDF pages to JPG images, Microsoft Word (.docx) to PDF, PDF to text extraction, and PDF to Microsoft Word (.doc) conversion."
    },
    {
      question: "Is there a file size limit for processing?",
      answer: "We enforce no artificial file size limits! However, because processing uses your computer's RAM, extremely large documents (e.g. over 500MB) may depend on your device's available memory. Most documents under 200MB process instantly."
    }
  ];

  const latestArticles = blogArticles.slice(0, 3);

  return (
    <>
      <SEO
        title="iFlexPDF - Free Secure Browser PDF Solutions"
        description="Professional-grade, local-first browser PDF utilities. Process your PDFs entirely in your browser with zero server uploads for 100% security."
        keywords="pdf, compress pdf, merge pdf, split pdf, word to pdf, local pdf tools, secure pdf converter, free online pdf tools, organize pdf, protect pdf, unlock pdf, watermark pdf, add page numbers, delete pages, extract text pdf, pdf to image, pdf to word, word to pdf"
      />
      <div className="space-y-32 py-16 md:py-24">
        {/* Hero Section */}
        <section className="container-professional text-center space-y-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-indigo-50/20 blur-[120px] -z-10 rounded-full"></div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[13px] border border-slate-200 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>100% Local Processing & Secure</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]"
          >
            Do anything with PDF
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Professional-grade PDF tools designed for speed, security, and simplicity. <br className="hidden md:block" />
            Process sensitive documents entirely on your device.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button className="btn-primary-ref px-10">
              Explore Tools
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-outline-ref px-10">
              <FileDown className="w-5 h-5 text-indigo-600" />
              Drop a file here
            </button>
          </motion.div>
        </section>

        {/* Tools Grid */}
        <section id="toolkit" className="container-professional pt-4">
          <div className="mb-8">
            <h2 className="text-[36px] font-bold tracking-[-0.03em] text-[#111827]">
              Essential PDF Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tools.map((tool, index) => (
              <Link to={tool.path} key={index} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="tool-card"
                >
                  {/* Decorative Shape */}
                  <div className="tool-card-shape" />

                  {/* Icon */}
                  <div className="tool-card-icon">
                    <tool.icon className="w-[18px] h-[18px]" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="tool-card-title">
                      {tool.title}
                    </h3>

                    <p className="tool-card-description">
                      {tool.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Privacy Section */}
        <section className="container-professional py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  Your data never leaves your device.
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed font-medium max-w-xl">
                  Unlike cloud-based solutions, iFlexPDF processes every document locally in your browser. This means absolute privacy, zero upload wait times, and compliance with strict corporate security policies.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Zero Uploads</h4>
                    <p className="text-slate-500 text-sm font-medium">Files are never sent to external servers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mt-1">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Lightning Fast</h4>
                    <p className="text-slate-500 text-sm font-medium">Instant processing utilizing your device's power.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mt-1">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Enterprise Ready</h4>
                    <p className="text-slate-500 text-sm font-medium">Meets stringent data protection requirements.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md p-1 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl">
                <div className="card-dotted h-full flex flex-col items-center justify-center text-center space-y-6 py-16">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-slate-900">Local Processing Active</h3>
                    <p className="text-slate-400 text-sm font-medium px-8">All operations are contained within your current browser session.</p>
                  </div>
                  <div className="w-full px-12 space-y-4">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "75%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-indigo-600"
                      />
                    </div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">System Status: Secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Articles Section */}
        <section className="container-professional border-t border-slate-100 pt-20">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-widest border border-slate-100">
              <BookOpen className="w-3.5 h-3.5 text-[#0047AB]" />
              Latest Blog Articles
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Guides & Productivity Tips
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              Stay updated with expert advice on PDF optimization, study hacks, and office productivity tips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((art, idx) => (
              <Link to={`/blog/${art.slug}`} key={idx} className="group">
                <motion.article
                  className="card-ref h-full justify-between hover:scale-[1.01] hover:border-slate-300 transition-all duration-300"
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full font-bold text-[9px] uppercase tracking-wider">
                        {art.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {art.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider group-hover:text-indigo-600 transition-all">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container-professional border-t border-slate-100 pt-20 max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              Got questions about our browser-local PDF processing pipeline? We have answers.
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
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
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

        {/* Final CTA Section */}
        <section className="container-professional pb-24">
          <div className="bg-[#0047AB] rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Secure Your Document Workflow Today
              </h2>
              <p className="text-indigo-100 text-lg max-w-xl mx-auto font-medium">
                Join thousands of professionals who trust iFlexPDF for their business-critical documents.
              </p>
              <div className="flex justify-center pt-4">
                <button className="px-12 py-5 bg-white text-[#0047AB] rounded-xl font-black hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/20 hover:-translate-y-1 active:translate-y-0 text-sm uppercase tracking-widest">
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
