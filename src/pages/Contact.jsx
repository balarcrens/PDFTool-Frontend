import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="container-professional py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="space-y-16">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-professional"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
              <span>Direct Support Channel</span>
            </motion.div>
            <h1 className="h2-classic md:text-6xl text-left">
              Expert Support for <span className="text-indigo-600">Complex Documents</span>
            </h1>
            <p className="p-classic text-left max-w-xl mx-0 text-lg">
              Have technical inquiries or enterprise feedback? Our specialized support team
              is available to assist with your PDF workflows.
            </p>
          </div>

          <div className="space-y-6">
            <ContactInfo
              icon={<Mail className="w-6 h-6" />}
              title="Official Communications"
              detail="support@iFlexPDF.pro"
              description="Enterprise-grade support"
            />
            <ContactInfo
              icon={<MessageSquare className="w-6 h-6" />}
              title="Knowledge Base"
              detail="Community Portal"
              description="Collaborative intelligence"
            />
            <ContactInfo
              icon={<MapPin className="w-6 h-6" />}
              title="Global HQ"
              detail="Secure Distributed Cloud"
              description="Available 24/7/365"
            />
          </div>
        </div>

        <div className="bg-white p-12 md:p-16 rounded-[3rem] border border-indigo-50 shadow-2xl shadow-indigo-100/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20"
            >
              <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center shadow-inner">
                <Send className="w-12 h-12 text-emerald-600" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-indigo-950">Protocol Dispatched</h2>
                <p className="text-indigo-950/60 font-semibold max-w-xs mx-auto">Your communication has been securely transmitted. Expect a response within our SLA.</p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] hover:text-indigo-950 transition-colors"
              >
                Dispatch New Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-indigo-300 ml-1">Identity</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Alexander Hamilton"
                    className="w-full px-8 py-5 rounded-2xl bg-indigo-50/30 border border-indigo-50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-bold text-indigo-950 placeholder:text-indigo-200 shadow-inner"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-indigo-300 ml-1">Corporate Email</label>
                  <input
                    required
                    type="email"
                    placeholder="alex@enterprise.pro"
                    className="w-full px-8 py-5 rounded-2xl bg-indigo-50/30 border border-indigo-50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-bold text-indigo-950 placeholder:text-indigo-200 shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-300 ml-1">Department</label>
                <select className="w-full px-8 py-5 rounded-2xl bg-indigo-50/30 border border-indigo-50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-black text-indigo-950 shadow-inner appearance-none cursor-pointer">
                  <option>Technical Inquiries</option>
                  <option>Feature Development</option>
                  <option>Data Security & Privacy</option>
                  <option>Strategic Partnerships</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-300 ml-1">Message Brief</label>
                <textarea
                  required
                  rows="5"
                  placeholder="Describe your requirements or feedback..."
                  className="w-full px-8 py-5 rounded-2xl bg-indigo-50/30 border border-indigo-50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-bold text-indigo-950 placeholder:text-indigo-200 shadow-inner resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-6 text-sm flex items-center justify-center gap-4 shadow-indigo-100"
              >
                Dispatch Message
                <Send className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ icon, title, detail, description }) {
  return (
    <div className="flex items-center gap-8 p-6 rounded-[2.5rem] bg-white border border-transparent hover:border-indigo-50 hover:bg-indigo-50/30 transition-all group">
      <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all shadow-inner">
        {icon}
      </div>
      <div>
        <h4 className="font-black text-lg text-indigo-950 mb-0.5">{title}</h4>
        <p className="text-indigo-600 font-black text-sm mb-1">{detail}</p>
        <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em]">{description}</p>
      </div>
    </div>
  );
}
