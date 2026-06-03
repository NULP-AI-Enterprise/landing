import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function RndHero() {
    const t = useTranslations('RndHero');

    return (
        <section className="relative min-h-[70vh] flex items-center pt-40 pb-24 overflow-hidden bg-surface">
            {/* Фонове світіння */}
            <div className="glow-sphere -top-40 -left-40 opacity-70 pointer-events-none"></div>
            <div className="glow-sphere top-40 -right-20 opacity-40 pointer-events-none"></div>

            <div className="container mx-auto px-8 relative z-10 text-center">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tighter text-t-primary">
                    <span className="gradient-text">{t('title')}</span>
                </h1>

                <p className="mt-4 text-xl md:text-2xl text-t-secondary max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                    {t('description')}
                </p>

                <Link
                    href="#projects"
                    className="inline-flex items-center justify-center px-12 py-5 text-xs font-bold rounded-full text-t-primary gradient-bg hover:scale-105 hover:brightness-110 transition-all shadow-[0_0_40px_rgba(108,99,255,0.4)] uppercase tracking-[0.2em]"
                >
                    {t('cta')}
                    <span className="material-symbols-outlined ml-2 text-lg">arrow_downward</span>
                </Link>
            </div>
        </section>
    );
}