import { useTranslations } from 'next-intl';

export default function TeamHero() {
    const t = useTranslations('TeamHero');

    return (
        <section className="relative pt-48 pb-24 lg:pt-56 lg:pb-32 overflow-hidden border-b border-glass flex items-center min-h-[60vh]">
            {/* Наші фірмові сфери */}
            <div className="glow-sphere -top-40 -left-40 opacity-70"></div>
            <div className="glow-sphere bottom-0 -right-40 opacity-50"></div>

            {/* Декоративна сітка з вашого макета */}
            <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(#6C63FF 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            <div className="container mx-auto px-6 md:px-8 relative z-10 text-center md:text-left">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-t-primary mb-8 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {t('titleLine1')}<br/>
                    <span className="gradient-text">{t('titleLine2')}</span>
                </h1>
                <p className="max-w-2xl mx-auto md:mx-0 text-lg md:text-2xl text-t-secondary font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                    {t('description')}
                </p>
            </div>
        </section>
    );
}