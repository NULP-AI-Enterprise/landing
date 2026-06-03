import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

// 1. Отримуємо базовий шлях з нашого next.config
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// 2. Додаємо 4-ту картинку для Геоаналітики (наприклад, welcome2.jpg або будь-яку іншу)
const programImageNumbers = [1, 8, 10, 4];

export default function Programs() {
    const t = useTranslations('Programs');
    const locale = useLocale();

    // Додано індекс 3 для Геоаналітики
    const programsCount = [0, 1, 2, 3];

    // Допоміжна функція для внутрішніх посилань ("Дізнатись більше")
    const getLearnMoreLink = (index: number, currentLocale: string) => {
        if (index === 0) return `/${currentLocale}/applicants/bachelors`;
        if (index === 1) return `/${currentLocale}/applicants/masters`;
        if (index === 3) return `/${currentLocale}/applicants/geoanalytics`; // Нова програма
        return '#';
    };

    // Допоміжна функція для зовнішніх посилань ("Детальніше про програму")
    const getProgramLink = (index: number) => {
        if (index === 0) return 'https://directory-new.lpnu.ua/majors/ikni/6.122.00.13/8/2023/ua/full';
        if (index === 1) return 'https://directory-new.lpnu.ua/majors/ikni/8.F3.00.04/19/2025/ua/full';
        if (index === 2) return 'https://directory-new.lpnu.ua/majors/dta/9.F3.00.00/51/2025/ua/full';
        // Для Геоаналітики (індекс 3) поки повертаємо '#', оскільки її ще може не бути в каталозі
        return '#';
    };

    return (
        <section className="bg-surface py-24 relative">
            <div className="container mx-auto px-8 space-y-40">
                {programsCount.map((index) => {
                    const isReverse = index % 2 !== 0; // Забезпечить красиву шахматну сітку (ліворуч-праворуч)

                    return (
                        <div key={index} className={`flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}>
                            {/* Текстовий блок */}
                            <div className="lg:w-1/2 relative">
                                <div className={`absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary to-transparent ${isReverse ? 'left-0 lg:hidden' : 'left-0 ml-3'}`}></div>

                                <div className={`relative ${isReverse ? 'pl-12 lg:pl-0 lg:pr-12' : 'pl-12'}`}>
                                    <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-3 block opacity-80">
                                        {t('badge')}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-bold text-t-primary mb-10 tracking-tight">
                                        {t(`levels.${index}.level`)}
                                    </h2>

                                    <div className="space-y-10 relative">
                                        {[0, 1, 2].map((bulletIdx) => (
                                            <div key={bulletIdx} className="flex gap-6">
                                                <div className={`flex-shrink-0 w-3 h-3 rounded-full bg-primary mt-2 ring-4 ring-primary/20 ${isReverse ? '-ml-[3.15rem] lg:hidden' : '-ml-[3.15rem]'}`}></div>
                                                <p className="text-t-secondary text-lg leading-relaxed font-light">
                                                    {t(`levels.${index}.bullets.${bulletIdx}`)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Блок з кнопками */}
                                    <div className="mt-12 flex flex-wrap items-center gap-8">

                                        {/* "Дізнатись більше" - показуємо для всіх, ОКРІМ PhD (індекс 2) */}
                                        {index !== 2 && (
                                            <Link href={getLearnMoreLink(index, locale)} className="gradient-bg px-8 py-4 text-xs tracking-widest uppercase font-bold rounded-full text-t-primary hover:brightness-110 transition-all shadow-[0_0_20px_rgba(108,99,255,0.3)]">
                                                {t('buttons.learnMore')}
                                            </Link>
                                        )}

                                        {/* "Детальніше про програму" - показуємо тільки якщо є реальне посилання */}
                                        {getProgramLink(index) !== '#' && (
                                            <Link href={getProgramLink(index)} target="_blank" rel="noopener noreferrer" className="text-t-secondary hover:text-t-primary inline-flex items-center font-medium transition-colors gap-2 text-sm uppercase tracking-wider">
                                                <span className="material-symbols-outlined text-xl">link</span>
                                                {t('buttons.programDetails')}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Блок з картинкою */}
                            <div className="lg:w-1/2 w-full">
                                <div className="glass-card rounded-[2.5rem] p-4 shadow-2xl group transition-transform duration-500 md:hover:-translate-y-2 border-glass bg-surface-card/40">
                                    <div className="aspect-video bg-surface-card rounded-[2rem] overflow-hidden mb-6 relative">
                                        <Image
                                            src={`${basePath}/students/welcome${programImageNumbers[index]}.jpg`}
                                            alt={t(`levels.${index}.level`)}
                                            fill
                                            unoptimized
                                            className="object-cover transition-all duration-700 opacity-100 grayscale-0 md:opacity-60 md:grayscale md:group-hover:grayscale-0 md:group-hover:opacity-100"
                                        />
                                    </div>
                                    <div className="px-6 pb-6">
                                        <h3 className="text-2xl font-bold text-t-primary mb-1">
                                            {t(`levels.${index}.title`)}
                                        </h3>
                                        <p className="text-primary font-bold opacity-80 uppercase tracking-widest text-[10px]">
                                            {t(`levels.${index}.subtitle`)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}