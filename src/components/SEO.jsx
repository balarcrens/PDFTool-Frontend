import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function SEO({
    title,
    description,
    keywords,
    canonical,
    ogType = "website",
    ogImage = "/og-image.png",
    schemaData = null
}) {
    const location = useLocation();
    const formattedTitle = title ? `${title} | iFlexPDF` : "iFlexPDF - Free Secure Browser PDF Solutions";
    const activeDescription = description || "Professional-grade, local-first browser PDF utilities. Process your PDFs entirely in your browser with zero server uploads for 100% security.";
    const activeKeywords = keywords || "pdf, compress pdf, merge pdf, split pdf, word to pdf, local pdf tools, secure pdf converter, free online pdf tools";
    const activeCanonical = canonical || window.location.origin + location.pathname;

    return (
        <Helmet>
            <title>{formattedTitle}</title>

            <meta name="description" content={activeDescription} />
            <meta name="keywords" content={activeKeywords} />

            <link rel="canonical" href={activeCanonical} />

            <meta property="og:title" content={formattedTitle} />
            <meta property="og:description" content={activeDescription} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={activeCanonical} />
            <meta property="og:image" content={window.location.origin + ogImage} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={formattedTitle} />
            <meta name="twitter:description" content={activeDescription} />
            <meta name="twitter:image" content={window.location.origin + ogImage} />

            {schemaData && (
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            )}
        </Helmet>
    );
}
