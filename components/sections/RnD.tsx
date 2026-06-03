"use client";

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function RnD() {
    const t = useTranslations('RnD');
    const locale = useLocale();

    // Залишаємо іконки в масиві, а тексти тягнемо з перекладу
    const icons = ['smart_toy', 'psychology', 'database', 'language'];

    return (
        <section className="py-24 bg-surface relative overflow-hidden rounded-[3rem] border border-glass mx-4 md:mx-8 mb-20 shadow-2xl">
            {/* Декоративні фонові світіння */}
            <div className="glow-sphere bottom-0 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(108,99,255,0.05),transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-8 relative z-10">
                {/* Шапка секції */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
                    <div className="max-w-2xl">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block animate-in fade-in slide-in-from-bottom-2 duration-700">
                            {t('badge')}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold text-t-primary mb-8 tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {t('title')}
                        </h2>
                        <p className="text-t-secondary text-lg md:text-xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                            {t('description')}
                        </p>
                    </div>

                    {/* Кнопка переходу */}
                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                        <Link
                            href={`/${locale}/research-units`}
                            className="inline-flex px-10 py-5 border border-glass-hover bg-glass backdrop-blur-md text-t-primary font-bold rounded-[1.25rem] hover:bg-glass-hover hover:border-glass-strong hover:-translate-y-1 transition-all uppercase tracking-[0.2em] text-[10px] whitespace-nowrap"
                        >
                            {t('button')}
                        </Link>
                    </div>
                </div>

                {/* Сітка лабораторій */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {icons.map((icon, i) => (
                        <div
                            key={i}
                            className="group relative glass-card p-10 rounded-[2.5rem] hover:-translate-y-3 transition-all duration-500 border-glass bg-surface-card/40 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            {/* Градієнт при наведенні */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Іконка */}
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5 relative z-10">
                                <span className="material-symbols-outlined text-3xl">{icon}</span>
                            </div>

                            {/* Текст */}
                            <div className="relative z-10 flex flex-col flex-grow">
                                <h4 className="text-2xl font-bold text-t-primary mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                                    {t(`labs.${i}.title`)}
                                </h4>
                                <p className="text-sm text-t-secondary leading-relaxed font-light">
                                    {t(`labs.${i}.desc`)}
                                </p>
                            </div>

                            {/* Стрілка-індикатор */}
                            <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0 relative z-10">
                                <span className="material-symbols-outlined text-primary text-2xl">arrow_right_alt</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}