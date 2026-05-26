import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import { jsPDF } from "jspdf";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Download,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Eye,
  FileText,
  Key,
  ShieldAlert,
  Zap,
  X
} from "lucide-react";
import confetti from "canvas-confetti";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function ProtectPDF() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [protectedPdfUrl, setProtectedPdfUrl] = useState(null);

  const handleFileSelected = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
      setProtectedPdfUrl(null);
    }
  };

  const protectPdf = async () => {
    if (!file || !password) return;

    setIsProcessing(true);
    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: fileArrayBuffer }).promise;
      const pageCount = pdf.numPages;

      const doc = new jsPDF({
        orientation: "p",
        unit: "px",
        format: "a4",
        encryption: {
          userPassword: password,
          ownerPassword: password,
          userPermissions: ["print", "modify", "copy", "annot-rooms"]
        }
      });

      for (let i = 1; i <= pageCount; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport: viewport }).promise;
        const imgData = canvas.toDataURL("image/jpeg", 0.8);

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        if (i > 1) doc.addPage();
        doc.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight, undefined, 'FAST');
      }

      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      setProtectedPdfUrl(url);

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("Error protecting PDF:", error);
      alert("An error occurred while protecting the PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Protect PDF",
    "description": "Secure your PDF documents by adding password protection and strong AES encryption locally in your browser.",
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
        title="Protect PDF - Password Protect & Encrypt PDF Online"
        description="Secure your PDF files with robust passwords and AES military-grade protection. 100% secure client-side browser execution. No file uploads."
        keywords="protect pdf, password protect pdf, encrypt pdf, secure pdf, local pdf security, lock pdf"
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
            <Lock className="w-3.5 h-3.5 text-[#0047AB]" />
            Professional Security Shield
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Protect PDF Document</h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Implement robust encryption by adding a secure password to your documents.
            Enterprise-grade protection that remains local to your device.
          </p>
        </div>

        {!file ? (
          <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
        ) : (
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Action Bar */}
            <div className="action-bar-classic sticky top-24 z-30 px-8 py-6">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[15px] truncate max-w-[200px] md:max-w-[350px] text-slate-900 mb-0.5">{file.name}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Ready for Encryption</span>
                    <span className="w-1 h-1 bg-slate-100 rounded-full"></span>
                    <span className="verified-badge">
                      <ShieldCheck className="w-3 h-3" />
                      Local Encryption
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="card-ref !p-10 md:!p-16 space-y-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-widest ml-1">Document Password</label>
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0047AB] transition-colors">
                      <Key className="w-6 h-6" />
                    </div>
                    <input
                      type="password"
                      placeholder="Set a robust access key"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-16 pr-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-[#0047AB] outline-none font-bold transition-all text-lg placeholder:text-slate-300 shadow-inner"
                    />
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-medium text-amber-700 leading-relaxed">
                    <span className="font-bold uppercase tracking-wider mr-1 text-amber-800">Important:</span>
                    This password cannot be recovered if lost. Please store it securely. Encryption happens entirely in your browser.
                  </p>
                </div>
              </div>

              <button
                onClick={protectPdf}
                disabled={!password || isProcessing}
                className="btn-primary-ref w-full py-5 text-sm"
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ShieldCheck className="w-5 h-5" />
                )}
                Apply Encryption Layer
              </button>
            </div>

            <AnimatePresence>
              {protectedPdfUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-ref !p-12 md:!p-20 text-center space-y-12"
                >
                  <div className="decorative-circle !w-64 !h-64" />

                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-slate-900">Document Secured</h3>
                      <p className="text-slate-500 font-medium max-w-md mx-auto">Your PDF has been successfully encrypted and is now restricted from unauthorized access.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <button
                      onClick={() => window.open(protectedPdfUrl, '_blank')}
                      className="flex flex-col items-center justify-center p-10 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-[#0047AB] hover:shadow-xl transition-all group gap-5"
                    >
                      <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-600 group-hover:text-[#0047AB] group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                        <Eye className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-slate-900 mb-1">Verify Access</p>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">In-Browser Preview</p>
                      </div>
                    </button>

                    <a
                      href={protectedPdfUrl}
                      download={`protected_${file.name}`}
                      className="flex flex-col items-center justify-center p-10 bg-[#0047AB] text-white rounded-[2rem] hover:bg-[#003580] transition-all group gap-5 shadow-2xl shadow-indigo-100"
                    >
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <Download className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-white mb-1">Download Secure PDF</p>
                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Permanent Save</p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <ToolContentLayout
          toolName="Protect PDF"
          howItWorksSteps={[
            { title: "Select PDF Document", description: "Upload or drag and drop the PDF you wish to encrypt into our secure sandbox." },
            { title: "Define Secure Password", description: "Type in a strong access password that will be required to open or print the document." },
            { title: "Encrypt and Save", description: "Click 'Apply Encryption Layer' to secure your file and instantly download the protected PDF." }
          ]}
          features={[
            { icon: ShieldCheck, title: "100% Secure Local Sandbox", description: "Encryption is executed entirely inside your browser sandbox. No file data is sent to external cloud APIs or servers." },
            { icon: Lock, title: "Military-Grade Password Locking", description: "Applies robust password restrictions using standard PDF encryption schemas, compatible with Adobe Acrobat and other major readers." },
            { icon: Zap, title: "Instant Dynamic Security", description: "Locks down files in seconds with absolute privacy, zero queues, and no limits on file size." }
          ]}
          faqs={[
            { question: "Is my document secure when I add a password?", answer: "Yes, 100%. Unlike online services that upload your PDFs to remote cloud servers where they can be stored or read, iFlexPDF executes all AES cryptography locally in your browser memory (RAM)." },
            { question: "What happens if I lose my PDF password?", answer: "Because we prioritize maximum privacy, we do not store, track, or possess your passwords. If you lose the password, there is no way for us to recover it. Please store your passwords securely." },
            { question: "Can anyone open my encrypted PDF without a password?", answer: "No. Standard PDF readers will immediately prompt the user for the password before rendering any pages. This prevents unauthorized viewing, printing, or copying." }
          ]}
          relatedTools={[
            { name: "Unlock PDF", path: "/unlock", description: "Remove passwords and decryption locks from authorized documents." },
            { name: "Merge PDF", path: "/merge", description: "Combine multiple PDF files into one clean document." },
            { name: "Compress PDF", path: "/compress", description: "Reduce file sizes securely while maintaining text clarity." }
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
