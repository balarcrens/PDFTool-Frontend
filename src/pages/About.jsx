import { motion } from "framer-motion";
import { ShieldCheck, Zap, Heart, Globe, Users, Award } from "lucide-react";

export default function About() {
  return (
    <div className="container-professional space-y-24 py-16 md:py-24">
      {/* Page Header */}
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="badge-professional"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>Established 2024</span>
        </motion.div>
        <h1 className="h2-classic md:text-6xl max-w-4xl mx-auto">
          Defining the Future of <span className="text-indigo-600">Document Productivity</span>
        </h1>
        <p className="p-classic max-w-2xl mx-auto text-[15px] md:text-lg">
          iFlexPDF Professional is dedicated to providing high-fidelity, secure, and 
          unrestricted document utilities for the modern enterprise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 rounded-3xl flex items-center justify-center shadow-inner">
            <ShieldCheck className="w-10 h-10 text-indigo-600" />
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-indigo-950 tracking-tight">Privacy Architecture</h3>
            <p className="text-indigo-950/60 leading-relaxed font-semibold">
              Our infrastructure is built on a <span className="text-indigo-600">100% local-first</span> architecture. Unlike conventional platforms, 
              your documents never leave the secure environment of your browser, ensuring absolute 
              confidentiality for sensitive enterprise data.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 rounded-3xl flex items-center justify-center shadow-inner">
            <Zap className="w-10 h-10 text-indigo-600" />
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-indigo-950 tracking-tight">Performance Excellence</h3>
            <p className="text-indigo-950/60 leading-relaxed font-semibold">
              By utilizing advanced browser-native rendering and WebAssembly, we eliminate the latency 
              of cloud uploads. Experience instantaneous processing for complex, multi-page documents 
              without any bandwidth constraints.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-indigo-950 rounded-[3rem] p-16 md:p-20 relative overflow-hidden shadow-2xl shadow-indigo-100">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative z-10">
          <div className="space-y-3">
            <div className="text-5xl font-black text-white">100%</div>
            <div className="font-bold text-indigo-400 uppercase tracking-[0.2em] text-[10px]">Client-Side Engine</div>
          </div>
          <div className="space-y-3">
            <div className="text-5xl font-black text-white">Pure</div>
            <div className="font-bold text-indigo-400 uppercase tracking-[0.2em] text-[10px]">Zero Tracking</div>
          </div>
          <div className="space-y-3">
            <div className="text-5xl font-black text-white">Ultra</div>
            <div className="font-bold text-indigo-400 uppercase tracking-[0.2em] text-[10px]">Fast Rendering</div>
          </div>
        </div>
      </div>

      <div className="space-y-16 text-center pb-12">
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-indigo-950 tracking-tight">Our Core Principles</h2>
          <p className="text-indigo-400 font-black text-[10px] uppercase tracking-widest">The values that drive our engineering</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <ValueCard icon={<Heart className="w-6 h-6" />} title="User-Centric" description="We prioritize the needs of professional users in every feature we build." />
          <ValueCard icon={<Globe className="w-6 h-6" />} title="Accessibility" description="Elite document tools should be accessible to everyone, everywhere." />
          <ValueCard icon={<Award className="w-6 h-6" />} title="Quality" description="We strive for pixel-perfect fidelity in every conversion and modification." />
        </div>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, description }) {
  return (
    <div className="p-10 border border-indigo-50 rounded-[2.5rem] bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col items-center text-center group">
      <div className="text-indigo-300 mb-6 bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">{icon}</div>
      <h4 className="font-black text-xl mb-3 text-indigo-950">{title}</h4>
      <p className="text-indigo-950/60 text-sm leading-relaxed font-semibold">{description}</p>
    </div>
  );
}
