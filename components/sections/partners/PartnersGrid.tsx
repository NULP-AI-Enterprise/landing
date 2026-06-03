"use client";

import { useTranslations } from 'next-intl';

export default function PartnersGrid() {
    const t = useTranslations('Partners');

    const partners = [
        { name: 'SOMATIC', desc: '', tier: 'gold', tags: [{ icon: 'science', text: t('tags.projects'), type: 'primary' }, { icon: 'work', text: t('tags.internship'), type: 'indigo' }] },
        { name: 'EPAM', desc: '', tier: 'gold', tags: [{ icon: 'work', text: t('tags.internship'), type: 'indigo' }] },
        { name: 'SoftServe', desc: '', tier: 'gold', tags: [{ icon: 'school', text: t('tags.dual'), type: 'primary' }, { icon: 'work', text: t('tags.jobs'), type: 'indigo' }] },
        { name: 'GlobalLogic', desc: '', tier: 'gold', tags: [{ icon: 'school', text: t('tags.jobs'), type: 'primary' }] },

        { name: 'AI HOUSE', desc: '', tier: 'silver', tags: [{ icon: 'science', text: t('tags.projects'), type: 'primary' }] },
        { name: 'IT-Jim', desc: '', tier: 'silver', tags: [{ icon: 'science', text: t('tags.projects'), type: 'primary' }] },
        { name: 'Vast.ai', desc: '', tier: 'silver', tags: [{ icon: 'cloud', text: t('tags.projects'), type: 'primary' }] },

        { name: 'N-iX', desc: '', tier: 'neutral', tags: [{ icon: 'work', text: t('tags.internship'), type: 'indigo' }] },
        { name: 'Ciklum', desc: '', tier: 'neutral', tags: [{ icon: 'work', text: t('tags.jobs'), type: 'indigo' }] },
        { name: 'Eleks', desc: '', tier: 'neutral', tags: [{ icon: 'science', text: t('tags.projects'), type: 'primary' }] },
        { name: 'SWARMER', desc: '', tier: 'neutral', tags: [{ icon: 'science', text: t('tags.projects'), type: 'primary' }] },
        { name: 'SQUAD', desc: '', tier: 'neutral', tags: [{ icon: 'science', text: t('tags.projects'), type: 'primary' }] },
        { name: 'Українська Спортивна Клініка', desc: '', tier: 'neutral', tags: [{ icon: 'work', text: t('tags.jobs'), type: 'indigo' }] },
        { name: 'NOVAR', desc: '', tier: 'neutral', tags: [{ icon: 'work', text: t('tags.jobs'), type: 'indigo' }] },
        { name: 'Superhumans', desc: '', tier: 'neutral', tags: [{ icon: 'work', text: t('tags.jobs'), type: 'indigo' }] },
        { name: 'UNBROKEN', desc: '', tier: 'neutral', tags: [{ icon: 'work', text: t('tags.jobs'), type: 'indigo' }] },
    ];

    const getHoverBorder = (tier: string) => {
        if (tier === 'gold') return 'hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)]';
        if (tier === 'silver') return 'hover:border-slate-400/50 hover:shadow-[0_0_20px_rgba(148,163,184,0.1)]';
        if (tier === 'bronze') return 'hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]';
        return 'hover:border-primary/40 hover:shadow-[0_0_20px_rgba(108,99,255,0.1)]';
    };

    const getBadgeStyles = (tier: string) => {
        if (tier === 'gold') return 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20';
        if (tier === 'silver') return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
        if (tier === 'bronze') return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
        return '';
    };

    return (
        <section className="w-full py-12 px-4 md:px-0">
            {/* Використовуємо твої рідні змінні: border-glass, text-t-primary, text-t-secondary */}
            <div className="mb-10 pb-8 border-b border-glass">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-t-primary mb-3">
                    {t('grid.title')}
                </h2>
                <p className="text-t-secondary text-lg">
                    {t('grid.description')}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {partners.map((partner, i) => (
                    <div
                        key={i}
                        // Використовуємо твій рідний фон bg-surface-card та border-glass
                        className={`group relative min-h-[140px] md:h-40 flex items-center justify-center rounded-2xl border border-glass bg-surface-card transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1 ${getHoverBorder(partner.tier)}`}
                    >
                        {/* Назва компанії - використовує text-t-primary */}
                        <div className="absolute inset-0 flex items-center justify-center p-4 z-10 transition-transform duration-500 group-hover:-translate-y-5">
                            <span className="text-xl md:text-2xl font-black text-t-primary transition-colors tracking-tight text-center leading-tight break-words w-full">
                                {partner.name}
                            </span>
                        </div>

                        {/* Теги на ховері */}
                        <div className="absolute inset-x-0 bottom-4 p-4 z-20 flex justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {partner.tags.map((tag, j) => (
                                    <span
                                        key={j}
                                        // Теги використовують легкий фон і твій text-t-primary
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-t-primary/5 text-t-primary backdrop-blur-md border border-glass shadow-sm"
                                    >
                                        <span className="material-symbols-outlined !text-[14px]">{tag.icon}</span>
                                        {tag.text}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Бейдж статусу */}
                        {partner.tier !== 'neutral' && (
                            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                <span className={`px-2 py-1 rounded-md text-[9px] uppercase tracking-[0.2em] font-bold border backdrop-blur-md ${getBadgeStyles(partner.tier)}`}>
                                    {partner.tier}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}