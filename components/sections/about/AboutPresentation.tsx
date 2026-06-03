"use client";

import { useTranslations } from 'next-intl';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function AboutPresentation() {
    const t = useTranslations('AboutPresentation');

    return (
        <section id="presentation" className="py-0 bg-surface relative h-fit overflow-visible">
            {/* Standard container matching other sections */}
            <div className="container mx-auto px-6 md:px-8 relative z-10 flex flex-col items-center pt-4 md:pt-10 pb-0">
                
                <div className="text-center max-w-3xl mb-6 md:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <h2 className="text-2xl md:text-5xl font-black text-t-primary mb-4 md:mb-6 tracking-tight">
                        {t('title')}
                    </h2>
                    <p className="text-base md:text-lg text-t-tertiary font-light leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                {/* 
                    Strict Presentation Container 
                    Explicitly capped at 600px height.
                */}
                <div className="w-full max-w-[1000px] h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] max-h-[600px] relative group rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-glass bg-surface-card/40 backdrop-blur-sm transition-all duration-700 hover:shadow-[0_40px_100px_rgba(108,99,255,0.15)] overflow-hidden">
                    <iframe
                        src={`${basePath}/presentations/presentation.pdf#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                        className="w-full h-full absolute inset-0 border-none opacity-95 hover:opacity-100 transition-opacity duration-500"
                        scrolling="no"
                        title="Department Presentation"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
