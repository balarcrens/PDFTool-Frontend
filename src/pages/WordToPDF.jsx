import { useState, useRef } from "react";
import mammoth from "mammoth";
import html2pdf from "html2pdf.js";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Download,
    Loader2,
    CheckCircle2,
    Sparkles,
    ArrowRight,
    Eye,
    FileCode,
    ShieldCheck,
    Zap,
    RefreshCcw
} from "lucide-react";
import confetti from "canvas-confetti";

export default function WordToPDF() {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const hiddenContentRef = useRef(null);

    const handleFileSelected = (files) => {
        if (files.length > 0) {
            setFile(files[0]);
            setPdfUrl(null);
        }
    };

    const convertToPdf = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            const arrayBuffer = await file.arrayBuffer();

            // Convert .docx to HTML with better options
            const result = await mammoth.convertToHtml({
                arrayBuffer: arrayBuffer,
                includeDefaultStyleMap: true,
            });

            const html = result.value;

            // Inject HTML into a hidden div for rendering
            if (hiddenContentRef.current) {
                hiddenContentRef.current.innerHTML = html;

                // Use html2pdf for high-fidelity conversion
                const opt = {
                    margin: [15, 15, 15, 15],
                    filename: file.name.replace(".docx", ".pdf"),
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
                };

                const pdfBlob = await html2pdf().from(hiddenContentRef.current).set(opt).output('blob');
                const url = URL.createObjectURL(pdfBlob);
                setPdfUrl(url);

                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 }
                });
            }
        } catch (error) {
            console.error("Error converting Word to PDF:", error);
            alert("High-fidelity conversion failed. Please ensure the document isn't corrupted.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <SEO
                title="Word to PDF"
                description="Convert Microsoft Word documents (.docx) into high-fidelity PDF files 100% locally in your browser. Preserve complex fonts, lists, and images securely."
                keywords="word to pdf, convert docx to pdf, secure word to pdf, client-side docx to pdf, free word converter"
            />
            <div className="container-professional space-y-16 py-16 md:py-24">
                {/* Tool Header */}
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-widest border border-slate-100"
                    >
                        <FileCode className="w-3.5 h-3.5 text-[#0047AB]" />
                        Professional Office Conversion
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Word to PDF</h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Convert Microsoft Word documents into high-fidelity PDF files while preserving complex layouts,
                        fonts, and digital assets. Enterprise-grade local rendering.
                    </p>
                </div>

                {!file ? (
                    <FileUploader
                        onFilesSelected={handleFileSelected}
                        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        title="Import Document"
                        description="Drag your .docx file here"
                    />
                ) : (
                    <div className="max-w-4xl mx-auto space-y-12">
                        {/* Action Bar */}
                        <div className="action-bar-classic sticky top-24 z-30">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-[15px] truncate max-w-[150px] md:max-w-[350px] text-slate-900 mb-0.5">{file.name}</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Ready for Export</span>
                                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                        <span className="verified-badge">
                                            <ShieldCheck className="w-3 h-3" />
                                            High Fidelity
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
                                <button
                                    onClick={convertToPdf}
                                    disabled={isProcessing}
                                    className="btn-primary-ref py-2.5 flex-1 md:flex-none text-[13px]"
                                >
                                    {isProcessing ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <ArrowRight className="w-4 h-4" />
                                    )}
                                    Generate PDF
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {pdfUrl && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="premium-success-card text-center flex flex-col items-center"
                                >
                                    <div className="success-icon-badge-premium">
                                        <CheckCircle2 className="w-9 h-9" />
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Document Compiled</h3>
                                    <p className="text-slate-500 font-medium max-w-md mb-8">
                                        Your Word document has been successfully converted into a high-fidelity PDF file.
                                    </p>

                                    <div className="premium-file-details max-w-xl">
                                        <div className="text-left">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Generated Output</p>
                                            <p className="font-bold text-slate-800 text-sm truncate max-w-[200px] sm:max-w-[300px]">{file.name.replace(".docx", ".pdf")}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Format</p>
                                            <p className="font-bold text-indigo-600 text-sm">Adobe PDF (.pdf)</p>
                                        </div>
                                    </div>

                                    <div className="premium-actions-layout">
                                        <button
                                            onClick={() => window.open(pdfUrl, '_blank')}
                                            className="btn-premium-secondary"
                                        >
                                            <span className="btn-premium-action-text flex items-center gap-2">
                                                <Eye className="w-4 h-4" /> Verify Quality
                                            </span>
                                            <span className="btn-premium-action-subtext">In-Browser Preview</span>
                                        </button>

                                        <a
                                            href={pdfUrl}
                                            download={file.name.replace(".docx", ".pdf")}
                                            className="btn-premium-primary"
                                        >
                                            <span className="btn-premium-action-text flex items-center gap-2">
                                                <Download className="w-4 h-4" /> Download PDF
                                            </span>
                                            <span className="btn-premium-action-subtext">Secure Local Save</span>
                                        </a>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setFile(null);
                                            setPdfUrl(null);
                                        }}
                                        className="btn-premium-reset"
                                    >
                                        <RefreshCcw className="w-3.5 h-3.5" /> Convert Another Document
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                <ToolContentLayout
                    toolName="Word to PDF"
                    howItWorksSteps={[
                        { title: "Upload Word Document", description: "Choose a standard Microsoft Word .docx file from your computer or mobile device." },
                        { title: "Compile Document", description: "Press the 'Generate PDF' button to extract formatting layers and structure inside the browser." },
                        { title: "Export & Review", description: "Preview the rendered pages in a clean viewport tab, then export and download your offline A4 PDF instantly." }
                    ]}
                    features={[
                        { icon: Sparkles, title: "Exact Layout Consistency", description: "Preserves headings, image tables, margins, lists, and line spacings using our premium HTML5 converter model." },
                        { icon: ShieldCheck, title: "100% Secure Local Sandbox", description: "Your docx file is compiled completely inside active RAM. No server uploads means absolute corporate security." },
                        { icon: Zap, title: "Free Premium Conversions", description: "No page limitations, email registrations, or watermarks. Convert multi-page Word books instantly." }
                    ]}
                    faqs={[
                        { question: "Are my enterprise documents secure when converting Word to PDF?", answer: "Yes, entirely. iFlexPDF runs all document compilation processes inside your web browser sandbox. No file chunks are uploaded, safeguarding legal contracts, invoices, and resumes from cloud leaks." },
                        { question: "Which Word document extensions are supported?", answer: "We support modern standard Microsoft Word documents with the .docx extension. If you have legacy files with .doc extension, we recommend converting them to .docx first." },
                        { question: "Does it support tables, fonts, and inline media?", answer: "Yes. Our local parser parses complex styles, inline images, custom margins, and nested bullet arrays into standard A4 sheets." }
                    ]}
                    relatedTools={[
                        { name: "PDF to Word", path: "/pdf-to-word", description: "Convert PDF documents back to editable Microsoft Word files locally." },
                        { name: "Merge PDF", path: "/merge", description: "Combine multiple PDF files into one clean document." },
                        { name: "Compress PDF", path: "/compress", description: "Reduce your PDF file size without losing quality." }
                    ]}
                    relatedArticles={[
                        { title: "PDF vs DOCX Comparison: Which Format Should You Use?", slug: "pdf-vs-docx-comparison" },
                        { title: "Best PDF Tools for Students in 2026: Boost Your Grades", slug: "best-pdf-tools-for-students" }
                    ]}
                />
            </div>

            {/* Hidden container for PDF rendering - Styled to mimic Word */}
            <div style={{ position: "absolute", left: "-9999px", top: 0, zIndex: -100 }}>
                <div
                    ref={hiddenContentRef}
                    style={{
                        width: "794px", // A4 width in pixels at 96dpi
                        padding: "40px",
                        background: "white",
                        color: "black",
                        fontFamily: "'Times New Roman', Times, serif",
                        lineHeight: "1.5"
                    }}
                    className="word-content-renderer"
                />
            </div>
        </>
    );
}
