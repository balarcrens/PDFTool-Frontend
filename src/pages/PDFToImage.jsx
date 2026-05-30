/* eslint-disable no-unused-vars */
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileImage,
    Download,
    Loader2,
    DownloadCloud,
    Sparkles,
    ShieldCheck,
    Zap
} from "lucide-react";
import { cn } from "../lib/utils";
import confetti from "canvas-confetti";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PDFToImage() {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [images, setImages] = useState([]);
    const [format, setFormat] = useState("image/png");

    const handleFileSelected = (files) => {
        if (files.length > 0) {
            setFile(files[0]);
            setImages([]);
        }
    };

    const convertPdfToImages = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            const fileArrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: fileArrayBuffer }).promise;
            const pageCount = pdf.numPages;
            const newImages = [];

            for (let i = 1; i <= pageCount; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2.0 });
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport: viewport }).promise;
                const dataUrl = canvas.toDataURL(format);
                newImages.push({
                    name: `Page ${i}.${format.split("/")[1]}`,
                    url: dataUrl
                });
            }

            setImages(newImages);
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            });
        } catch (error) {
            console.error("Error converting PDF to images:", error);
            alert("An error occurred while converting the PDF.");
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadAll = () => {
        images.forEach((img, index) => {
            setTimeout(() => {
                const link = document.createElement("a");
                link.href = img.url;
                link.download = img.name;
                link.click();
            }, index * 300);
        });
    };

    return (
        <>
            <SEO
                title="PDF to Image"
                description="Convert PDF pages into high-resolution, professional-grade PNG or JPG images 100% locally in your browser. Complete document privacy with zero uploads."
                keywords="pdf to image, convert pdf to png, pdf to jpg, high-resolution pdf rendering, secure local pdf converter"
            />
            <div className="container-professional space-y-16 py-16 md:py-24">
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-widest border border-slate-100"
                    >
                        <FileImage className="w-3.5 h-3.5 text-indigo-600" />
                        Professional Rendering Engine
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">PDF to Image</h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Transform your PDF pages into high-resolution, professional-grade images.
                        Perfect for presentations, web assets, and archival purposes.
                    </p>
                </div>

                {!file ? (
                    <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
                ) : (
                    <div className="max-w-6xl mx-auto space-y-12">
                        <div className="action-bar-classic sticky top-24 z-30">
                            <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                                    <button
                                        onClick={() => setFormat("image/png")}
                                        className={cn(
                                            "px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all",
                                            format === "image/png" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                                        )}
                                    >
                                        PNG
                                    </button>
                                    <button
                                        onClick={() => setFormat("image/jpeg")}
                                        className={cn(
                                            "px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all",
                                            format === "image/jpeg" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                                        )}
                                    >
                                        JPG
                                    </button>
                                </div>
                                <div className="h-8 w-px bg-slate-100 hidden md:block"></div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-0.5">Source Document</span>
                                    <span className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{file.name}</span>
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
                                    onClick={convertPdfToImages}
                                    disabled={isProcessing}
                                    className="btn-primary-ref py-2.5 flex-1 md:flex-none text-[13px]"
                                >
                                    {isProcessing ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <FileImage className="w-4 h-4" />
                                    )}
                                    Convert to Images
                                </button>
                            </div>
                        </div>

                        {images.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="premium-success-card text-center flex flex-col items-center max-w-5xl mx-auto"
                            >
                                <div className="success-icon-badge-premium">
                                    <ShieldCheck className="w-9 h-9" />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Conversion Complete</h3>
                                <p className="text-slate-500 font-medium max-w-md mb-8">
                                    Your PDF pages have been rendered to high-density vector images.
                                </p>

                                <div className="premium-file-details max-w-2xl mb-8">
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Source Document</p>
                                        <p className="font-bold text-slate-800 text-sm truncate max-w-[180px] sm:max-w-[300px]">{file.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Format</p>
                                        <p className="font-bold text-indigo-600 text-sm">{format.split("/")[1].toUpperCase()} ({images.length} Images)</p>
                                    </div>
                                </div>

                                <div className="premium-actions-layout !max-w-2xl mb-12">
                                    <button
                                        onClick={downloadAll}
                                        className="btn-premium-primary"
                                    >
                                        <span className="btn-premium-action-text flex items-center gap-2">
                                            <DownloadCloud className="w-4 h-4" /> Download All Images
                                        </span>
                                        <span className="btn-premium-action-subtext">Secure Zip / Batch Export</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setFile(null);
                                            setImages([]);
                                        }}
                                        className="btn-premium-secondary"
                                    >
                                        <span className="btn-premium-action-text flex items-center gap-2">
                                            <FileImage className="w-4 h-4" /> Convert Another PDF
                                        </span>
                                        <span className="btn-premium-action-subtext">Start Fresh</span>
                                    </button>
                                </div>

                                <div className="w-full pt-8 border-t border-slate-100 text-left">
                                    <div className="flex items-center justify-between mb-6 px-2">
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-900">Rendered Pages Gallery</h4>
                                            <p className="text-xs text-slate-500 font-medium">Verify pages or save them individually below</p>
                                        </div>
                                        <span className="verified-badge !px-3 !py-1">
                                            High Quality 2.0x DPI
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {images.map((img, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.04 }}
                                                className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm hover:border-blue-600 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                                            >
                                                <img
                                                    src={img.url}
                                                    alt={img.name}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[1px]">
                                                    <a
                                                        href={img.url}
                                                        download={img.name}
                                                        className="p-3.5 bg-white text-blue-600 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg flex items-center justify-center"
                                                        title="Download Page"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </a>
                                                </div>
                                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-lg text-[8.5px] font-bold text-slate-700 uppercase tracking-wider shadow-sm select-none">
                                                    Page {i + 1}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}

                <ToolContentLayout
                    toolName="PDF to Image"
                    howItWorksSteps={[
                        { title: "Select PDF Document", description: "Choose the PDF file you want to convert into images using our secure local file uploader." },
                        { title: "Choose Output Format", description: "Select either PNG for lossless vector text rendering or JPG for compressed photographic layouts." },
                        { title: "Convert & Download", description: "Click the 'Convert to Images' button. Review the high-resolution thumbnails, and download individual pages or export all at once." }
                    ]}
                    features={[
                        { icon: Sparkles, title: "Lossless Rendering Quality", description: "Renders document pages at high-resolution 2.0x scale, ensuring all vectors, diagrams, and texts remain razor-sharp." },
                        { icon: ShieldCheck, title: "100% Local Processing", description: "Your PDF is parsed entirely in your browser's memory. No document bytes are uploaded to external servers, providing perfect security." },
                        { icon: Zap, title: "Zero Limits, Instant Conversions", description: "Export as many pages as you need, without size limitations, watermarks, or subscription pop-ups." }
                    ]}
                    faqs={[
                        { question: "Is my private data secure during PDF to Image conversion?", answer: "Absolutely. Our conversion engine is client-side. The file never leaves your computer, and the rendered pages are compiled within your browser RAM, keeping sensitive documents 100% secure and compliant with data laws." },
                        { question: "What is the difference between PNG and JPG formats?", answer: "Choose PNG if your PDF contains diagrams, text-heavy slides, or transparent graphics requiring maximum legibility. Choose JPG for photos or if you require smaller file sizes to share easily." },
                        { question: "Does the converter support high-DPI screens?", answer: "Yes. By rendering pages using a high-density viewport scale (2.0x zoom multiplier), we ensure that your images remain legible and crisp even when viewed on 4K screens or printed." }
                    ]}
                    relatedTools={[
                        { name: "Merge PDF", path: "/merge", description: "Combine multiple PDF files into one clean document." },
                        { name: "Split PDF", path: "/split", description: "Separate your pages or extract specific parts easily." },
                    ]}
                    relatedArticles={[
                        { title: "PDF vs DOCX Comparison: Which Format Should You Use?", slug: "pdf-vs-docx-comparison" },
                        { title: "Best PDF Tools for Students in 2026: Boost Your Grades", slug: "best-pdf-tools-for-students" }
                    ]}
                />
            </div>
        </>
    );
}
