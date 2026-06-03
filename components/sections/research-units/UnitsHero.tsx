"use client";

import { useTranslations } from 'next-intl';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function UnitsHero() {
    const t = useTranslations('UnitsHero');

    return (
        <section className="relative min-h-[60vh] flex items-center pt-48 pb-24 overflow-hidden bg-surface">

            {/* --- НОВИЙ ФОНОВИЙ ШАР З "ДОНАТ" ФЕЙДОМ (research-[slug].jpg) --- */}
            <div
                className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-screen"
                style={{
                    backgroundImage: `url('${basePath}/research-unit.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',

                    // Створення ефекту "донат" за допомогою маски
                    maskImage: 'radial-gradient(circle at center, transparent 0%, transparent 10%, black 25%, black 65%, transparent 85%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, transparent 10%, black 25%, black 65%, transparent 85%, transparent 100%)',
                }}
            ></div>

            {/* --- ОРИГІНАЛЬНІ ФОНОВІ ЕФЕКТИ (ПІД КАРТИНКОЮ) --- */}
            <div className="glow-sphere -top-40 -left-40 opacity-60 pointer-events-none z-0"></div>
            <div className="glow-sphere top-40 -right-20 opacity-30 pointer-events-none z-0"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.05),transparent_70%)] pointer-events-none z-0"></div>

            {/* --- КОНТЕНТ (НА ПЕРЕДНІЙ ПЛАН) --- */}
            <div className="container mx-auto px-8 relative z-10 text-center">
                {/* Бейдж-мітка */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] tracking-[0.3em] uppercase font-bold mb-8 shadow-[0_0_20px_rgba(108,99,255,0.1)] animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <span className="material-symbols-outlined text-[16px]">hub</span>
                    {t('badge')}
                </div>

                {/* Головний заголовок */}
                <h1 className="text-5xl min-[391px]:text-6xl md:text-8xl font-bold mb-8 tracking-tighter text-t-primary animate-in fade-in slide-in-from-bottom-4 duration-1000 leading-[1.1]">
                    <span className="gradient-text">{t('title')}</span>
                </h1>

                {/* Опис */}
                <p className="mt-4 text-xl md:text-2xl text-t-secondary max-w-3xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                    {t('description')}
                </p>

                {/* Декоративний розділювач */}
                <div className="w-16 h-1 gradient-bg mx-auto rounded-full mt-12 opacity-40"></div>
            </div>
        </section>
    );
}