import React from "react";
import { motion } from "framer-motion";
import { 
  Lock, 
  ShieldCheck, 
  Cpu, 
  Trash2, 
  ShieldAlert, 
  CheckCircle2, 
  Fingerprint,
  Activity
} from "lucide-react";

const securityFeatures = [
  {
    title: "End-to-End Encryption",
    description: "Files are encrypted during transit and at rest using AES-256 standards. Only you hold the keys to access your documents.",
    icon: Lock,
    ghostIcon: Lock,
  },
  {
    title: "Local Processing",
    description: "Our advanced WebAssembly technology processes your PDFs directly in your browser. No files are uploaded to our servers.",
    icon: Cpu,
    ghostIcon: Cpu,
  },
  {
    title: "Auto-Deletion",
    description: "If you choose cloud processing, files are permanently wiped from our systems exactly 60 minutes after your task is complete.",
    icon: Trash2,
    ghostIcon: Trash2,
  }
];

const trustPoints = [
  {
    title: "GDPR & CCPA Compliant",
    description: "We strictly adhere to international data protection regulations, ensuring your privacy rights are protected globally.",
    icon: CheckCircle2,
  },
  {
    title: "No Data Mining",
    description: "We do not analyze, scan, or sell your document contents. Your business data remains your business.",
    icon: ShieldAlert,
  },
  {
    title: "Regular Audits",
    description: "Our security infrastructure undergoes rigorous penetration testing by independent cybersecurity firms quarterly.",
    icon: Activity,
  }
];

export default function Security() {
  return (
    <div className="py-20 space-y-32">
      {/* Hero Section */}
      <section className="container-professional text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-widest border border-slate-100"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          Enterprise-Grade Security
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
        >
          Your Documents, Secured.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          We process your sensitive files with zero-knowledge architecture. <br className="hidden md:block" />
          Local processing means your data never leaves your device.
        </motion.p>
      </section>

      {/* Security Feature Cards */}
      <section className="container-professional">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-10 bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500"
            >
              {/* Ghost Icon Background */}
              <feature.ghostIcon className="absolute -top-4 -right-4 w-32 h-32 text-slate-50 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-indigo-600 border border-slate-100">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="container-professional">
        <div className="bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Content */}
            <div className="p-12 md:p-20 space-y-12 bg-white">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Why Professionals Trust Us</h2>
              
              <div className="space-y-10">
                {trustPoints.map((point) => (
                  <div key={point.title} className="flex items-start gap-5">
                    <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mt-1 shrink-0">
                      <point.icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900">{point.title}</h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-md">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphic */}
            <div className="relative bg-slate-50 flex items-center justify-center p-12 md:p-20 overflow-hidden">
              {/* Decorative Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] border-2 border-dashed border-indigo-100 rounded-full animate-[spin_20s_linear_infinite]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] border-2 border-indigo-100/50 rounded-full" />
              </div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="relative w-40 h-40 bg-white rounded-full shadow-2xl flex items-center justify-center"
              >
                <div className="relative">
                  <ShieldCheck className="w-16 h-16 text-indigo-600" />
                  <motion.div 
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0047AB] rounded-full border-4 border-white flex items-center justify-center"
                  >
                    <Lock className="w-2.5 h-2.5 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
