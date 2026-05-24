import { motion } from "framer-motion";
import { ShieldCheck, Cookie, Info, CheckCircle2, AlertCircle } from "lucide-react";
import SEO from "../components/SEO";

export default function Cookies() {
  return (
    <>
      <SEO 
        title="Cookie Policy"
        description="Learn how iFlexPDF uses cookies and local browser storage to manage preferences and process documents securely."
        keywords="cookies policy, local storage, browser sandboxing, privacy compliance, secure document tools"
      />
      <div className="container-professional space-y-24 py-16 md:py-24">
        {/* Page Header */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="badge-professional"
          >
            <Cookie className="w-3.5 h-3.5 text-indigo-600" />
            <span>Compliance Directive</span>
          </motion.div>
          <h1 className="h2-classic md:text-6xl max-w-4xl mx-auto">
            Cookie & Local Storage <span className="text-indigo-600">Policy</span>
          </h1>
          <p className="p-classic max-w-2xl mx-auto text-[15px] md:text-lg">
            We prioritize your transparency. Learn how we use local storage and basic session elements to provide a seamless, secure PDF experience.
          </p>
        </div>

        <div className="space-y-16 max-w-4xl mx-auto">
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-2xl text-indigo-600">
                <Info className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-indigo-950 tracking-tight">1. What Are Cookies & Local Storage?</h2>
            </div>
            <p className="text-slate-500 leading-relaxed font-semibold text-[17px]">
              Cookies are small text files stored by your browser when you visit a website. 
              **Local Storage** is a modern browser technology that allows websites to store larger amounts of data directly on your device, which is never transmitted over the internet to any server. 
              Because iFlexPDF is a 100% local-first tool suite, we rely on Local Storage to maintain your options and cache files temporarily within active RAM.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-2xl text-indigo-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-indigo-950 tracking-tight">2. How We Utilize Cookies</h2>
            </div>
            <p className="text-slate-500 leading-relaxed font-semibold text-[17px]">
              Unlike other platforms, **we do not use tracking or targeting cookies** for behavioral marketing or advertisement tracking. Any storage is strictly functional:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <CookieCard 
                title="Strictly Necessary Storage" 
                desc="Used to hold temporary file arrays and operational status while you execute PDF operations. Cleared automatically upon closing the tab." 
              />
              <CookieCard 
                title="Preference Storage" 
                desc="Remembers your preferences, such as selected layout coordinates, custom text watermark options, and tool interface history." 
              />
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-2xl text-indigo-600">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-indigo-950 tracking-tight">3. Manage Your Preferences</h2>
            </div>
            <p className="text-slate-500 leading-relaxed font-semibold text-[17px]">
              You can control and disable cookies or clear your Local Storage through your browser's advanced settings at any time. Note that clearing browser data will reset active document queues, but because your files never touch our servers, this action is 100% controlled locally by you.
            </p>
            <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl flex items-start gap-4 mt-6">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-[13px] font-bold text-slate-600 leading-relaxed">
                By using our platform, you acknowledge and agree to this local-first storage configuration. We remain fully committed to sovereign, secure data storage principles.
              </p>
            </div>
          </section>
        </div>

        <div className="pt-16 border-t border-indigo-50 text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] text-center">
          Document Update: May 2026
        </div>
      </div>
    </>
  );
}

function CookieCard({ title, desc }) {
  return (
    <div className="p-8 border border-slate-100 rounded-3xl bg-white shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex flex-col gap-3">
      <h4 className="font-black text-lg text-indigo-950">{title}</h4>
      <p className="text-slate-400 text-sm font-semibold leading-relaxed">{desc}</p>
    </div>
  );
}
