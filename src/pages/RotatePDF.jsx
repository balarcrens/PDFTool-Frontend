import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCw,
  RotateCcw,
  Download,
  Loader2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Eye,
  Zap
} from "lucide-react";
import confetti from "canvas-confetti";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function RotatePDF() {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingPreviews, setIsGeneratingPreviews] = useState(false);
  const [rotatedPdfUrl, setRotatedPdfUrl] = useState(null);

  const handleFileSelected = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
      setRotatedPdfUrl(null);
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
          rotation: 0
        });
      }
      setPages(newPages);
    } catch (error) {
      console.error("Error generating previews:", error);
    } finally {
      setIsGeneratingPreviews(false);
    }
  };

  const rotatePage = (id, direction = 90) => {
    setPages(prev => prev.map(p =>
      p.id === id ? { ...p, rotation: (p.rotation + direction + 360) % 360 } : p
    ));
  };

  const rotateAll = (direction = 90) => {
    setPages(prev => prev.map(p => ({
      ...p,
      rotation: (p.rotation + direction + 360) % 360
    })));
  };

  const saveRotatedPdf = async () => {
    if (!file || pages.length === 0) return;

    setIsProcessing(true);
    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileArrayBuffer);
      const rotatedPdf = await PDFDocument.create();

      for (const pageInfo of pages) {
        const [copiedPage] = await rotatedPdf.copyPages(pdf, [pageInfo.index]);
        if (pageInfo.rotation !== 0) {
          const currentRotation = copiedPage.getRotation().angle;
          copiedPage.setRotation({ angle: (currentRotation + pageInfo.rotation) % 360 });
        }
        rotatedPdf.addPage(copiedPage);
      }

      const bytes = await rotatedPdf.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setRotatedPdfUrl(url);

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("Error rotating PDF:", error);
      alert("An error occurred while rotating the PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Rotate PDF",
    "description": "Rotate PDF pages visually and save rotated documents 100% locally in your browser.",
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
        title="Rotate PDF Pages Online (100% Local & Secure)"
        description="Rotate individual or all PDF pages clockwise or counter-clockwise visually in your browser. Complete document security with local-only client execution."
        keywords="rotate pdf, spin pdf pages, rotate pdf pages online, clockwise pdf, local pdf tools"
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
            <RotateCw className="w-3.5 h-3.5 text-[#0047AB]" />
            Professional Rotation Utility
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Rotate PDF Pages</h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Quickly spin pages clockwise or counter-clockwise. Perform low-level edits entirely in your browser with guaranteed safety.
          </p>
        </div>

        {!file ? (
          <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
        ) : (
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Action Bar */}
            <div className="action-bar-classic sticky top-24 z-30">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[15px] truncate max-w-[120px] md:max-w-[200px] text-slate-900 mb-0.5">{file.name}</p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pages.length} Pages</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => rotateAll(90)}
                    aria-label="Rotate all pages 90 degrees clockwise"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-bold text-[11px] border border-slate-200 transition-all uppercase tracking-wider"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    Rotate All Right
                  </button>
                  <button
                    onClick={() => rotateAll(-90)}
                    aria-label="Rotate all pages 90 degrees counter-clockwise"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-bold text-[11px] border border-slate-200 transition-all uppercase tracking-wider"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Rotate All Left
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto mt-4 sm:mt-0">
                <button
                  onClick={() => setFile(null)}
                  aria-label="Change PDF file"
                  className="btn-outline-ref py-2.5 flex-1 md:flex-none text-[13px]"
                >
                  Change File
                </button>
                <button
                  onClick={saveRotatedPdf}
                  disabled={isProcessing || isGeneratingPreviews || pages.length === 0}
                  aria-label="Apply rotations and download compiled PDF"
                  className="btn-primary-ref py-2.5 flex-1 md:flex-none text-[13px]"
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Save & Download
                </button>
              </div>
            </div>

            {isGeneratingPreviews ? (
              <div className="flex flex-col items-center justify-center py-40 space-y-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] shadow-inner">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-slate-100 border-t-[#0047AB] rounded-full animate-spin"></div>
                  <RotateCw className="absolute inset-0 m-auto w-8 h-8 text-[#0047AB] animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-black text-slate-900">Loading Previews</p>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Generating document map...</p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-inner min-h-[400px]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                  {pages.map((page, index) => (
                    <div key={page.id} className="relative group">
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center text-[11px] font-bold z-20 shadow-xl">
                        {index + 1}
                      </div>

                      <div className="aspect-[3/4] bg-white rounded-2xl overflow-hidden border border-slate-200 group-hover:border-[#0047AB] group-hover:shadow-2xl transition-all duration-300 shadow-sm relative p-3">
                        <img
                          src={page.preview}
                          alt={`Page ${index + 1}`}
                          className="w-full h-full object-contain transition-transform duration-500 rounded-lg shadow-sm"
                          style={{ transform: `rotate(${page.rotation}deg)` }}
                        />

                        <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                          <div className="flex gap-2">
                            <button
                              onClick={() => rotatePage(page.id, -90)}
                              aria-label={`Rotate page ${index + 1} 90 degrees counter-clockwise`}
                              className="p-3 bg-white text-[#0047AB] rounded-xl hover:scale-110 active:scale-95 transition-all shadow-2xl"
                              title="Rotate 90° Left"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => rotatePage(page.id, 90)}
                              aria-label={`Rotate page ${index + 1} 90 degrees clockwise`}
                              className="p-3 bg-white text-[#0047AB] rounded-xl hover:scale-110 active:scale-95 transition-all shadow-2xl"
                              title="Rotate 90° Right"
                            >
                              <RotateCw className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-[10px] font-bold text-white tracking-widest uppercase">Rotate Page</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <AnimatePresence>
          {rotatedPdfUrl && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-ref !p-12 md:!p-20 text-center space-y-12"
            >
              <div className="decorative-circle !w-64 !h-64" />

              <div className="flex flex-col items-center space-y-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900">Rotated Successfully</h3>
                  <p className="text-slate-500 font-medium max-w-md mx-auto">Your changes have been structurally written. The file is ready for download.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <button
                  onClick={() => window.open(rotatedPdfUrl, '_blank')}
                  aria-label="Preview rotated PDF in a new tab"
                  className="flex flex-col items-center justify-center p-10 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-[#0047AB] hover:shadow-xl transition-all group gap-5"
                >
                  <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#0047AB] group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <Eye className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-900 mb-1">Preview File</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Open in browser</p>
                  </div>
                </button>

                <a
                  href={rotatedPdfUrl}
                  download="rotated_document.pdf"
                  aria-label="Download rotated PDF file"
                  className="flex flex-col items-center justify-center p-10 bg-[#0047AB] text-white rounded-[2rem] hover:bg-[#003580] transition-all group gap-5 shadow-2xl shadow-indigo-100"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 duration-300 transition-all shadow-lg">
                    <Download className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-white mb-1">Download PDF</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Secure local save</p>
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ToolContentLayout
          toolName="Rotate PDF"
          howItWorksSteps={[
            { title: "Select PDF Document", description: "Choose the target PDF file from your device to load it inside the browser engine." },
            { title: "Rotate Pages", description: "Hover over page visual cards to rotate clockwise/counter-clockwise, or spin all frames concurrently." },
            { title: "Save & Download", description: "Click the 'Save & Download' button to generate and export your updated PDF file instantly." }
          ]}
          features={[
            { icon: RotateCw, title: "Selective & Global Spin", description: "Rotate single specific frames, or spin all of them inside the PDF layout in one click." },
            { icon: ShieldCheck, title: "100% In-Browser Isolation", description: "All PDF page rotations are compiled locally. We never store, read, or upload your sensitive PDF data." },
            { icon: Zap, title: "Frictionless Performance", description: "No conversions or heavy server-side queue latency. Works offline instantly." }
          ]}
          faqs={[
            { question: "Is my document secure when I rotate its pages?", answer: "Yes! iFlexPDF does all the page rendering and modification inside your active browser session memory, keeping files completely safe and secure." },
            { question: "Can I save rotated pages along with other layouts?", answer: "Yes! If you need broader layout tools, you can also use our core Organize PDF utility to reorder, delete, and rotate pages all in one workspace." },
            { question: "Will rotating damage high-resolution images or forms?", answer: "No. Low-level metadata editing retains all vectors, form layouts, bookmarks, and print-resolution elements precisely." }
          ]}
          relatedTools={[
            { name: "Organize PDF", path: "/organize", description: "Rearrange, rotate, and delete PDF pages visually." },
            { name: "Merge PDF", path: "/merge", description: "Combine multiple PDF documents into one single file." },
            { name: "Split PDF", path: "/split", description: "Extract pages or separate every page instantly." }
          ]}
          relatedArticles={[
            { title: "Best PDF Tools for Students in 2026", slug: "best-pdf-tools-for-students" }
          ]}
        />
      </div>
    </>
  );
}
