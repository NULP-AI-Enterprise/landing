import Image from 'next/image';
import Link from 'next/link';

// Універсальний чекер на порожнечу та '#'
const hasValue = (val?: string) => val && val.trim() !== '' && val.trim() !== '#';

export default function ProjectHero({ data }: { data: any }) {
    const hero = data || {};
    const { lab, category, title, desc, links, bgImage } = hero;

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';


    let imagePath = bgImage || '/placeholder.png'; // Дефолтне зображення, якщо порожньо
    if (typeof imagePath === 'string' && !imagePath.startsWith('http') && !imagePath.startsWith('data:')) {
        if (basePath && !imagePath.startsWith(basePath)) {
            imagePath = `${basePath}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
        }
    }

    return (
        <section className="relative pt-40 pb-16 lg:pt-48 lg:pb-24 min-h-[70vh] flex items-center bg-surface">
            <div className="glow-sphere -top-40 -left-40 opacity-70"></div>

            <div className="container mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            {hasValue(lab) && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-primary/10 text-primary border border-primary/30">
                                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                                    {lab}
                                </div>
                            )}
                            {hasValue(category) && (
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#80E9D4] bg-[#80E9D4]/10 px-3 py-1 rounded-full border border-[#80E9D4]/20">
                                    {category}
                                </span>
                            )}
                        </div>

                        {hasValue(title) && (
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-t-primary leading-tight">
                                {title}
                            </h1>
                        )}

                        {hasValue(desc) && (
                            <p className="text-lg text-t-secondary mb-10 leading-relaxed font-light">
                                {desc}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4">
                            {hasValue(links?.portal) && (
                                <Link href={links.portal} className="px-8 py-4 rounded-full text-t-primary gradient-bg text-xs font-bold uppercase tracking-widest shadow-lg">
                                    Project Portal
                                </Link>
                            )}
                            {hasValue(links?.github) && (
                                <Link href={links.github} target="_blank" className="px-8 py-4 rounded-full text-t-primary bg-glass border border-glass-hover text-xs font-bold uppercase tracking-widest hover:bg-glass-hover transition-all">
                                    GitHub
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* ПРАВА КОЛОНКА: Зображення проєкту */}
                    <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-glass shadow-2xl shadow-primary/10 group">
                        <Image
                            src={imagePath}
                            alt={title || "Project Image"}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Декоративний темний градієнт знизу, щоб зображення плавно переходило у фон */}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60"></div>
                        <div className="absolute inset-0 border border-glass-hover rounded-[2.5rem] z-10 pointer-events-none"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}