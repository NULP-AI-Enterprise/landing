"use client";

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import JsonLd from "@/components/JsonLd";

export default function TourContent() {
    const t = useTranslations('VirtualTour');
    const locale = useLocale();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const SITE_URL = 'https://app.thesis-i.com';

    return (
        <section className="relative min-h-screen flex flex-col bg-surface overflow-hidden">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "VirtualLocation",
                "name": t('title'),
                "description": t('subtitle'),
                "url": `${SITE_URL}/${locale}/tour`,
                "image": `${SITE_URL}/research-unit.jpg`,
                "publisher": {
                    "@type": "EducationalOrganization",
                    "name": locale === 'uk' ? 'Кафедра СШІ' : 'AIS Department'
                }
            }} />
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#80E9D4]/5 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="container mx-auto px-4 md:px-6 pt-32 pb-12 flex-grow flex flex-col relative z-10 max-w-[1600px]">
                {/* Header Section */}
                <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-6 shadow-[0_0_20px_rgba(108,99,255,0.1)]">
                        <span className="material-symbols-outlined text-[16px] animate-spin-slow">360</span>
                        {t('badge')}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">
                        {t('title').split(' ').map((word, i) => (
                            <span key={i} className={i === 1 ? 'gradient-text' : ''}>{word} </span>
                        ))}
                    </h1>
                    <p className="text-t-secondary font-light max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Tour Container - Modified for 16:9 Aspect Ratio and larger size */}
                <div className="relative w-full aspect-video min-h-[400px] md:min-h-[600px] lg:min-h-[700px] bg-surface-card/40 backdrop-blur-2xl border border-glass-hover rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] transition-all duration-500 group mx-auto">
                    {/* Decorative Border Glow */}
                    <div className="absolute inset-0 border border-primary/20 rounded-[2rem] md:rounded-[3.5rem] pointer-events-none group-hover:border-primary/40 transition-colors duration-500 z-30"></div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-surface/90 backdrop-blur-md">
                            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6"></div>
                            <p className="text-primary font-bold tracking-widest uppercase text-[10px] animate-pulse">Entering Virtual Space...</p>
                        </div>
                    )}

                    {/* Iframe Viewer */}
                    <iframe
                        src="/tour/index.html"
                        className={`w-full h-full border-none transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        title="360 Virtual Tour"
                        allowFullScreen
                        allow="fullscreen"
                        loading="lazy"
                    />

                    {/* Hint Overlay (Mobile) */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] text-white/80 flex items-center gap-2 pointer-events-none md:hidden z-30">
                        <span className="material-symbols-outlined text-sm">touch_app</span>
                        Swipe to explore
                    </div>
                </div>

                {/* Additional Info / Feature grid */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <div className="p-5 rounded-2xl bg-glass border border-glass-hover flex flex-col items-center text-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-xl">zoom_in</span>
                        </div>
                        <h4 className="font-bold text-[10px] uppercase tracking-wider text-t-primary">Zoom Detail</h4>
                    </div>
                    <div className="p-5 rounded-2xl bg-glass border border-glass-hover flex flex-col items-center text-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-xl">explore</span>
                        </div>
                        <h4 className="font-bold text-[10px] uppercase tracking-wider text-t-primary">360 View</h4>
                    </div>
                    <div className="p-5 rounded-2xl bg-glass border border-glass-hover flex flex-col items-center text-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-xl">fullscreen</span>
                        </div>
                        <h4 className="font-bold text-[10px] uppercase tracking-wider text-t-primary">Fullscreen</h4>
                    </div>
                </div>
            </div>
        </section>
    );
}
