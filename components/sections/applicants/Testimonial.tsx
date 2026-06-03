"use client";

import Image from 'next/image';
import { useRef } from 'react';
import Slider from 'react-slick';
import { useTranslations } from 'next-intl';

// Стилі слайдера
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 1. Отримуємо базовий шлях з нашого next.config
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// 2. Зберігаємо лише імена файлів фотографій
const studentPhotos = [
    'Orza.jpg',
    'bandrivskiy.jpg',
    'mirchukova.jpg',
    'tarasov.jpg',
    'mill.jpg',
    'veretulynuk.jpg'
];

export default function Testimonial() {
    const t = useTranslations('Testimonials');
    const sliderRef = useRef<Slider | null>(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        arrows: false,
    };

    return (
        <section className="bg-surface py-32 relative overflow-hidden transition-colors duration-300">
            {/* Декоративне світіння */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-[140px]"></div>
            </div>

            <div className="container mx-auto px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-t-primary tracking-tight transition-colors duration-300">
                        {t('title')}
                    </h2>
                </div>

                <div className="relative glass-card rounded-[3rem] p-8 md:p-16 border border-glass-hover max-w-5xl mx-auto shadow-2xl bg-surface-card/40 backdrop-blur-xl transition-colors duration-300">
                    <div className="absolute top-8 left-8 text-primary/20 pointer-events-none">
                        <span className="material-symbols-outlined text-8xl md:text-[120px]">format_quote</span>
                    </div>

                    <Slider ref={sliderRef} {...settings}>
                        {studentPhotos.map((photoFileName, i) => (
                            <div key={i} className="outline-none">
                                <div className="relative z-10">
                                    <p className="text-xl md:text-2xl text-t-secondary font-light italic mb-12 leading-relaxed min-h-[160px] md:min-h-[120px] transition-colors duration-300">
                                        &#34;{t(`students.${i}.text`)}&#34;
                                    </p>

                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-surface-card overflow-hidden ring-4 ring-primary/20 relative flex-shrink-0 transition-colors duration-300">
                                                <Image
                                                    // 3. Динамічно формуємо шлях
                                                    src={`${basePath}/students/${photoFileName}`}
                                                    alt={t(`students.${i}.name`)}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-t-primary mb-1 transition-colors duration-300">
                                                    {t(`students.${i}.name`)}
                                                </h4>
                                                <p className="text-primary text-sm font-semibold opacity-80 uppercase tracking-wider">
                                                    {t(`students.${i}.status`)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>

                    <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 flex gap-4 z-20">
                        <button
                            onClick={() => sliderRef.current?.slickPrev()}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-glass-hover bg-surface-card/30 flex items-center justify-center text-t-secondary hover:bg-surface-card hover:text-t-primary transition-all duration-300 active:scale-95"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <button
                            onClick={() => sliderRef.current?.slickNext()}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full gradient-bg text-t-primary flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 transition-all duration-300 active:scale-95"
                        >
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}