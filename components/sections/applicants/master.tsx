"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// 1. Отримуємо базовий шлях (критично важливо для картинок)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Master() {
    const t = useTranslations('MasterPage');

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // 2. Додаємо basePath до каруселі студентів
    const welcomeImages = Array.from({ length: 14 }, (_, i) => `${basePath}/students/welcome${i + 1}.jpg`);

    return (
        // 3. Змінили <main> на <div>, оскільки сторінка вже обгорнута в <main>
        <div className="bg-surface min-h-screen pt-32 pb-24 font-sans text-t-primary relative">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">

                {/* 1. HERO СЕКЦІЯ */}
                <section className="mb-24 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#80E9D4]/10 border border-[#80E9D4]/20 text-[#80E9D4] text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
                        {t('hero.badge')}
                    </div>
                    <p className="text-[#80E9D4] font-bold tracking-widest mb-2">{t('hero.program')}</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter leading-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-lg text-t-secondary mb-8 font-light">{t('hero.specialty')}</p>
                    <div className="flex flex-col items-center justify-center p-6 border border-glass-hover rounded-3xl bg-glass max-w-sm mx-auto">
                        <span className="text-5xl font-black text-t-primary">{t('hero.seats')}</span>
                        <span className="text-xs text-t-muted uppercase tracking-widest mt-2">{t('hero.seatsLabel')}</span>
                    </div>
                </section>

                {/* 2. МЕТА ТА ФОТО ПРОГРАМИ (program 1, 2, 3) */}
                <section className="mb-24">
                    <div className="bg-surface-card border border-glass rounded-[3rem] p-10 md:p-16 mb-12 text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 tracking-tight text-primary">{t('mission.title')}</h2>
                        <p className="text-t-tertiary leading-relaxed font-light text-lg">{t('mission.desc')}</p>
                    </div>

                    {/* ВЕЛИКІ ФОТО ПРОГРАМИ (Карусель з прогортуванням) */}
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 custom-scrollbar items-center">
                        {[1, 2, 3].map((num) => {
                            // 🔥 Додали basePath. Якщо фото у папці students, змініть на `${basePath}/students/program${num}.jpg`
                            const imgSrc = `${basePath}/program${num}.jpg`;

                            return (
                                <div
                                    key={num}
                                    onClick={() => setSelectedImage(imgSrc)}
                                    // Додано bg-glass, щоб було видно сірий квадрат, якщо картинки фізично немає в папці
                                    className="relative shrink-0 w-[90vw] md:w-[75vw] lg:w-[850px] h-[40vh] md:h-[60vh] rounded-[2rem] overflow-hidden snap-center border border-glass-hover group cursor-zoom-in shadow-2xl bg-glass"
                                >
                                    <Image
                                        src={imgSrc}
                                        alt={`Program detail ${num}`}
                                        fill
                                        unoptimized // 🔥 Рятує від невидимих картинок у Next.js
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>

                                    {/* Іконка збільшення при наведенні */}
                                    <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                                        <span className="material-symbols-outlined text-t-primary">zoom_out_map</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 3. УНІКАЛЬНІ ПЕРЕВАГИ (Магістратура) */}
                <section className="mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight text-center">{t('advantages.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <div key={i} className="bg-gradient-to-b from-white/5 to-transparent border border-glass-hover rounded-[2rem] p-8 hover:border-[#80E9D4]/50 transition-all">
                                <span className="text-[#80E9D4] font-black text-2xl mb-4 block">{t(`advantages.items.${i}.num`)}</span>
                                <h3 className="text-lg font-bold mb-3">{t(`advantages.items.${i}.title`)}</h3>
                                <p className="text-xs text-t-muted font-light leading-relaxed">{t(`advantages.items.${i}.desc`)}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-t-secondary italic font-light max-w-3xl mx-auto">{t('advantages.footer')}</p>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-stretch">
                    {/* Картка 1: Наталія Мельникова */}
                    <div className="p-10 lg:p-14 border border-glass bg-gradient-to-br from-surface-card to-surface rounded-[3rem] shadow-2xl relative flex flex-col h-full group">
                        <span className="material-symbols-outlined text-8xl md:text-9xl absolute top-6 right-8 text-t-primary/[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500">format_quote</span>

                        {/* Текст цитати (збільшений шрифт text-lg/xl) */}
                        <p className="text-t-tertiary italic mb-12 relative z-10 grow text-lg lg:text-xl leading-relaxed font-light">
                            {t('quotes.melnykova.text')}
                        </p>

                        {/* Блок з фотографією (збільшено аватар до 24x24) */}
                        <div className="flex items-center gap-6 mt-auto relative z-10">
                            <div className="w-20 h-20 lg:w-24 lg:h-24 relative shrink-0 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg group-hover:border-primary/50 transition-colors duration-500">
                                <Image
                                    src="/melnukova.jpg"
                                    alt="Наталія Мельникова"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-t-primary text-xl lg:text-2xl mb-1">{t('quotes.melnykova.name')}</h4>
                                <p className="text-xs lg:text-sm font-bold text-primary uppercase tracking-widest">{t('quotes.melnykova.role')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Картка 2: Наталія Шаховська */}
                    <div className="p-10 lg:p-14 border border-glass bg-gradient-to-br from-surface-card to-surface rounded-[3rem] shadow-2xl relative flex flex-col h-full group">
                        <span className="material-symbols-outlined text-8xl md:text-9xl absolute top-6 right-8 text-t-primary/[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500">format_quote</span>

                        {/* Текст цитати */}
                        <p className="text-t-tertiary italic mb-12 relative z-10 grow text-lg lg:text-xl leading-relaxed font-light">
                            {t('quotes.shakhovska.text')}
                        </p>

                        {/* Блок з фотографією */}
                        <div className="flex items-center gap-6 mt-auto relative z-10">
                            <div className="w-20 h-20 lg:w-24 lg:h-24 relative shrink-0 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg group-hover:border-primary/50 transition-colors duration-500">
                                <Image
                                    src="/shahovska.png"
                                    alt="Наталія Шаховська"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-t-primary text-xl lg:text-2xl mb-1">{t('quotes.shakhovska.name')}</h4>
                                <p className="text-xs lg:text-sm font-bold text-primary uppercase tracking-widest">{t('quotes.shakhovska.role')}</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 4. КАРУСЕЛЬ ФОТО (welcome1 - welcome14) */}
                <section className="mb-24 mt-24">
                    <h2 className="text-3xl font-bold mb-10 tracking-tight text-center">{t('galleryTitle')}</h2>
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 custom-scrollbar">
                        {welcomeImages.map((img, idx) => (
                            <div key={idx} className="min-w-[85vw] md:min-w-[calc(33.333%-1rem)] h-64 relative rounded-[2rem] overflow-hidden snap-center border border-glass-hover shrink-0 bg-glass">
                                <Image
                                    src={img}
                                    alt={`Gallery ${idx + 1}`}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. КАР'ЄРНІ МОЖЛИВОСТІ */}
                <section className="mb-24 bg-surface-card border-t-4 border-[#80E9D4] rounded-[3rem] p-10 md:p-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{t('career.title')}</h2>
                    <p className="text-t-secondary mb-10 font-light max-w-2xl">{t('career.desc')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-glass border border-glass rounded-xl">
                                <span className="material-symbols-outlined text-[#80E9D4] text-lg">star</span>
                                <span className="text-sm font-bold text-gray-200">{t(`career.roles.${i}`)}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. ЦИТАТИ */}


            </div>

            {/* МОДАЛЬНЕ ВІКНО ДЛЯ ФОТО */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 md:top-10 md:right-10 text-t-primary/50 hover:text-t-primary transition-colors bg-glass-hover hover:bg-glass-strong p-2 rounded-full z-[101]"
                        onClick={() => setSelectedImage(null)}
                    >
                        <span className="material-symbols-outlined text-3xl">close</span>
                    </button>

                    <div
                        className="relative w-full h-full max-w-6xl max-h-[85vh] rounded-[2rem] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt="Enlarged view"
                            fill
                            unoptimized
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            )}
        </div>
    );
}