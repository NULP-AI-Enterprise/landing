import { useTranslations } from 'next-intl';

export default function PartnershipForms() {
    const t = useTranslations('PartnershipForms');

    const icons = ['record_voice_over', 'menu_book', 'hub'];

    return (
        // ДОДАНО: rounded-[3rem], border border-glass та shadow-2xl для м'якості
        <section className="w-full flex flex-col gap-16 py-16 bg-surface rounded-[3rem] border border-glass shadow-2xl shadow-primary/5">
            {/* ДОДАНО: px-8, щоб текст не прилипав до країв заокругленої секції */}
            <div className="text-center max-w-3xl mx-auto space-y-4 px-8 relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-t-primary animate-in fade-in slide-in-from-bottom-3 duration-700">
                    {t('title')}
                </h3>
                <p className="text-t-secondary font-light leading-relaxed text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    {t('description')}
                </p>
                <div className="w-20 h-1 gradient-bg mx-auto rounded-full opacity-50 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200"></div>
            </div>

            {/* ДОДАНО: px-8 для сітки */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 relative z-10">
                {[0, 1, 2].map((index) => (
                    <div
                        key={index}
                        className="group p-10 rounded-[2.5rem] glass-card border-glass bg-surface-card/40 flex flex-col items-start gap-6 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(108,99,255,0.05)] relative overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700"
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        {/* Декоративний градієнт при ховері */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Контейнер іконки */}
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5 relative z-10">
                            <span className="material-symbols-outlined text-3xl transition-transform duration-500 group-hover:scale-110">
                                {icons[index]}
                            </span>
                        </div>

                        <div className="space-y-4 relative z-10 flex-grow">
                            <h4 className="text-2xl font-bold text-t-primary tracking-tight group-hover:text-primary transition-colors duration-300">
                                {t(`items.${index}.title`)}
                            </h4>
                            <p className="text-t-secondary font-light leading-relaxed text-sm md:text-base opacity-90 group-hover:opacity-100 transition-opacity">
                                {t(`items.${index}.desc`)}
                            </p>
                        </div>

                        {/* Стрілка-індикатор */}
                        <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0 relative z-10">
                            <span className="material-symbols-outlined text-primary text-3xl">arrow_right_alt</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}