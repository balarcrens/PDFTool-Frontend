import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    // Reset scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // High-fidelity smooth scrolling to success dashboard when tasks finish
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                if (mutation.addedNodes.length) {
                    for (let node of mutation.addedNodes) {
                        if (node.nodeType === 1) { // ELEMENT_NODE
                            const successCard = node.classList.contains("premium-success-card")
                                ? node
                                : node.querySelector(".premium-success-card");

                            if (successCard) {
                                // Small delay allows browser layout and animations to settle for pixel-perfect scrolling
                                setTimeout(() => {
                                    successCard.scrollIntoView({ behavior: "smooth", block: "center" });
                                }, 100);
                            }
                        }
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    return null;
}
