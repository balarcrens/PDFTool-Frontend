import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Copy,
    Download,
    Loader2,
    Check,
    ArrowRight,
    ClipboardList,
    ShieldCheck,
    Zap,
    RefreshCcw
} from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PDFToText() {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedText, setExtractedText] = useState("");
    const [copied, setCopied] = useState(false);

    const handleFileSelected = (files) => {
        if (files.length > 0) {
            setFile(files[0]);
            setExtractedText("");
        }
    };

    const extractText = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            const fileArrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: fileArrayBuffer }).promise;
            let fullText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(" ");
                fullText += `--- Page ${i} ---\n${pageText}\n\n`;
            }

            setExtractedText(fullText);
        } catch (error) {
            console.error("Error extracting text:", error);
            alert("An error occurred while extracting text.");
        } finally {
            setIsProcessing(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(extractedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadText = () => {
        const blob = new Blob([extractedText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${file.name.replace(".pdf", "")}_extracted.txt`;
        link.click();
    };

    return (
        <>
            <SEO
                title="PDF to Text"
                description="Extract raw plaintext layers from PDF files 100% locally in your browser. Fast, accurate characters parser that guarantees document privacy."
                keywords="pdf to text, extract text from pdf, convert pdf to txt, secure text extractor, free client-side characters parser"
            />
            <div className="container-professional space-y-16 py-16 md:py-24">
                {/* Tool Header */}
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-widest border border-slate-100"
                    >
                        <ClipboardList className="w-3.5 h-3.5 text-[#0047AB]" />
                        Professional Text Parsing
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">PDF to Text</h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Extract raw text content from your documents with precision. Optimized for high-fidelity
                        parsing while maintaining 100% local-first data privacy.
                    </p>
                </div>

                {!file ? (
                    <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
                ) : (
                    <div className="max-w-5xl mx-auto space-y-12">
                        {/* Action Bar */}
                        <div className="action-bar-classic sticky top-24 z-30">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-[15px] truncate max-w-[150px] md:max-w-[350px] text-slate-900 mb-0.5">{file.name}</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                        <span className="verified-badge">
                                            <ShieldCheck className="w-3 h-3" />
                                            Secure Parse
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => setFile(null)}
                                    className="btn-outline-ref py-2.5 flex-1 md:flex-none text-[13px]"
                                >
                                    Change File
                                </button>
                                {!extractedText && (
                                    <button
                                        onClick={extractText}
                                        disabled={isProcessing}
                                        className="btn-primary-ref py-2.5 flex-1 md:flex-none text-[13px]"
                                    >
                                        {isProcessing ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <ArrowRight className="w-4 h-4" />
                                        )}
                                        Extract Text
                                    </button>
                                )}
                            </div>
                        </div>

                        <AnimatePresence>
                            {extractedText && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="premium-success-card text-center flex flex-col items-center max-w-4xl mx-auto"
                                >
                                    <div className="success-icon-badge-premium">
                                        <ShieldCheck className="w-9 h-9" />
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Text Extraction Complete</h3>
                                    <p className="text-slate-500 font-medium max-w-md mb-8">
                                        The plaintext layer from your PDF document has been parsed and extracted successfully.
                                    </p>

                                    <div className="premium-file-details max-w-2xl mb-8">
                                        <div className="text-left">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Source Document</p>
                                            <p className="font-bold text-slate-800 text-sm truncate max-w-[180px] sm:max-w-[300px]">{file.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Extracted Format</p>
                                            <p className="font-bold text-indigo-600 text-sm">Plaintext UTF-8 (.txt)</p>
                                        </div>
                                    </div>

                                    <div className="premium-actions-layout !max-w-2xl mb-12">
                                        <button
                                            onClick={downloadText}
                                            className="btn-premium-primary"
                                        >
                                            <span className="btn-premium-action-text flex items-center gap-2">
                                                <Download className="w-4 h-4" /> Export Text File
                                            </span>
                                            <span className="btn-premium-action-subtext">Secure Local Download</span>
                                        </button>

                                        <button
                                            onClick={copyToClipboard}
                                            className="btn-premium-secondary"
                                        >
                                            <span className="btn-premium-action-text flex items-center gap-2">
                                                {copied ? <Check className="w-4 h-4 text-emerald-500 animate-pulse-once" /> : <Copy className="w-4 h-4" />}
                                                {copied ? "Text Copied" : "Copy to Clipboard"}
                                            </span>
                                            <span className="btn-premium-action-subtext">System Clipboard</span>
                                        </button>
                                    </div>

                                    {/* Plaintext Preview Block */}
                                    <div className="w-full text-left pt-8 border-t border-slate-100">
                                        <div className="flex items-center justify-between mb-4 px-2">
                                            <div>
                                                <h4 className="text-base font-bold text-slate-900">Extracted Plaintext Preview</h4>
                                                <p className="text-xs text-slate-500 font-medium">Inline character buffer preview</p>
                                            </div>
                                            <span className="verified-badge !px-3 !py-1">
                                                UTF-8 Encoded
                                            </span>
                                        </div>

                                        <div className="w-full p-6 sm:p-8 bg-slate-50 border border-slate-100 rounded-xl font-mono text-xs sm:text-sm leading-relaxed text-slate-700 min-h-[300px] max-h-[500px] overflow-y-auto whitespace-pre-wrap custom-scrollbar select-text">
                                            {extractedText}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setFile(null);
                                            setExtractedText("");
                                        }}
                                        className="btn-premium-reset"
                                    >
                                        <RefreshCcw className="w-3.5 h-3.5" /> Parse Another Document
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                <ToolContentLayout
                    toolName="PDF to Text"
                    howItWorksSteps={[
                        { title: "Import Document", description: "Select or drag and drop your target PDF file into our secure client-side uploader." },
                        { title: "Parse Plaintext", description: "Click the 'Extract Text' button to run the local characters parser across all page nodes in active RAM." },
                        { title: "Export Content", description: "Copy the generated plaintext directly to your clipboard, or click 'Export .txt' to download a clean text file." }
                    ]}
                    features={[
                        { icon: FileText, title: "Structured Text Mapping", description: "Parses standard character strings, sentence structures, and multi-page layouts cleanly into formatted text columns." },
                        { icon: ShieldCheck, title: "100% Secure Local Sandbox", description: "Parsing is executed entirely inside your browser sandbox. No file data is sent to external cloud APIs or servers." },
                        { icon: Zap, title: "Unlimited Plaintext Extraction", description: "Extract millions of characters and multi-chapter documents in seconds with zero fees, caps, or accounts." }
                    ]}
                    faqs={[
                        { question: "Is my document secure when I parse PDF to text?", answer: "Absolutely. iFlexPDF processes documents purely client-side using JavaScript. No external requests are made, keeping corporate records, academic articles, and lists 100% confidential." },
                        { question: "Does it support image-only or scanned PDFs?", answer: "This tool parses the built-in digital text layers of PDFs. For scanned documents or images that do not have text metadata, an OCR (Optical Character Recognition) engine is needed, which is not supported in this client-side plaintext parser." },
                        { question: "How are multi-page documents formatted in the output?", answer: "To maintain perfect readability and structure, each page's extracted text is prefixed with a clear page delimiter (e.g. --- Page 1 ---), making it easy to identify chapters or sources." }
                    ]}
                    relatedTools={[
                        { name: "PDF to Word", path: "/pdf-to-word", description: "Convert PDF documents back to editable Microsoft Word files locally." },
                        { name: "Merge PDF", path: "/merge", description: "Combine multiple PDF files into one clean document." },
                        { name: "Split PDF", path: "/split", description: "Separate your pages or extract specific parts easily." }
                    ]}
                    relatedArticles={[
                        { title: "Best PDF Tools for Students in 2026: Boost Your Grades", slug: "best-pdf-tools-for-students" },
                        { title: "PDF vs DOCX Comparison: Which Format Should You Use?", slug: "pdf-vs-docx-comparison" }
                    ]}
                />
            </div>
        </>
    );
}
