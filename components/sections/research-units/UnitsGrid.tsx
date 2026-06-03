"use client";

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function UnitsGrid() {
    const t = useTranslations('ResearchUnits');
    const locale = useLocale();

    const icons = [
        'domain',           // 0: Somatic
        'analytics',        // 1: Data Science Club
        'rocket_launch',    // 2: StartUp Club
        'military_tech',    // 3: MillTech Club
        'code_blocks',      // 4: Algorithmic Programming Club
        'terminal',         // 5: GO Club
        'smart_toy',        // 6: Robotics Lab
        'psychology',       // 7: AI Lab
        'view_in_ar',       // 8: 3D Modelling Lab
        '360'               // 9: Virtual Tour
    ];

    return (
        <section className="py-24 bg-surface relative overflow-hidden rounded-[3rem] border border-glass mx-4 md:mx-8 mb-20 shadow-2xl shadow-primary/5" id="units">
            <div className="glow-sphere -top-24 -left-24 opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-t-primary tracking-tight mb-6">
                        {t('gridTitle')}
                    </h2>
                    <p className="text-t-secondary text-lg font-light max-w-2xl mx-auto leading-relaxed">
                        {t('gridDescription')}
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {icons.map((icon, i) => {
                        const slug = t(`units.${i}.slug`);
                        const isSomatic = slug === 'somatic';
                        const isTour = slug === 'virtual-tour';

                        const targetUrl = isSomatic 
                            ? 'https://getsomatic.com/' 
                            : isTour 
                                ? `/${locale}/tour` 
                                : `/${locale}/research-units/${slug}`;

                        return (
                            <div
                                key={i}
                                className="group relative glass-card rounded-[2.5rem] p-10 text-center flex flex-col items-center hover:-translate-y-3 hover:border-primary/40 transition-all duration-500 border-glass bg-surface-card/40 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 text-primary shadow-lg shadow-primary/5 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 relative z-10">
                                    <span className="material-symbols-outlined text-4xl">{icon}</span>
                                </div>

                                <h3 className="text-xl font-bold text-t-primary mb-4 tracking-tight group-hover:text-primary transition-colors relative z-10">
                                    {t(`units.${i}.title`)}
                                </h3>

                                <p className="text-sm text-t-muted leading-relaxed flex-grow mb-10 font-light relative z-10">
                                    {t(`units.${i}.desc`)}
                                </p>

                                <Link
                                    href={targetUrl}
                                    target={isSomatic ? "_blank" : "_self"}
                                    rel={isSomatic ? "noopener noreferrer" : ""}
                                    className="inline-flex items-center gap-2 text-primary group-hover:text-t-primary font-bold transition-all uppercase tracking-[0.2em] text-[10px] relative z-10"
                                >
                                    {t('viewDetails')}
                                    <span className={`material-symbols-outlined text-lg transform transition-transform duration-300 ${isSomatic ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : 'group-hover:translate-x-2'}`}>
                                        {isSomatic ? 'north_east' : 'arrow_right_alt'}
                                    </span>
                                </Link>

                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}