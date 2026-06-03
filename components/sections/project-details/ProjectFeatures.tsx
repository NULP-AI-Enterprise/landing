import { useTranslations } from 'next-intl';

const hasValue = (val?: string) => val && val.trim() !== '' && val.trim() !== '#';

interface Feature { icon?: string; version?: string; title?: string; desc?: string; color?: string; }

export default function ProjectFeatures({ items = [] }: { items?: Feature[] }) {
    const t = useTranslations('ProjectFeatures');

    // Фільтруємо масив: залишаємо лише ті елементи, де є хоч якась назва
    const validItems = items?.filter(f => hasValue(f.title)) || [];

    if (validItems.length === 0) return null;

    return (
        <section className="py-16 lg:py-24 bg-surface-card border-t border-glass">
            <div className="container mx-auto px-8">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-t-primary mb-6 tracking-tight">{t('title')}</h2>
                    <p className="text-lg text-t-muted font-light max-w-2xl italic">{t('subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {validItems.map((feature, i) => (
                        <div key={i} className="group glass-card rounded-[2rem] p-8 border-glass hover:border-primary/40 transition-all duration-500 hover:-translate-y-2">
                            <div className="flex items-center justify-between mb-8">
                                <span className={`material-symbols-outlined text-4xl ${feature.color || 'text-primary'} group-hover:scale-110 transition-transform`}>
                                    {hasValue(feature.icon) ? feature.icon : 'extension'}
                                </span>
                                {hasValue(feature.version) && (
                                    <span className="text-[10px] font-mono text-t-muted bg-glass px-3 py-1.5 rounded-lg border border-glass-hover uppercase tracking-[0.2em]">
                                        {feature.version}
                                    </span>
                                )}
                            </div>
                            <h4 className="text-xl font-bold text-t-primary mb-4 tracking-tight group-hover:text-primary transition-colors">
                                {feature.title}
                            </h4>
                            {hasValue(feature.desc) && (
                                <p className="text-xs text-t-muted font-light leading-loose">
                                    {feature.desc}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}