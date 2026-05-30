/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useRef } from 'react';
import { cn } from '../lib/utils';

let isAdSenseScriptInjected = false;

const injectAdSenseScript = () => {
    if (isAdSenseScriptInjected) return;
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return;
    }
    
    const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
    if (existingScript) {
        isAdSenseScriptInjected = true;
        return;
    }
    
    isAdSenseScriptInjected = true;
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2183588307448884";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
};

const AdSense = ({
    adSlot = '8116403558',
    adFormat = 'auto',
    fullWidthResponsive = true,
    className = '',
    style = {},
}) => {
    const [adStatus, setAdStatus] = useState('loading');
    const insRef = useRef(null);

    useEffect(() => {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            setAdStatus('unfilled');
            return;
        }

        const handleInteraction = () => {
            injectAdSenseScript();
            cleanupListeners();
        };

        const cleanupListeners = () => {
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('mousemove', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };

        window.addEventListener('scroll', handleInteraction, { passive: true });
        window.addEventListener('mousemove', handleInteraction, { passive: true });
        window.addEventListener('touchstart', handleInteraction, { passive: true });
        window.addEventListener('keydown', handleInteraction, { passive: true });

        const loadTimer = setTimeout(() => {
            injectAdSenseScript();
            cleanupListeners();
        }, 3000);

        const initTimer = setTimeout(() => {
            try {
                if (window.adsbygoogle) {
                    window.adsbygoogle = window.adsbygoogle || [];
                    const uninitializedAds = document.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status])');
                    
                    if (uninitializedAds.length > 0) {
                        uninitializedAds.forEach(() => {
                            try {
                                window.adsbygoogle.push({});
                            } catch (e) {
                                // 
                            }
                        });
                    }
                }
            } catch (e) {
                console.error('AdSense initialization error:', e);
                setAdStatus('error');
            }
        }, 3200);

        let observer = null;
        if (insRef.current) {
            observer = new MutationObserver(() => {
                if (insRef.current) {
                    const status = insRef.current.getAttribute('data-ad-status');
                    if (status === 'filled') {
                        setAdStatus('filled');
                    } else if (status === 'unfilled') {
                        setAdStatus('unfilled');
                    }
                }
            });
            observer.observe(insRef.current, { attributes: true, attributeFilter: ['data-ad-status'] });
        }

        const checkTimer = setInterval(() => {
            if (insRef.current) {
                const status = insRef.current.getAttribute('data-ad-status');
                const hasIframe = insRef.current.querySelector('iframe');
                
                if (status === 'filled') {
                    setAdStatus('filled');
                } else if (status === 'unfilled') {
                    setAdStatus('unfilled');
                } else if (hasIframe) {
                    try {
                        const iframeHeight = parseFloat(window.getComputedStyle(hasIframe).height);
                        if (iframeHeight > 0) {
                            setAdStatus('filled');
                        }
                    } catch (e) {
                        // 
                    }
                }
            }
        }, 1000);

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(initTimer);
            clearInterval(checkTimer);
            cleanupListeners();
            if (observer) {
                observer.disconnect();
            }
        };
    }, [adSlot]);

    const isRectangle = adFormat === 'rectangle' || adFormat === 'vertical';
    const minHeightClass = isRectangle ? 'min-h-[250px]' : 'min-h-[120px]';

    return (
        <div
            className={cn(
                "adsense-container w-full relative overflow-hidden transition-all duration-300 rounded-2xl flex flex-col items-center justify-center border",
                minHeightClass,
                adStatus === 'filled'
                    ? "border-transparent bg-transparent p-0 min-h-0 border-none"
                    : "border-dashed border-slate-200 bg-slate-50/20 p-4",
                className
            )}
            style={adStatus === 'filled' ? {} : style}
        >
            {window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && (
                <ins
                    ref={insRef}
                    className="adsbygoogle relative z-10 w-full"
                    style={{
                        display: adStatus === 'unfilled' ? 'none' : 'block',
                        ...style,
                    }}
                    data-ad-client="ca-pub-2183588307448884"
                    data-ad-slot={adSlot}
                    data-ad-format={adFormat}
                    data-full-width-responsive={
                        fullWidthResponsive.toString()
                    }
                />
            )}

            {adStatus !== 'filled' && (
                <div 
                    className="adsense-fallback absolute inset-0 flex flex-col items-center justify-center gap-1.5 select-none pointer-events-none z-0 px-4 transition-opacity duration-300"
                    aria-hidden="true"
                >
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Sponsored Content</span>
                    <span className="text-[9px] font-semibold text-slate-300 uppercase tracking-widest border border-slate-200/80 px-2.5 py-0.5 rounded-md bg-white/70 backdrop-blur-sm">
                        {isRectangle ? 'Ad Space • 300x250' : 'Ad Space • Horizontal Banner'}
                    </span>
                </div>
            )}
        </div>
    );
};

export default AdSense;