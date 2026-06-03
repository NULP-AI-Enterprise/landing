"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Тягнемо базовий шлях для правильного підключення картинок
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section className="relative min-h-screen pt-24 overflow-hidden flex items-center bg-surface">

            {/* --- 1. ФОНОВИЙ ЛОГОТИП (icon.svg) --- */}
            <div
                className="absolute inset-y-0 right-0 w-full md:w-[70%] lg:w-[60%] pointer-events-none z-0 flex items-center justify-end"
                style={{
                    // Маска створює плавний фейд зліва направо (ліва частина прозора, права - видима)
                    maskImage: 'linear-gradient(to right, transparent 0%, black 60%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 60%)',
                }}
            >

                <div
                    className="w-full h-[120%] bg-no-repeat bg-right bg-contain opacity-10 mix-blend-screen animate-[pulse_8s_ease-in-out_infinite] translate-x-10 md:translate-x-20"
                    style={{ backgroundImage: `url('${basePath}/icon.svg')` }}
                ></div>
            </div>

            {/* Динамічні фонові сфери */}
            <div className="glow-sphere -top-40 -left-40 opacity-60 pointer-events-none animate-pulse duration-[10s] z-0"></div>
            <div className="glow-sphere top-1/2 -right-40 opacity-30 pointer-events-none z-0"></div>

            {/* Сітка на фоні */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.05] pointer-events-none z-0"></div>

            {/* --- КОНТЕНТ --- */}
            <div className="container mx-auto px-8 relative z-10">
                <div className="max-w-5xl">

                    {/* Головний заголовок */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-t-primary leading-[1.05] mb-10 tracking-tighter opacity-0 animate-fade-in-up">
                        {t('titleLine1')}<br />
                        <span className="gradient-text">{t('titleLine2')}</span>
                    </h1>

                    {/* Опис (затримка 200ms) */}
                    <p
                        className="text-xl md:text-2xl text-t-secondary mb-14 max-w-2xl font-light leading-relaxed opacity-0 animate-fade-in-up"
                        style={{ animationDelay: '200ms' }}
                    >
                        {t('description')}
                    </p>

                    {/* Група кнопок (затримка 400ms) */}
                    <div
                        className="flex flex-wrap gap-5 opacity-0 animate-fade-in-up"
                        style={{ animationDelay: '400ms' }}
                    >
                        <Link
                            href="/applicants"
                            className="px-10 py-5 gradient-bg text-t-primary font-bold rounded-[1.25rem] hover:scale-105 hover:brightness-110 transition-all uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_30px_rgba(108,99,255,0.3)]"
                        >
                            {t('cta.education')}
                        </Link>

                        <Link
                            href="/rnd"
                            className="px-10 py-5 border border-glass-hover bg-glass backdrop-blur-md text-t-primary font-bold rounded-[1.25rem] hover:bg-glass-hover hover:border-glass-strong hover:-translate-y-1 transition-all uppercase tracking-[0.2em] text-[10px]"
                        >
                            {t('cta.projects')}
                        </Link>

                        <Link
                            href="/research-units"
                            className="px-10 py-5 border border-glass-hover bg-glass backdrop-blur-md text-t-primary font-bold rounded-[1.25rem] hover:bg-glass-hover hover:border-glass-strong hover:-translate-y-1 transition-all uppercase tracking-[0.2em] text-[10px]"
                        >
                            {t('cta.rnd')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Індикатор скролу вниз */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40 z-10">
                <span className="material-symbols-outlined text-t-primary text-3xl">expand_more</span>
            </div>
        </section>
    );
}