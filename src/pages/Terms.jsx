import { motion } from "framer-motion";
import { FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function Terms() {
  return (
    <div className="container-professional space-y-24 py-16 md:py-24">
      {/* Page Header */}
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="badge-professional"
        >
          <FileText className="w-3.5 h-3.5 text-indigo-600" />
          <span>Operational Framework</span>
        </motion.div>
        <h1 className="h2-classic md:text-6xl max-w-4xl mx-auto">Terms of <span className="text-indigo-600">Service</span></h1>
        <p className="p-classic max-w-2xl mx-auto text-[15px] md:text-lg">
          The transparent legal framework governing your utilization of the PDFTool 
          Professional ecosystem.
        </p>
      </div>

      <div className="space-y-16 max-w-4xl mx-auto">
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-indigo-950 tracking-tight">1. Acceptable Utilization</h2>
          <p className="text-slate-500 leading-relaxed font-semibold text-[17px]">
            By accessing PDFTool Professional, you agree to utilize the platform exclusively 
            for legitimate purposes. Users maintain total sovereignty and responsibility 
            for processed content. Unauthorized distribution of restricted assets or 
            malicious code is strictly prohibited.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black text-indigo-950 tracking-tight">2. Service Continuity</h2>
          <p className="text-slate-500 leading-relaxed font-semibold text-[17px]">
            While we maintain a high-availability infrastructure, the service is provided 
            on an "as is" and "as available" basis. We reserve the right to perform 
            system optimizations without prior notification to ensure long-term 
            platform stability.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black text-indigo-950 tracking-tight">3. Limitation of Liability</h2>
          <div className="p-10 bg-indigo-50/50 border border-indigo-100 rounded-[2.5rem] flex items-start gap-6 shadow-inner">
            <AlertCircle className="w-10 h-10 text-indigo-600 flex-shrink-0 mt-1" />
            <p className="text-indigo-950 font-black leading-relaxed">
              PDFTool Professional and its contributors assume zero liability for direct, 
              indirect, or consequential damages resulting from document processing 
              errors or temporary service interruptions.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black text-indigo-950 tracking-tight">4. Regulatory Updates</h2>
          <p className="text-slate-500 leading-relaxed font-semibold text-[17px]">
            We reserve the right to refine these operational terms at our discretion. 
            Continued engagement with the platform signifies acceptance of the 
            latest legal revisions.
          </p>
        </section>
      </div>

      <div className="pt-16 border-t border-indigo-50 text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] text-center">
        Protocol Revision Date: May 10, 2024
      </div>
    </div>
  );
}
