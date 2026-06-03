import { useTranslations } from 'next-intl';

export default function UnitAreas({ slug }: { slug: string }) {
    const tDetails = useTranslations('UnitDetails');
    const tCommon = useTranslations('UnitCommon');
    // У нас в JSON є area0, area1, area2 для кожного клубу
    const areasIndexes = [0, 1, 2];

    return (
        <section className="py-24 bg-surface-card relative border-t border-glass">
            <div className="container mx-auto px-8 relative z-10">
                <div className="text-center mb-16">

                    <h2 className="text-4xl font-bold text-t-primary mb-4">
                        {tCommon('areasTitle')}
                    </h2>
                    <p className="text-lg text-t-secondary max-w-2xl mx-auto font-light">
                        {tCommon('areasSubtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {areasIndexes.map((i) => (
                        <div key={i} className="glass-card rounded-2xl p-8 flex flex-col items-start group hover:-translate-y-2 transition-transform duration-300 border-glass">
                            <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 text-t-primary shadow-[0_0_20px_rgba(108,99,255,0.4)]">
                                <span className="material-symbols-outlined text-3xl">

                                    {tDetails(`${slug}.areas.area${i}.icon`)}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-t-primary mb-3">
                                {tDetails(`${slug}.areas.area${i}.title`)}
                            </h3>
                            <p className="text-sm text-t-secondary leading-relaxed font-light">
                                {tDetails(`${slug}.areas.area${i}.desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}