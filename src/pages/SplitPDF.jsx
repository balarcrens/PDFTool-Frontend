import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion } from "framer-motion";
import {
    FileText,
    Download,
    Loader2,
    Scissors,
    Sparkles,
    Eye,
    ArrowLeftRight,
    ShieldCheck
} from "lucide-react";
import { cn } from "../lib/utils";
import confetti from "canvas-confetti";

export default function SplitPDF() {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [results, setResults] = useState([]);
    const [splitMode, setSplitMode] = useState("all");
    const [range, setRange] = useState("");

    const handleFileSelected = (files) => {
        if (files.length > 0) {
            setFile(files[0]);
            setResults([]);
        }
    };

    const splitPdf = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            const fileArrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(fileArrayBuffer);
            const pageCount = pdf.getPageCount();

            const newResults = [];

            if (splitMode === "all") {
                for (let i = 0; i < pageCount; i++) {
                    const newPdf = await PDFDocument.create();
                    const [copiedPage] = await newPdf.copyPages(pdf, [i]);
                    newPdf.addPage(copiedPage);
                    const bytes = await newPdf.save();
                    const blob = new Blob([bytes], { type: "application/pdf" });
                    newResults.push({
                        name: `Page ${i + 1}.pdf`,
                        url: URL.createObjectURL(blob)
                    });
                }
            } else {
                const [start, end] = range.split("-").map(n => parseInt(n.trim()) - 1);
                if (isNaN(start) || isNaN(end) || start < 0 || end >= pageCount || start > end) {
                    alert("Invalid page range. Please use format like 1-5");
                    setIsProcessing(false);
                    return;
                }

                const newPdf = await PDFDocument.create();
                const indices = Array.from({ length: end - start + 1 }, (_, i) => start + i);
                const copiedPages = await newPdf.copyPages(pdf, indices);
                copiedPages.forEach(p => newPdf.addPage(p));
                const bytes = await newPdf.save();
                const blob = new Blob([bytes], { type: "application/pdf" });
                newResults.push({
                    name: `Pages ${start + 1}-${end + 1}.pdf`,
                    url: URL.createObjectURL(blob)
                });
            }

            setResults(newResults);
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            });
        } catch (error) {
            console.error("Error splitting PDF:", error);
            alert("An error occurred while splitting the PDF.");
        } finally {
            setIsProcessing(false);
        }
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Split PDF",
        "description": "Extract specific ranges or individual pages from a PDF document locally in your browser with zero server uploads.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
        }
    };

    return (
        <>
            <SEO
                title="Split PDF Pages Online (100% Local & Secure)"
                description="Extract specific page ranges or split all PDF pages into individual files instantly. 100% browser-based processing ensures absolute data privacy."
                keywords="split pdf, extract pages from pdf, separate pdf pages, pdf splitter online, secure pdf split"
                schemaData={webAppSchema}
            />

            <div className="container-professional space-y-16 py-16 md:py-24">
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-widest border border-slate-100"
                    >
                        <Scissors className="w-3.5 h-3.5 text-[#0047AB]" />
                        Professional Split Utility
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Split PDF Pages</h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Extract specific ranges or individual pages with surgical accuracy.
                        Enterprise-grade processing that keeps your data <span className="text-[#0047AB] font-bold">100% private</span>.
                    </p>
                </div>

                {!file ? (
                    <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
                ) : (
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="action-bar-classic sticky top-24 z-30">
                            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-[15px] truncate max-w-[150px] sm:max-w-[300px] text-slate-900 mb-0.5">{file.name}</p>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                                        <span className="verified-badge">
                                            <ShieldCheck className="w-3 h-3" />
                                            Secure Local
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                                <button
                                    onClick={() => setFile(null)}
                                    className="btn-outline-ref py-2.5 flex-1 sm:flex-none text-[13px]"
                                >
                                    Change File
                                </button>
                                <button
                                    onClick={splitPdf}
                                    disabled={isProcessing || (splitMode === "range" && !range)}
                                    className="btn-primary-ref py-2.5 flex-1 sm:flex-none text-[13px]"
                                >
                                    {isProcessing ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Scissors className="w-4 h-4" />
                                    )}
                                    Split Pages
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div
                                onClick={() => setSplitMode("all")}
                                className={cn(
                                    "card-ref !p-10 cursor-pointer text-center items-center",
                                    splitMode === "all" ? "ring-2 ring-[#0047AB] bg-indigo-50/30" : ""
                                )}
                            >
                                <div className="decorative-circle !opacity-20" />
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 mx-auto sm:mx-0 transition-all duration-300 shadow-sm",
                                    splitMode === "all" ? "bg-[#0047AB] text-white scale-110" : "bg-slate-50 text-slate-600"
                                )}>
                                    <ArrowLeftRight className="w-7 h-7" />
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-xl font-bold text-slate-900">Separate All Pages</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">Extract every single page into its own individual PDF file automatically.</p>
                                </div>
                            </div>

                            <div
                                onClick={() => setSplitMode("range")}
                                className={cn(
                                    "card-ref !p-10 cursor-pointer text-center items-center",
                                    splitMode === "range" ? "ring-2 ring-[#0047AB] bg-indigo-50/30" : ""
                                )}
                            >
                                <div className="decorative-circle !opacity-20" />
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 mx-auto sm:mx-0 transition-all duration-300 shadow-sm",
                                    splitMode === "range" ? "bg-[#0047AB] text-white scale-110" : "bg-slate-50 text-slate-600"
                                )}>
                                    <FileText className="w-7 h-7" />
                                </div>
                                <div className="w-full space-y-3">
                                    <h4 className="text-xl font-bold text-slate-900">Custom Selection</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">Specify a specific range of pages (e.g., 1-10 or 5-8).</p>
                                    {splitMode === "range" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="pt-4"
                                        >
                                            <input
                                                type="text"
                                                placeholder="e.g. 1-5"
                                                value={range}
                                                onChange={(e) => setRange(e.target.value)}
                                                className="w-full px-8 py-3.5 rounded-xl bg-white border border-slate-100 focus:border-[#0047AB] outline-none font-bold transition-all text-center placeholder:text-slate-300 shadow-inner"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {results.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="premium-success-card text-center flex flex-col items-center max-w-3xl mx-auto"
                            >
                                <div className="success-icon-badge-premium">
                                    <ShieldCheck className="w-9 h-9" />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Splitting Complete</h3>
                                <p className="text-slate-500 font-medium max-w-md mb-8">
                                    Your PDF has been split successfully. The generated page segments are listed below.
                                </p>

                                <div className="premium-file-details max-w-2xl mb-8">
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Source Document</p>
                                        <p className="font-bold text-slate-800 text-sm truncate max-w-[180px] sm:max-w-[300px]">{file.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Generated Pages</p>
                                        <p className="font-bold text-indigo-600 text-sm">{results.length} Independent PDFs</p>
                                    </div>
                                </div>

                                <div className="premium-actions-layout !max-w-2xl mb-8">
                                    <button
                                        onClick={() => {
                                            results.forEach((res, index) => {
                                                setTimeout(() => {
                                                    const link = document.createElement("a");
                                                    link.href = res.url;
                                                    link.download = res.name;
                                                    link.click();
                                                }, index * 250);
                                            });
                                        }}
                                        className="btn-premium-primary"
                                    >
                                        <span className="btn-premium-action-text flex items-center gap-2">
                                            <Download className="w-4 h-4" /> Download All Pages
                                        </span>
                                        <span className="btn-premium-action-subtext">Sequential Export</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setFile(null);
                                            setResults([]);
                                        }}
                                        className="btn-premium-secondary"
                                    >
                                        <span className="btn-premium-action-text flex items-center gap-2">
                                            <Scissors className="w-4 h-4" /> Split Another PDF
                                        </span>
                                        <span className="btn-premium-action-subtext">Start Fresh</span>
                                    </button>
                                </div>

                                <div className="w-full text-left border border-slate-100 rounded-xl bg-slate-50/50 p-2 max-h-80 overflow-y-auto custom-scrollbar">
                                    <div className="space-y-1.5">
                                        {results.map((res, i) => (
                                            <div
                                                key={i}
                                                className="bg-white border border-slate-100 rounded-lg p-3 sm:px-5 flex items-center justify-between gap-4 transition-all hover:border-slate-200"
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500 shrink-0">
                                                        <FileText className="w-4 h-4" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-xs sm:text-sm text-slate-800 truncate max-w-[150px] sm:max-w-[250px]">{res.name}</p>
                                                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Ready to Export</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <button
                                                        onClick={() => window.open(res.url, "_blank")}
                                                        className="p-1.5 sm:px-3 sm:py-1.5 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all font-bold text-[10px] uppercase tracking-wider flex items-center gap-1"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                        <span className="hidden sm:inline">Preview</span>
                                                    </button>
                                                    <a
                                                        href={res.url}
                                                        download={res.name}
                                                        className="p-1.5 sm:px-3 sm:py-1.5 bg-[#0047AB] text-white hover:bg-blue-700 rounded-lg transition-all font-bold text-[10px] uppercase tracking-wider flex items-center gap-1"
                                                    >
                                                        <Download className="w-3.5 h-3.5" />
                                                        <span className="hidden sm:inline">Save</span>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}

                <ToolContentLayout
                    toolName="Split PDF"
                    howItWorksSteps={[
                        { title: "Import PDF File", description: "Choose the target PDF document you wish to slice by using our uploader or dragging files in." },
                        { title: "Select Extraction Mode", description: "Choose 'Separate All Pages' to split every page, or 'Custom Selection' to extract a specific range (e.g. 2-5)." },
                        { title: "Save Extracted PDFs", description: "Click 'Split Pages' to generate documents. Review the generated list and download files locally." }
                    ]}
                    features={[
                        { icon: ShieldCheck, title: "100% Browser Executed", description: "All PDF slicing tasks run entirely on your CPU. No bytes are sent to servers, protecting data compliance." },
                        { icon: Scissors, title: "Surgical Page Selection", description: "Input exact range definitions to extract just the pages or sections you need in high fidelity." },
                        { icon: Sparkles, title: "Maintains File Quality", description: "Extracts pages structurally without compressing fonts or downsampling high-resolution details." }
                    ]}
                    faqs={[
                        { question: "Can I extract non-contiguous pages like page 2 and page 5?", answer: "Currently, our tool supports full bulk-page splits or single ranges (e.g. 2-5). To extract non-contiguous selections, you can perform multiple range splits or use our Organize PDF layout." },
                        { question: "Is there a page limit for PDF splitting?", answer: "No. You can split files of any length. Processing is executed inside your browser, making it extremely secure and infinite." },
                        { question: "Does splitting a protected PDF require a password?", answer: "Yes. If a document is encrypted or has split restrictions, you must unlock the document using our Unlock PDF tool before splitting." }
                    ]}
                    relatedTools={[
                        { name: "Merge PDF", path: "/merge", description: "Combine multiple PDF files into one clean document." },
                        { name: "Organize PDF", path: "/organize", description: "Rearrange, rotate, or delete pages visually." },
                        { name: "PDF to Word", path: "/pdf-to-word", description: "Convert PDF documents back to editable Microsoft Word files locally." }
                    ]}
                    relatedArticles={[
                        { title: "Best PDF Tools for Students in 2026", slug: "best-pdf-tools-for-students" },
                        { title: "How to Merge PDF Files on Windows, Mac, and Mobile", slug: "how-to-merge-pdf-files" }
                    ]}
                />
            </div>
        </>
    );
}
