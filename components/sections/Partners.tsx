"use client";

import { useTranslations } from 'next-intl';

export default function Partners() {
    const t = useTranslations('PartnersCarousel');

    // Беремо імена партнерів з вашого списку
    const partnerNames = [
        'SOMATIC', 'Vast.ai', 'N-iX', 'SoftServe', 'Google',
        'NVIDIA', 'EPAM', 'GlobalLogic', 'Ciklum', 'Eleks'
    ];

    // Дублюємо масив, щоб карусель крутилася безкінечно без "розривів"
    const carouselItems = [...partnerNames, ...partnerNames];

    return (
        <section className="py-16 md:py-24 mb-10 relative">
            <div className="container mx-auto px-8 mb-12">
                <h3 className="text-center text-sm md:text-base uppercase tracking-[0.4em] font-bold text-t-secondary animate-in fade-in slide-in-from-bottom-2 duration-700">
                    {t('title')}
                </h3>
            </div>

            {/* Контейнер каруселі */}
            <div className="relative flex overflow-x-clip group w-full">
                {/* Анімований трек */}
                <div className="flex whitespace-nowrap gap-16 md:gap-24 items-center animate-marquee group-hover:[animation-play-state:paused] w-max px-6 py-8">
                    {carouselItems.map((name, index) => (
                        <span
                            key={index}
                            className="flex-shrink-0 text-2xl md:text-3xl font-bold tracking-tight text-t-tertiary/50 cursor-pointer transition-all duration-500 hover:text-t-primary"
                            style={{ textShadow: 'none' }}
                            onMouseEnter={e => e.currentTarget.style.textShadow = '0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.3), 0 0 80px rgba(212,175,55,0.15)'}
                            onMouseLeave={e => e.currentTarget.style.textShadow = 'none'}
                        >
                            {name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Стилі для безкінечної анімації (щоб не лізти в tailwind.config.ts) */}
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); } /* Зсуваємо рівно на половину (один оригінальний масив) */
                }
                .animate-marquee {
                    animation: marquee 35s linear infinite;
                }
            `}</style>
        </section>
    );
}