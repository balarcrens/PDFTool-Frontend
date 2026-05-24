import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Layout,
  Trash2,
  RotateCw,
  Download,
  Loader2,
  ArrowRight,
  GripHorizontal,
  CheckCircle2,
  Eye,
  FileText,
  ShieldCheck,
  Zap
} from "lucide-react";
import confetti from "canvas-confetti";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function OrganizePDF() {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingPreviews, setIsGeneratingPreviews] = useState(false);
  const [organizedPdfUrl, setOrganizedPdfUrl] = useState(null);

  const handleFileSelected = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
      setOrganizedPdfUrl(null);
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

  const removePage = (id) => {
    setPages(prev => prev.filter(p => p.id !== id));
  };

  const rotatePage = (id) => {
    setPages(prev => prev.map(p =>
      p.id === id ? { ...p, rotation: (p.rotation + 90) % 360 } : p
    ));
  };

  const saveOrganizedPdf = async () => {
    if (!file || pages.length === 0) return;

    setIsProcessing(true);
    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileArrayBuffer);
      const organizedPdf = await PDFDocument.create();

      for (const pageInfo of pages) {
        const [copiedPage] = await organizedPdf.copyPages(pdf, [pageInfo.index]);
        if (pageInfo.rotation !== 0) {
          const currentRotation = copiedPage.getRotation().angle;
          copiedPage.setRotation({ angle: (currentRotation + pageInfo.rotation) % 360 });
        }
        organizedPdf.addPage(copiedPage);
      }

      const bytes = await organizedPdf.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setOrganizedPdfUrl(url);

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("Error saving organized PDF:", error);
      alert("Error saving PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SEO
        title="Organize PDF Pages"
        description="Rearrange, rotate, or delete PDF pages visually 100% locally in your browser. Organize your document structures with high-fidelity drag-and-drop tools securely."
        keywords="organize pdf, rearrange pdf pages, rotate pdf pages, delete pdf pages, secure local pdf organizer, drag and drop pdf pages"
      />
      <div className="container-professional space-y-16 py-16 md:py-24">
        {/* Tool Header */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-widest border border-slate-100"
          >
            <Layout className="w-3.5 h-3.5 text-[#0047AB]" />
            Professional Layout Management
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Organize PDF Pages</h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Visually restructure your documents. Rearrange, rotate, or remove pages with enterprise-grade precision and absolute privacy.
          </p>
        </div>

        {!file ? (
          <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
        ) : (
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Action Bar */}
            <div className="action-bar-classic sticky top-24 z-30">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[15px] truncate max-w-[150px] md:max-w-[300px] text-slate-900 mb-0.5">{file.name}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pages.length} Pages</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="verified-badge">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Local
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
                  onClick={saveOrganizedPdf}
                  disabled={isProcessing || isGeneratingPreviews || pages.length === 0}
                  className="btn-primary-ref py-2.5 flex-1 md:flex-none text-[13px]"
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  Save Changes
                </button>
              </div>
            </div>

            {isGeneratingPreviews ? (
              <div className="flex flex-col items-center justify-center py-40 space-y-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] shadow-inner">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-slate-100 border-t-[#0047AB] rounded-full animate-spin"></div>
                  <Layout className="absolute inset-0 m-auto w-8 h-8 text-[#0047AB]" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-black text-slate-900">Loading Previews</p>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Generating document map for editing...</p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-inner min-h-[400px]">
                <Reorder.Group
                  axis="x"
                  values={pages}
                  onReorder={setPages}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8"
                >
                  <AnimatePresence>
                    {pages.map((page, index) => (
                      <Reorder.Item
                        key={page.id}
                        value={page}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileDrag={{ scale: 1.05, zIndex: 50 }}
                        className="relative group cursor-grab active:cursor-grabbing"
                      >
                        <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center text-[11px] font-bold z-20 shadow-xl">
                          {index + 1}
                        </div>

                        <div className="aspect-[3/4] bg-white rounded-2xl overflow-hidden border border-slate-200 group-hover:border-[#0047AB] group-hover:shadow-2xl transition-all duration-300 shadow-sm relative">
                          <div className="w-full h-full p-3 bg-white">
                            <img
                              src={page.preview}
                              alt={`Page ${index + 1}`}
                              className="w-full h-full object-contain transition-transform duration-500 rounded-lg shadow-sm"
                              style={{ transform: `rotate(${page.rotation}deg)` }}
                            />
                          </div>

                          <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-4 backdrop-blur-[2px]">
                            <div className="flex gap-2.5">
                              <button
                                onClick={(e) => { e.stopPropagation(); rotatePage(page.id); }}
                                className="p-3 bg-white text-slate-900 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-2xl"
                                title="Rotate 90°"
                              >
                                <RotateCw className="w-4 h-4 text-[#0047AB]" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); removePage(page.id); }}
                                className="p-3 bg-white text-red-500 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-2xl"
                                title="Delete Page"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full backdrop-blur-md">
                              <GripHorizontal className="w-3 h-3 text-white" />
                              <span className="text-[9px] font-bold uppercase tracking-widest text-white">Rearrange</span>
                            </div>
                          </div>
                        </div>
                      </Reorder.Item>
                    ))}
                  </AnimatePresence>
                </Reorder.Group>
              </div>
            )}
          </div>
        )}

        <AnimatePresence>
          {organizedPdfUrl && (
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
                  <h3 className="text-3xl font-black text-slate-900">Organization Optimized</h3>
                  <p className="text-slate-500 font-medium max-w-md mx-auto">Your customized layout has been successfully applied and is ready for export.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <button
                  onClick={() => window.open(organizedPdfUrl, '_blank')}
                  className="flex flex-col items-center justify-center p-10 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-[#0047AB] hover:shadow-xl transition-all group gap-5"
                >
                  <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#0047AB] group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <Eye className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-900 mb-1">Check Layout</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">In-Browser Preview</p>
                  </div>
                </button>

                <a
                  href={organizedPdfUrl}
                  download="organized_document.pdf"
                  className="flex flex-col items-center justify-center p-10 bg-[#0047AB] text-white rounded-[2rem] hover:bg-[#003580] transition-all group gap-5 shadow-2xl shadow-indigo-100"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 duration-300 transition-all shadow-lg">
                    <Download className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-white mb-1">Export PDF File</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Secure Local Save</p>
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ToolContentLayout
          toolName="Organize PDF"
          howItWorksSteps={[
            { title: "Upload PDF", description: "Choose a PDF file from your device and upload it into our secure browser tool." },
            { title: "Rearrange & Edit Pages", description: "Drag and drop the visual page cards to reorder. Spin cards by 90° clockwise, or delete redundant pages immediately." },
            { title: "Export Document", description: "Click the 'Save Changes' button. Review the preview and click 'Export PDF' to download your beautifully organized file." }
          ]}
          features={[
            { icon: GripHorizontal, title: "Visual Card Interface", description: "Organize pages easily using an interactive grid layout and fluid drag-and-drop mechanics." },
            { icon: ShieldCheck, title: "100% Client-Side Privacy", description: "Visual editing and page mapping execute fully inside your browser RAM. Perfect security for your private files." },
            { icon: Zap, title: "Multi-Feature Page Editor", description: "Rearrange, delete, and spin pages in a single workflow before downloading your finalized PDF." }
          ]}
          faqs={[
            { question: "Is my document secure when I organize its pages?", answer: "Yes, entirely. The visual previews are generated in standard browser canvas elements and never contact external databases, maintaining perfect privacy." },
            { question: "Can I combine rotating and deleting in one step?", answer: "Yes! You can reorder pages, spin individual pages 90 degrees clockwise, and delete unwanted pages concurrently, all before generating your final file." },
            { question: "Will active links or bookmarks remain intact?", answer: "Yes. Our engine uses low-level page copying tools, preserving all active links, text layers, vector images, and page annotations exactly as they were." }
          ]}
          relatedTools={[
            { name: "Merge PDF", path: "/merge", description: "Combine multiple PDF files into one clean document." },
            { name: "Split PDF", path: "/split", description: "Separate your pages or extract specific parts easily." },
            { name: "Protect PDF", path: "/protect", description: "Add a secure password to restrict access to your PDF." }
          ]}
          relatedArticles={[
            { title: "How to Merge PDF Files on Windows, Mac, and Mobile", slug: "how-to-merge-pdf-files" },
            { title: "Best PDF Tools for Students in 2026: Boost Your Grades", slug: "best-pdf-tools-for-students" }
          ]}
        />
      </div>
    </>
  );
}
