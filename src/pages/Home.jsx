import { useState } from "react";
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
    Type,
    Hash,
    Trash2,
    Search
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
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Convert", "Organize", "Security"];

    const getToolCategory = (title) => {
        const titleLower = title.toLowerCase();
        if (
            titleLower.includes("word") ||
            titleLower.includes("image") ||
            titleLower.includes("text")
        ) {
            return "Convert";
        }
        if (
            titleLower.includes("protect") ||
            titleLower.includes("unlock")
        ) {
            return "Security";
        }
        return "Organize";
    };

    const filteredTools = tools.filter((tool) => {
        const matchesSearch =
            tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase());

        if (selectedCategory === "All") return matchesSearch;
        return matchesSearch && getToolCategory(tool.title) === selectedCategory;
    });

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
                keywords="pdf, compress pdf, merge pdf, split pdf, word to pdf, local pdf tools, secure pdf converter, free online pdf tools, organize pdf, protect pdf, unlock pdf, watermark pdf, add page numbers, delete pages, extract text pdf, pdf to image, word to pdf"
            />

            <div className="relative overflow-t-hidden bg-white py-20 md:py-28">
                <div
                    className="absolute left-[-20%] top-[-20%] w-[45%] h-[90%] rounded-full bg-cyan-400/20 blur-3xl sm:blur-3xl pointer-events-none select-none"
                    aria-hidden="true"
                />
                <div
                    className="absolute right-[-20%] bottom-[-20%] w-[50%] h-[100%] rounded-full bg-blue-500/20 blur-3xl sm:blur-3xl pointer-events-none select-none"
                    aria-hidden="true"
                />

                <header className="container-professional text-center space-y-8 relative z-10">
                    <div
                        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0f172a] border border-slate-800 text-slate-100 font-semibold text-xs tracking-wide shadow-md select-none animate-fade-in"
                    >
                        <ShieldCheck className="w-4 h-4 text-blue-400" />
                        <span>100% Private Local Processing</span>
                    </div>

                    <div className="space-y-4 max-w-4xl mx-auto">
                        <h1
                            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] pr-1 animate-fade-in [animation-delay:100ms]"
                        >
                            Do anything with PDF. <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
                                Completely Private.
                            </span>
                        </h1>

                        <p
                            className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in [animation-delay:200ms]"
                        >
                            Securely manage, convert, and optimize your PDF documents directly on your device. No uploads, no servers, and complete data privacy.
                        </p>
                    </div>

                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in [animation-delay:300ms]"
                    >
                        <button
                            onClick={handleScrollToToolkit}
                            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[15px] shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-blue-700/10 hover:scale-[1.015] active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            aria-label="Explore secure PDF tools"
                        >
                            Explore Tools
                            <ArrowRight className="w-4.5 h-4.5" />
                        </button>
                        <button
                            onClick={handleScrollToToolkit}
                            className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl font-bold text-[15px] shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.015] active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                            aria-label="Drop a file inside any specific utility tool"
                        >
                            <FileDown className="w-4.5 h-4.5 text-blue-600" />
                            Launch Offline Utility
                        </button>
                    </div>
                </header>
            </div>

            <div className="space-y-24 md:space-y-32 py-12 md:py-20 relative bg-grid-pattern overflow-hidden">
                <div className="container-professional max-w-[970px] mx-auto select-none">
                    <AdSense adSlot="8116403558" adFormat="horizontal" />
                </div>

                <section
                    id="toolkit"
                    className="container-professional pt-4 scroll-mt-24"
                    aria-label="PDF Toolbox"
                >
                    <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200">
                        <div className="text-left space-y-1 shrink-0 w-full md:w-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                                All PDF Utilities
                            </h2>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest leading-none select-none">
                                Processed Locally in Your Browser
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-xl">
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar select-none shrink-0">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={cn(
                                            "px-3.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer",
                                            selectedCategory === cat
                                                ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100"
                                                : "bg-white border-slate-200 text-slate-505 hover:text-slate-900 hover:border-slate-350"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    placeholder="Search PDF utilities..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 animate-pulse-once"
                                />
                                <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-xs cursor-pointer"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {filteredTools.length === 0 ? (
                        <div className="text-center py-16 bg-slate-50/30 border border-dashed border-slate-200 rounded-[2rem] space-y-4">
                            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest select-none">No tools found matching your search</p>
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                                className="btn-outline-ref px-6 py-2.5 mx-auto text-xs cursor-pointer"
                            >
                                Clear Search Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTools.map((tool, index) => (
                                <Link
                                    to={tool.path}
                                    key={index}
                                    className="group outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl hover:scale-[1.015] transition-transform duration-300"
                                    aria-label={`Open ${tool.title} tool - ${tool.description}`}
                                >
                                    <article className="tool-card transition-all duration-305 hover:border-blue-200/80 hover:shadow-premium-hover h-full"
                                    >
                                        <div className="tool-card-shape" aria-hidden="true" />

                                        <div className="absolute flex justify-center items-center -top-9 -right-9 w-32 h-32 bg-slate-100 border border-slate-100 rounded-full z-10">
                                            <div
                                                className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:scale-105 transition-all duration-300 shadow-sm"
                                                aria-hidden="true"
                                            >
                                                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform duration-300 group-hover:translate-x-[1px] group-hover:translate-y-[-1px] rotate-[-45deg]" />
                                            </div>
                                        </div>

                                        <div className="tool-card-icon select-none" aria-hidden="true">
                                            <tool.icon className="w-5 h-5" />
                                        </div>

                                        <div className="relative z-10 flex flex-col flex-grow text-left">
                                            <h3 className="tool-card-title">
                                                {tool.title}
                                            </h3>
                                            <p className="tool-card-description flex-grow">
                                                {tool.description}
                                            </p>
                                            <div className="mt-5 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-wider select-none">
                                                <span>Launch Tool</span>
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                <section className="container-professional pt-8 text-center space-y-12" aria-label="Processing Timeline">
                    <div className="space-y-3">
                        <span className="badge-professional select-none">
                            How It Works
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                            Process your documents in three simple steps
                        </h2>
                        <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm sm:text-base">
                            All utility operations run directly inside your browser for maximum security.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative select-none">
                        <div className="space-y-4 text-left p-8 bg-white border border-slate-100 rounded-2xl shadow-sm relative hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="    w-10 h-10 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-sm">
                                01
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Select & Load Files</h3>
                            <p className="text-slate-500 text-xs sm:text-[13.5px] leading-relaxed font-medium">
                                Select the tool you need and select or drop your files into our local uploader. Your files are loaded temporarily in your browser's local memory.
                            </p>
                        </div>

                        <div className="space-y-4 text-left p-8 bg-white border border-slate-100 rounded-2xl shadow-sm relative hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="w-10 h-10 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-sm">
                                02
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Local Processing</h3>
                            <p className="text-slate-500 text-xs sm:text-[13.5px] leading-relaxed font-medium">
                                Configure your preferences and click execute. The files are processed locally on your machine—no data is ever sent over the network.
                            </p>
                        </div>

                        <div className="space-y-4 text-left p-8 bg-white border border-slate-100 rounded-2xl shadow-sm relative hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="w-10 h-10 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-sm">
                                03
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Instant Download</h3>
                            <p className="text-slate-500 text-xs sm:text-[13.5px] leading-relaxed font-medium">
                                The processed document is generated in milliseconds. Download and save the final PDF directly to your device.
                            </p>
                        </div>
                    </div>
                </section>

                <section
                    className="container-professional py-16 md:py-24 relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-premium"
                    aria-label="Security & Privacy Protocol"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <div className="lg:col-span-7 space-y-8 text-left">
                            <div className="space-y-4">
                                <span className="badge-professional select-none">
                                    Privacy First Architecture
                                </span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                                    Complete privacy. Your documents stay yours.
                                </h2>
                                <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
                                    Unlike traditional online converters that upload your files to remote cloud servers, iFlexPDF processes your documents directly in your web browser. Your private details, contracts, and sensitive financial logs never leave your device.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                                <div className="space-y-2">
                                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 select-none" aria-hidden="true">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-[15px] text-slate-800 leading-none">100% Private</h3>
                                    <p className="text-slate-400 text-xs font-semibold leading-relaxed">No tracking, no logs, zero trace on servers.</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 select-none" aria-hidden="true">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-[15px] text-slate-800 leading-none">Zero Delay</h3>
                                    <p className="text-slate-400 text-xs font-semibold leading-relaxed">Instant compile speeds powered by your CPU.</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 select-none" aria-hidden="true">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-[15px] text-slate-800 leading-none">Offline Ready</h3>
                                    <p className="text-slate-400 text-xs font-semibold leading-relaxed">Runs entirely in offline mode after boot.</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="w-full max-w-sm p-1.5 bg-slate-50/50 border border-slate-200 rounded-3xl shadow-sm select-none">
                                <div className="card-ref h-full flex flex-col items-center justify-center text-center space-y-6 py-12 md:py-16">
                                    <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-inner border border-blue-100">
                                        <ShieldCheck className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold text-slate-900">Local Processing Active</h3>
                                        <p className="text-slate-505 text-xs font-semibold px-6 leading-relaxed">Your files are processed directly on your CPU in-memory.</p>
                                    </div>
                                    <div className="w-full px-8 space-y-3.5">
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600 animate-progress-grow"
                                                style={{ width: "100%" }}
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">100% Private local processing</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container-professional max-w-[970px] mx-auto select-none">
                    <AdSense adSlot="6372857492" adFormat="horizontal" />
                </div>

                <section
                    className="container-professional pt-8"
                    aria-label="Insights & Productivity Blog"
                >
                    <div className="text-center space-y-3 mb-12">
                        <span className="badge-professional select-none">
                            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
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
                                className="group flex outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl hover:scale-[1.015] transition-transform duration-350"
                                aria-label={`Read article: ${art.title}`}
                            >
                                <article
                                    className="card-ref flex flex-col justify-between h-full w-full transition-all duration-300 hover:shadow-premium-hover hover:border-slate-200/90 text-left"
                                >
                                    <div className="space-y-4 text-left">
                                        <div className="flex items-center gap-2 select-none">
                                            <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-100/50 text-blue-600 rounded-full font-bold text-[9px] uppercase tracking-wider">
                                                {art.category}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {art.readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                                            {art.title}
                                        </h3>
                                        <p className="text-slate-400 text-[12.5px] leading-relaxed font-medium line-clamp-3">
                                            {art.excerpt}
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-slate-505 text-[11px] font-bold uppercase tracking-wider group-hover:text-blue-600 transition-colors select-none">
                                        <span>Read Article</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </section>

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
                                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
                                    >
                                        <span className="font-bold text-[15px] sm:text-[16px] text-slate-800 pr-4 leading-snug">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={cn(
                                                "w-4.5 h-4.5 text-slate-400 shrink-0 transition-transform duration-300",
                                                isOpen && "rotate-180 text-blue-600"
                                            )}
                                        />
                                    </button>

                                    <div
                                        className={cn(
                                            "grid transition-all duration-300 ease-in-out",
                                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        )}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-6 pb-6 pt-1 text-slate-500 text-[13.5px] sm:text-[14px] leading-relaxed font-medium border-t border-slate-50 text-left">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="container-professional pb-12" aria-label="Secure Your Workflow CTA">
                    <div className="bg-[#0f172a] rounded-2xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-premium-xl border border-slate-850">
                        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                                A faster, more secure document workflow
                            </h2>
                            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                                Avoid the risk of cloud server data breaches. Work entirely on your device with high-speed local processing.
                            </p>
                            <div className="flex justify-center pt-2 select-none">
                                <button
                                    onClick={handleScrollToToolkit}
                                    className="px-8 py-3.5 bg-white text-[#0f172a] hover:bg-slate-50 active:scale-95 rounded-lg font-bold text-xs uppercase tracking-widest shadow-md transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                                    aria-label="Launch local toolbox"
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
