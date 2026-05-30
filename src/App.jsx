import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Breadcrumbs from "./components/Breadcrumbs";

const Home = lazy(() => import("./pages/Home"));
const MergePDF = lazy(() => import("./pages/MergePDF"));
const SplitPDF = lazy(() => import("./pages/SplitPDF"));
const ImageToPDF = lazy(() => import("./pages/ImageToPDF"));
const PDFToImage = lazy(() => import("./pages/PDFToImage"));
const OrganizePDF = lazy(() => import("./pages/OrganizePDF"));
const CompressPDF = lazy(() => import("./pages/CompressPDF"));
const PDFToText = lazy(() => import("./pages/PDFToText"));
const WordToPDF = lazy(() => import("./pages/WordToPDF"));
const ProtectPDF = lazy(() => import("./pages/ProtectPDF"));
const UnlockPDF = lazy(() => import("./pages/UnlockPDF"));
const RotatePDF = lazy(() => import("./pages/RotatePDF"));
const WatermarkPDF = lazy(() => import("./pages/WatermarkPDF"));
const PageNumbersPDF = lazy(() => import("./pages/PageNumbersPDF"));
const DeletePagesPDF = lazy(() => import("./pages/DeletePagesPDF"));

const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Contact = lazy(() => import("./pages/Contact"));
const Security = lazy(() => import("./pages/Security"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-indigo-600 selection:text-white">
                <Navbar />
                <Breadcrumbs />
                <main className="flex-grow">
                    <Suspense fallback={
                        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center select-none" aria-live="polite" aria-busy="true">
                            <div className="w-9 h-9 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">Initializing Secure Sandbox...</p>
                        </div>
                    }>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/merge" element={<MergePDF />} />
                            <Route path="/split" element={<SplitPDF />} />
                            <Route path="/image-to-pdf" element={<ImageToPDF />} />
                            <Route path="/pdf-to-image" element={<PDFToImage />} />
                            <Route path="/organize" element={<OrganizePDF />} />
                            <Route path="/compress" element={<CompressPDF />} />
                            <Route path="/pdf-to-text" element={<PDFToText />} />
                            <Route path="/word-to-pdf" element={<WordToPDF />} />
                            <Route path="/protect" element={<ProtectPDF />} />
                            <Route path="/unlock" element={<UnlockPDF />} />
                            <Route path="/rotate" element={<RotatePDF />} />
                            <Route path="/watermark" element={<WatermarkPDF />} />
                            <Route path="/page-numbers" element={<PageNumbersPDF />} />
                            <Route path="/delete-pages" element={<DeletePagesPDF />} />

                            <Route path="/blog" element={<BlogList />} />
                            <Route path="/blog/:slug" element={<BlogPost />} />

                            <Route path="/about" element={<About />} />
                            <Route path="/security" element={<Security />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/cookies" element={<Cookies />} />
                            <Route path="/disclaimer" element={<Disclaimer />} />
                            <Route path="/faq" element={<FAQPage />} />
                            <Route path="/sitemap" element={<Sitemap />} />
                            <Route path="/contact" element={<Contact />} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;