import { useEffect } from "react";
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

  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title ? `${title} | PDFTool` : "PDFTool - Complete Browser PDF Solutions";
    document.title = formattedTitle;

    // Helper to set or update meta tag
    const setMetaTag = (attrName, attrVal, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Set Standard Meta Tags
    setMetaTag("name", "description", description || "Professional-grade, local-first browser PDF utilities. Process your PDFs entirely in your browser with zero server uploads for 100% security.");
    setMetaTag("name", "keywords", keywords || "pdf, compress pdf, merge pdf, split pdf, word to pdf, local pdf tools, secure pdf converter");

    // 3. Set Canonical URL Link Tag
    const activeCanonical = canonical || window.location.origin + location.pathname;
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", activeCanonical);

    // 4. Set Open Graph (Facebook / LinkedIn) Tags
    setMetaTag("property", "og:title", formattedTitle);
    setMetaTag("property", "og:description", description || "Professional secure local-first browser PDF utilities.");
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", activeCanonical);
    setMetaTag("property", "og:image", window.location.origin + ogImage);

    // 5. Set Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", formattedTitle);
    setMetaTag("name", "twitter:description", description || "Professional secure local-first browser PDF utilities.");
    setMetaTag("name", "twitter:image", window.location.origin + ogImage);

    // 6. Set Structured Data Schema (JSON-LD)
    let schemaScript = document.getElementById("structured-data-schema");
    if (schemaScript) {
      schemaScript.remove();
    }

    if (schemaData) {
      schemaScript = document.createElement("script");
      schemaScript.id = "structured-data-schema";
      schemaScript.type = "application/ld+json";
      schemaScript.innerHTML = JSON.stringify(schemaData);
      document.head.appendChild(schemaScript);
    }

    // Clean up dynamic schemas on unmount to prevent lingering metadata
    return () => {
      const scriptToRemove = document.getElementById("structured-data-schema");
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [title, description, keywords, canonical, ogType, ogImage, schemaData, location.pathname]);

  return null;
}
