import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutGrid, FileText, BookOpen, ShieldAlert, ChevronRight } from "lucide-react";
import SEO from "../components/SEO";
import { blogArticles } from "../data/blogArticles";

export default function Sitemap() {
  const tools = [
    { name: "Merge PDF", path: "/merge" },
    { name: "Split PDF", path: "/split" },
    { name: "Compress PDF", path: "/compress" },
    { name: "Image to PDF", path: "/image-to-pdf" },
    { name: "PDF to Image", path: "/pdf-to-image" },
    { name: "Word to PDF", path: "/word-to-pdf" },
    { name: "PDF to Word", path: "/pdf-to-word" },
    { name: "Organize PDF", path: "/organize" },
    { name: "PDF to Text", path: "/pdf-to-text" },
    { name: "Protect PDF", path: "/protect" },
    { name: "Unlock PDF", path: "/unlock" },
    { name: "Rotate PDF", path: "/rotate" },
    { name: "Add Watermark", path: "/watermark" },
    { name: "Add Page Numbers", path: "/page-numbers" },
    { name: "Delete Pages", path: "/delete-pages" }
  ];

  const infoPages = [
    { name: "About Us", path: "/about" },
    { name: "Security Protocol", path: "/security" },
    { name: "Frequently Asked Questions", path: "/faq" },
    { name: "Contact Support", path: "/contact" }
  ];

  const legalPages = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie & Local Storage Policy", path: "/cookies" },
    { name: "Disclaimer & DMCA Policy", path: "/disclaimer" }
  ];

  return (
    <>
      <SEO
        title="Sitemap"
        description="Browse all available tools, articles, and documentation pages on our interactive XML sitemap index."
        keywords="sitemap, site index, pdf tools directory, privacy links, support desk"
      />
      <div className="container-professional space-y-24 py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="badge-professional"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
            <span>Navigation Directory</span>
          </motion.div>
          <h1 className="h2-classic md:text-6xl text-slate-900 tracking-tight leading-tight">
            Interactive Visual <span className="text-indigo-600">Sitemap</span>
          </h1>
          <p className="p-classic max-w-2xl mx-auto text-[15px] md:text-lg">
            Quickly navigate to any core utility tool, guide, blog post, security documentation, or legal declaration page on the platform.
          </p>
        </div>

        {/* Directory Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: PDF Utilities */}
          <SitemapColumn icon={FileText} title="PDF Tools Suite">
            {tools.map((item, idx) => (
              <SitemapLink key={idx} to={item.path} label={item.name} />
            ))}
          </SitemapColumn>

          {/* Column 2: Resources & Help */}
          <SitemapColumn icon={BookOpen} title="Resources & Help">
            <SitemapLink to="/" label="Home Toolkit" />
            <SitemapLink to="/blog" label="Blog Index & Guides" />
            {infoPages.map((item, idx) => (
              <SitemapLink key={idx} to={item.path} label={item.name} />
            ))}
          </SitemapColumn>

          {/* Column 3: Legal & Compliance */}
          <SitemapColumn icon={ShieldAlert} title="Legal & Compliance">
            {legalPages.map((item, idx) => (
              <SitemapLink key={idx} to={item.path} label={item.name} />
            ))}
          </SitemapColumn>

          {/* Column 4: Blog Articles & Guides */}
          <SitemapColumn icon={BookOpen} title="Guides & Articles">
            {blogArticles.map((article, idx) => (
              <SitemapLink key={idx} to={`/blog/${article.slug}`} label={article.title.replace(/: The Ultimate Guide|: A Complete Security Guide|: A Client-Side Conversion Manual|: A Security Auditing Review|: Promoting Your Copyrights Online|: Protecting Your Copyrights Online|: Fixing Misaligned Scan Documents|: Clean Document Redundancy Removal|: Removing Owner Restrictions and Password Protection|: Fixing Orientation and Layout Coordinates|: Numbering PDF Pages with Professional Formats|: Professional-grade, local-first browser PDF utilities|: A complete manual/, '')} />
            ))}
          </SitemapColumn>
        </div>
      </div>
    </>
  );
}

function SitemapColumn({ icon: Icon, title, children }) {
  return (
    <div className="card-ref h-full hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-11 h-11 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-black text-indigo-950">{title}</h3>
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        {children}
      </div>
    </div>
  );
}

function SitemapLink({ to, label }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between p-3.5 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-50 font-semibold text-[13px] border border-transparent hover:border-slate-100/50 group transition-all"
    >
      <span>{label}</span>
      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 duration-300" />
    </Link>
  );
}
