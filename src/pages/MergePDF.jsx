import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
    FileText,
    GripVertical,
    Download,
    Loader2,
    Plus,
    CheckCircle2,
    Sparkles,
    RefreshCcw,
    ArrowDownUp,
    Eye,
    Files,
    X,
    Combine,
    ShieldCheck
} from "lucide-react";
import confetti from "canvas-confetti";

export default function MergePDF() {
    const [files, setFiles] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleFilesSelected = (newFiles) => {
        const formattedFiles = Array.from(newFiles).map((file, index) => ({
            id: `${file.name}-${file.size}-${file.lastModified}-${index}`,
            file,
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + " MB"
        }));
        setFiles(prev => [...prev, ...formattedFiles]);
        setMergedPdfUrl(null);
    };

    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
        setMergedPdfUrl(null);
    };

    const clearAll = () => {
        setFiles([]);
        setMergedPdfUrl(null);
    };

    const reverseOrder = () => {
        setFiles(prev => [...prev].reverse());
    };

    const mergePdfs = async () => {
        if (files.length < 2) return;

        setIsProcessing(true);
        try {
            const mergedPdf = await PDFDocument.create();

            for (const fileObj of files) {
                const fileArrayBuffer = await fileObj.file.arrayBuffer();
                const pdf = await PDFDocument.load(fileArrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            setMergedPdfUrl(url);

            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            });
        } catch (error) {
            console.error("Error merging PDFs:", error);
            alert("Error merging PDFs. Please make sure the files are valid.");
        } finally {
            setIsProcessing(false);
        }
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Merge PDF",
        "description": "Combine multiple PDF documents into a single file locally in your browser with zero server uploads.",
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
                title="Merge PDF Files Online (100% Local & Secure)"
                description="Combine multiple PDF documents into a single PDF file instantly. 100% local processing keeps your records private and secure. Drag, sort, and merge!"
                keywords="merge pdf, combine pdfs, join pdf files, pdf merger online, secure pdf merge"
                schemaData={webAppSchema}
            />

            <div className="container-professional space-y-16 py-16 md:py-24">
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-widest border border-slate-100"
                    >
                        <Combine className="w-3.5 h-3.5 text-indigo-600" />
                        Professional Merge Utility
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Merge PDF Documents</h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Consolidate multiple PDF files into a single, high-fidelity document.
                        All processing happens locally to ensure <span className="text-indigo-600 font-bold">100% data confidentiality</span>.
                    </p>
                </div>

                {!files.length ? (
                    <FileUploader onFilesSelected={handleFilesSelected} />
                ) : (
                    <div className="max-w-4xl mx-auto space-y-10">
                        <div className="action-bar-classic sticky top-24 z-30">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                                    <Files className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Queue Status</span>
                                    <span className="text-sm font-bold text-slate-900">{files.length} Documents Ready</span>
                                </div>
                                <div className="h-8 w-px bg-slate-100 hidden md:block ml-2"></div>
                                <button
                                    onClick={reverseOrder}
                                    className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-slate-500 hover:text-indigo-600 transition-all uppercase tracking-wider"
                                >
                                    <ArrowDownUp className="w-4 h-4" />
                                    Reverse
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-1 sm:gap-3 w-full md:w-auto">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={(e) => handleFilesSelected(e.target.files)}
                                    multiple
                                    className="hidden"
                                    accept="application/pdf"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="btn-outline-ref py-2.5 flex-1 md:flex-none text-[13px]"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add More
                                </button>
                                <button
                                    onClick={mergePdfs}
                                    disabled={files.length < 2 || isProcessing}
                                    className="btn-primary-ref py-2.5 flex-1 md:flex-none text-[13px]"
                                >
                                    {isProcessing ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Combine className="w-4 h-4" />
                                    )}
                                    Merge Files
                                </button>
                                <button
                                    onClick={clearAll}
                                    className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                                    title="Clear All"
                                >
                                    <RefreshCcw className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <Reorder.Group axis="y" values={files} onReorder={setFiles} className="space-y-2">
                            <AnimatePresence>
                                {files.map((file) => (
                                    <Reorder.Item
                                        key={file.id}
                                        value={file}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        className="flex flex-row items-center gap-4 p-3.5 bg-white border border-slate-200/90 rounded-xl hover:border-blue-600 hover:shadow-sm transition-all cursor-grab active:cursor-grabbing select-none"
                                    >
                                        <div className="text-slate-400 hover:text-slate-650 transition-colors shrink-0">
                                            <GripVertical className="w-4 h-4" />
                                        </div>
                                        <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-500 shrink-0">
                                            <FileText className="w-4.5 h-4.5" />
                                        </div>
                                        <div className="flex-grow min-w-0 text-left">
                                            <p className="font-bold text-[14.5px] truncate text-slate-900 mb-0.5">{file.name}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{file.size}</span>
                                                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                <span className="verified-badge !px-2 !py-0.5">
                                                    <ShieldCheck className="w-2.5 h-2.5" />
                                                    Local Secure
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFile(file.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0"
                                        >
                                            <X className="w-4.5 h-4.5" />
                                        </button>
                                    </Reorder.Item>
                                ))}
                            </AnimatePresence>
                        </Reorder.Group>

                        <AnimatePresence>
                            {mergedPdfUrl && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="premium-success-card text-center flex flex-col items-center"
                                >
                                    <div className="success-icon-badge-premium">
                                        <CheckCircle2 className="w-9 h-9" />
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Merging Complete</h3>
                                    <p className="text-slate-500 font-medium max-w-md mb-8">
                                        Your high-fidelity document has been successfully compiled and is ready for export.
                                    </p>

                                    <div className="premium-file-details max-w-xl">
                                        <div className="text-left">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Output Document</p>
                                            <p className="font-bold text-slate-800 text-sm truncate max-w-[200px] sm:max-w-[300px]">merged_document.pdf</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                            <p className="font-bold text-indigo-600 text-sm">{files.length} PDFs Unified</p>
                                        </div>
                                    </div>

                                    <div className="premium-actions-layout">
                                        <button
                                            onClick={() => window.open(mergedPdfUrl, '_blank')}
                                            className="btn-premium-secondary"
                                        >
                                            <span className="btn-premium-action-text flex items-center gap-2">
                                                <Eye className="w-4 h-4" /> Verify Quality
                                            </span>
                                            <span className="btn-premium-action-subtext">In-Browser Preview</span>
                                        </button>

                                        <a
                                            href={mergedPdfUrl}
                                            download="merged_document.pdf"
                                            className="btn-premium-primary"
                                        >
                                            <span className="btn-premium-action-text flex items-center gap-2">
                                                <Download className="w-4 h-4" /> Download PDF
                                            </span>
                                            <span className="btn-premium-action-subtext">Secure Export</span>
                                        </a>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setFiles([]);
                                            setMergedPdfUrl(null);
                                        }}
                                        className="btn-premium-reset"
                                    >
                                        <RefreshCcw className="w-3.5 h-3.5" /> Merge More Files
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                <ToolContentLayout
                    toolName="Merge PDF"
                    howItWorksSteps={[
                        { title: "Select PDF Files", description: "Choose the PDF files you want to combine by clicking inside the uploader box or dragging files in." },
                        { title: "Rearrange Page Order", description: "Drag and drop the document list cards vertically to put them in the exact order you want them combined." },
                        { title: "Compile Document", description: "Click 'Merge Files' and download your perfectly structured, unified PDF document in milliseconds." }
                    ]}
                    features={[
                        { icon: ShieldCheck, title: "100% Client-Side Merging", description: "Your files are parsed and compiled in-memory directly on your CPU. No files are ever sent to backend servers." },
                        { icon: Combine, title: "Intuitive Sort Options", description: "Use visual drag-and-drop handles to reorder files easily, or reverse file sequences in one click." },
                        { icon: Sparkles, title: "Fidelity Preservation", description: "Combines documents structurally without modifying vector text, original layouts, or high-res images." }
                    ]}
                    faqs={[
                        { question: "Is there a limit on how many files I can merge?", answer: "No. You can compile dozens of files at once. Since processing is done client-side, the speed depends entirely on your system's processing speed." },
                        { question: "Will merging PDFs compromise private contract details?", answer: "Not at all. Since our application does not upload files to cloud storage, your sensitive data is 100% safe inside your device sandbox." },
                        { question: "Can I combine scanned documents alongside digital ones?", answer: "Yes, you can merge any valid PDF document regardless of whether it is a scanned image or a text-based vector layout." }
                    ]}
                    relatedTools={[
                        { name: "Split PDF", path: "/split", description: "Isolate specific pages or separate documents easily." },
                        { name: "Compress PDF", path: "/compress", description: "Reduce file sizes securely while maintaining text clarity." }
                    ]}
                    relatedArticles={[
                        { title: "How to Merge PDF Files on Windows, Mac, and Mobile", slug: "how-to-merge-pdf-files" },
                        { title: "Best PDF Tools for Students in 2026", slug: "best-pdf-tools-for-students" }
                    ]}
                />
            </div>
        </>
    );
}
