"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function NewsArchive({ initialNews = [] }: { initialNews?: any[] }) {
    const t = useTranslations('NewsArchive');
    const locale = useLocale();

    const [isExpanded, setIsExpanded] = useState(false);

    const filteredNews = (initialNews || []).filter(news => {
        if (locale === 'uk') {
            return news.language === 'ua' || news.language === 'uk';
        }
        return news.language === locale;
    });

    // Використовуємо відфільтрований масив для відображення
    const displayedNews = isExpanded ? filteredNews : filteredNews.slice(0, 4);

    if (filteredNews.length === 0) return null;

    return (
        <section className="py-24 bg-surface-card border-t border-glass relative overflow-hidden">
            <div className="container mx-auto px-8 relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-t-primary mb-6 tracking-tight">
                            {t('title')}
                        </h2>
                        <div className="h-1 w-24 gradient-bg rounded-full"></div>
                    </div>

                    {filteredNews.length > 4 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-primary font-bold hover:text-t-primary flex items-center gap-2 group transition-all uppercase text-xs tracking-[0.2em] outline-none"
                        >
                            {isExpanded ? t('collapse') : t('viewAll')}
                            <span className={`material-symbols-outlined text-lg transition-transform duration-500 ${isExpanded ? 'rotate-180' : 'group-hover:translate-x-2'}`}>
                                {isExpanded ? 'expand_less' : 'arrow_forward'}
                            </span>
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700">
                    {displayedNews.map((news, i) => {
                        let imagePath = news.img || '';
                        if (typeof imagePath === 'string') {
                            if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
                                imagePath = news.img;
                            } else if (basePath && !imagePath.startsWith(basePath)) {
                                imagePath = `${basePath}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
                            }
                        }

                        return (
                            <div
                                key={news.id || i}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <Link href={`/${locale}/news/${news.id}`} className="group cursor-pointer flex flex-col h-full bg-surface/40 rounded-3xl border border-glass hover:border-primary/30 transition-all duration-500 overflow-hidden">

                                    <div className="aspect-video relative overflow-hidden bg-black/20 flex items-center justify-center">
                                        <Image
                                            src={imagePath || '/placeholder.png'}
                                            alt={news.title}
                                            fill
                                            unoptimized
                                            // object-contain: зберігає пропорції, нічого не обрізає
                                            className="object-contain p-2 transition-transform duration-700 md:grayscale md:opacity-50 md:group-hover:scale-105 md:group-hover:grayscale-0 md:group-hover:opacity-100"
                                        />
                                        <span className="absolute bottom-4 left-4 z-20 text-t-primary text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-glass-hover">
                                            {news.createdAt}
                                        </span>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <h4 className="font-bold text-lg text-t-primary mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight tracking-tight">
                                            {news.title}
                                        </h4>
                                        <p className="text-t-muted text-sm line-clamp-3 leading-relaxed font-light">
                                            {news.desc}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}