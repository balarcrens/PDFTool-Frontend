import { useState } from "react";
import { Link } from "react-router-dom";
import { blogArticles } from "../data/blogArticles";
import SEO from "../components/SEO";
import { Search, Calendar, User, Clock, ArrowRight, BookOpen, Hash } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Tutorials", "Deep Dives", "Education"];

  const filteredArticles = blogArticles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === "All" || art.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "iFlexPDF Insights Blog",
    "description": "Guides, tutorials, and expert analyses concerning document layouts, PDF compressions, and study hacks.",
    "publisher": {
      "@type": "Organization",
      "name": "iFlexPDF"
    }
  };

  return (
    <>
      <SEO 
        title="Insights Blog & PDF Productivity Guides" 
        description="Access professional tutorials and comparisons to master your PDF workflow. Learn how to compress, split, and secure files locally."
        keywords="pdf tips, office hacks, compress pdf guides, study tutorials, docx vs pdf"
        schemaData={listSchema}
      />

      <div className="container-professional py-16 md:py-24 space-y-16">
        
        {/* Blog Hero section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-widest border border-slate-100"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#0047AB]" />
            Knowledge & Productivity Hub
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Insights & Guides
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Read professional insights, tool comparisons, and speed hacks to simplify your office workflows and keep your documents 100% secure.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/50 p-4 border border-slate-100 rounded-3xl max-w-4xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-xl font-bold text-sm transition-all focus:outline-none",
                  activeCategory === cat 
                    ? "bg-[#0047AB] text-white shadow-lg shadow-indigo-100" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#0047AB] focus:ring-2 focus:ring-indigo-100 font-medium text-sm text-slate-800 transition-all outline-none"
            />
          </div>
        </div>

        {/* Grid of Articles */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticles.map((art, idx) => (
              <Link to={`/blog/${art.slug}`} key={idx} className="group flex flex-col h-full">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="card-ref flex-grow flex flex-col justify-between hover:scale-[1.01] hover:border-slate-300 transition-all duration-300 h-full"
                >
                  <div className="space-y-6">
                    {/* Category and Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 bg-indigo-50 border border-indigo-100/50 text-indigo-600 rounded-full font-bold text-[10px] uppercase tracking-wider">
                        {art.category}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {art.readTime}
                      </span>
                    </div>

                    {/* Title and Excerpt */}
                    <div className="space-y-3">
                      <h2 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                        {art.title}
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    {/* Author block */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 text-xs font-black">
                        {art.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700 leading-none mb-0.5">{art.author}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{art.date}</p>
                      </div>
                    </div>

                    {/* Arrow CTA */}
                    <div className="w-9 h-9 rounded-full bg-slate-50 group-hover:bg-[#0047AB] group-hover:text-white transition-all flex items-center justify-center text-slate-400">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl max-w-2xl mx-auto space-y-4">
            <Search className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-black text-slate-800">No Articles Found</h3>
            <p className="text-slate-400 font-medium max-w-xs mx-auto">
              We couldn't find any articles matching "{searchQuery}" under "{activeCategory}". Try another term!
            </p>
          </div>
        )}

      </div>
    </>
  );
}
