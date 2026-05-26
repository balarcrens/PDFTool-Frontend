import { useEffect } from 'react';

const AdSense = ({
    adSlot = '8116403558',
    adFormat = 'auto',
    fullWidthResponsive = true,
    className = '',
    style = {},
}) => {
    useEffect(() => {
        // Wait a brief tick for the DOM and routing to fully stabilize
        const timer = setTimeout(() => {
            try {
                if (window.adsbygoogle) {
                    // Check if there is an uninitialized adsbygoogle ins element currently present in the active DOM
                    const uninitializedAds = document.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status])');
                    
                    if (uninitializedAds.length > 0) {
                        window.adsbygoogle = window.adsbygoogle || [];
                        window.adsbygoogle.push({});
                    }
                }
            } catch (e) {
                console.error('AdSense error:', e);
            }
        }, 150);

        return () => clearTimeout(timer);
    }, []);

    // Reserve standard heights based on ad format to eliminate Cumulative Layout Shift (CLS)
    const isRectangle = adFormat === 'rectangle' || adFormat === 'vertical';
    const minHeightClass = isRectangle ? 'min-h-[250px]' : 'min-h-[120px]';

    return (
        <div
            className={`adsense-container w-full relative overflow-hidden transition-all duration-300 ${minHeightClass} ${className}`}
        >
            {/* AdSense Injected Element */}
            <ins
                className="adsbygoogle relative z-10 w-full"
                style={{
                    display: 'block',
                    ...style,
                }}
                data-ad-client="ca-pub-2183588307448884"
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={
                    fullWidthResponsive.toString()
                }
            />

            {/* Premium Dashed Placeholder Fallback Layer */}
            <div 
                className="adsense-fallback absolute inset-0 flex flex-col items-center justify-center gap-1.5 select-none pointer-events-none z-0 px-4 transition-opacity duration-300"
                aria-hidden="true"
            >
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Sponsored Content</span>
                <span className="text-[9px] font-semibold text-slate-300 uppercase tracking-widest border border-slate-200/80 px-2.5 py-0.5 rounded-md bg-white/70 backdrop-blur-sm">
                    {isRectangle ? 'Ad Space • 300x250' : 'Ad Space • Horizontal Banner'}
                </span>
            </div>
        </div>
    );
};

export default AdSense;