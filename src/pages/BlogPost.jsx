/* eslint-disable no-unused-vars */
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogArticles } from "../data/blogArticles";
import SEO from "../components/SEO";
import { ArrowLeft, Clock, ChevronRight, Share2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import AdSense from "../components/AdSense";

export default function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const article = blogArticles.find(art => art.slug === slug);

    if (!article) {
        return (
            <div className="container-professional py-32 text-center space-y-6">
                <h1 className="text-4xl font-black text-slate-800">Article Not Found</h1>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">
                    The article you are looking for does not exist or has been relocated to another address.
                </p>
                <Link to="/blog" className="btn-primary-ref px-8 inline-flex">
                    Back to Blog List
                </Link>
            </div>
        );
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.subtitle || article.excerpt,
                url: window.location.href,
            })
                .catch((error) => {
                    console.warn("Native sharing cancelled or failed:", error);
                });
        } else {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Determine relevant tool CTA based on categories/tags
    const getToolCTA = () => {
        const titleLower = article.title.toLowerCase();
        if (titleLower.includes("compress") || titleLower.includes("size")) {
            return { name: "Compress PDF", path: "/compress", desc: "Shrink your document securely now." };
        } else if (titleLower.includes("merge") || titleLower.includes("combine")) {
            return { name: "Merge PDF", path: "/merge", desc: "Combine multiple documents in seconds." };
        } else if (titleLower.includes("word") || titleLower.includes("docx")) {
            return { name: "PDF to Word", path: "/pdf-to-word", desc: "Extract PDF structure into an editable Word document." };
        } else if (titleLower.includes("student") || titleLower.includes("grades")) {
            return { name: "Explore All Tools", path: "/", desc: "Open our complete browser-local suite." };
        }
        return { name: "Compress PDF", path: "/compress", desc: "Start optimizing your records locally." };
    };

    const toolCTA = getToolCTA();

    const blogPostSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.subtitle,
        "author": {
            "@type": "Person",
            "name": article.author
        },
        "datePublished": article.date,
        "genre": article.category,
        "publisher": {
            "@type": "Organization",
            "name": "iFlexPDF"
        }
    };

    return (
        <>
            <SEO
                title={article.title}
                description={article.subtitle || article.excerpt}
                keywords={article.tags.join(", ")}
                schemaData={blogPostSchema}
            />

            <div className="container-professional py-16 md:py-24">

                {/* Back and Share Panel */}
                <div className="max-w-3xl mx-auto flex items-center justify-between mb-12">
                    <button
                        onClick={() => navigate("/blog")}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-sm"
                    >
                        <ArrowLeft className="w-4.5 h-4.5" />
                        <span>Back to Insights</span>
                    </button>

                    <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 text-slate-600 rounded-xl transition-all font-bold text-xs"
                    >
                        <Share2 className="w-4 h-4" />
                        <span>{copied ? "Link Copied!" : "Share Article"}</span>
                    </button>
                </div>

                {/* Semantic Article */}
                <article className="max-w-3xl mx-auto space-y-12">

                    {/* Header Block */}
                    <header className="space-y-6 border-b border-slate-100 pb-10">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full font-bold text-xs uppercase tracking-wider">
                                {article.category}
                            </span>
                            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                            <span className="text-slate-600 text-xs font-semibold flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-slate-300" />
                                {article.readTime}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                            {article.title}
                        </h1>

                        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                            {article.subtitle}
                        </p>

                        {/* Author details */}
                        <div className="flex items-center gap-3 pt-2">
                            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 text-sm font-black">
                                {article.author.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800 leading-none mb-0.5">{article.author}</p>
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest leading-none">Published {article.date}</p>
                            </div>
                        </div>
                    </header>

                    {/* Body Content */}
                    <div className="prose prose-slate max-w-none space-y-8 text-slate-600 text-base md:text-[17px] leading-relaxed font-medium">
                        {article.content.flatMap((block, idx) => {
                            const elements = [];
                            if (block.type === "paragraph") {
                                elements.push(
                                    <p
                                        key={`p-${idx}`}
                                        dangerouslySetInnerHTML={{ __html: block.text }}
                                        className="text-slate-600 font-medium leading-relaxed"
                                    />
                                );
                            }
                            if (block.type === "heading") {
                                elements.push(
                                    <h2
                                        key={`h-${idx}`}
                                        className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight pt-6 pb-2"
                                    >
                                        {block.text}
                                    </h2>
                                );
                            }
                            if (block.type === "list") {
                                elements.push(
                                    <ul key={`l-${idx}`} className="space-y-4 pl-6 list-disc marker:text-indigo-500">
                                        {block.items.map((item, lidx) => (
                                            <li
                                                key={`li-${idx}-${lidx}`}
                                                dangerouslySetInnerHTML={{ __html: item }}
                                                className="text-slate-600 font-medium leading-relaxed pl-1"
                                            />
                                        ))}
                                    </ul>
                                );
                            }
                            // Inject AdSense Slot F dynamically after the second block (idx === 1)
                            if (idx === 1) {
                                elements.push(
                                    <div className="my-8 select-none" key={`ad-${idx}`}>
                                        <AdSense adSlot="8492019485" adFormat="horizontal" />
                                    </div>
                                );
                            }
                            return elements;
                        })}
                    </div>

                    {/* Dynamic Action Banner (Internal Linking conversion helper) */}
                    <div className="bg-indigo-950 text-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-xl mt-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[90px] rounded-full pointer-events-none"></div>
                        <div className="space-y-4 relative z-10 text-center md:text-left max-w-lg">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-800 text-indigo-300 font-bold text-xs uppercase tracking-widest leading-none">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span>100% Secure Local Engine</span>
                            </div>
                            <h3 className="text-2xl font-black tracking-tight leading-snug">
                                Try Our {toolCTA.name} Utility
                            </h3>
                            <p className="text-indigo-200 text-sm font-medium">
                                {toolCTA.desc} Process your documents directly in RAM with zero cloud uploads.
                            </p>
                        </div>
                        <div className="shrink-0 relative z-10 w-full md:w-auto">
                            <Link
                                to={toolCTA.path}
                                className="w-full md:w-auto px-8 py-4 bg-white text-indigo-950 font-black rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 group text-sm"
                            >
                                <span>Launch {toolCTA.name}</span>
                                <ChevronRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* AdSense Slot G - Post Footer Banner */}
                    <div className="max-w-[970px] mx-auto w-full select-none my-8">
                        <AdSense adSlot="2948105829" adFormat="horizontal" />
                    </div>

                    {/* Article Footer (Tags and Disclaimer) */}
                    <footer className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 rounded-lg text-xs font-bold"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                            Secure Sandbox Certified
                        </p>
                    </footer>

                </article>
            </div>
        </>
    );
}
