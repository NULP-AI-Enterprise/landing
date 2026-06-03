"use client";

import { useTranslations } from 'next-intl';

export default function TermsOfUse() {
    const t = useTranslations('TermsOfUse');
    const sections = t.raw('sections') as { title: string; content: string }[];

    return (
        <section className="relative pt-40 pb-24 min-h-screen bg-surface">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(108,99,255,0.05),transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-8 relative z-10 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold text-t-primary mb-6 tracking-tighter">
                    {t('title')}
                </h1>
                <p className="text-t-muted text-sm mb-16 font-light">{t('lastUpdated')}</p>

                <div className="space-y-12">
                    {sections.map((section, i) => (
                        <div key={i} className="glass-card rounded-[2rem] p-8 md:p-10 border border-glass bg-surface-card/40">
                            <h2 className="text-xl md:text-2xl font-bold text-t-primary mb-4 tracking-tight">
                                {section.title}
                            </h2>
                            <p className="text-t-secondary leading-relaxed font-light whitespace-pre-line">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
