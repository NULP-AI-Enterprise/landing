"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Slider from 'react-slick';

// Стилі для react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function About() {
    const t = useTranslations('About');

    // Налаштування для слайдера всередині картки
    const settings = {
        dots: false, // Вимикаємо крапки, щоб картка була чистою
        infinite: true,
        speed: 1500, // Більш плавний перехід
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        fade: true, // Ефект плавного розчинення між фотографіями
        arrows: false,
        pauseOnHover: false,
    };

    // Масив з числами від 1 до 14 для фотографій
    const slides = Array.from({ length: 14 }, (_, i) => i + 1);

    return (
        <section className="py-24 relative overflow-hidden bg-surface rounded-[3rem] border border-glass mx-4 md:mx-8 mb-20">
            {/* Декоративні елементи фону */}
            <div className="glow-sphere -top-24 -right-24 opacity-20 pointer-events-none"></div>
            <div className="glow-sphere -bottom-24 -left-24 opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(108,99,255,0.05),transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

                    {/* Текстовий блок */}
                    <div className="order-2 lg:order-1">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block animate-in fade-in slide-in-from-bottom-2 duration-700">
                            {t('badge')}
                        </span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-t-primary mb-12 tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {t('title')}
                        </h2>

                        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                            {/* Блок МІСІЯ */}
                            <div className="relative pl-6 border-l-2 border-primary/30">
                                <h3 className="text-xl font-bold text-t-primary mb-3 tracking-wide">
                                    {t('missionTitle')}
                                </h3>
                                <p className="text-t-secondary leading-relaxed text-base md:text-lg font-light">
                                    {t('missionDesc')}
                                </p>
                            </div>

                            {/* Блок ВІЗІЯ */}
                            <div className="relative pl-6 border-l-2 border-[#80E9D4]/30">
                                <h3 className="text-xl font-bold text-t-primary mb-3 tracking-wide">
                                    {t('visionTitle')}
                                </h3> {/* ВИПРАВЛЕНО ТУТ */}
                                <p className="text-t-secondary leading-relaxed text-base md:text-lg font-light">
                                    {t('visionDesc')}
                                </p>
                            </div>
                        </div>

                        <div className="mt-14 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <Link href="/about" className="inline-flex items-center gap-4 text-t-primary font-bold group transition-all uppercase text-[10px] tracking-[0.2em]">
                                <span className="border-b-2 border-primary pb-2 group-hover:border-white transition-colors">
                                    {t('cta')}
                                </span>
                                <span className="material-symbols-outlined text-lg transform group-hover:translate-x-3 transition-transform text-primary">
                                    arrow_right_alt
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Візуальний блок зі Слайдером (ВИПРАВЛЕНО МАСШТАБУВАННЯ) */}
                    <div className="relative order-1 lg:order-2 animate-in fade-in zoom-in duration-1000 w-full max-w-xl mx-auto lg:max-w-none">
                        {/* 1. Основна картка-контейнер з пропорцією */}
                        <div className="aspect-[4/5] md:aspect-square glass-card p-2 rounded-[2.5rem] relative w-full overflow-hidden border-glass-hover shadow-2xl flex items-center justify-center">

                            {/* 2. Контейнер слайдера, який займає 100% простору всередині p-2 */}
                            <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                                <Slider {...settings} className="w-full h-full inner-slider-full">
                                    {slides.map((slideNumber) => (
                                        <div key={slideNumber} className="relative outline-none">
                                            {/* 3. Дублюємо пропорцію тут, щоб Image fill працював коректно всередині slick */}
                                            <div className="relative aspect-[4/5] md:aspect-square w-full rounded-[2rem] overflow-hidden">
                                                <Image
                                                    src={`${basePath}/students/welcome${slideNumber}.jpg`}
                                                    alt={`Life at AIS - Slide ${slideNumber}`}
                                                    fill
                                                    unoptimized
                                                    //object-position center гарантує, що обличчя будуть в центрі при обрізці
                                                    className="object-cover object-center grayscale-[30%] opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 scale-105"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </Slider>

                                {/* Градієнтне накладання */}
                                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent pointer-events-none z-10"></div>
                            </div>
                        </div>

                        {/* Плаваючий блок статистики */}
                        <div className="absolute -bottom-10 -left-6 md:-left-12 glass-card p-10 md:p-12 rounded-[2rem] border-primary/20 z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl group hover:-translate-y-2 transition-transform duration-500">
                            <div className="text-5xl md:text-7xl font-black text-t-primary tracking-tighter group-hover:text-primary transition-colors">
                                {t('stats.value')}
                            </div>
                            <div className="text-[10px] text-t-muted uppercase tracking-[0.3em] mt-4 font-bold leading-tight max-w-[100px]">
                                {t('stats.label')}
                            </div>
                            {/* Тонка лінія-акцент */}
                            <div className="absolute top-0 right-10 w-1 h-12 bg-primary/30 rounded-full"></div>
                        </div>

                        {/* Декоративна сфера за картинкою */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
                    </div>

                </div>
            </div>
        </section>
);
}