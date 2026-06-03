"use client";

import { useState } from 'react';
import Image from 'next/image';

interface FacultyCardProps {
    member: {
        id: string;
        img: string | null;
        name: string;
        role: string;
    }
}

export default function FacultyCard({ member }: FacultyCardProps) {
    const shortName = member.name.split(' ').slice(0, 2).join(' ');
    const placeholderUrl = `https://placehold.co/400x500/0A0A15/6C63FF/png?text=${encodeURIComponent(shortName)}`;

    const [imgSrc, setImgSrc] = useState(
        member.img && member.img.startsWith('http') ? member.img : placeholderUrl
    );

    return (
        <div className="flex flex-col group p-5 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:bg-surface-card/80 hover:border hover:border-glass-hover hover:shadow-[0_0_50px_10px_rgba(108,99,255,0.15)] bg-surface-card/40 border border-transparent">

            {/* Блок з фото */}
            <div className="aspect-[4/5] rounded-2xl bg-surface mb-6 overflow-hidden border border-glass relative shadow-inner cursor-pointer group-hover:border-primary/20 transition-all duration-500">
                <Image
                    src={imgSrc}
                    alt={`Portrait of ${member.name}`}
                    fill
                    unoptimized
                    onError={() => setImgSrc(placeholderUrl)}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            {/* Текстовий блок */}
            <div className="text-center px-1">
                <h4 className="font-bold text-lg text-t-primary mb-2 tracking-tight group-hover:text-primary transition-colors cursor-pointer line-clamp-2 leading-tight">
                    {member.name}
                </h4>
                <p className="text-[10px] text-[#80E9D4] font-bold uppercase tracking-[0.2em] leading-tight">
                    {member.role}
                </p>
            </div>
        </div>
    );
}