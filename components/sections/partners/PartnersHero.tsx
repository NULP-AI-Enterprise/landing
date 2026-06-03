"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function PartnersHero() {
    const t = useTranslations('PartnersHero');

    return (
        <section className="w-full relative overflow-hidden rounded-[3rem] min-h-[550px] flex items-center justify-center p-8 border border-glass mt-8 bg-surface">
            {/* Фонове зображення з покращеним оверлеєм */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://placehold.co/1920x800/0A0A15/6C63FF/png?text=AI+Industry+Network"
                    alt="Technology grid background"
                    fill
                    unoptimized
                    className="object-cover opacity-20 grayscale"
                />
                {/* Радіальний та лінійний градієнти для глибини */}
                <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-surface/90 to-surface"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.15),transparent_70%)]"></div>
            </div>

            {/* Декоративні елементи світіння */}
            <div className="glow-sphere -top-20 -right-20 opacity-30 pointer-events-none"></div>
            <div className="glow-sphere -bottom-20 -left-20 opacity-20 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl gap-8">
                {/* Бейдж */}
                <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] tracking-[0.3em] uppercase font-bold mb-4 shadow-[0_0_30px_rgba(108,99,255,0.1)] animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <span className="material-symbols-outlined text-[18px]">handshake</span>
                    {t('badge')}
                </div>

                {/* Головний заголовок */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tighter text-t-primary animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {t('title1')} <br />
                    <span className="gradient-text">{t('title2')}</span>
                </h1>

                {/* Опис */}
                <p className="text-lg md:text-2xl text-t-secondary font-light max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                    {t('description')}
                </p>

                {/* Декоративна лінія знизу */}
                <div className="w-24 h-1 gradient-bg rounded-full mt-4 opacity-50"></div>
            </div>
        </section>
    );
}