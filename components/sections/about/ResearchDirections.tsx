import { useTranslations } from 'next-intl';

// Виносимо іконки в масив, оскільки вони однакові для обох мов
const topicIcons = [
    'psychology',
    'visibility',
    'chat',
    'monitoring',
    'smart_toy',
    'hub',
];

export default function ResearchDirections() {
    // Підключаємо переклади
    const t = useTranslations('ResearchDirections');

    return (
        // Змінили section-spacing на красиві великі відступи
        <section className="pt-2 pb-8 md:pt-4 md:pb-12 relative bg-surface">
            <div className="container mx-auto px-8 relative z-10">

                {/* Заголовок секції */}
                <div className="text-center mb-8 md:mb-10">
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                        {t('subtitle')}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-t-primary tracking-tight">
                        {t('title')}
                    </h2>
                </div>

                {/* Сітка карток (збільшили gap для кращого розділення) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {topicIcons.map((icon, i) => (
                        <div
                            key={i}
                            // Додали hover:-translate-y-2 для анімації "підняття" картки та тінь
                            className="group p-10 lg:p-12 rounded-[2rem] glass-card bg-surface-card/40 border border-glass hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(108,99,255,0.15)] hover:-translate-y-2"
                        >
                            {/* Збільшили іконку до w-16 h-16 */}
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500 border border-primary/20">
                                <span className="material-symbols-outlined text-3xl">{icon}</span>
                            </div>

                            {/* Збільшили шрифт заголовків до text-2xl */}
                            <h3 className="text-2xl font-bold text-t-primary mb-5 leading-tight">
                                {t(`topics.${i}.title`)}
                            </h3>

                            {/* Збільшили розмір шрифту опису до text-base (був text-sm) */}
                            <p className="text-t-secondary text-base leading-relaxed font-light">
                                {t(`topics.${i}.desc`)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Окрема картка знизу по центру */}
                <div className="mt-8 lg:mt-12 flex justify-center">
                    <div
                        // Зробили max-w-2xl замість max-w-md, щоб вона не здавалася занадто вузькою
                        className="group p-10 lg:p-12 rounded-[2rem] glass-card bg-surface-card/40 border border-glass max-w-2xl w-full hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(108,99,255,0.15)] hover:-translate-y-2"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500 border border-primary/20">
                            <span className="material-symbols-outlined text-3xl">security</span>
                        </div>
                        <h3 className="text-2xl font-bold text-t-primary mb-5 leading-tight">
                            {t('ethics.title')}
                        </h3>
                        <p className="text-t-secondary text-base leading-relaxed font-light">
                            {t('ethics.desc')}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}