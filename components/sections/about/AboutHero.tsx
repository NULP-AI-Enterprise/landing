"use client";

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function AboutHero() {
    const t = useTranslations('AboutHero');
    const locale = useLocale();

    return (
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden bg-surface pt-24 pb-4">

            {/* === ФОНОВЕ ЗОБРАЖЕННЯ === */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={`${basePath}/corpus.jpg`}
                    alt="Корпус університету"
                    fill
                    unoptimized
                    // grayscale робить ч/б, opacity-30 ховає недоліки якості, scale-105 уникає білих країв
                    className="object-cover object-center grayscale opacity-30 scale-105"
                />

                {/* 1. Кольоровий акцент (фіолетово-синій), який змішується з ч/б фото */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-blue-900/20 to-transparent mix-blend-color"></div>

                {/* 2. Темні градієнти для злиття фото з фоном сайту і читабельності тексту */}
                {/* Знизу вгору (щоб плавно перейти в наступну секцію) */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
                {/* Зліва направо (щоб текст ліворуч був на темному фоні) */}
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent"></div>
            </div>

            {/* === ДЕКОРАТИВНІ СФЕРИ === */}
            <div className="glow-sphere -top-40 -left-40 opacity-60 pointer-events-none z-0"></div>
            <div className="glow-sphere bottom-0 right-0 md:-right-40 opacity-40 pointer-events-none z-0 bg-blue-600/20"></div>

            {/* Додаткова сітка (паттерн) для текстури */}
            <div
                className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            ></div>

            {/* === КОНТЕНТ === */}
            <div className="container mx-auto px-6 md:px-8 relative z-10 mt-10 md:mt-0">
                <div className="max-w-3xl">
                    <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-6 block animate-in fade-in slide-in-from-bottom-2 duration-700">
                        {t('university')}
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-t-primary leading-[1.05] mb-8 tracking-tighter drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        {t('title')}
                    </h1>

                    <p className="text-lg md:text-xl lg:text-2xl text-t-tertiary mb-12 leading-relaxed max-w-2xl font-light drop-shadow-md animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                        {t('description')}
                    </p>

                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">

                        <Link
                            href={`/${locale}/rnd`}
                            className="inline-block group relative px-10 py-5 rounded-full font-bold text-t-primary uppercase tracking-widest text-[10px] overflow-hidden shadow-[0_0_40px_rgba(108,99,255,0.4)] hover:shadow-[0_0_60px_rgba(108,99,255,0.6)] transition-all duration-500"
                        >
                            {/* Фон кнопки */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 transition-transform duration-500 group-hover:scale-105"></div>
                            {/* Текст кнопки */}
                            <span className="relative z-10 flex items-center gap-3">
                                {t('button')}
                                <span className="material-symbols-outlined text-sm transform group-hover:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}