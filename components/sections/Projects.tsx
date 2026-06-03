"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Projects({ initialProjects = [] }: { initialProjects: any[] }) {
    const t = useTranslations('FeaturedProjects');
    const locale = useLocale();

    if (initialProjects.length === 0) return null;

    return (
        <section className="py-24 bg-surface relative overflow-hidden rounded-[3rem] border border-glass mx-4 md:mx-8 mb-20 shadow-2xl shadow-primary/5">
            {/* Декоративні фонові світіння */}
            <div className="glow-sphere top-0 right-0 opacity-20 pointer-events-none"></div>
            <div className="glow-sphere bottom-0 left-0 opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(108,99,255,0.05),transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-8 relative z-10">
                {/* Шапка секції з кнопкою переходу */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-bold text-t-primary mb-6 tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {t('title')}
                        </h2>
                        <div className="w-20 h-1 gradient-bg rounded-full opacity-60 mb-6"></div>
                        <p className="text-t-secondary text-lg font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                            {t('subtitle')}
                        </p>
                    </div>

                    <Link
                        href={`/${locale}/rnd`}
                        className="inline-flex items-center gap-3 px-8 py-4 border border-glass-hover bg-glass backdrop-blur-md text-t-primary font-bold rounded-[1.25rem] hover:bg-glass-hover hover:border-glass-strong md:hover:-translate-y-1 transition-all uppercase tracking-[0.2em] text-[10px] whitespace-nowrap animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200"
                    >
                        {t('viewAll')}
                        <span className="material-symbols-outlined text-sm">grid_view</span>
                    </Link>
                </div>

                {/* Сітка проєктів */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
                    {initialProjects.map((proj, i) => {
                        // Логіка для картинки (Cloudinary або локальна)
                        let imagePath = proj.hero?.bgImage || '/placeholder.png';
                        if (typeof imagePath === 'string' && !imagePath.startsWith('http') && !imagePath.startsWith('data:')) {
                            if (basePath && !imagePath.startsWith(basePath)) {
                                imagePath = `${basePath}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
                            }
                        }

                        return (
                            <div
                                key={proj.id || proj.slug}
                                className="group flex flex-col h-full animate-in fade-in slide-in-from-bottom-8 duration-700"
                                style={{ animationDelay: `${i * 150}ms` }}
                            >
                                {/* Картка із зображенням */}
                                <div className="relative overflow-hidden rounded-[2rem] bg-surface-card mb-8 border border-glass shadow-lg aspect-video">
                                    <Image
                                        src={imagePath}
                                        alt={proj.hero?.title || 'Project'}
                                        fill
                                        unoptimized
                                        // 🔥 На мобільному завжди яскрава. На ПК: чорно-біла і збільшується/стає яскравою тільки при hover (додано md: перед усіма group-hover)
                                        className="object-cover transition-transform duration-700 grayscale-0 opacity-100 md:grayscale md:opacity-60 md:group-hover:scale-110 md:group-hover:grayscale-0 md:group-hover:opacity-100"
                                    />

                                    {/* Градієнт та тег категорії */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent opacity-100 flex items-end p-6">
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20 backdrop-blur-md text-primary text-[9px] font-bold uppercase tracking-[0.2em] border border-primary/30 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="material-symbols-outlined text-[14px]">category</span>
                                            {proj.hero?.category || 'R&D'}
                                        </span>
                                    </div>
                                </div>

                                {/* Текстова частина */}
                                <div className="flex flex-col flex-grow px-2">

                                    <h4 className="text-2xl font-bold text-t-primary mb-4 tracking-tight md:group-hover:text-primary transition-colors duration-300">
                                        {proj.hero?.title || 'Без назви'}
                                    </h4>
                                    <p className="text-t-muted text-sm mb-8 font-light leading-relaxed line-clamp-3 flex-grow">
                                        {proj.hero?.desc || 'Опис відсутній.'}
                                    </p>

                                    {/* Лінк на детальну сторінку */}
                                    <Link
                                        href={`/${locale}/projects/${proj.slug}`}
                                        className="inline-flex items-center gap-2 text-t-primary font-bold text-[10px] uppercase tracking-[0.25em] group/link mt-auto w-fit"
                                    >

                                        <span className="border-b border-glass-strong pb-1 md:group-hover/link:border-primary transition-colors">
                                            {t('viewProject')}
                                        </span>

                                        <span className="material-symbols-outlined text-sm transform md:group-hover/link:translate-x-2 transition-transform text-primary">
                                            arrow_forward
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}