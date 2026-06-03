import { useTranslations } from 'next-intl';

export default function UnitAbout({ slug }: { slug: string }) {
    const tDetails = useTranslations('UnitDetails');
    const tCommon = useTranslations('UnitCommon');
    return (
        <section className="py-24 bg-surface relative border-t border-glass">
            <div className="container mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        {/* Замінили "Про підрозділ" */}
                        <h2 className="text-3xl font-bold text-t-primary mb-6">{tCommon('aboutTitle')}</h2>
                        <p className="text-t-secondary font-light leading-relaxed mb-6">
                            {tDetails(`${slug}.about.desc1`)}
                        </p>
                        <p className="text-t-secondary font-light leading-relaxed">
                            {tDetails(`${slug}.about.desc2`)}
                        </p>
                    </div>
                    <div>
                        {/* Замінили "Наша Місія" */}
                        <h2 className="text-3xl font-bold text-t-primary mb-6">{tCommon('missionTitle')}</h2>
                        <div className="glass-card p-8 rounded-2xl border-l-4 border-l-primary border-y-white/5 border-r-white/5">
                            <p className="text-lg text-t-primary font-medium italic leading-relaxed">
                                &#34;{tDetails(`${slug}.about.mission`)}&#34;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}