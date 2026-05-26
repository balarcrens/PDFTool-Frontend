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
        const viewport = page.getViewport({ scale: 2.0 }); // High resolution
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
        {/* Tool Header */}
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
            {/* Action Bar */}
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
                className="space-y-10 pt-12"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                  <div className="space-y-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Rendered Output</h3>
                    <p className="text-slate-600 font-bold text-xs uppercase tracking-widest">Available for high-quality export</p>
                  </div>
                  <button
                    onClick={downloadAll}
                    className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-indigo-100"
                  >
                    <DownloadCloud className="w-4 h-4 text-white/50" />
                    Save All Pages
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {images.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:border-indigo-600 transition-all duration-300"
                    >
                      <img src={img.url} alt={img.name} loading="lazy" width="300" height="400" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                        <a
                          href={img.url}
                          download={img.name}
                          className="p-4 bg-white text-slate-900 rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-2xl"
                          title="Download Page"
                        >
                          <Download className="w-5 h-5 text-indigo-600" />
                        </a>
                      </div>
                      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-xl text-[9px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">
                        Page {i + 1}
                      </div>
                    </motion.div>
                  ))}
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
            { name: "PDF to Word", path: "/pdf-to-word", description: "Convert PDF documents back to editable Microsoft Word files locally." }
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
