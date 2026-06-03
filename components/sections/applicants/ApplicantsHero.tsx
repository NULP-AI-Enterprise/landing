"use client"; // Обов'язково для слайдера

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Slider from 'react-slick';

// Стилі для react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 1. Отримуємо базовий шлях з нашого next.config
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function ApplicantsHero() {
    const t = useTranslations('ApplicantsHero');

    // Налаштування для бекграунд-каруселі
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        arrows: false,
        appendDots: (dots: any) => (
            <div style={{ bottom: '20px' }}>
                <ul className="m-0"> {dots} </ul>
            </div>
        ),
    };

    // 2. Створюємо масив з числами від 1 до 14
    const slides = Array.from({ length: 14 }, (_, i) => i + 1);

    return (
        <section className="relative pt-48 pb-24 lg:pt-56 lg:pb-32 overflow-hidden flex items-center min-h-[70vh]">

            {/* --- БЛОК КАРУСЕЛІ НА ФОНІ --- */}
            <div className="absolute inset-0 z-0">
                <Slider {...settings} className="h-full w-full">
                    {/* 3. Перебираємо масив чисел і підставляємо у рядок */}
                    {slides.map((slideNumber) => (
                        <div key={slideNumber} className="relative h-[70vh] w-full outline-none">
                            <Image
                                // Динамічно формуємо шлях за допомогою basePath
                                src={`${basePath}/students/welcome${slideNumber}.jpg`}
                                alt={`Student slide ${slideNumber}`}
                                fill
                                className="object-cover object-center opacity-50 mix-blend-luminosity"
                                unoptimized
                            />
                        </div>
                    ))}
                </Slider>

                {/* Темні градієнти поверх фото, щоб текст стовідсотково читався */}
                <div className="absolute inset-0 bg-gradient-to-r from-surface-card via-surface-card/80 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-surface-card/30 z-10"></div>
            </div>

            {/* Сфери з нашого globals.css */}
            <div className="glow-sphere -top-40 -left-40 opacity-70 pointer-events-none z-20"></div>
            <div className="glow-sphere bottom-0 -right-40 opacity-30 pointer-events-none z-20"></div>

            {/* Декоративна сітка */}
            <div
                className="absolute inset-0 z-20 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#6C63FF 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* --- ТЕКСТОВИЙ КОНТЕНТ --- */}
            <div className="container mx-auto px-8 relative z-30 text-center md:text-left">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-t-primary mb-8 leading-[1.1] tracking-tight drop-shadow-lg">
                    {t('titleLine1')}<br/>
                    <span className="gradient-text">{t('titleLine2')}</span>
                </h1>

                <p className="max-w-2xl mx-auto md:mx-0 text-lg md:text-xl lg:text-2xl text-t-tertiary font-light leading-relaxed drop-shadow-md">
                    {t('description')}
                </p>
            </div>
        </section>
    );
}