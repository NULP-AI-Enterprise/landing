import { getTranslations } from 'next-intl/server';

export default async function NewsHero() {
    const t = await getTranslations('NewsPage.hero');

    // Тягнемо базовий шлях для правильного підключення картинки
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    return (
        <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden flex items-center min-h-[50vh] bg-surface">

            {/* --- ФОНОВИЙ ШАР З "ДОНАТ" ФЕЙДОМ (news.jpg) --- */}
            <div
                className="absolute inset-0 z-0 opacity-[0.09] pointer-events-none mix-blend-screen"
                style={{
                    backgroundImage: `url('${basePath}/news.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',

                    // Ефект "донат": прозоро в центрі, видимо в кільці, прозоро по краях
                    maskImage: 'radial-gradient(circle at center, transparent 0%, transparent 10%, black 25%, black 65%, transparent 85%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, transparent 10%, black 45%, black 65%, transparent 85%, transparent 100%)',
                }}
            ></div>

            {/* Оригінальна сфера для глибини */}
            <div className="glow-sphere -top-40 left-1/2 -translate-x-1/2 opacity-60 pointer-events-none z-0"></div>

            {/* --- КОНТЕНТ (НА ПЕРЕДНІЙ ПЛАН) --- */}
            <div className="container mx-auto px-8 relative z-10 text-center">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
                    <span className="block text-t-primary opacity-90">{t('title1')}</span>
                    <span className="block gradient-text">{t('title2')}</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-t-secondary font-light leading-relaxed">
                    {t('desc')}
                </p>
            </div>
        </section>
    );
}