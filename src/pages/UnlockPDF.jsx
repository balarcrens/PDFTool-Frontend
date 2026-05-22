import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileUploader from "../components/FileUploader";
import SEO from "../components/SEO";
import ToolContentLayout from "../components/ToolContentLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Unlock,
  Download,
  Loader2,
  CheckCircle2,
  Lock,
  ArrowRight,
  Eye,
  FileText,
  Key,
  ShieldAlert,
  ShieldCheck,
  Zap,
  X
} from "lucide-react";
import { cn } from "../lib/utils";
import confetti from "canvas-confetti";

export default function UnlockPDF() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [unlockedPdfUrl, setUnlockedPdfUrl] = useState(null);

  const handleFileSelected = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
      setUnlockedPdfUrl(null);
    }
  };

  const unlockPdf = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const fileArrayBuffer = await file.arrayBuffer();

      // Load the PDF with the provided password
      const pdfDoc = await PDFDocument.load(fileArrayBuffer, {
        password: password,
        ignoreEncryption: false
      });

      // Saving it without a password effectively unlocks it
      const unlockedBytes = await pdfDoc.save();
      const blob = new Blob([unlockedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setUnlockedPdfUrl(url);

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("Error unlocking PDF:", error);
      alert("Invalid password or unsupported encryption. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Unlock PDF",
    "description": "Unlock secure PDF files and remove passwords and restricted layers locally in your browser sandbox.",
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
        title="Unlock PDF - Remove Password & Restrictions Online"
        description="Decrypt and unlock secure PDF documents by removing passwords, printing locks, and copy restrictions. 100% secure client-side browser execution. No file uploads."
        keywords="unlock pdf, remove pdf password, decrypt pdf, unlock pdf restrictions, local pdf unlocker"
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
            <Unlock className="w-3.5 h-3.5 text-[#0047AB]" />
            Professional Security Suite
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Unlock PDF Restrictions</h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Remove encryption and password protection from your PDF documents safely.
            Restore complete accessibility with enterprise-grade local processing.
          </p>
        </div>

        {!file ? (
          <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
        ) : (
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Action Bar */}
            <div className="action-bar-classic sticky top-24 z-30 px-8 py-6">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[15px] truncate max-w-[200px] md:max-w-[350px] text-slate-900 mb-0.5">{file.name}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protected Document</span>
                    <span className="w-1 h-1 bg-slate-100 rounded-full"></span>
                    <span className="verified-badge">
                      <ShieldCheck className="w-3 h-3" />
                      Secure Environment
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0047AB] transition-colors">
                      <Key className="w-6 h-6" />
                    </div>
                    <input
                      type="password"
                      placeholder="Enter document access key"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-16 pr-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-[#0047AB] outline-none font-bold transition-all text-lg placeholder:text-slate-300 shadow-inner"
                    />
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <ShieldAlert className="w-5 h-5 text-[#0047AB] shrink-0 mt-0.5" />
                  <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                    <span className="font-bold uppercase tracking-wider mr-1 text-slate-900">Note:</span>
                    You must possess the authorized password to remove security layers. Processing occurs entirely within your browser for maximum privacy.
                  </p>
                </div>
              </div>

              <button
                onClick={unlockPdf}
                disabled={!password || isProcessing}
                className="btn-primary-ref w-full py-5 text-sm"
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Unlock className="w-5 h-5" />
                )}
                Unlock & Decrypt
              </button>
            </div>

            <AnimatePresence>
              {unlockedPdfUrl && (
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
                      <h3 className="text-3xl font-black text-slate-900">Document Decrypted</h3>
                      <p className="text-slate-500 font-medium max-w-md mx-auto">Password protection has been successfully removed. Your document is now fully accessible.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <button
                      onClick={() => window.open(unlockedPdfUrl, '_blank')}
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
                      href={unlockedPdfUrl}
                      download={`unlocked_${file.name}`}
                      className="flex flex-col items-center justify-center p-10 bg-[#0047AB] text-white rounded-[2rem] hover:bg-[#003580] transition-all group gap-5 shadow-2xl shadow-indigo-100"
                    >
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 duration-300 transition-all shadow-lg">
                        <Download className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-white mb-1">Export PDF File</p>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Unrestricted Save</p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <ToolContentLayout
          toolName="Unlock PDF"
          howItWorksSteps={[
            { title: "Select Protected PDF", description: "Upload or drag your encrypted PDF document into our secure environment." },
            { title: "Provide Document Key", description: "Enter the current valid password corresponding to the document protection layer." },
            { title: "Decrypt and Export", description: "Click 'Unlock & Decrypt' to instantly remove password protection and download your unlocked PDF file." }
          ]}
          features={[
            { icon: ShieldCheck, title: "100% Secure Local Decryption", description: "Decryption is processed completely locally within active browser memory. Your password and data are never sent to a backend server." },
            { icon: Unlock, title: "Instant Password Removal", description: "Instantly strip standard PDF user passwords, owner passwords, and print/copy locks." },
            { icon: Zap, title: "Uncapped Batch Accessibility", description: "Unlock unlimited protected PDFs on demand. No accounts, fees, or daily processing limitations." }
          ]}
          faqs={[
            { question: "Can PDFTool unlock any PDF without knowing the password?", answer: "No. This tool respects copyright and privacy boundaries. It operates as an authorized decrypter. To successfully strip security layers and unlock a document, you must possess and enter its original valid password." },
            { question: "Is my password or file metadata logged?", answer: "Never. All parsing and decryption are executed on your client device inside your browser sandbox. PDFTool does not maintain database records, telemetry tracking, or external logging systems." },
            { question: "Does unlocking a PDF preserve the formatting and text?", answer: "Absolutely. Unlocking does not modify layout nodes, fonts, or image data. It simply updates the security metadata dictionaries of the PDF structure to make the page contents fully accessible." }
          ]}
          relatedTools={[
            { name: "Protect PDF", path: "/protect", description: "Encrypt your PDF documents with custom secure passwords." },
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
