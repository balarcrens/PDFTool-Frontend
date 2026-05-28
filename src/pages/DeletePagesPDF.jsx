import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trash2,
    Download,
    Loader2,
    FileText,
    ShieldCheck,
    CheckCircle2,
    Eye,
    Zap,
    RefreshCcw,
} from "lucide-react";
import confetti from "canvas-confetti";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function DeletePagesPDF() {
    const [file, setFile] = useState(null);
    const [pages, setPages] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isGeneratingPreviews, setIsGeneratingPreviews] = useState(false);
    const [finalPdfUrl, setFinalPdfUrl] = useState(null);

    const handleFileSelected = (files) => {
        if (files.length > 0) {
            setFile(files[0]);
            setFinalPdfUrl(null);
            generatePagePreviews(files[0]);
        }
    };

    const generatePagePreviews = async (file) => {
        setIsGeneratingPreviews(true);
        try {
            const fileArrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: fileArrayBuffer }).promise;
            const pageCount = pdf.numPages;
            const newPages = [];

            for (let i = 1; i <= pageCount; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 0.3 });
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport: viewport }).promise;
                newPages.push({
                    id: `page-${i}`,
                    index: i - 1,
                    preview: canvas.toDataURL(),
                });
            }
            setPages(newPages);
        } catch (error) {
            console.error("Error generating previews:", error);
        } finally {
            setIsGeneratingPreviews(false);
        }
    };

    const removePage = (id) => {
        setPages(prev => prev.filter(p => p.id !== id));
    };

    const savePdf = async () => {
        if (!file || pages.length === 0) return;

        setIsProcessing(true);
        try {
            const fileArrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(fileArrayBuffer);
            const outputPdf = await PDFDocument.create();

            for (const pageInfo of pages) {
                const [copiedPage] = await outputPdf.copyPages(pdf, [pageInfo.index]);
                outputPdf.addPage(copiedPage);
            }

            const bytes = await outputPdf.save();
            const blob = new Blob([bytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            setFinalPdfUrl(url);

            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            });
        } catch (error) {
            console.error("Error deleting pages:", error);
            alert("An error occurred while compiling the PDF.");
        } finally {
            setIsProcessing(false);
        }
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Delete PDF Pages",
        "description": "Delete individual PDF pages visually and save compile-ready documents 100% locally in your browser.",
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
                title="Delete Pages from PDF Online (100% Local & Secure)"
                description="Remove pages from PDF visually in your browser. Complete document security with local-only client execution. Delete unwanted PDF pages easily."
                keywords="delete pages from pdf, remove pdf pages, delete pdf pages online, secure pdf editor, local pdf tools"
                schemaData={webAppSchema}
            />
            <div className="container-professional space-y-16 py-16 md:py-24">
                {/* Tool Header */}
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-widest border border-slate-100"
                    >
                        <Trash2 className="w-3.5 h-3.5 text-[#0047AB]" />
                        Professional Redundancy Excluder
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Delete PDF Pages</h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Eliminate irrelevant sheets, dividers, or blank frames in a snap. Process entirely locally to secure personal and business files.
                    </p>
                </div>

                {!file ? (
                    <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
                ) : (
                    <div className="max-w-7xl mx-auto space-y-12">
                        {/* Action Bar */}
                        <div className="action-bar-classic sticky top-24 z-30">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-[15px] truncate max-w-[150px] md:max-w-[300px] text-slate-900 mb-0.5">{file.name}</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{pages.length} Pages remaining</span>
                                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                        <span className="verified-badge">
                                            <ShieldCheck className="w-3 h-3" />
                                            Client Sandboxed
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => { setFile(null); setPages([]); }}
                                    className="btn-outline-ref py-2.5 flex-1 md:flex-none text-[13px]"
                                >
                                    Change File
                                </button>
                                <button
                                    onClick={savePdf}
                                    disabled={isProcessing || isGeneratingPreviews || pages.length === 0}
                                    className="btn-primary-ref py-2.5 flex-1 md:flex-none text-[13px]"
                                >
                                    {isProcessing ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                    Apply & Compile
                                </button>
                            </div>
                        </div>

                        {isGeneratingPreviews ? (
                            <div className="flex flex-col items-center justify-center py-40 space-y-8 bg-slate-50 border border-slate-100 rounded-xl shadow-sm">
                                <div className="relative">
                                    <div className="w-20 h-20 border-4 border-slate-105 border-t-[#0047AB] rounded-full animate-spin"></div>
                                    <Trash2 className="absolute inset-0 m-auto w-8 h-8 text-[#0047AB] animate-bounce" />
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="text-2xl font-black text-slate-900">Generating Grid</p>
                                    <p className="text-slate-600 font-bold text-xs uppercase tracking-widest">Rendering in-memory thumbnails...</p>
                                </div>
                            </div>
                        ) : (
                            <div className="workspace-preview-panel min-h-[400px]">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                    <AnimatePresence>
                                        {pages.map((page, index) => (
                                            <motion.div
                                                key={page.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.25 }}
                                                className="relative group"
                                            >
                                                <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-[11px] font-bold z-20 shadow-md">
                                                    {index + 1}
                                                </div>

                                                <div className="workspace-card-preview aspect-[3/4] p-3 relative">
                                                    <img
                                                        src={page.preview}
                                                        alt={`Page ${index + 1}`}
                                                        className="w-full h-full object-contain transition-transform duration-500 rounded-lg shadow-sm"
                                                    />

                                                    <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                                                        <button
                                                            onClick={() => removePage(page.id)}
                                                            className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 active:scale-95 transition-all shadow-2xl"
                                                            title="Delete Page"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                        <span className="text-xs font-bold text-white tracking-widest uppercase">Delete Page</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <AnimatePresence>
                    {finalPdfUrl && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="premium-success-card text-center flex flex-col items-center"
                        >
                            <div className="success-icon-badge-premium">
                                <CheckCircle2 className="w-9 h-9" />
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Compile Complete</h3>
                            <p className="text-slate-500 font-medium max-w-md mb-8">
                                The deleted pages have been fully expunged. Download your optimized document.
                            </p>

                            <div className="premium-file-details max-w-xl">
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Output Document</p>
                                    <p className="font-bold text-slate-800 text-sm truncate max-w-[200px] sm:max-w-[300px]">expunged_document.pdf</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                    <p className="font-bold text-indigo-600 text-sm">{pages.length} Pages Retained</p>
                                </div>
                            </div>

                            <div className="premium-actions-layout">
                                <button
                                    onClick={() => window.open(finalPdfUrl, '_blank')}
                                    className="btn-premium-secondary"
                                >
                                    <span className="btn-premium-action-text flex items-center gap-2">
                                        <Eye className="w-4 h-4" /> Verify Quality
                                    </span>
                                    <span className="btn-premium-action-subtext">In-Browser Preview</span>
                                </button>

                                <a
                                    href={finalPdfUrl}
                                    download="expunged_document.pdf"
                                    className="btn-premium-primary"
                                >
                                    <span className="btn-premium-action-text flex items-center gap-2">
                                        <Download className="w-4 h-4" /> Download PDF
                                    </span>
                                    <span className="btn-premium-action-subtext">Secure local save</span>
                                </a>
                            </div>

                            <button
                                onClick={() => {
                                    setFile(null);
                                    setPages([]);
                                    setFinalPdfUrl(null);
                                }}
                                className="btn-premium-reset"
                            >
                                <RefreshCcw className="w-3.5 h-3.5" /> Exclude Pages from Another File
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <ToolContentLayout
                    toolName="Delete PDF Pages"
                    howItWorksSteps={[
                        { title: "Upload PDF", description: "Select the PDF from your device to render page thumbnails locally in the browser sandbox." },
                        { title: "Delete Unwanted Sheets", description: "Hover over the visual page cards and click the trash icon on the ones you want to remove." },
                        { title: "Compile PDF", description: "Click the 'Apply & Compile' button to construct and download a clean PDF without the deleted elements." }
                    ]}
                    features={[
                        { icon: Trash2, title: "Visual Trash Handles", description: "Easily target which pages should be removed with interactive hovering delete buttons." },
                        { icon: ShieldCheck, title: "100% Secure Local Sandbox", description: "Processing is contained entirely within your browser window's RAM. No files are ever sent to servers." },
                        { icon: Zap, title: "Lossless Restructuring", description: "Expunges targeted pages cleanly while retaining internal text layers, forms, vectors, and resolution." }
                    ]}
                    faqs={[
                        { question: "Is my document secure when I delete its pages?", answer: "Absolutely. All processing occurs locally within active RAM in your browser. No files are ever sent to external cloud APIs, guaranteeing total safety." },
                        { question: "Can I undo a page deletion?", answer: "Yes! While in the workspace, you can click 'Change File' or refresh to reload the original document. Once compiled and exported, the deleted pages are permanently removed from the generated file." },
                        { question: "Does deleting pages reduce the file size?", answer: "Yes! Removing heavy high-resolution image pages or unnecessary attachments from the PDF structure is a great way to compress and optimize your document's size." }
                    ]}
                    relatedTools={[
                        { name: "Organize PDF", path: "/organize", description: "Rearrange, rotate, and delete PDF pages visually." },
                        { name: "Split PDF", path: "/split", description: "Extract pages or separate every page instantly." },
                        { name: "Merge PDF", path: "/merge", description: "Combine multiple PDF documents into one single file." }
                    ]}
                    relatedArticles={[
                        { title: "Best PDF Tools for Students in 2026", slug: "best-pdf-tools-for-students" }
                    ]}
                />
            </div>
        </>
    );
}
