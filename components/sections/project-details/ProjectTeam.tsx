import { useTranslations } from 'next-intl';

const hasValue = (val?: string) => val && val.trim() !== '' && val.trim() !== '#';

interface Member { name?: string; role?: string; desc?: string; highlight?: boolean; }

export default function ProjectTeam({ members = [] }: { members?: Member[] }) {
    const t = useTranslations('ProjectTeam');

    // Фільтруємо учасників без імені
    const validMembers = members?.filter(m => hasValue(m.name)) || [];

    if (validMembers.length === 0) return null;

    return (
        <section className="py-16 lg:py-24 bg-surface border-t border-glass">
            <div className="container mx-auto px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-t-primary mb-6 tracking-tight">{t('title')}</h2>
                    <div className="w-24 h-1 gradient-bg mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {validMembers.map((member, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <div className={`w-32 h-32 rounded-full bg-surface-card border-2 shadow-2xl transition-all duration-500 flex items-center justify-center relative mb-6
                                ${member.highlight ? 'border-[#80E9D4] shadow-[#80E9D4]/10' : 'border-primary/20 group-hover:border-primary'}
                            `}>
                                <div className={`absolute inset-0 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${member.highlight ? 'bg-[#80E9D4]' : 'bg-primary'}`}></div>
                                <span className="material-symbols-outlined text-5xl text-t-faint group-hover:text-primary transition-colors">
                                    person
                                </span>
                            </div>

                            <h4 className="text-xl font-bold text-t-primary mb-2 tracking-tight group-hover:text-primary transition-colors">
                                {member.name}
                            </h4>
                            {hasValue(member.role) && (
                                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${member.highlight ? 'text-[#80E9D4]' : 'text-primary'}`}>
                                    {member.role}
                                </p>
                            )}
                            {hasValue(member.desc) && (
                                <p className="text-xs text-t-muted font-light leading-relaxed px-4">
                                    {member.desc}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}