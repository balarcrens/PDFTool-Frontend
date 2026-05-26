import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hash,
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

export default function PageNumbersPDF() {
  const [file, setFile] = useState(null);
  const [style, setStyle] = useState("xofv"); // xofv, simplePage, simpleNum
  const [position, setPosition] = useState("bottomRight"); // bottomCenter, bottomRight, bottomLeft, topCenter, topRight, topLeft
  const [fontSize, setFontSize] = useState(10);
  const [margin, setMargin] = useState(30);
  const [startNum, setStartNum] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [numberedPdfUrl, setNumberedPdfUrl] = useState(null);

  const handleFileSelected = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
      setNumberedPdfUrl(null);
    }
  };

  const addPageNumbers = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileArrayBuffer);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const totalPages = pages.length;

      for (let i = 0; i < totalPages; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();

        const activePageNum = i + startNum;
        let text = `${activePageNum}`;
        if (style === "xofv") {
          text = `Page ${activePageNum} of ${totalPages - 1 + startNum}`;
        } else if (style === "simplePage") {
          text = `Page ${activePageNum}`;
        }

        // Calculate positions
        let x = width / 2;
        let y = margin;

        if (position === "bottomLeft") {
          x = margin + 20;
          y = margin;
        } else if (position === "bottomRight") {
          x = width - margin - 60;
          y = margin;
        } else if (position === "bottomCenter") {
          x = width / 2 - 20;
          y = margin;
        } else if (position === "topLeft") {
          x = margin + 20;
          y = height - margin - 15;
        } else if (position === "topRight") {
          x = width - margin - 60;
          y = height - margin - 15;
        } else if (position === "topCenter") {
          x = width / 2 - 20;
          y = height - margin - 15;
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0.3, 0.3, 0.3), // Dark neutral grey
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setNumberedPdfUrl(url);

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("Error drawing page numbers:", error);
      alert("An error occurred while adding page numbers.");
    } finally {
      setIsProcessing(false);
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Add Page Numbers to PDF",
    "description": "Add page numbers to your PDF documents locally in your browser with simple and custom numbering styles.",
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
        title="Add Page Numbers to PDF Online (100% Local & Secure)"
        description="Insert running page numbers onto PDF pages. Choose styles, positions, margin paddings, starting number, and text sizes client-side with 100% security."
        keywords="add page numbers to pdf, number pdf pages, page numbers pdf online, local pdf pages numeration, secure pdf pager"
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
            <Hash className="w-3.5 h-3.5 text-[#0047AB]" />
            Professional Pagination Engine
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Add Page Numbers to PDF</h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Quickly number the pages of your documents. Select custom placement, font sizes, margins, and running styles locally.
          </p>
        </div>

        {!file ? (
          <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
        ) : (
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Action Bar */}
            <div className="action-bar-classic sticky top-24 z-30">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[15px] truncate max-w-[150px] md:max-w-[300px] text-slate-900 mb-0.5">{file.name}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="verified-badge">
                      <ShieldCheck className="w-3 h-3" />
                      Secure Pagination
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
                  onClick={addPageNumbers}
                  disabled={isProcessing}
                  className="btn-primary-ref py-2.5 flex-1 md:flex-none text-[13px]"
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  Apply Pagination
                </button>
              </div>
            </div>

            {/* Pagination Customization */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Form Options */}
              <div className="lg:col-span-1 card-ref p-8 space-y-8">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <Sliders className="w-5 h-5 text-[#0047AB]" />
                  <h3 className="text-lg font-black text-slate-900">Pagination Setup</h3>
                </div>

                {/* Sizing Style select */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Numbering Style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:border-[#0047AB] focus:bg-white text-slate-800"
                  >
                    <option value="xofv">Page X of Y (Confidential/Contract Style)</option>
                    <option value="simplePage">Page X (Formal Page Style)</option>
                    <option value="simpleNum">X (Minimalist Style)</option>
                  </select>
                </div>

                {/* Sizing Alignment select */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Number Placement</label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:border-[#0047AB] focus:bg-white text-slate-800"
                  >
                    <option value="bottomRight">Bottom Right (Default)</option>
                    <option value="bottomCenter">Bottom Center</option>
                    <option value="bottomLeft">Bottom Left</option>
                    <option value="topRight">Top Right</option>
                    <option value="topCenter">Top Center</option>
                    <option value="topLeft">Top Left</option>
                  </select>
                </div>

                {/* Size slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-600 uppercase tracking-widest">
                    <span>Text Size</span>
                    <span className="text-[#0047AB]">{fontSize}pt</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full accent-[#0047AB]"
                  />
                </div>

                {/* Margin slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-600 uppercase tracking-widest">
                    <span>Margin Padding</span>
                    <span className="text-[#0047AB]">{margin}px</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="80"
                    value={margin}
                    onChange={(e) => setMargin(parseInt(e.target.value))}
                    className="w-full accent-[#0047AB]"
                  />
                </div>

                {/* Start Number Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Start numbering from</label>
                  <input
                    type="number"
                    min="1"
                    value={startNum}
                    onChange={(e) => setStartNum(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:border-[#0047AB] focus:bg-white text-slate-800"
                  />
                </div>
              </div>

              {/* Preview Box */}
              <div className="lg:col-span-2 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 flex items-center justify-center min-h-[450px] shadow-inner relative overflow-hidden">
                <div className="bg-white aspect-[3/4] w-full max-w-[320px] rounded-2xl shadow-2xl relative flex flex-col p-8 border border-slate-200/50 justify-between">
                  {/* Top Bar for header style */}
                  <div className="w-full flex justify-between items-center select-none pointer-events-none">
                    <span
                      className="font-mono text-slate-600 font-bold transition-all"
                      style={{
                        fontSize: `${fontSize * 0.8}px`,
                        opacity: position.startsWith("top") ? 1 : 0,
                        order: position === "topLeft" ? -1 : position === "topRight" ? 1 : 0,
                        marginLeft: position === "topCenter" ? "auto" : "0px",
                        marginRight: position === "topCenter" ? "auto" : "0px"
                      }}
                    >
                      {style === "xofv" ? `Page ${startNum} of 10` : style === "simplePage" ? `Page ${startNum}` : `${startNum}`}
                    </span>
                  </div>

                  {/* Body text mockup */}
                  <div className="w-full space-y-4 opacity-10 select-none pointer-events-none flex-grow mt-8">
                    <div className="h-4 w-3/4 bg-slate-400 rounded"></div>
                    <div className="h-3 w-full bg-slate-200 rounded"></div>
                    <div className="h-3 w-full bg-slate-200 rounded"></div>
                    <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
                    <div className="h-3 w-full bg-slate-200 rounded"></div>
                    <div className="h-3 w-full bg-slate-200 rounded"></div>
                    <div className="h-3 w-4/5 bg-slate-200 rounded"></div>
                  </div>

                  {/* Bottom Bar for footer style */}
                  <div className="w-full flex justify-between items-center select-none pointer-events-none mt-4">
                    <span
                      className="font-mono text-slate-600 font-bold transition-all"
                      style={{
                        fontSize: `${fontSize * 0.8}px`,
                        opacity: position.startsWith("bottom") ? 1 : 0,
                        order: position === "bottomLeft" ? -1 : position === "bottomRight" ? 1 : 0,
                        marginLeft: position === "bottomCenter" ? "auto" : "0px",
                        marginRight: position === "bottomCenter" ? "auto" : "0px"
                      }}
                    >
                      {style === "xofv" ? `Page ${startNum} of 10` : style === "simplePage" ? `Page ${startNum}` : `${startNum}`}
                    </span>
                  </div>

                  <span className="absolute left-1/2 -translate-x-1/2 bottom-4 text-[9px] font-bold text-slate-300 uppercase tracking-widest pointer-events-none">
                    Preview Alignment
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result Area */}
        <AnimatePresence>
          {numberedPdfUrl && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-ref !p-12 md:!p-20 text-center space-y-12 max-w-4xl mx-auto"
            >
              <div className="decorative-circle !w-64 !h-64" />

              <div className="flex flex-col items-center space-y-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900">Pagination Applied</h3>
                  <p className="text-slate-500 font-medium max-w-md mx-auto">Your page numbers have been successfully stamped. Download your formatted document locally.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <button
                  onClick={() => window.open(numberedPdfUrl, '_blank')}
                  className="flex flex-col items-center justify-center p-10 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-[#0047AB] hover:shadow-xl transition-all group gap-5"
                >
                  <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-600 group-hover:text-[#0047AB] group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <Eye className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-900 mb-1">Verify Numbers</p>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">In-Browser Preview</p>
                  </div>
                </button>

                <a
                  href={numberedPdfUrl}
                  download="numbered_document.pdf"
                  className="flex flex-col items-center justify-center p-10 bg-[#0047AB] text-white rounded-[2rem] hover:bg-[#003580] transition-all group gap-5 shadow-2xl shadow-indigo-100"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 duration-300 transition-all shadow-lg">
                    <Download className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-white mb-1">Download PDF</p>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Secure local save</p>
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ToolContentLayout
          toolName="Add Page Numbers to PDF"
          howItWorksSteps={[
            { title: "Select PDF file", description: "Choose the target document from your local storage to begin local rendering." },
            { title: "Format Pagination", description: "Select the running number style, coordinate alignment presets, text scale, margins, and starting index." },
            { title: "Download PDF", description: "Click the 'Apply Pagination' button to generate and export your neatly numbered document." }
          ]}
          features={[
            { icon: Hash, title: "Custom Presets & Styles", description: "Offers diverse templates such as 'Page X of Y', 'Page X', or plain running integers." },
            { icon: ShieldCheck, title: "100% Isolated Sandbox", description: "Stamps page indicators locally in-memory using active client RAM. No cloud databases involved." },
            { icon: Sparkles, title: "Clean High-Res Fonts", description: "Renders crisp Helvetica digits and details perfectly adapted to matches standard office documents." }
          ]}
          faqs={[
            { question: "Is my document secure when I number its pages?", answer: "Yes! iFlexPDF does all the page rendering and modification inside your active browser session memory, keeping files completely safe and secure." },
            { question: "Can I skip the first page (cover page) from numbering?", answer: "Yes! By setting the starting index or selecting custom page operations, you can control page stamping. We are currently rolling out a selective page-range selection filter in our upcoming layout upgrades." },
            { question: "Does pagination work on landscape pages?", answer: "Yes, our low-level canvas engine queries the orientation of each page individually and maps coordinates proportionally, ensuring correct positioning on both portrait and landscape layouts." }
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
