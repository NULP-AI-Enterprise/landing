import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function UnitHero({ slug }: { slug: string }) {
    const tDetails = useTranslations('UnitDetails');
    const tCommon = useTranslations('UnitCommon');
    // Якщо користувач ввів неправильний URL, якого немає в JSON,
    // fallback-значення будуть пустими, щоб не зламати сторінку.
    const title = tDetails(`${slug}.hero.title`);
    const subtitle = tDetails(`${slug}.hero.subtitle`);

    return (
        <section className="relative min-h-[70vh] flex items-center pt-40 pb-24 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={`/students/welcome1.jpg`}
                    alt={title}
                    fill
                    className="object-cover opacity-20 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/80 to-transparent"></div>
            </div>

            <div className="glow-sphere -top-40 -left-40 opacity-70 z-0"></div>
            <div className="glow-sphere top-40 -right-20 opacity-30 z-0"></div>

            <div className="container mx-auto px-8 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold tracking-widest uppercase text-[10px] mb-6 shadow-[0_0_20px_rgba(108,99,255,0.15)]">
                    <span className="material-symbols-outlined text-[16px]">science</span>
                    {/* Замінили жорсткий текст */}
                    {tCommon('badge')}
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-t-primary">
                    {title}
                </h1>

                <p className="mt-4 text-xl text-t-secondary max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                    {subtitle}
                </p>
            </div>
        </section>
    );
}