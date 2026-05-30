import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { blogArticles } from "../data/blogArticles";
import { useEffect } from "react";

const routeNameMap = {
    "merge": "Merge PDF",
    "split": "Split PDF",
    "image-to-pdf": "Image to PDF",
    "pdf-to-image": "PDF to Image",
    "organize": "Organize PDF",
    "compress": "Compress PDF",
    "pdf-to-text": "PDF to Text",
    "word-to-pdf": "Word to PDF",
    "protect": "Protect PDF",
    "unlock": "Unlock PDF",
    "blog": "Insights & Guides",
    "about": "About Us",
    "pricing": "Pricing Plans",
    "security": "Security Center",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service",
    "contact": "Contact Support"
};

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    useEffect(() => {
        if (pathnames.length === 0) return;

        let schemaScript = document.getElementById("dynamic-breadcrumbs-schema");
        if (schemaScript) {
            schemaScript.remove();
        }

        const origin = window.location.origin;
        const breadcrumbList = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": origin
            }
        ];

        pathnames.forEach((value, index) => {
            const to = `${origin}/${pathnames.slice(0, index + 1).join("/")}`;
            let name = routeNameMap[value] || value;
            if (pathnames[index - 1] === "blog") {
                const article = blogArticles.find(art => art.slug === value);
                if (article) {
                    name = article.title;
                } else {
                    name = value.replace(/-/g, " ");
                }
            }

            breadcrumbList.push({
                "@type": "ListItem",
                "position": index + 2,
                "name": name,
                "item": to
            });
        });

        const schemaData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbList
        };

        schemaScript = document.createElement("script");
        schemaScript.id = "dynamic-breadcrumbs-schema";
        schemaScript.type = "application/ld+json";
        schemaScript.innerHTML = JSON.stringify(schemaData);
        document.head.appendChild(schemaScript);

        return () => {
            const scriptToRemove = document.getElementById("dynamic-breadcrumbs-schema");
            if (scriptToRemove) scriptToRemove.remove();
        };
    }, [location.pathname, pathnames]);

    if (pathnames.length === 0) return null;

    return (
        <nav
            aria-label="Breadcrumb"
            className="bg-slate-50/70 backdrop-blur-md border-b border-slate-100/80 py-2.5 sticky top-[60px] z-40 transition-all duration-300"
        >
            <div className="container-professional flex items-center gap-2.5 text-[11px] font-bold tracking-wide text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
                <Link
                    to="/"
                    className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 hover:scale-[1.02] transition-all duration-200"
                >
                    <Home className="w-3.5 h-3.5 text-slate-600/80" />
                    <span>Home</span>
                </Link>

                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                    let name = routeNameMap[value] || value;
                    if (pathnames[index - 1] === "blog") {
                        const article = blogArticles.find(art => art.slug === value);
                        if (article) {
                            name = article.title;
                        } else {
                            name = value.replace(/-/g, " ");
                        }
                    }

                    return (
                        <div key={to} className="flex items-center gap-2.5 min-w-0">
                            <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
                            {last ? (
                                <span className="text-slate-900 font-extrabold truncate max-w-[180px] sm:max-w-[300px] md:max-w-[500px] bg-slate-100/50 px-2 py-0.5 rounded-md border border-slate-200/40">
                                    {name}
                                </span>
                            ) : (
                                <Link
                                    to={to}
                                    className="text-slate-500 hover:text-indigo-600 hover:scale-[1.02] transition-all duration-200 shrink-0"
                                >
                                    {name}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}
