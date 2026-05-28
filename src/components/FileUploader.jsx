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
            if (!accept || accept === "*") return false;

            const acceptList = accept.split(",").map(item => item.trim());

            return !acceptList.some(criterion => {
                if (criterion.startsWith(".")) {
                    return file.name.toLowerCase().endsWith(criterion.toLowerCase());
                } else if (criterion.endsWith("/*")) {
                    const category = criterion.split("/")[0];
                    return file.type.startsWith(`${category}/`);
                } else {
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

    // Keyboard navigation support: Trigger click on Enter or Space
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
        }
    };

    return (
        <div className="w-full">
            <motion.div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                aria-label={`File uploader. ${title}. ${description}. Allowed formats: ${accept}`}
                className={cn(
                    "relative group border-2 border-dashed rounded-2xl p-6 sm:p-12 md:p-16 transition-all duration-300 flex flex-col items-center justify-center text-center outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                    isDragging
                        ? "border-blue-600 bg-blue-50/10 shadow-md scale-[1.01]"
                        : "border-slate-200 bg-white hover:border-blue-600 hover:shadow-premium-hover"
                )}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInput}
                    accept={accept}
                    multiple={multiple}
                    className="hidden"
                    tabIndex={-1}
                />

                <div className="relative mb-6 select-none" aria-hidden="true">
                    <div className="bg-blue-600 p-5 rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1 text-white">
                        <Upload className="w-8 h-8" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-emerald-600 p-1 rounded-full border-2 border-white shadow">
                        <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-2 tracking-tight text-slate-800">{title}</h3>
                <p className="text-slate-500 text-sm sm:text-base mb-8 max-w-xs mx-auto font-medium leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 text-[10.5px] font-bold text-slate-505 uppercase tracking-wider select-none" aria-hidden="true">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>{accept.includes("pdf") ? "PDF Format" : accept.includes("docx") ? "Word Support" : "Allowed files"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>100% Private</span>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-4 p-4 bg-red-50 border border-red-100/60 rounded-xl flex items-center gap-3 text-red-700"
                        role="alert"
                    >
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                        <span className="text-sm font-semibold">{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
