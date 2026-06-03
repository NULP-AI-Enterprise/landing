"use client";

import { useTranslations } from 'next-intl';

const resources = [
    { icon: 'memory', key: 'gpu' },
    { icon: 'smart_toy', key: 'llm' },
    { icon: 'database', key: 'datasets' },
    { icon: 'code', key: 'software' },
    { icon: 'developer_board', key: 'hardware' },
    { icon: 'more_horiz', key: 'more' },
];

export default function UnitsResources() {
    const t = useTranslations('UnitsResources');

    return (
        <section className="py-24 bg-surface relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(108,99,255,0.04),transparent_60%)] pointer-events-none"></div>

            <div className="container mx-auto px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] tracking-[0.3em] uppercase font-bold mb-6 shadow-[0_0_20px_rgba(108,99,255,0.1)]">
                        <span className="material-symbols-outlined text-[16px]">bolt</span>
                        {t('badge')}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-t-primary tracking-tight mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-t-secondary text-lg font-light max-w-2xl mx-auto leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {resources.map(({ icon, key }) => (
                        <div
                            key={key}
                            className="group flex flex-col items-center text-center p-8 rounded-3xl bg-surface-card/40 border border-glass-hover hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <span className="material-symbols-outlined text-3xl">{icon}</span>
                            </div>
                            <h3 className="text-sm font-bold text-t-primary tracking-tight mb-2">
                                {t(`items.${key}.title`)}
                            </h3>
                            <p className="text-xs text-t-muted font-light leading-relaxed">
                                {t(`items.${key}.desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
