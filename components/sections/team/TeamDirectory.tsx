"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export interface ScientificWork {
    name?: string;
    authors?: string[] | string;
    url?: string | null;
    journal?: string;
    year?: number;
}

export interface TeamMember {
    id: string;
    fullName: string;
    jobPosition?: string;
    degree?: string;
    description?: string;
    photoUrl?: string;
    subjects?: string[];
    scientificWorks?: ScientificWork[];
    researchTopics?: string[];
    scientificInterests?: string;
    hobbies?: string[];
    orcidId?: string | null;
    orderNumber?: number;
    language?: string;
    links?: {
        email?: string;
        wiki?: string;
        instagram?: string;
        linkedin?: string;
        facebook?: string;
        site?: string;
        researchGate?: string;
        scopus?: string;
        companyPosition?: string;
    };
}

// Розумна функція, яка фіксує посилання, якщо воно введене без https://
const formatExtUrl = (url?: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
};

// ==========================================
// 1. КОМПОНЕНТ КАРТКИ ВИКЛАДАЧА
// ==========================================
function TeacherCard({ member, onClick }: { member: TeamMember, onClick: () => void }) {
    const t = useTranslations('TeamDirectory');
    const shortName = member.fullName.split(' ').slice(0, 2).join(' ');
    const placeholderUrl = `https://placehold.co/400x500/e2e8f0/6C63FF/png?text=${encodeURIComponent(shortName)}`;

    const [imgSrc, setImgSrc] = useState(
        member.photoUrl && member.photoUrl.startsWith('http') ? member.photoUrl : placeholderUrl
    );

    // Збираємо до 2 досягнень (теми досліджень + дисципліни)
    const achievements: { icon: string; text: string }[] = [];
    if (member.researchTopics && member.researchTopics.length > 0) {
        achievements.push({ icon: 'science', text: member.researchTopics.slice(0, 2).join(', ') });
    }
    if (member.subjects && member.subjects.length > 0) {
        achievements.push({ icon: 'school', text: member.subjects.slice(0, 2).join(', ') });
    }

    const hasAnySocialLink = member.links?.email || member.orcidId || member.links?.linkedin || member.links?.facebook || member.links?.site || member.links?.researchGate || member.links?.scopus;

    return (
        <div
            className="glass-card rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 group flex flex-col h-full hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(108,99,255,0.15)] border-glass bg-surface-card/60 cursor-pointer"
            onClick={onClick}
        >
            {/* Фото */}
            <div className="aspect-[4/5] bg-surface relative">
                <Image
                    src={imgSrc}
                    alt={member.fullName}
                    fill
                    unoptimized
                    onError={() => setImgSrc(placeholderUrl)}
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent pointer-events-none"></div>

                {/* Динамічна плашка з посадою (Змінено кольори на адаптивні primary) */}
                {member.jobPosition && (
                    <span className="absolute top-4 left-4 z-10 bg-surface/90 text-primary border border-primary/30 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.15em] shadow-lg">
                        {member.jobPosition}
                    </span>
                )}
            </div>

            {/* Контент */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-t-primary mb-1.5 tracking-tight group-hover:text-primary transition-colors">
                    {member.fullName}
                </h3>

                {/* Динамічний ступінь (Змінено колір на адаптивний primary) */}
                {member.degree && (
                    <p className="text-primary font-bold text-xs mb-5">{member.degree}</p>
                )}

                {/* Досягнення */}
                {achievements.length > 0 && (
                    <div className="space-y-3 mb-6 flex-grow">
                        {achievements.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">{item.icon}</span>
                                <p className="text-t-secondary text-sm font-light leading-snug line-clamp-2">{item.text}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Соціальні іконки */}
                {hasAnySocialLink && (
                    <div className="pt-4 border-t border-glass-hover flex items-center justify-center gap-2 flex-wrap" onClick={e => e.stopPropagation()}>
                        {member.links?.email && (
                            <a href={`mailto:${member.links.email}`} className="w-9 h-9 rounded-full bg-glass border border-glass-hover flex items-center justify-center text-t-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" title="Email">
                                <span className="material-symbols-outlined text-[16px]">mail</span>
                            </a>
                        )}
                        {member.orcidId && (
                            <a href={`https://orcid.org/${member.orcidId}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-glass border border-glass-hover flex items-center justify-center text-t-secondary hover:bg-[#A6CE39] hover:text-white hover:border-[#A6CE39] transition-all duration-300" title="ORCID">
                                <span className="text-[10px] font-black uppercase">ID</span>
                            </a>
                        )}
                        {member.links?.researchGate && (
                            <a href={formatExtUrl(member.links.researchGate)} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-glass border border-glass-hover flex items-center justify-center text-t-secondary hover:bg-[#00CCBB] hover:text-white hover:border-[#00CCBB] transition-all duration-300" title="ResearchGate">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M10.154 5.253H4.075v13.493h2.64V12.92h2.518l3.418 5.827h3.04l-3.824-6.307c1.78-.396 2.871-1.636 2.871-3.666 0-2.222-1.564-3.52-4.584-3.521zm-3.44 2.26h3.016c1.298 0 2.067.625 2.067 1.636 0 1.05-.845 1.678-2.132 1.678H6.714V7.514zm13.21 2.372c-1.233 0-2.31.428-3.088 1.18-.75.727-1.168 1.83-1.168 3.167 0 1.348.407 2.451 1.167 3.19.78.761 1.866 1.192 3.102 1.192 1.446 0 2.508-.549 3.116-1.348v-2.308H20.17v1.272h1.693v-2.34h-4.664v3.31c-.55.405-1.192.593-1.928.593-1.22 0-2.08-.738-2.08-1.983 0-1.275.86-2.013 2.08-2.013.725 0 1.348.19 1.854.548V10.87c-.66-.464-1.572-.738-2.583-.738z"/></svg>
                            </a>
                        )}
                        {member.links?.scopus && (
                            <a href={formatExtUrl(member.links.scopus)} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-glass border border-glass-hover flex items-center justify-center text-t-secondary hover:bg-[#FF8200] hover:text-white hover:border-[#FF8200] transition-all duration-300" title={member.links.scopus}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.666 24c-.655 0-1.221-.229-1.696-.686-.477-.458-.716-1.01-.716-1.654 0-.297.057-.604.17-.92.115-.318.275-.635.48-.973.045-.078.081-.148.107-.213.028-.065.042-.127.042-.188 0-.105-.034-.192-.102-.26-.068-.068-.155-.102-.262-.102-.116 0-.268.044-.454.134-.187.088-.406.225-.656.412-.252.187-.528.424-.827.714-.298.289-.617.637-.954 1.045-1.828-2.158-3.312-3.835-4.453-5.03-1.143-1.196-2.12-2.186-2.93-2.969-1.333-1.313-2.409-2.363-3.229-3.148C.773 8.272.364 7.62.116 6.892-.13 6.166-.254 5.47-.254 4.809c0-1.438.507-2.652 1.518-3.643C2.278.18 3.547-.316 5.074-.316c1.137 0 2.148.272 3.032.815 2.04 1.31 4.26 3.43 6.66 6.362 2.401 2.933 4.017 5.225 4.853 6.875.835 1.65 1.252 3.22 1.252 4.716 0 1.436-.505 2.649-1.514 3.638-1.01 1.01-2.28 1.485-3.804 1.485h-.887zm-1.785-1.154c0 .185.078.271.233.271.155 0 .3-.068.437-.194.135-.126.281-.31.427-.543l1.262-2.008c-1.32 1.067-2.358 1.775-3.115 2.153-.048.02-.087.039-.116.058-.029.02-.048.039-.048.058 0 .039.029.068.077.097.058.029.107.048.146.048.039 0 .078.01.116.029.029.02.048.029.048.048 0 .01-.01.03-.02.048-.01.02-.02.039-.029.048-.175.388-.262.766-.262 1.135h.844zm-4.498-20.24c-1.058 0-1.95.36-2.678 1.077-.728.718-1.096 1.582-1.096 2.59 0 .835.262 1.581.786 2.251.524.67 1.562 1.708 3.124 3.105 1.562 1.397 2.97 2.668 4.22 3.812 1.252 1.145 2.426 2.232 3.513 3.27l.31.31c.301.291.543.485.728.592.184.097.34.145.466.145.145 0 .271-.048.378-.135.107-.087.175-.204.204-.34l.019-.116c.039-.145.058-.31.058-.504 0-1.184-.427-2.503-1.28-3.95-.854-1.455-2.203-3.308-4.046-5.56-2.26-2.736-4.19-4.647-5.792-5.734-.951-.64-1.892-.97-2.813-.97z"/></svg>
                            </a>
                        )}
                        {member.links?.linkedin && (
                            <a href={formatExtUrl(member.links.linkedin)} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-glass border border-glass-hover flex items-center justify-center text-t-secondary hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-300" title="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                        )}
                        {member.links?.facebook && (
                            <a href={formatExtUrl(member.links.facebook)} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-glass border border-glass-hover flex items-center justify-center text-t-secondary hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300" title="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                        )}
                        {/* Змінено ховер для сайту, щоб він працював на світлій темі */}
                        {member.links?.site && (
                            <a href={formatExtUrl(member.links.site)} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-glass border border-glass-hover flex items-center justify-center text-t-secondary hover:bg-t-primary hover:text-surface hover:border-t-primary transition-all duration-300" title={t('modal.personalSite') || 'Website'}>
                                <span className="material-symbols-outlined text-[16px]">language</span>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ==========================================
// 2. КОМПОНЕНТ МОДАЛЬНОГО ВІКНА (ПОПАПУ)
// ==========================================
function TeacherModal({ member, onClose }: { member: TeamMember, onClose: () => void }) {
    const t = useTranslations('TeamDirectory');
    const shortName = member.fullName.split(' ').slice(0, 2).join(' ');
    const placeholderUrl = `https://placehold.co/400x500/e2e8f0/6C63FF/png?text=${encodeURIComponent(shortName)}`;

    const [imgSrc, setImgSrc] = useState(
        member.photoUrl && member.photoUrl.startsWith('http') ? member.photoUrl : placeholderUrl
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const hasContacts = member.links?.email || member.orcidId || member.links?.linkedin || member.links?.facebook || member.links?.site || member.links?.wiki || member.links?.researchGate || member.links?.scopus || member.links?.companyPosition;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-300">
            <div
                className="absolute inset-0 bg-surface/80 backdrop-blur-md cursor-pointer"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto bg-surface-card border border-glass-hover rounded-[2rem] md:rounded-[3rem] shadow-2xl z-10 custom-scrollbar">

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-12 h-12 bg-glass border border-glass-hover rounded-full flex items-center justify-center text-t-secondary hover:text-t-primary hover:bg-red-500/10 hover:border-red-500/30 transition-all z-20 backdrop-blur-md"
                >
                    <span className="material-symbols-outlined text-2xl">close</span>
                </button>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-8 md:p-12">

                    {/* ЛІВА ЧАСТИНА */}
                    <div className="w-full lg:w-[30%] shrink-0 flex flex-col gap-8">
                        <div className="aspect-[4/5] bg-surface rounded-[2rem] overflow-hidden relative border border-glass shadow-lg">
                            <Image
                                src={imgSrc}
                                alt={member.fullName}
                                fill
                                unoptimized
                                onError={() => setImgSrc(placeholderUrl)}
                                className="object-cover"
                            />
                        </div>

                        {/* Блок контактів */}
                        {hasContacts && (
                            <div className="bg-glass rounded-[2rem] p-6 border border-glass">
                                <h4 className="text-[10px] uppercase tracking-[0.2em] text-t-muted font-bold mb-4">{t('modal.contacts') || 'Контакти:'}</h4>
                                <div className="flex flex-col gap-3">
                                    {member.links?.companyPosition && (
                                        <div className="flex items-center gap-3 text-sm text-primary mb-2 bg-primary/10 p-3 rounded-xl border border-primary/20">
                                            <div className="w-6 h-6 flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">business_center</span></div>
                                            <span className="font-bold">{member.links.companyPosition}</span>
                                        </div>
                                    )}
                                    {member.links?.email && (
                                        <a href={`mailto:${member.links.email}`} className="flex items-center gap-3 text-sm text-t-tertiary hover:text-primary transition-colors group">
                                            <div className="w-8 h-8 rounded-full bg-glass flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary"><span className="material-symbols-outlined text-[16px]">mail</span></div>
                                            <span className="truncate">{member.links.email}</span>
                                        </a>
                                    )}
                                    {member.orcidId && (
                                        <a href={`https://orcid.org/${member.orcidId}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-t-tertiary hover:text-[#A6CE39] transition-colors group">
                                            <div className="w-8 h-8 rounded-full bg-glass flex items-center justify-center group-hover:bg-[#A6CE39]/20 font-black text-[10px] group-hover:text-[#A6CE39]">ID</div>
                                            <span>{t('modal.orcidTitle') || 'Профіль ORCID'}</span>
                                        </a>
                                    )}
                                    {member.links?.researchGate && (
                                        <a href={formatExtUrl(member.links.researchGate)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-t-tertiary hover:text-[#00CCBB] transition-colors group">
                                            <div className="w-8 h-8 rounded-full bg-glass flex items-center justify-center group-hover:bg-[#00CCBB]/20 group-hover:text-[#00CCBB]">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M10.154 5.253H4.075v13.493h2.64V12.92h2.518l3.418 5.827h3.04l-3.824-6.307c1.78-.396 2.871-1.636 2.871-3.666 0-2.222-1.564-3.52-4.584-3.521zm-3.44 2.26h3.016c1.298 0 2.067.625 2.067 1.636 0 1.05-.845 1.678-2.132 1.678H6.714V7.514zm13.21 2.372c-1.233 0-2.31.428-3.088 1.18-.75.727-1.168 1.83-1.168 3.167 0 1.348.407 2.451 1.167 3.19.78.761 1.866 1.192 3.102 1.192 1.446 0 2.508-.549 3.116-1.348v-2.308H20.17v1.272h1.693v-2.34h-4.664v3.31c-.55.405-1.192.593-1.928.593-1.22 0-2.08-.738-2.08-1.983 0-1.275.86-2.013 2.08-2.013.725 0 1.348.19 1.854.548V10.87c-.66-.464-1.572-.738-2.583-.738z"/></svg>
                                            </div>
                                            <span>ResearchGate</span>
                                        </a>
                                    )}
                                    {member.links?.scopus && (
                                        <a href={formatExtUrl(member.links.scopus)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-t-tertiary hover:text-[#FF8200] transition-colors group">
                                            <div className="w-8 h-8 rounded-full bg-glass flex items-center justify-center group-hover:bg-[#FF8200]/20 group-hover:text-[#FF8200]">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.666 24c-.655 0-1.221-.229-1.696-.686-.477-.458-.716-1.01-.716-1.654 0-.297.057-.604.17-.92.115-.318.275-.635.48-.973.045-.078.081-.148.107-.213.028-.065.042-.127.042-.188 0-.105-.034-.192-.102-.26-.068-.068-.155-.102-.262-.102-.116 0-.268.044-.454.134-.187.088-.406.225-.656.412-.252.187-.528.424-.827.714-.298.289-.617.637-.954 1.045-1.828-2.158-3.312-3.835-4.453-5.03-1.143-1.196-2.12-2.186-2.93-2.969-1.333-1.313-2.409-2.363-3.229-3.148C.773 8.272.364 7.62.116 6.892-.13 6.166-.254 5.47-.254 4.809c0-1.438.507-2.652 1.518-3.643C2.278.18 3.547-.316 5.074-.316c1.137 0 2.148.272 3.032.815 2.04 1.31 4.26 3.43 6.66 6.362 2.401 2.933 4.017 5.225 4.853 6.875.835 1.65 1.252 3.22 1.252 4.716 0 1.436-.505 2.649-1.514 3.638-1.01 1.01-2.28 1.485-3.804 1.485h-.887zm-1.785-1.154c0 .185.078.271.233.271.155 0 .3-.068.437-.194.135-.126.281-.31.427-.543l1.262-2.008c-1.32 1.067-2.358 1.775-3.115 2.153-.048.02-.087.039-.116.058-.029.02-.048.039-.048.058 0 .039.029.068.077.097.058.029.107.048.146.048.039 0 .078.01.116.029.029.02.048.029.048.048 0 .01-.01.03-.02.048-.01.02-.02.039-.029.048-.175.388-.262.766-.262 1.135h.844zm-4.498-20.24c-1.058 0-1.95.36-2.678 1.077-.728.718-1.096 1.582-1.096 2.59 0 .835.262 1.581.786 2.251.524.67 1.562 1.708 3.124 3.105 1.562 1.397 2.97 2.668 4.22 3.812 1.252 1.145 2.426 2.232 3.513 3.27l.31.31c.301.291.543.485.728.592.184.097.34.145.466.145.145 0 .271-.048.378-.135.107-.087.175-.204.204-.34l.019-.116c.039-.145.058-.31.058-.504 0-1.184-.427-2.503-1.28-3.95-.854-1.455-2.203-3.308-4.046-5.56-2.26-2.736-4.19-4.647-5.792-5.734-.951-.64-1.892-.97-2.813-.97z"/></svg>
                                            </div>
                                            <span>Scopus</span>
                                        </a>
                                    )}
                                    {member.links?.linkedin && (
                                        <a href={formatExtUrl(member.links.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-t-tertiary hover:text-[#0A66C2] transition-colors group">
                                            <div className="w-8 h-8 rounded-full bg-glass flex items-center justify-center group-hover:bg-[#0A66C2]/20 group-hover:text-[#0A66C2]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></div>
                                            <span>LinkedIn</span>
                                        </a>
                                    )}
                                    {member.links?.facebook && (
                                        <a href={formatExtUrl(member.links.facebook)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-t-tertiary hover:text-[#1877F2] transition-colors group">
                                            <div className="w-8 h-8 rounded-full bg-glass flex items-center justify-center group-hover:bg-[#1877F2]/20 group-hover:text-[#1877F2]"><span className="material-symbols-outlined text-[16px]">thumb_up</span></div>
                                            <span>Facebook</span>
                                        </a>
                                    )}
                                    {member.links?.site && (
                                        <a href={formatExtUrl(member.links.site)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-t-tertiary hover:text-t-primary transition-colors group">
                                            <div className="w-8 h-8 rounded-full bg-glass flex items-center justify-center group-hover:bg-glass-strong group-hover:text-t-primary"><span className="material-symbols-outlined text-[16px]">language</span></div>
                                            <span>{t('modal.personalSite') || 'Особистий сайт'}</span>
                                        </a>
                                    )}
                                    {member.links?.wiki && (
                                        <a href={formatExtUrl(member.links.wiki)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-t-tertiary hover:text-t-primary transition-colors group">
                                            <div className="w-8 h-8 rounded-full bg-glass flex items-center justify-center group-hover:bg-glass-strong group-hover:text-t-primary"><span className="material-symbols-outlined text-[16px]">menu_book</span></div>
                                            <span>{t('modal.wikiTitle') || 'Сторінка Wikipedia'}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Хобі */}
                        {member.hobbies && member.hobbies.length > 0 && (
                            <div className="bg-glass rounded-[2rem] p-6 border border-glass">
                                <h4 className="text-[10px] uppercase tracking-[0.2em] text-t-muted font-bold mb-4">Хобі та захоплення:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {member.hobbies.map((hobby, idx) => (
                                        <span key={idx} className="bg-glass-hover text-t-primary px-3 py-1.5 rounded-lg text-xs font-medium">
                                            {hobby}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ПРАВА ЧАСТИНА */}
                    <div className="w-full lg:w-[70%] flex flex-col gap-8 pt-2">
                        <div className="pr-12">
                            <h2 className="text-3xl md:text-5xl font-bold text-t-primary mb-4 tracking-tight">{member.fullName}</h2>
                            {member.jobPosition && (
                                <p className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-3">{member.jobPosition}</p>
                            )}
                            {member.degree && (
                                <p className="text-t-secondary font-light text-sm md:text-base">{member.degree}</p>
                            )}
                        </div>

                        {/* Дисципліни */}
                        {member.subjects && member.subjects.length > 0 && (
                            <div>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] text-t-muted font-bold mb-4">{t('modal.subjects') || 'Викладає дисципліни:'}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {member.subjects.map((sub, idx) => (
                                        <span key={idx} className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-xl text-xs font-medium">
                                            {sub}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Біографія / Інтереси */}
                        {(member.description || member.scientificInterests || (member.researchTopics && member.researchTopics.length > 0)) && (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                {/* Біографія */}
                                {member.description && (
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-t-muted font-bold mb-4">{t('modal.biography') || 'Біографія:'}</h4>
                                        <p className="text-t-tertiary font-light leading-relaxed text-sm whitespace-pre-wrap">
                                            {member.description}
                                        </p>
                                    </div>
                                )}

                                <div className="flex flex-col gap-6">
                                    {/* Наукові інтереси (Прибрано жорсткий бірюзовий колір) */}
                                    {member.scientificInterests && (
                                        <div>
                                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-t-muted font-bold mb-4">{t('modal.interests') || 'Наукові інтереси:'}</h4>
                                            <p className="text-t-primary font-medium leading-relaxed text-sm bg-primary/5 p-5 rounded-2xl border border-primary/10">
                                                {member.scientificInterests}
                                            </p>
                                        </div>
                                    )}

                                    {/* Теми досліджень */}
                                    {member.researchTopics && member.researchTopics.length > 0 && (
                                        <div>
                                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-t-muted font-bold mb-4">Теми досліджень:</h4>
                                            <ul className="list-disc list-inside text-t-tertiary font-light text-sm space-y-1 bg-glass p-5 rounded-2xl border border-glass">
                                                {member.researchTopics.map((topic, idx) => (
                                                    <li key={idx}>{topic}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Наукові праці */}
                        {member.scientificWorks && member.scientificWorks.length > 0 && (
                            <div className="mt-4 pt-8 border-t border-glass-hover">
                                <h4 className="text-[10px] uppercase tracking-[0.2em] text-t-muted font-bold mb-6">{t('modal.works') || 'Вибрані наукові праці:'}</h4>
                                <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {member.scientificWorks.map((work, idx) => (
                                        <div key={idx} className="bg-glass p-5 rounded-2xl border border-glass hover:border-primary/30 transition-colors">
                                            <h5 className="text-t-primary font-medium text-sm mb-2 leading-snug">
                                                {work.name}
                                            </h5>
                                            <p className="text-t-secondary text-xs mb-3 font-light">
                                                {Array.isArray(work.authors) ? work.authors.join(", ") : work.authors}
                                                {work.journal && <span className="text-primary font-medium"> // {work.journal}</span>}
                                                {work.year && <span>, {work.year}</span>}
                                            </p>
                                            {work.url && (
                                                <a href={formatExtUrl(work.url)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-primary hover:text-t-primary transition-colors font-bold">
                                                    <span>{t('modal.readWork') || 'Читати працю'}</span>
                                                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// 3. ГОЛОВНИЙ КОНТЕЙНЕР ДИРЕКТОРІЇ
// ==========================================
export default function TeamDirectory({ initialMembers = [] }: { initialMembers: TeamMember[] }) {
    const t = useTranslations('TeamDirectory');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    useEffect(() => {
        if (selectedMember) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedMember]);

    const filteredMembers = initialMembers
        .filter(member => {
            const searchLower = searchQuery.toLowerCase();
            return member.fullName?.toLowerCase().includes(searchLower) ||
                member.jobPosition?.toLowerCase().includes(searchLower);
        })
        .sort((a, b) => {
            const orderA = typeof a.orderNumber === 'number' ? a.orderNumber : 999;
            const orderB = typeof b.orderNumber === 'number' ? b.orderNumber : 999;
            return orderA - orderB;
        });

    return (
        <>
            <div className="bg-surface/80 backdrop-blur-xl py-6 border-b border-glass sticky top-24 z-40 shadow-lg shadow-shadow">
                <div className="container mx-auto px-6 md:px-8">
                    <div className="flex justify-end">
                        <div className="relative w-full md:w-[400px]">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary">
                                <span className="material-symbols-outlined text-[22px]">search</span>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('searchPlaceholder') || 'Пошук...'}
                                // Змінено placeholder-gray-500 на адаптивний placeholder-t-muted
                                className="bg-surface-card/80 border border-glass-hover text-t-primary rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary w-full placeholder-t-muted transition-colors"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-20 bg-surface relative min-h-[50vh]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.03),transparent_70%)] pointer-events-none"></div>

                <div className="container mx-auto px-6 md:px-8 relative z-10">
                    {filteredMembers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredMembers.map((member) => (
                                <TeacherCard
                                    key={member.id}
                                    member={member}
                                    onClick={() => setSelectedMember(member)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-t-muted py-20 flex flex-col items-center">
                            <span className="material-symbols-outlined text-6xl mb-4 opacity-50">group_off</span>
                            <p className="text-xl font-light">{t('noResults') || 'Викладачів не знайдено.'}</p>
                        </div>
                    )}
                </div>
            </section>

            {selectedMember && (
                <TeacherModal
                    member={selectedMember}
                    onClose={() => setSelectedMember(null)}
                />
            )}
        </>
    );
}