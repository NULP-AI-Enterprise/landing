"use client";
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

// Автоматичні іконки для різних категорій проєктів
const categoryIcons: Record<string, string> = {
    international: 'public',
    national: 'account_balance',
    industrial: 'precision_manufacturing'
};

export default function OngoingProjects({ initialProjects = [] }: { initialProjects: any[] }) {
    const t = useTranslations('RndPage');
    const locale = useLocale();

    // Фільтруємо за мовою: для 'uk' показуємо і 'uk', і 'ua'
    const filteredByLanguage = initialProjects.filter(proj => {
        if (locale === 'uk') {
            return proj.language === 'ua' || proj.language === 'uk';
        }
        return proj.language === 'en' || proj.language === locale;
    });

    const renderCategory = (categoryKey: string) => {
        // Фільтруємо за категорією з вже відфільтрованого за мовою списку
        const filtered = filteredByLanguage.filter(p => p.hero?.category === categoryKey);

        // Якщо в категорії немає проєктів - не рендеримо цей блок взагалі
        if (filtered.length === 0) return null;

        const iconName = categoryIcons[categoryKey] || 'rocket_launch';

        return (
            <div className="mb-24 px-8" key={categoryKey}>
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-t-primary tracking-tight">
                        {t(`categories.${categoryKey}`)}
                    </h2>
                    <div className="flex-grow h-[1px] bg-gradient-to-r from-primary/30 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((proj) => (
                        <div key={proj.id || proj.slug} className="group relative p-8 rounded-[2.5rem] border border-glass bg-surface-card/30 transition-all duration-500 hover:border-primary/40 hover:-translate-y-2 flex flex-col h-full overflow-hidden shadow-2xl shadow-shadow">

                            {/* Іконка та лабораторія (партнер) */}
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <span className="material-symbols-outlined text-3xl">{iconName}</span>
                                </div>
                                <div className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.2em] text-right max-w-[120px] line-clamp-2">
                                    {proj.hero?.lab || 'AI HUB'}
                                </div>
                            </div>

                            {/* Назва */}
                            <h3 className="text-xl font-bold text-t-primary mb-6 leading-snug group-hover:text-primary transition-colors duration-300">
                                {proj.hero?.title || 'Без назви'}
                            </h3>

                            {/* Керівник та кнопка */}
                            <div className="mt-auto">
                                <div className="text-[9px] text-t-muted uppercase tracking-widest mb-1">{t('project.lead')}</div>
                                <div className="text-xs text-t-secondary font-light mb-8">
                                    {/* Беремо першого учасника команди як керівника */}
                                    {proj.team && proj.team.length > 0 ? proj.team[0].name : 'Не вказано'}
                                </div>

                                <Link
                                    href={`/${locale}/projects/${proj.slug}`}
                                    className="inline-flex items-center gap-3 py-3 px-6 rounded-xl border border-glass-hover text-t-primary text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary hover:border-primary hover:text-white hover:shadow-[0_0_20px_rgba(108,99,255,0.3)] transition-all duration-300 group/btn"
                                >
                                    {t('project.more')}
                                    <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                            </div>

                            {/* Декоративний градієнтний промінь знизу */}
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section className="py-20 bg-surface rounded-[3rem] border border-glass mx-4 md:mx-8 mb-20" id="projects">
            <div className="container mx-auto">
                {/* Рендеримо категорії (вони самі сховаються, якщо порожні) */}
                {renderCategory('international')}
                {renderCategory('national')}
                {renderCategory('industrial')}

                {/* Якщо з бекенду прийшов порожній масив */}
                {initialProjects.length === 0 && (
                    <div className="text-center text-t-muted py-10">Проєкти ще не додані або завантажуються...</div>
                )}
            </div>
        </section>
    );
}