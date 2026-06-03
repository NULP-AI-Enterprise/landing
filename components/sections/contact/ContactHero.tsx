import { useTranslations } from 'next-intl';

export default function ContactHero() {
    const t = useTranslations('ContactHero');

    return (
        <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden flex items-center">
            {/* Фірмове фонове світіння по центру */}
            <div className="glow-sphere -top-40 left-1/2 -translate-x-1/2 opacity-60 pointer-events-none"></div>

            {/* Додаткове легке світіння збоку для глибини */}
            <div className="glow-sphere top-20 -right-20 opacity-20 z-0 pointer-events-none"></div>

            <div className="container mx-auto px-8 relative z-10 text-center">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-tight text-t-primary">
                    <span className="gradient-text">{t('title')}</span>
                </h1>

                <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl text-t-secondary font-light leading-relaxed">
                    {t('description')}
                </p>
            </div>
        </section>
    );
}