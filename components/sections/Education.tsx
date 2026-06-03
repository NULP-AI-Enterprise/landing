"use client";

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Education() {
    const t = useTranslations('Education');
    const locale = useLocale();

    const icons = ['school', 'workspace_premium', 'history_edu'];

    return (
        <section className="py-24 bg-surface relative overflow-hidden rounded-[3rem] border border-glass mx-4 md:mx-8 mb-20 shadow-2xl">
            {/* Декоративні фонові елементи */}
            <div className="glow-sphere -top-24 -right-24 opacity-20 pointer-events-none"></div>
            <div className="glow-sphere -bottom-24 -left-24 opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(108,99,255,0.05),transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-8 relative z-10">
                {/* Заголовок секції */}
                <div className="flex flex-col items-center text-center mb-24 space-y-6">
                    <h2 className="text-4xl md:text-6xl font-bold text-t-primary tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {t('title')}
                    </h2>
                    <div className="w-24 h-1 gradient-bg rounded-full opacity-60"></div>
                    <p className="text-t-secondary max-w-2xl text-lg font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Сітка програм */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`group relative p-10 lg:p-12 rounded-[2.5rem] glass-card border-glass bg-surface-card/40 transition-all duration-500 hover:-translate-y-3 hover:border-primary/40 flex flex-col h-full overflow-hidden ${i === 1 ? 'border-primary/30 shadow-[0_20px_50px_rgba(108,99,255,0.1)] scale-105 z-20' : ''}`}
                        >
                            {/* Фоновий градієнт при ховері */}
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Контейнер іконки */}
                            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5 relative z-10">
                                <span className="material-symbols-outlined text-4xl">
                                    {icons[i]}
                                </span>
                            </div>

                            {/* Контент */}
                            <div className="relative z-10 flex-grow">
                                <h3 className="text-2xl md:text-3xl font-bold text-t-primary mb-6 tracking-tight group-hover:text-primary transition-colors">
                                    {t(`programs.${i}.title`)}
                                </h3>
                                <p className="text-t-secondary mb-10 leading-relaxed font-light text-base">
                                    {t(`programs.${i}.desc`)}
                                </p>

                                <ul className="space-y-4 mb-12">
                                    {(t.raw(`programs.${i}.details`) as string[]).map((detail, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm text-t-tertiary font-light">
                                            <span className="material-symbols-outlined text-primary text-xl">verified</span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Кнопка дії */}
                            <Link
                                href={`/${locale}/applicants`}
                                className="relative z-10 inline-flex items-center gap-3 text-t-primary font-bold uppercase tracking-[0.2em] text-[10px] group/btn transition-all"
                            >
                                <span className="border-b-2 border-primary pb-2 group-hover/btn:border-white transition-colors">
                                    {t('cta')}
                                </span>
                                <span className="material-symbols-outlined text-lg transform group-hover/btn:translate-x-3 transition-transform text-primary">
                                    east
                                </span>
                            </Link>

                            {/* Нижня лінія-акцент */}
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}