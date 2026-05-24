import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MergePDF from "./pages/MergePDF";
import SplitPDF from "./pages/SplitPDF";
import ImageToPDF from "./pages/ImageToPDF";
import PDFToImage from "./pages/PDFToImage";
import OrganizePDF from "./pages/OrganizePDF";
import CompressPDF from "./pages/CompressPDF";
import PDFToText from "./pages/PDFToText";
import WordToPDF from "./pages/WordToPDF";
import PDFToWord from "./pages/PDFToWord";
import ProtectPDF from "./pages/ProtectPDF";
import UnlockPDF from "./pages/UnlockPDF";
import RotatePDF from "./pages/RotatePDF";
import WatermarkPDF from "./pages/WatermarkPDF";
import PageNumbersPDF from "./pages/PageNumbersPDF";
import DeletePagesPDF from "./pages/DeletePagesPDF";

import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";

import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Security from "./pages/Security";
import Cookies from "./pages/Cookies";
import Disclaimer from "./pages/Disclaimer";
import FAQPage from "./pages/FAQPage";
import Sitemap from "./pages/Sitemap";

import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Breadcrumbs from "./components/Breadcrumbs";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-indigo-600 selection:text-white">
        <Navbar />
        <Breadcrumbs />
        <main className="flex-grow">
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
            <Route path="/pdf-to-word" element={<PDFToWord />} />
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
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;