import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
    Image as ImageIcon,
    Trash2,
    Download,
    Loader2,
    Plus,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Maximize2,
    Eye,
    ShieldCheck,
    RefreshCcw
} from "lucide-react";
import { cn } from "../lib/utils";
import confetti from "canvas-confetti";

export default function ImageToPDF() {
    const [images, setImages] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [orientation, setOrientation] = useState("p");
    const fileInputRef = useRef(null);

    const handleFilesSelected = (newFiles) => {
        const formattedImages = Array.from(newFiles).map(file => ({
            id: `${file.name}-${file.size}-${file.lastModified}`,
            file,
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setImages(prev => [...prev, ...formattedImages]);
        setPdfUrl(null);
    };

    const removeImage = (id) => {
        setImages(prev => prev.filter(img => img.id !== id));
        setPdfUrl(null);
    };

    const convertToPdf = async () => {
        if (images.length === 0) return;

        setIsProcessing(true);
        try {
            const pdf = new jsPDF({
                orientation: orientation,
                unit: "mm",
                format: "a4"
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            for (let i = 0; i < images.length; i++) {
                if (i > 0) pdf.addPage();
                const img = images[i];
                const imgData = await getBase64(img.file);
                const imgProps = pdf.getImageProperties(imgData);
                const imgWidth = imgProps.width;
                const imgHeight = imgProps.height;
                const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

                const finalWidth = imgWidth * ratio;
                const finalHeight = imgHeight * ratio;
                const x = (pageWidth - finalWidth) / 2;
                const y = (pageHeight - finalHeight) / 2;

                pdf.addImage(imgData, "JPEG", x, y, finalWidth, finalHeight);
            }

            const blob = pdf.output("blob");
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);

            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            });
        } catch (error) {
            console.error("Error converting images to PDF:", error);
            alert("An error occurred while converting images.");
        } finally {
            setIsProcessing(false);
        }
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Image to PDF",
        "description": "Convert JPG, PNG, and WebP images into high-quality PDF files locally in your browser with zero server uploads.",
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
                title="Convert Image to PDF Online (100% Local & Secure)"
                description="Convert JPG, PNG, and WebP images to high-quality PDF documents instantly. 100% local browser-based execution ensures complete file safety."
                keywords="image to pdf, convert jpg to pdf, png to pdf, convert photo to pdf, secure pdf converter"
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
                        <ImageIcon className="w-3.5 h-3.5 text-[#0047AB]" />
                        Professional Conversion Suite
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Image to PDF</h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Transform your photographs and digital assets into high-fidelity PDF documents.
                        Optimized for professional layouts with complete data privacy.
                    </p>
                </div>

                {images.length === 0 ? (
                    <FileUploader
                        onFilesSelected={handleFilesSelected}
                        accept="image/*"
                        title="Import Assets"
                        description="Drag your JPG, PNG, or WebP files here"
                    />
                ) : (
                    <div className="max-w-6xl mx-auto space-y-12">
                        {/* Action Bar */}
                        <div className="action-bar-classic sticky top-24 z-30">
                            <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                                    <button
                                        onClick={() => setOrientation("p")}
                                        className={cn(
                                            "px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all",
                                            orientation === "p" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                                        )}
                                    >
                                        Portrait
                                    </button>
                                    <button
                                        onClick={() => setOrientation("l")}
                                        className={cn(
                                            "px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all",
                                            orientation === "l" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                                        )}
                                    >
                                        Landscape
                                    </button>
                                </div>
                                <div className="h-8 w-px bg-slate-100 hidden md:block"></div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-0.5">Asset Count</span>
                                    <span className="text-sm font-bold text-slate-900">{images.length} Photos Selected</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={(e) => handleFilesSelected(e.target.files)}
                                    multiple
                                    className="hidden"
                                    accept="image/*"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="btn-outline-ref py-2.5 flex-1 md:flex-none text-[13px]"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add More
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

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            <AnimatePresence>
                                {images.map((img) => (
                                    <motion.div
                                        key={img.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="relative group aspect-square rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:border-[#0047AB] transition-all"
                                    >
                                        <img src={img.url} alt={img.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[1px]">
                                            <button
                                                onClick={() => removeImage(img.id)}
                                                className="p-2.5 bg-white text-red-500 rounded-lg hover:scale-110 active:scale-95 transition-all shadow-xl"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
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

                                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">PDF Document Compiled</h3>
                                    <p className="text-slate-500 font-medium max-w-md mb-8">
                                        Your assets have been successfully converted into a high-fidelity document.
                                    </p>

                                    <div className="premium-file-details max-w-xl">
                                        <div className="text-left">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Generated Output</p>
                                            <p className="font-bold text-slate-800 text-sm truncate max-w-[200px] sm:max-w-[300px]">converted_images.pdf</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Format</p>
                                            <p className="font-bold text-indigo-600 text-sm">{images.length} Images Embedded</p>
                                        </div>
                                    </div>

                                    <div className="premium-actions-layout">
                                        <button
                                            onClick={() => window.open(pdfUrl, '_blank')}
                                            className="btn-premium-secondary"
                                        >
                                            <span className="btn-premium-action-text flex items-center gap-2">
                                                <Eye className="w-4 h-4" /> Verify Output
                                            </span>
                                            <span className="btn-premium-action-subtext">In-Browser Preview</span>
                                        </button>

                                        <a
                                            href={pdfUrl}
                                            download="converted_images.pdf"
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
                                            setImages([]);
                                            setPdfUrl(null);
                                        }}
                                        className="btn-premium-reset"
                                    >
                                        <RefreshCcw className="w-3.5 h-3.5" /> Convert More Images
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                <ToolContentLayout
                    toolName="Image to PDF"
                    howItWorksSteps={[
                        { title: "Select or Drag Images", description: "Select your JPG, PNG, or WebP photo files. You can upload multiple images simultaneously." },
                        { title: "Select Page Settings", description: "Choose Portrait or Landscape orientation to arrange your photo layout accurately." },
                        { title: "Download Compiled PDF", description: "Click 'Generate PDF'. Preview or download your beautifully structured PDF document locally." }
                    ]}
                    features={[
                        { icon: ShieldCheck, title: "100% Secure Local Execution", description: "Your photo assets are parsed and rendered inside your browser's memory using HTML5. No external server uploads." },
                        { icon: Maximize2, title: "Intelligent Scaling", description: "Our compiler automatically scales images to perfectly fit A4 sizes, keeping them centered and clear." },
                        { icon: Sparkles, title: "Supports Multiple Formats", description: "Works perfectly with JPG, JPEG, PNG, WebP, and SVG images with high processing speed." }
                    ]}
                    faqs={[
                        { question: "Are my personal photos sent to any backend servers?", answer: "No. iFlexPDF processes all images locally using in-browser libraries. Your images are parsed in active RAM and compiled directly to a PDF without contacting external networks." },
                        { question: "Is there a restriction on how many images I can convert at once?", answer: "No restrictions. You can combine dozens of images into a single multi-page PDF. Large image groups are processed locally based on your device's speed and memory." },
                        { question: "Will my images retain their original quality and resolution?", answer: "Yes, jsPDF embeds raw image bytes inside the document. It scales visual heights and widths to align beautifully on PDF boundaries while preserving maximum pixels." }
                    ]}
                    relatedTools={[
                        { name: "PDF to Image", path: "/pdf-to-image", description: "Convert each page of a PDF back into separate image files." },
                        { name: "Merge PDF", path: "/merge", description: "Combine multiple PDF documents into a single file easily." },
                        { name: "Organize PDF", path: "/organize", description: "Rearrange, rotate, or delete pages in a PDF visually." }
                    ]}
                    relatedArticles={[
                        { title: "Best PDF Tools for Students in 2026", slug: "best-pdf-tools-for-students" },
                        { title: "PDF vs DOCX Comparison: Which Format Should You Use?", slug: "pdf-vs-docx-comparison" }
                    ]}
                />
            </div>
        </>
    );
}
