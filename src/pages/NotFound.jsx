import { motion } from "framer-motion";
import { Search, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-professional min-h-[70vh] flex flex-col items-center justify-center text-center space-y-12 py-24">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[12rem] md:text-[16rem] font-black text-indigo-50 leading-none select-none"
        >
          404
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-24 h-24 bg-white rounded-3xl border border-indigo-50 shadow-2xl flex items-center justify-center text-indigo-600">
            <Search className="w-12 h-12" />
          </div>
        </motion.div>
      </div>

      <div className="space-y-6 relative z-10 max-w-lg">
        <h1 className="h2-classic">Resource Not Found</h1>
        <p className="p-classic text-lg">
          The document or utility you are searching for does not exist in our current
          directory. It may have been moved or the URL might be incorrect.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
        <Link
          to="/"
          className="btn-primary py-4 px-10 flex items-center gap-3 shadow-indigo-100 group"
        >
          <Home className="w-5 h-5" />
          Return to Dashboard
        </Link>
        <button
          onClick={() => window.history.back()}
          className="btn-secondary py-4 px-10 flex items-center gap-3"
        >
          <ArrowLeft className="w-5 h-5" />
          Previous Page
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/30 blur-[120px] rounded-full -z-10"></div>
    </div>
  );
}
