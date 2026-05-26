import { motion } from "framer-motion";
import { AlertTriangle, Mail, ShieldAlert, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";

export default function Disclaimer() {
  return (
    <>
      <SEO
        title="Disclaimer & DMCA Policy"
        description="Review the legal disclaimer, liability boundaries, and DMCA copyright reporting procedures for iFlexPDF."
        keywords="legal disclaimer, DMCA policy, copyright infringement, document liability, client-side tools"
      />
      <div className="container-professional space-y-24 py-16 md:py-24">
        {/* Page Header */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="badge-professional"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
            <span>Legal Framework</span>
          </motion.div>
          <h1 className="h2-classic md:text-6xl max-w-4xl mx-auto">
            Disclaimer & <span className="text-indigo-600">DMCA Policy</span>
          </h1>
          <p className="p-classic max-w-2xl mx-auto text-[15px] md:text-lg">
            Important legal clarifications regarding services, liability exemptions, and copyright reporting protocols at iFlexPDF.
          </p>
        </div>

        <div className="space-y-16 max-w-4xl mx-auto">
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-50 border border-amber-100 p-3 rounded-2xl text-amber-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-indigo-950 tracking-tight">1. General Disclaimer</h2>
            </div>
            <p className="text-slate-500 leading-relaxed font-semibold text-[17px]">
              iFlexPDF is a software suite providing file conversion, organization, and encryption features.
              **All operations are executed entirely client-side** inside the user's browser via high-performance JavaScript engines.
              We do not possess, store, host, or monitor the documents you process. Consequently, we take zero responsibility for the content of your documents, their confidentiality, or any outcomes stemming from their modification.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-2xl text-indigo-600">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-indigo-950 tracking-tight">2. DMCA & Copyright Policy</h2>
            </div>
            <p className="text-slate-500 leading-relaxed font-semibold text-[17px]">
              Because **our servers do not upload, host, transmit, or cache any user documents**, it is technically impossible for copyright-infringing materials to exist on our servers.
              However, we highly respect intellectual property rights. If you believe our platform's software or assets infringe upon your copyright, you may submit a formal notification containing:
            </p>
            <ul className="space-y-4 pt-2">
              <DocItem text="Identification of the copyrighted work claimed to have been infringed." />
              <DocItem text="A clear identification of the material on our website that you claim is infringing." />
              <DocItem text="Your contact details, including a valid email address and phone number." />
              <DocItem text="A statement that you have a good faith belief that use of the material is unauthorized." />
            </ul>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-2xl text-indigo-600">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-indigo-950 tracking-tight">3. Contacting Our Legal Department</h2>
            </div>
            <p className="text-slate-500 leading-relaxed font-semibold text-[17px]">
              For all legal, copyright, and DMCA inquiries, please contact us immediately. We will investigate any complaints promptly.
            </p>
            <div className="p-8 bg-indigo-950 text-white rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-100 mt-6">
              <div>
                <h4 className="text-xl font-black mb-1">Legal Support Desk</h4>
                <p className="text-indigo-300 text-xs font-bold uppercase tracking-wider">Average response time: &lt; 24 Hours</p>
              </div>
              <a
                href="mailto:iflexpdf@gmail.com"
                className="px-8 py-3.5 bg-white text-indigo-950 font-black rounded-xl hover:bg-indigo-50 transition-all text-sm shadow-md"
              >
                iflexpdf@gmail.com
              </a>
            </div>
          </section>
        </div>

        <div className="pt-16 border-t border-indigo-50 text-xs font-black text-indigo-300 uppercase tracking-[0.2em] text-center">
          Document Update: May 2026
        </div>
      </div>
    </>
  );
}

function DocItem({ text }) {
  return (
    <div className="flex items-start gap-4 p-4 border border-slate-50 rounded-2xl bg-white shadow-sm hover:border-slate-100 transition-all">
      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
      <span className="font-semibold text-slate-500 text-sm leading-relaxed">{text}</span>
    </div>
  );
}
