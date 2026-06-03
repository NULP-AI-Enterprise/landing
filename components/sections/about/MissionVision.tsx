import { useTranslations } from 'next-intl';

export default function MissionVision() {
    // Підключаємо переклади
    const t = useTranslations('MissionVision');

    return (
        // Замінив section-spacing на py-24 lg:py-32 для створення красивого простору
        <section className="py-24 lg:py-32 border-y border-glass bg-surface">
            <div className="container mx-auto px-8">
                {/* Збільшив gap на мобільних, щоб блоки не налізали один на одного */}
                <div className="grid md:grid-cols-2 gap-20 lg:gap-32">

                    {/* Блок Місії */}
                    <div className="flex flex-col">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-8 border border-primary/20 shadow-[0_0_20px_rgba(108,99,255,0.1)]">
                            <span className="material-symbols-outlined text-3xl">track_changes</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-t-primary mb-6 tracking-tight">
                            {t('mission.title')}
                        </h2>
                        {/* Додав leading-loose для кращої читабельності великого тексту */}
                        <p className="text-t-secondary text-lg md:text-xl leading-loose font-light">
                            {t('mission.description')}
                        </p>
                    </div>

                    {/* Блок Бачення */}
                    <div className="flex flex-col">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-8 border border-primary/20 shadow-[0_0_20px_rgba(108,99,255,0.1)]">
                            <span className="material-symbols-outlined text-3xl">visibility</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-t-primary mb-6 tracking-tight">
                            {t('vision.title')}
                        </h2>
                        {/* Додав leading-loose */}
                        <p className="text-t-secondary text-lg md:text-xl leading-loose font-light">
                            {t('vision.description')}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}