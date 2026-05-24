import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, ServerOff, CheckCircle2 } from "lucide-react";

export default function Privacy() {
  return (
    <div className="container-professional space-y-24 py-16 md:py-24">
      {/* Page Header */}
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="badge-professional"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>Privacy-Centric Architecture</span>
        </motion.div>
        <h1 className="h2-classic md:text-6xl max-w-4xl mx-auto">Privacy & Data <span className="text-indigo-600">Protection Strategy</span></h1>
        <p className="p-classic max-w-2xl mx-auto text-[15px] md:text-lg">
          At iFlexPDF Professional, we implement a zero-trust model where your documents
          belong exclusively to you. Our architecture ensures complete local isolation.
        </p>
      </div>

      <div className="space-y-24 max-w-5xl mx-auto">
        <section className="space-y-10">
          <div className="flex items-center gap-6">
            <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-3xl shadow-inner text-indigo-600">
              <ServerOff className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black text-indigo-950 tracking-tight">Decentralized Processing</h2>
          </div>
          <div className="prose prose-slate max-w-none text-slate-500 text-[17px] leading-relaxed space-y-8 font-semibold">
            <p>
              Traditional PDF utilities operate on a client-server model, requiring sensitive
              documents to be uploaded to external infrastructure. This introduces
              significant vulnerabilities for enterprise-grade security protocols.
            </p>
            <div className="p-8 bg-indigo-50/50 border border-indigo-100 rounded-3xl text-indigo-950 font-black">
              iFlexPDF utilizes an isolated execution environment. By leveraging WebAssembly,
              we process documents directly within your browser's allocated memory.
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0 m-0">
              <PrivacyItem text="Absolute Zero Server Uploads" />
              <PrivacyItem text="Non-Persistent Memory Storage" />
              <PrivacyItem text="Local Hardware Execution" />
              <PrivacyItem text="Session-Based Disposal" />
            </ul>
          </div>
        </section>

        <section className="space-y-10">
          <div className="flex items-center gap-6">
            <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-3xl shadow-inner text-indigo-600">
              <EyeOff className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black text-indigo-950 tracking-tight">Data Integrity</h2>
          </div>
          <p className="text-slate-500 text-[17px] leading-relaxed font-semibold">
            We adhere to a strict non-collection policy. Our platform does not implement tracking
            cookies for behavioral marketing. High-level usage metrics may be logged for
            service optimization, but these identifiers are completely decoupled from
            your document metadata or content.
          </p>
        </section>

        <div className="p-12 md:p-16 bg-indigo-950 text-white rounded-[3rem] space-y-8 relative overflow-hidden shadow-2xl shadow-indigo-100">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <h3 className="text-3xl font-black flex items-center gap-4 relative z-10">
            <Lock className="w-8 h-8 text-indigo-400" />
            Enterprise Encryption
          </h3>
          <p className="text-indigo-200 leading-relaxed font-semibold text-lg relative z-10">
            By keeping data resident on your local machine, the threat surface of
            interception or server-side breaches is eliminated. You maintain
            sovereign control over your document assets at all times.
          </p>
        </div>
      </div>
    </div>
  );
}

function PrivacyItem({ text }) {
  return (
    <div className="flex items-center gap-4 p-5 bg-white border border-indigo-50 rounded-2xl shadow-sm group hover:border-indigo-100 transition-all">
      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
      <span className="font-black text-indigo-900 text-sm">{text}</span>
    </div>
  );
}
