"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Master() {
    const t = useTranslations('GeoPage');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const welcomeImages = Array.from({ length: 14 }, (_, i) => `${basePath}/students/welcome${i + 1}.jpg`);

    return (
        <div className="bg-surface min-h-screen pt-32 pb-24 font-sans text-t-primary relative">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">

                {/* HERO */}
                <section className="mb-24 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#80E9D4]/10 border border-[#80E9D4]/20 text-[#80E9D4] text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-[16px]">spatial_tracking</span>
                        {t('hero.badge')}
                    </div>
                    <p className="text-[#80E9D4] font-bold tracking-widest mb-2">{t('hero.program')}</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter leading-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-lg text-t-secondary mb-8 font-light max-w-2xl mx-auto">{t('hero.specialty')}</p>
                    <div className="flex flex-col items-center justify-center p-6 border border-glass-hover rounded-3xl bg-glass max-w-sm mx-auto">
                        <span className="text-3xl font-black text-t-primary">{t('hero.seats')}</span>
                        <span className="text-xs text-t-muted uppercase tracking-widest mt-2">{t('hero.seatsLabel')}</span>
                    </div>
                </section>

                {/* MISSION */}
                <section className="mb-24">
                    <div className="bg-surface-card border border-glass rounded-[3rem] p-10 md:p-16 mb-12 text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 tracking-tight text-primary">{t('mission.title')}</h2>
                        <p className="text-t-tertiary leading-relaxed font-light text-lg">{t('mission.desc')}</p>
                    </div>
                </section>

                {/* ADVANTAGES */}
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

                {/* QUOTES */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-stretch mb-24">
                    {['melnykova', 'shakhovska'].map((key) => (
                        <div key={key} className="p-10 lg:p-14 border border-glass bg-gradient-to-br from-surface-card to-surface rounded-[3rem] shadow-2xl relative flex flex-col h-full group">
                            <span className="material-symbols-outlined text-8xl md:text-9xl absolute top-6 right-8 text-t-primary/[0.03] pointer-events-none">format_quote</span>
                            <p className="text-t-tertiary italic mb-12 relative z-10 grow text-lg leading-relaxed font-light">{t(`quotes.${key}.text`)}</p>
                            <div className="flex items-center gap-6 mt-auto relative z-10">
                                <div className="w-16 h-16 lg:w-20 lg:h-20 relative shrink-0 rounded-full overflow-hidden border-2 border-primary/20 bg-glass">
                                    <Image src={key === 'melnykova' ? '/melnukova.jpg' : '/shahovska.png'} alt="Portrait" fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-t-primary text-xl mb-1">{t(`quotes.${key}.name`)}</h4>
                                    <p className="text-xs font-bold text-primary uppercase tracking-widest">{t(`quotes.${key}.role`)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* CAREER */}
                <section className="mb-24 bg-surface-card border-t-4 border-[#80E9D4] rounded-[3rem] p-10 md:p-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{t('career.title')}</h2>
                    <p className="text-t-secondary mb-10 font-light max-w-2xl">{t('career.desc')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-glass border border-glass rounded-xl">
                                <span className="material-symbols-outlined text-[#80E9D4] text-lg">verified</span>
                                {/* Виправлено тут: text-gray-200 змінено на text-t-primary */}
                                <span className="text-sm font-bold text-t-primary">{t(`career.roles.${i}`)}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* GALLERY */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold mb-10 tracking-tight text-center">{t('galleryTitle')}</h2>
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 custom-scrollbar">
                        {welcomeImages.map((img, idx) => (
                            <div key={idx} className="min-w-[85vw] md:min-w-[calc(33.333%-1rem)] h-64 relative rounded-[2rem] overflow-hidden snap-center border border-glass-hover shrink-0 bg-glass">
                                <Image src={img} alt="Gallery" fill unoptimized className="object-cover" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {selectedImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4" onClick={() => setSelectedImage(null)}>
                    <div className="relative w-full h-full max-w-6xl max-h-[85vh]">
                        <Image src={selectedImage} alt="Enlarged" fill unoptimized className="object-contain" />
                    </div>
                </div>
            )}
        </div>
    );
}