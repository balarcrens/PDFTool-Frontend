import { useState } from "react";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Type,
  Download,
  Loader2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Eye,
  Sliders,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "../lib/utils";

export default function WatermarkPDF() {
  const [file, setFile] = useState(null);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState(50);
  const [opacity, setOpacity] = useState(0.3);
  const [rotation, setRotation] = useState(45);
  const [color, setColor] = useState("#ff0000"); // Hex red
  const [position, setPosition] = useState("center"); // center, topLeft, topRight, bottomLeft, bottomRight
  const [isProcessing, setIsProcessing] = useState(false);
  const [watermarkedPdfUrl, setWatermarkedPdfUrl] = useState(null);

  const handleFileSelected = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
      setWatermarkedPdfUrl(null);
    }
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
      : { r: 0.5, g: 0.5, b: 0.5 };
  };

  const addWatermark = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileArrayBuffer);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      const { r, g, b } = hexToRgb(color);

      for (const page of pages) {
        const { width, height } = page.getSize();

        // Calculate coordinates based on selected preset
        let x = width / 2;
        let y = height / 2;

        if (position === "topLeft") {
          x = 60;
          y = height - 80;
        } else if (position === "topRight") {
          x = width - 200;
          y = height - 80;
        } else if (position === "bottomLeft") {
          x = 60;
          y = 80;
        } else if (position === "bottomRight") {
          x = width - 200;
          y = 80;
        }

        page.drawText(watermarkText, {
          x,
          y,
          size: fontSize,
          font: helveticaFont,
          color: rgb(r, g, b),
          opacity: opacity,
          rotate: degrees(rotation),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setWatermarkedPdfUrl(url);

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("Error drawing watermark:", error);
      alert("Error adding watermark. Please ensure the file is valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Add Watermark to PDF",
    "description": "Add high-fidelity text watermarks to your PDF pages locally in your browser with fully customizable styles.",
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
        title="Add Watermark to PDF Online (100% Local & Secure)"
        description="Insert secure, professional text watermarks onto all pages of your PDF files locally. Change fonts, angles, positions, colors, and transparency in seconds."
        keywords="add watermark to pdf, pdf watermark, watermark pdf online, secure pdf editor, custom watermark creator"
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
            <Type className="w-3.5 h-3.5 text-[#0047AB]" />
            Premium Watermark Creator
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Add Watermark to PDF</h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Apply stamp layers, confidential markers, or copy protection seals directly to your documents. Safe, client-side rendering.
          </p>
        </div>

        {!file ? (
          <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
        ) : (
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Action Bar */}
            <div className="action-bar-classic sticky top-24 z-30">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[15px] truncate max-w-[150px] md:max-w-[300px] text-slate-900 mb-0.5">{file.name}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="verified-badge">
                      <ShieldCheck className="w-3 h-3" />
                      Client Processing
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
                  onClick={addWatermark}
                  disabled={isProcessing}
                  className="btn-primary-ref py-2.5 flex-1 md:flex-none text-[13px]"
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  Apply Watermark
                </button>
              </div>
            </div>

            {/* Customization Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Options Form */}
              <div className="lg:col-span-1 card-ref p-8 space-y-8">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <Sliders className="w-5 h-5 text-[#0047AB]" />
                  <h3 className="text-lg font-black text-slate-900">Customization Panel</h3>
                </div>

                {/* Input Text */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Watermark Text</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:border-[#0047AB] focus:bg-white transition-all text-slate-800"
                    placeholder="CONFIDENTIAL"
                  />
                </div>

                {/* Grid Preset Position */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Watermark Position</label>
                  <div className="grid grid-cols-3 gap-2">
                    <PositionBtn active={position === "topLeft"} label="Top Left" onClick={() => setPosition("topLeft")} />
                    <PositionBtn active={position === "topRight"} label="Top Right" onClick={() => setPosition("topRight")} />
                    <PositionBtn active={position === "center"} label="Center" onClick={() => setPosition("center")} />
                    <PositionBtn active={position === "bottomLeft"} label="Bottom L" onClick={() => setPosition("bottomLeft")} />
                    <PositionBtn active={position === "bottomRight"} label="Bottom R" onClick={() => setPosition("bottomRight")} />
                  </div>
                </div>

                {/* Font Size Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>Font Size</span>
                    <span className="text-[#0047AB]">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full accent-[#0047AB]"
                  />
                </div>

                {/* Opacity Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>Opacity</span>
                    <span className="text-[#0047AB]">{Math.round(opacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={opacity}
                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                    className="w-full accent-[#0047AB]"
                  />
                </div>

                {/* Rotation Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>Rotation Angle</span>
                    <span className="text-[#0047AB]">{rotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="-90"
                    max="90"
                    value={rotation}
                    onChange={(e) => setRotation(parseInt(e.target.value))}
                    className="w-full accent-[#0047AB]"
                  />
                </div>

                {/* Color Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stamp Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-12 h-12 rounded-xl cursor-pointer border border-slate-200"
                    />
                    <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">{color}</span>
                  </div>
                </div>
              </div>

              {/* Real-time Preview Area */}
              <div className="lg:col-span-2 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 flex items-center justify-center min-h-[450px] shadow-inner relative overflow-hidden">
                <div className="bg-white aspect-[3/4] w-full max-w-[320px] rounded-2xl shadow-2xl relative flex flex-col items-center justify-center p-6 border border-slate-200/50">
                  <div className="w-full space-y-4 opacity-15 select-none pointer-events-none">
                    <div className="h-6 w-3/4 bg-slate-400 rounded"></div>
                    <div className="h-4 w-full bg-slate-200 rounded"></div>
                    <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                    <div className="h-4 w-4/5 bg-slate-200 rounded"></div>
                    <div className="h-4 w-full bg-slate-200 rounded"></div>
                    <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                  </div>

                  {/* Floating Watermark Preview Tag */}
                  <div
                    className="absolute font-black select-none pointer-events-none transition-all duration-300 text-center uppercase"
                    style={{
                      fontSize: `${fontSize * 0.4}px`,
                      opacity: opacity,
                      color: color,
                      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                      left: position === "center" ? "50%" : position.includes("Right") ? "75%" : "25%",
                      top: position === "center" ? "50%" : position.includes("top") ? "20%" : "80%"
                    }}
                  >
                    {watermarkText || "WATERMARK"}
                  </div>

                  <span className="absolute bottom-4 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                    Real-time Stamp Preview
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result Area */}
        <AnimatePresence>
          {watermarkedPdfUrl && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-ref !p-12 md:!p-20 text-center space-y-12 max-w-4xl mx-auto"
            >
              <div className="decorative-circle !w-64 !h-64" />

              <div className="flex flex-col items-center space-y-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900">Watermark Applied</h3>
                  <p className="text-slate-500 font-medium max-w-md mx-auto">Your high-fidelity watermark layers have been successfully drawn. Save your local copy below.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <button
                  onClick={() => window.open(watermarkedPdfUrl, '_blank')}
                  className="flex flex-col items-center justify-center p-10 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-[#0047AB] hover:shadow-xl transition-all group gap-5"
                >
                  <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#0047AB] group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <Eye className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-900 mb-1">Verify Output</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">In-Browser Preview</p>
                  </div>
                </button>

                <a
                  href={watermarkedPdfUrl}
                  download="watermarked_document.pdf"
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
          toolName="Add Watermark to PDF"
          howItWorksSteps={[
            { title: "Upload PDF File", description: "Select the PDF file you wish to lock, protect, or brand using our secure drag-and-drop box." },
            { title: "Style Your Stamp", description: "Input your custom label, select preset grids, choose text color, rotation angles, sizing, and opacity levels." },
            { title: "Generate File", description: "Click the 'Apply Watermark' button and download your marked PDF document immediately." }
          ]}
          features={[
            { icon: Type, title: "Full Sizing & Color Customization", description: "Fine-tune opacity, color shades, custom rotation angles, and fonts for total branding control." },
            { icon: ShieldCheck, title: "100% Secure Client Engine", description: "Visual layouts are written locally inside browser sandboxes. We never view, parse, or transmit private records." },
            { icon: Sparkles, title: "Vector High-Fidelity Rendering", description: "Applies watermark text using high-fidelity vector metadata layers. Keeps original text selectable underneath." }
          ]}
          faqs={[
            { question: "Is my document secure when I apply a watermark?", answer: "Absolutely. All processing occurs locally within active RAM in your browser. No files are ever sent to external cloud APIs, guaranteeing total safety." },
            { question: "Can I make the watermark transparent?", answer: "Yes! You can adjust the opacity slider from 10% (barely visible) to 100% (solid color) depending on your design preferences." },
            { question: "Does the watermark copy protect the PDF text?", answer: "Drawing a digital watermark places a vector layer on the page. Although this brands the page and marks copyright, it does not encrypt or block copy commands. For advanced security, use our 'Protect PDF' tool to add a password." }
          ]}
          relatedTools={[
            { name: "Protect PDF", path: "/protect", description: "Add a secure password to restrict access to your PDF." },
            { name: "Merge PDF", path: "/merge", description: "Combine multiple PDF documents into one single file." },
            { name: "PDF to Text", path: "/pdf-to-text", description: "Extract raw plaintext layers from your PDF files." }
          ]}
          relatedArticles={[
            { title: "Best PDF Tools for Students in 2026", slug: "best-pdf-tools-for-students" }
          ]}
        />
      </div>
    </>
  );
}

function PositionBtn({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider text-center border transition-all truncate",
        active
          ? "bg-[#0047AB] text-white border-[#0047AB]"
          : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      {label}
    </button>
  );
}
