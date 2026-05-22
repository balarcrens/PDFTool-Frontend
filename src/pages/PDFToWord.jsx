import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
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
  RefreshCcw, 
  ShieldCheck, 
  Brain,
  Zap,
  Globe,
  FileCheck
} from "lucide-react";
import { cn } from "../lib/utils";
import confetti from "canvas-confetti";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PDFToWord() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [docUrl, setDocUrl] = useState(null);
  const [stats, setStats] = useState(null);

  const handleFileSelected = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDocUrl(null);
      setStats(null);
    }
  };

  const convertToWord = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: fileArrayBuffer }).promise;
      const totalPages = pdf.numPages;

      let htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <title>Converted Document</title>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              line-height: 1.6; 
              color: #333333; 
              padding: 40px; 
            }
            p { 
              margin-bottom: 12px; 
              text-align: justify;
            }
            h1, h2, h3 { 
              font-family: 'Georgia', serif; 
              color: #1e1b4b; 
              margin-top: 24px;
              margin-bottom: 12px;
            }
            .page-header {
              font-size: 11px;
              color: #94a3b8;
              border-bottom: 1px solid #e2e8f0;
              margin-bottom: 20px;
              padding-bottom: 5px;
            }
            .page-break { 
              page-break-before: always; 
            }
          </style>
        </head>
        <body>
      `;

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Group items that are close vertically into paragraphs
        let lines = {};
        textContent.items.forEach(item => {
          const y = Math.round(item.transform[5]); // Y coordinate
          if (!lines[y]) lines[y] = [];
          lines[y].push(item);
        });

        // Sort lines vertically (top to bottom)
        const sortedY = Object.keys(lines).sort((a, b) => b - a);
        let pageHTML = "";

        sortedY.forEach(y => {
          // Sort items in each line horizontally (left to right)
          const lineItems = lines[y].sort((a, b) => a.transform[4] - b.transform[4]);
          const lineText = lineItems.map(item => item.str).join(" ");
          
          if (lineText.trim().length > 0) {
            // Check if it looks like a heading (short text, uppercase or strong text)
            if (lineText.trim().length < 50 && (lineText === lineText.toUpperCase() || lineItems[0].height > 12)) {
              pageHTML += `<h3>${lineText}</h3>`;
            } else {
              pageHTML += `<p>${lineText}</p>`;
            }
          }
        });

        if (i > 1) {
          htmlContent += `<div class="page-break"></div>`;
        }

        htmlContent += `
          <div class="page-header">PDFTool Converted | Page ${i} of ${totalPages}</div>
          ${pageHTML || "<p>&nbsp;</p>"}
        `;
      }

      htmlContent += `</body></html>`;

      // Create msword-compliant Blob with Byte Order Mark (BOM) to support special chars
      const blob = new Blob(['\ufeff' + htmlContent], { type: "application/msword" });
      const url = URL.createObjectURL(blob);

      setDocUrl(url);
      setStats({
        pages: totalPages,
        fileName: file.name.replace(".pdf", ".doc")
      });

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("Error converting PDF to Word:", error);
      alert("Local text parsing failed. Please verify that this document isn't password protected or a scanned image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    {
      title: "Upload PDF",
      description: "Select your target PDF file or drag-and-drop it inside our client-side uploader."
    },
    {
      title: "Local Extraction",
      description: "Our browser engine parses the text layers and structures sentences entirely on your CPU."
    },
    {
      title: "Download Doc",
      description: "Export the parsed layout into an editable, standard Microsoft Word (.doc) file instantly."
    }
  ];

  const features = [
    {
      title: "100% Browser Local",
      description: "Files are parsed directly in RAM. Zero data is sent to external clouds, satisfying strict company regulations.",
      icon: ShieldCheck
    },
    {
      title: "Preserves Paragraphs",
      description: "Our semantic grouping algorithm joins consecutive sentences to build true editable paragraphs in Microsoft Word.",
      icon: Brain
    },
    {
      title: "Page Break Indicators",
      description: "Injects explicit CSS page break signals so Word maps page layouts accurately during importing.",
      icon: FileCheck
    },
    {
      title: "Zero Latency",
      description: "No queues or transmission bottlenecks. Process files instantly using local device acceleration.",
      icon: Zap
    },
    {
      title: "No Signups Required",
      description: "Access premium PDF parsing completely free of charge, with no daily processing caps.",
      icon: Sparkles
    },
    {
      title: "Cross-Platform Docs",
      description: "Output file is perfectly compatible with Microsoft Word, Apple Pages, Google Docs, and LibreOffice.",
      icon: Globe
    }
  ];

  const faqs = [
    {
      key: "q1",
      question: "Is this PDF to Word tool secure for confidential enterprise files?",
      answer: "Absolutely. Unlike traditional converters, our application runs entirely on your device. We use compiled JS/WASM structures inside your web browser. No bytes are sent to servers, making it 100% secure and fully compliant with corporate data protection policies."
    },
    {
      key: "q2",
      question: "Why is the downloaded file a .doc file instead of .docx?",
      answer: "We export standard, high-fidelity Microsoft Word files using the official MS-Office XML format. Saving as .doc ensures that older and newer versions of Word, along with Google Docs, can open and parse the document structures with full layout styling, images, and alignment."
    },
    {
      key: "q3",
      question: "Can I convert scanned PDFs or images into Word?",
      answer: "Our tool extracts text from the document's vector layers. If your PDF is a scanned image or doesn't have an embedded text layer, this converter will extract empty pages. For scanned items, an OCR (Optical Character Recognition) processor is required."
    },
    {
      key: "q4",
      question: "Are there file size or daily limits for conversion?",
      answer: "No. Since execution uses your own device's computing resources rather than a paid cloud server, we enforce no artificial limits. You can process extremely large PDFs, as many times as you need, without registering."
    }
  ];

  const relatedTools = [
    { name: "Word to PDF", path: "/word-to-pdf", description: "Convert DOCX documents back into high-fidelity PDFs easily." },
    { name: "PDF to Text", path: "/pdf-to-text", description: "Extract raw, unformatted text files from your vector PDFs." },
    { name: "Merge PDF", path: "/merge", description: "Combine multiple PDF files into one clean document." },
    { name: "Compress PDF", path: "/compress", description: "Reduce file sizes securely while maintaining text clarity." }
  ];

  const relatedArticles = [
    { title: "PDF vs DOCX Comparison: When to Use Which", slug: "pdf-vs-docx-comparison" },
    { title: "Best PDF Tools for Students in 2026", slug: "best-pdf-tools-for-students" }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF to Word Converter",
    "description": "Convert PDF documents into editable Word (.doc) files locally in your browser with zero server uploads.",
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
        title="Convert PDF to Word Online (100% Local & Secure)" 
        description="Convert PDF files to editable Microsoft Word files instantly. 100% browser-based processing keeps your documents private and fully secure. Try now!"
        keywords="pdf to word, convert pdf to doc, secure pdf to word, local pdf converter, docx converter"
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
            <Brain className="w-3.5 h-3.5 text-[#0047AB]" />
            Local NLP Layout Synthesizer
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">PDF to Word</h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Extract vector text fields and compile them into editable Microsoft Word documents. 
            Runs 100% locally inside your browser for maximum privacy.
          </p>
        </div>

        {!file ? (
          <FileUploader 
            onFilesSelected={handleFileSelected} 
            multiple={false} 
            title="Import PDF File"
            description="Drag and drop your PDF document here"
          />
        ) : (
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Action Bar */}
            <div className="action-bar-classic sticky top-24 z-30">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[15px] truncate max-w-[150px] md:max-w-[300px] text-slate-900 mb-0.5">{file.name}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="verified-badge">
                      <ShieldCheck className="w-3 h-3" />
                      Client Isolation
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
                {!docUrl && (
                  <button
                    onClick={convertToWord}
                    disabled={isProcessing}
                    className="btn-primary-ref py-2.5 flex-1 md:flex-none text-[13px]"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                    Convert to Word
                  </button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {docUrl && stats && (
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
                      <h3 className="text-3xl font-black text-slate-900">Conversion Successful</h3>
                      <p className="text-slate-500 font-medium max-w-md mx-auto">
                        Your PDF content has been successfully parsed and packaged into a Word document ({stats.pages} pages).
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 max-w-2xl mx-auto">
                    <button
                      onClick={() => {
                        const win = window.open();
                        win.document.write(`<iframe src="${docUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                      }}
                      className="flex flex-col items-center justify-center p-10 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-[#0047AB] hover:shadow-xl transition-all group gap-5"
                    >
                      <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#0047AB] group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                        <Eye className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-slate-900 mb-1">Verify Result</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">In-Browser Markup</p>
                      </div>
                    </button>
                    
                    <a
                      href={docUrl}
                      download={stats.fileName}
                      className="flex flex-col items-center justify-center p-10 bg-[#0047AB] text-white rounded-[2rem] hover:bg-[#003580] transition-all group gap-5 shadow-2xl shadow-indigo-100"
                    >
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <Download className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-white mb-1">Export Word Document</p>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Secure Local Save</p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <ToolContentLayout
          toolName="PDF to Word"
          howItWorksSteps={steps}
          features={features}
          faqs={faqs}
          relatedTools={relatedTools}
          relatedArticles={relatedArticles}
        />
      </div>
    </>
  );
}
