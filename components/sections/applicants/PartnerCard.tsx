"use client";

import { useState } from 'react';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || 'http://localhost:8080';

export interface Partner {
    id?: string;
    title: string;
    country: string;
    link: string;
    photo: string | null;
    language?: string;
}

export default function PartnerCard({ partner }: { partner: Partner }) {
    const placeholderUrl = `https://placehold.co/400x300/161625/6C63FF/png?text=${encodeURIComponent(partner.title)}`;

    // Формуємо правильний шлях для фото
    const initialImagePath = partner.photo && !partner.photo.startsWith('http')
        ? `${basePath}${partner.photo}`
        : (partner.photo || placeholderUrl);

    const [imgSrc, setImgSrc] = useState(initialImagePath);

    return (
        <a
            href={partner.link}
            target="_blank"
            rel="noopener noreferrer"
            // На мобільному це колонка (flex-col + justify-between + min-h), на ПК - фіксована висота h-64
            className="group relative flex flex-col items-center justify-between md:justify-center h-auto min-h-[16rem] md:min-h-0 md:h-64 rounded-[2.5rem] bg-[#161625]/30 border border-glass transition-all duration-500 hover:bg-[#1A1A2E]/80 hover:border-primary/40 md:hover:-translate-y-2 md:hover:shadow-[0_20px_50px_rgba(108,99,255,0.2)] overflow-hidden"
        >
            {/* Внутрішній глоу-ефект (на мобільному ледь помітний постійно, на ПК з'являється при наведенні) */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 md:from-primary/20 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Логотип */}
            {/* На мобільному: завжди кольоровий, відступ зверху. На ПК: чорно-білий, по центру, масштабується при hover */}
            <div className="relative w-4/5 h-32 md:h-64 mt-8 md:mt-0 shrink-0 transition-all duration-700 grayscale-0 opacity-100 md:grayscale md:opacity-40 group-hover:grayscale-0 group-hover:opacity-100 md:group-hover:scale-110">
                <Image
                    src={imgSrc}
                    alt={partner.title}
                    fill
                    unoptimized
                    onError={() => setImgSrc(placeholderUrl)}
                    className="object-contain p-2 md:p-0"
                />
            </div>

            {/* Інформаційна панель */}
            {/* На мобільному: статичний блок внизу. На ПК: absolute блок, схований знизу (translate-y-full) */}
            <div className="relative w-full md:absolute md:bottom-0 md:inset-x-0 mt-auto md:mt-0 p-5 md:p-6 bg-surface/40 md:bg-surface/90 backdrop-blur-md md:backdrop-blur-xl md:translate-y-full group-hover:translate-y-0 transition-transform duration-500 border-t border-glass md:border-glass-hover flex flex-col items-center text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-2">
                    {partner.country}
                </span>
                <span className="text-sm font-bold text-t-primary leading-tight">
                    {partner.title}
                </span>

                {/* Декоративна стрілочка */}
                <div className="mt-3 text-primary md:animate-pulse">
                    <span className="material-symbols-outlined text-sm">north_east</span>
                </div>
            </div>
        </a>
    );
}