import React from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  X, 
  ShieldCheck, 
  Zap, 
  Files, 
  Cpu, 
  Headphones, 
  Maximize2 
} from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "/ forever",
    description: "Essential PDF tools for occasional use.",
    features: [
      { text: "Standard processing tools", included: true },
      { text: "Up to 10MB file size", included: true },
      { text: "Local secure processing", included: true },
      { text: "Batch processing", included: false },
    ],
    buttonText: "Current Plan",
    recommended: false,
  },
  {
    name: "Pro",
    price: "12",
    period: "/ month",
    description: "Unlimited power for high-output researchers and professionals.",
    features: [
      { text: "Unlimited file sizes", included: true },
      { text: "Batch processing capabilities", included: true },
      { text: "Advanced OCR extraction", included: true },
      { text: "Priority customer support", included: true },
    ],
    buttonText: "Get Pro",
    recommended: true,
  }
];

const features = [
  {
    title: "Unlimited File Sizes",
    description: "Process massive legal documents and research papers without hitting limits.",
    icon: Maximize2,
  },
  {
    title: "Batch Processing",
    description: "Apply operations to hundreds of files simultaneously to save hours of work.",
    icon: Files,
  },
  {
    title: "Advanced OCR",
    description: "Extract text from scanned documents accurately with our advanced engine.",
    icon: Cpu,
  },
  {
    title: "Priority Support",
    description: "Jump to the front of the line when you need technical assistance.",
    icon: Headphones,
  }
];

export default function Pricing() {
  return (
    <div className="py-20 space-y-32">
      {/* Hero Section */}
      <section className="container-professional text-center space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
        >
          Simple pricing for professional <br className="hidden md:block" /> workflows.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-500 font-medium max-w-2xl mx-auto"
        >
          Secure, local processing power. Choose the plan that fits your volume.
        </motion.p>
      </section>

      {/* Pricing Cards */}
      <section className="container-professional">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={`relative p-10 rounded-[2rem] border-2 transition-all duration-300 ${
                plan.recommended 
                  ? "border-[#0047AB] bg-white shadow-2xl shadow-indigo-100" 
                  : "border-slate-100 bg-white"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0047AB] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Recommended
                </div>
              )}
              
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-slate-900">${plan.price}</span>
                    <span className="text-slate-400 font-medium">{plan.period}</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium pt-4 border-t border-slate-50">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-[#0047AB]" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300" />
                      )}
                      <span className={feature.included ? "text-slate-700" : "text-slate-400"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    plan.recommended 
                      ? "bg-[#0047AB] text-white hover:bg-[#003580] shadow-lg shadow-indigo-200" 
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container-professional space-y-16">
        <h2 className="text-3xl font-bold text-slate-900 text-center">Everything you need to work faster</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card-ref">
              <div className="decorative-circle" />
              <div className="w-10 h-10 bg-slate-100/70 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-[17px] font-bold mb-2 text-slate-900">{feature.title}</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container-professional pb-20">
        <div className="overflow-hidden border border-slate-100 rounded-[2rem] bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-8 text-sm font-bold text-slate-900 border-b border-slate-100">Feature Overview</th>
                <th className="p-8 text-sm font-bold text-slate-500 text-center border-b border-slate-100">Free</th>
                <th className="p-8 text-sm font-bold text-[#0047AB] text-center border-b border-slate-100 bg-[#F1F5FF]/30">Pro</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              <ComparisonRow label="Maximum File Size" free="10 MB" pro="Unlimited" />
              <ComparisonRow label="Files per operation" free="1" pro="Unlimited" />
              <ComparisonRow label="Local Encryption" free={true} pro={true} />
              <ComparisonRow label="Batch Processing" free={false} pro={true} />
              <ComparisonRow label="OCR Extraction" free={false} pro={true} />
              <ComparisonRow label="Customer Support" free="Community" pro="Priority Email" />
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ComparisonRow({ label, free, pro }) {
  const renderValue = (val) => {
    if (typeof val === "boolean") {
      return val ? (
        <Check className="w-5 h-5 text-[#0047AB] mx-auto" />
      ) : (
        <div className="h-0.5 w-4 bg-slate-200 mx-auto rounded-full" />
      );
    }
    return val;
  };

  return (
    <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
      <td className="p-8 text-slate-700">{label}</td>
      <td className="p-8 text-slate-500 text-center">{renderValue(free)}</td>
      <td className="p-8 text-slate-900 font-bold text-center bg-[#F1F5FF]/10">{renderValue(pro)}</td>
    </tr>
  );
}
