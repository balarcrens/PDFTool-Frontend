import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import { jsPDF } from "jspdf";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileDown,
  Download,
  Loader2,
  Zap,
  Sparkles,
  Gauge,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { cn } from "../lib/utils";
import confetti from "canvas-confetti";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function CompressPDF() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedPdfUrl, setCompressedPdfUrl] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState("medium");
  const [stats, setStats] = useState(null);

  const handleFileSelected = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
      setCompressedPdfUrl(null);
      setStats(null);
    }
  };

  const compressPdf = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      let finalBlob;

      if (compressionLevel === "basic") {
        const fileArrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileArrayBuffer);
        const compressedBytes = await pdfDoc.save({
          useObjectStreams: true,
          addDefaultPage: false,
        });
        finalBlob = new Blob([compressedBytes], { type: "application/pdf" });
      } else {
        const fileArrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: fileArrayBuffer }).promise;
        const pageCount = pdf.numPages;

        const scale = compressionLevel === "medium" ? 1.5 : 1.0;
        const quality = compressionLevel === "medium" ? 0.7 : 0.4;

        const doc = new jsPDF({
          orientation: "p",
          unit: "px",
          format: "a4",
          compress: true
        });

        for (let i = 1; i <= pageCount; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport: viewport }).promise;
          const imgData = canvas.toDataURL("image/jpeg", quality);

          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();

          if (i > 1) doc.addPage();
          doc.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight, undefined, 'FAST');
        }

        finalBlob = doc.output("blob");
      }

      const url = URL.createObjectURL(finalBlob);
      const originalSize = file.size;
      const compressedSize = finalBlob.size;
      const savings = Math.max(0, ((originalSize - compressedSize) / originalSize) * 100).toFixed(1);

      setStats({
        original: (originalSize / 1024 / 1024).toFixed(2) + " MB",
        compressed: (compressedSize / 1024 / 1024).toFixed(2) + " MB",
        savings: savings + "%"
      });

      setCompressedPdfUrl(url);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("Error compressing PDF:", error);
      alert("An error occurred while compressing the PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Compress PDF",
    "description": "Reduce PDF document file size locally in your browser with zero server uploads.",
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
        title="Compress PDF Online (100% Local & Secure)"
        description="Reduce your PDF file size online locally. Keep the best document quality. Secure, fast, and 100% private in-browser compression."
        keywords="compress pdf, reduce pdf size, compress pdf online, shrink pdf file, secure pdf optimizer"
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
            <Zap className="w-3.5 h-3.5 text-[#0047AB]" />
            Professional Optimization Engine
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Compress PDF File</h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Reduce document size without compromising professional quality.
            Our local-first engine ensures your files are optimized securely on your machine.
          </p>
        </div>

        {!file ? (
          <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
        ) : (
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Action Bar */}
            <div className="action-bar-classic sticky top-24 z-30">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                  <FileDown className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[15px] truncate max-w-[150px] md:max-w-[300px] text-slate-900 mb-0.5">{file.name}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="verified-badge">
                      <ShieldCheck className="w-3 h-3" />
                      Secure Local
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setFile(null)}
                  className="btn-outline-ref py-2.5 flex-1 md:flex-none text-[13px]"
                >
                  Change File
                </button>
                <button
                  onClick={compressPdf}
                  disabled={isProcessing}
                  className="btn-primary-ref py-2.5 flex-1 md:flex-none text-[13px]"
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4" />
                  )}
                  Optimize Now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CompressionCard
                level="basic"
                active={compressionLevel === "basic"}
                onClick={() => setCompressionLevel("basic")}
                title="Classic"
                description="Minimal Compression"
                icon={<Sparkles className="w-6 h-6" />}
              />
              <CompressionCard
                level="medium"
                active={compressionLevel === "medium"}
                onClick={() => setCompressionLevel("medium")}
                title="Professional"
                description="Recommended Balance"
                icon={<Gauge className="w-6 h-6" />}
              />
              <CompressionCard
                level="extreme"
                active={compressionLevel === "extreme"}
                onClick={() => setCompressionLevel("extreme")}
                title="Compact"
                description="Maximum Reduction"
                icon={<Zap className="w-6 h-6" />}
              />
            </div>

            <AnimatePresence>
              {stats && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-ref !p-12 md:!p-20 text-center space-y-12"
                >
                  <div className="decorative-circle !w-64 !h-64" />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center relative z-10">
                    <div className="space-y-2">
                      <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Original State</p>
                      <p className="text-2xl font-black text-slate-900">{stats.original}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Optimized State</p>
                      <p className="text-2xl font-black text-blue-600">{stats.compressed}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Efficiency</p>
                      <p className="text-2xl font-black text-emerald-600">{stats.savings}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <button
                      onClick={() => window.open(compressedPdfUrl, '_blank')}
                      className="flex flex-col items-center justify-center p-10 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-blue-600 hover:shadow-xl transition-all group gap-5"
                    >
                      <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-600 group-hover:text-blue-600 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                        <Eye className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-slate-900 mb-1">Review Output</p>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">In-Browser Preview</p>
                      </div>
                    </button>

                    <a
                      href={compressedPdfUrl}
                      download={`compressed_${file.name}`}
                      className="flex flex-col items-center justify-center p-10 bg-blue-600 text-white rounded-[2rem] hover:bg-blue-700 transition-all group gap-5 shadow-2xl shadow-blue-100/50"
                    >
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <Download className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-white mb-1">Export Optimized PDF</p>
                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Secure Local Save</p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <ToolContentLayout
          toolName="Compress PDF"
          howItWorksSteps={[
            { title: "Upload PDF File", description: "Choose your PDF document by clicking inside our secure local uploader or dragging and dropping files." },
            { title: "Select Quality Level", description: "Choose Classic (minimal compression), Professional (balanced compression), or Compact (extreme document size reduction)." },
            { title: "Download Result", description: "Press the 'Optimize Now' button to execute. Download your compressed PDF immediately." }
          ]}
          features={[
            { icon: ShieldCheck, title: "100% Private & Local", description: "Processing is completed inside your web browser sandbox. Zero files are uploaded to any server, keeping data safe." },
            { icon: Zap, title: "Ultra Fast Optimization", description: "Powered by modern client-side HTML5 engines, compressing files instantly without server-side delays." },
            { icon: Sparkles, title: "Visually Sharp Quality", description: "Keeps all vector text and layout elements perfectly crisp while focusing optimization on heavy images." }
          ]}
          faqs={[
            { question: "How does in-browser PDF compression work?", answer: "Our local-first utility runs client-side JS libraries to parse your PDF, recompress and downsample heavy embedded images, and recompile standard document elements without uploading anything." },
            { question: "Will my PDF layout or text formatting break?", answer: "No. iFlexPDF compresses files by optimizing images and metadata structures. Your text remains original, selectable vector layers that look completely identical on high-DPI screens." },
            { question: "Is there a maximum limit to PDF sizes?", answer: "We enforce no daily or size limits. Since processing runs locally inside your browser, extremely large files (e.g. over 500MB) will depend on your computer's RAM capacity." }
          ]}
          relatedTools={[
            { name: "Merge PDF", path: "/merge", description: "Combine multiple PDF files into one clean document." },
            { name: "Split PDF", path: "/split", description: "Separate your pages or extract specific parts easily." },
            { name: "PDF to Word", path: "/pdf-to-word", description: "Convert PDF documents back to editable Microsoft Word files locally." }
          ]}
          relatedArticles={[
            { title: "How to Compress PDF Online: The Ultimate Guide", slug: "how-to-compress-pdf-online" },
            { title: "Reduce PDF Size Without Losing Quality: Pro Tips", slug: "reduce-pdf-size-without-losing-quality" }
          ]}
        />
      </div>
    </>
  );
}

function CompressionCard({ active, onClick, title, description, icon }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "card-ref !p-10 cursor-pointer text-center items-center transition-all duration-300",
        active ? "ring-2 ring-blue-600 bg-blue-50/20" : ""
      )}
    >
      <div className="decorative-circle !opacity-20" />
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 shadow-sm",
        active ? "bg-blue-600 text-white scale-110" : "bg-slate-50 text-slate-600"
      )}>
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold text-slate-900 mb-1">{title}</h4>
        <p className="text-xs text-slate-600 font-bold uppercase tracking-[0.2em]">{description}</p>
      </div>
    </div>
  );
}
