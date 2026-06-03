"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function UpcomingEvents({ initialEvents = [] }: { initialEvents: any[] }) {
    const t = useTranslations('NewsPage.events');
    const locale = useLocale();

    const filteredEvents = initialEvents.filter(event => {
        if (locale === 'uk') {
            return event.language === 'ua' || event.language === 'uk';
        }
        return event.language === locale;
    });

    const [visibleCount, setVisibleCount] = useState(2);
    const hasMore = filteredEvents.length > visibleCount;

    if (!filteredEvents || filteredEvents.length === 0) {
        return null;
    }

    return (
        <section className="py-24 bg-surface" id="events">
            <div className="container mx-auto px-8">
                <div className="space-y-10">
                    {/* Використовуємо відфільтрований масив */}
                    {filteredEvents.slice(0, visibleCount).map((event, i) => {
                        let imagePath = event.img || '';
                        if (typeof imagePath === 'string') {
                            if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
                                imagePath = event.img;
                            } else if (basePath && !imagePath.startsWith(basePath)) {
                                imagePath = `${basePath}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
                            }
                        }

                        return (
                            <div
                                key={event.id}
                                className="glass-card rounded-[2.5rem] overflow-hidden group hover:border-primary/40 transition-all duration-500 flex flex-col md:flex-row border-glass bg-surface-card/40 animate-in fade-in slide-in-from-left-4"
                                style={{ animationDelay: `${i * 150}ms` }}
                            >
                                {/* 🔥 ВИПРАВЛЕНО: Додано bg-black/20 та центрування */}
                                <div className="w-full md:w-1/3 lg:w-1/4 h-64 md:h-auto relative overflow-hidden flex-shrink-0 bg-black/20 flex items-center justify-center">
                                    <Image
                                        src={imagePath || '/placeholder.png'}
                                        alt={event.title}
                                        fill
                                        unoptimized
                                        className="object-contain p-4 transition-transform duration-700 md:grayscale md:opacity-50 md:group-hover:scale-105 md:group-hover:grayscale-0 md:group-hover:opacity-100"
                                    />
                                    <span className="absolute top-4 left-4 z-20 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 bg-primary/80 backdrop-blur-md rounded-lg border border-glass-hover shadow-lg">
                                        {t('badgeNew') || 'Свіже'}
                                    </span>
                                </div>

                                <div className="p-10 lg:p-12 flex flex-col justify-between flex-grow">
                                    <div>
                                        <p className="text-xs text-primary font-bold uppercase tracking-widest mb-3">{event.createdAt}</p>
                                        <h3 className="text-3xl font-bold text-t-primary mb-6 group-hover:text-primary transition-colors tracking-tight leading-tight">{event.title}</h3>
                                        <p className="text-t-secondary line-clamp-2 mb-6 text-sm">{event.desc}</p>
                                    </div>
                                    <Link href={`/${locale}/news/${event.id}`} className="inline-flex items-center justify-center sm:w-max px-10 py-4 text-xs tracking-[0.2em] uppercase font-bold rounded-2xl transition-all gradient-bg text-t-primary hover:brightness-110 shadow-lg shadow-primary/20">
                                        {t('details', { count: event.id })}
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {hasMore && (
                    <div className="mt-16 text-center">
                        <button
                            onClick={() => setVisibleCount(filteredEvents.length)}
                            className="px-12 py-5 border border-glass-hover rounded-[2rem] text-xs uppercase tracking-[0.3em] font-bold text-t-primary hover:bg-glass transition-all"
                        >
                            {t('loadMore')}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}