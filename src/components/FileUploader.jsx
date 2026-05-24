import { useState, useRef } from "react";
import { Upload, FileText, AlertCircle, FileCheck, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

export default function FileUploader({ 
  onFilesSelected, 
  accept = "application/pdf", 
  multiple = true,
  maxFiles = 20,
  title = "Select files",
  description = "or drag and drop them here"
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFiles = (files) => {
    if (files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed.`);
      return false;
    }
    
    const invalidFiles = Array.from(files).filter(file => {
      // If accept is empty or *, allow all
      if (!accept || accept === "*") return false;
      
      const acceptList = accept.split(",").map(item => item.trim());
      
      return !acceptList.some(criterion => {
        if (criterion.startsWith(".")) {
          // Check extension
          return file.name.toLowerCase().endsWith(criterion.toLowerCase());
        } else if (criterion.endsWith("/*")) {
          // Check category (e.g., image/*)
          const category = criterion.split("/")[0];
          return file.type.startsWith(`${category}/`);
        } else {
          // Check exact mime type
          return file.type === criterion;
        }
      });
    });

    if (invalidFiles.length > 0) {
      setError(`Please upload files with the correct format (${accept}).`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (validateFiles(files)) {
      onFilesSelected(Array.from(files));
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (validateFiles(files)) {
      onFilesSelected(Array.from(files));
    }
  };

  return (
    <div className="w-full">
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative group cursor-pointer border-2 border-dashed rounded-[2rem] p-16 md:p-24 transition-all duration-500 flex flex-col items-center justify-center text-center",
          isDragging 
            ? "border-[#0047AB] bg-slate-50 shadow-2xl shadow-indigo-100 scale-[1.01]" 
            : "border-slate-200 hover:border-[#0047AB] hover:bg-slate-50/50 hover:shadow-xl hover:shadow-indigo-50"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept={accept}
          multiple={multiple}
          className="hidden"
        />
        
        <div className="relative mb-8">
          <div className="bg-[#0047AB] p-6 rounded-2xl shadow-2xl shadow-indigo-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <Upload className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-1.5 rounded-full border-2 border-white shadow-lg">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <h3 className="text-3xl font-black mb-3 tracking-tight text-slate-900">{title}</h3>
        <p className="text-slate-500 text-base mb-10 max-w-xs mx-auto font-medium leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full shadow-sm">
            <FileText className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>{accept.includes("pdf") ? "PDF Support" : accept.includes("docx") ? "Word Support" : "Native Files"}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full shadow-sm">
            <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted Pipeline</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-600"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-bold">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
