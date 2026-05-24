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
        {/* Tool Header */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-widest border border-slate-100"
          >
            <Combine className="w-3.5 h-3.5 text-[#0047AB]" />
            Professional Merge Utility
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Merge PDF Documents</h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Consolidate multiple PDF files into a single, high-fidelity document.
            All processing happens locally to ensure <span className="text-[#0047AB] font-bold">100% data confidentiality</span>.
          </p>
        </div>

        {!files.length ? (
          <FileUploader onFilesSelected={handleFilesSelected} />
        ) : (
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Action Bar */}
            <div className="action-bar-classic sticky top-24 z-30">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                  <Files className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Queue Status</span>
                  <span className="text-sm font-bold text-slate-900">{files.length} Documents Ready</span>
                </div>
                <div className="h-8 w-px bg-slate-100 hidden md:block ml-2"></div>
                <button
                  onClick={reverseOrder}
                  className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-slate-500 hover:text-[#0047AB] transition-all uppercase tracking-wider"
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

            {/* File List */}
            <Reorder.Group axis="y" values={files} onReorder={setFiles} className="space-y-3">
              <AnimatePresence>
                {files.map((file) => (
                  <Reorder.Item
                    key={file.id}
                    value={file}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="card-ref !p-5 !flex-row items-center gap-5 cursor-grab active:cursor-grabbing"
                  >
                    <div className="text-slate-300 group-hover:text-slate-600 transition-colors">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <div className="w-11 h-11 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-[#0047AB] group-hover:text-white transition-all">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-grow min-w-0 text-left">
                      <p className="font-bold text-[15px] truncate text-slate-900 mb-0.5">{file.name}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{file.size}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                        <span className="verified-badge">
                          <ShieldCheck className="w-3 h-3" />
                          Verified Local
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>

            {/* Result Section */}
            <AnimatePresence>
              {mergedPdfUrl && (
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
                      <h3 className="text-3xl font-black text-slate-900">Merging Complete</h3>
                      <p className="text-slate-500 font-medium max-w-md mx-auto">Your high-fidelity document has been generated and is ready for export.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <button
                      onClick={() => window.open(mergedPdfUrl, '_blank')}
                      className="flex flex-col items-center justify-center p-10 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-[#0047AB] hover:shadow-xl transition-all group gap-5"
                    >
                      <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#0047AB] group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                        <Eye className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-slate-900 mb-1">Verify Quality</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">In-Browser Preview</p>
                      </div>
                    </button>

                    <a
                      href={mergedPdfUrl}
                      download="merged_document.pdf"
                      className="flex flex-col items-center justify-center p-10 bg-[#0047AB] text-white rounded-[2rem] hover:bg-[#003580] transition-all group gap-5 shadow-2xl shadow-indigo-100"
                    >
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <Download className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-white mb-1">Download Final PDF</p>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Secure Export</p>
                      </div>
                    </a>
                  </div>
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
            { name: "PDF to Word", path: "/pdf-to-word", description: "Convert PDF documents back to editable Microsoft Word files locally." },
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
