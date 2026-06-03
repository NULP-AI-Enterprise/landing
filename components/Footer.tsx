import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

// Отримуємо базовий шлях
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Footer() {
    const locale = useLocale();
    const t = useTranslations('Footer');

    return (
        <footer className="bg-surface text-t-primary pt-20 md:pt-24 pb-12 border-t border-glass relative overflow-hidden">
            {/* Легке світіння на фоні футера */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_top_right,rgba(108,99,255,0.03),transparent_60%)] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20 mb-20 md:mb-24">

                    {/* Ліва колонка (Лого та соцмережі) */}
                    <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                            <Image
                                src={`${basePath}/ai-logo.svg`}
                                alt="AIS Logo"
                                width={80}
                                height={80}
                                className="object-contain h-16 w-auto"
                                unoptimized
                            />
                            <div>
                                <span className="text-2xl md:text-3xl font-bold tracking-tight uppercase leading-none block text-t-primary mb-2">
                                    {t('titleTop')}
                                </span>
                                <span className="text-t-muted text-base md:text-lg font-light tracking-wide">
                                    {t('titleBottom')}
                                </span>
                            </div>
                        </div>

                        <div className="mb-12">
                            <Link href={`/${locale}/applicants`} className="inline-flex items-center px-10 py-4 rounded-xl bg-primary/10 text-primary border border-primary/20 font-bold text-[10px] uppercase tracking-[0.25em] hover:bg-primary hover:text-white hover:shadow-[0_0_20px_rgba(108,99,255,0.3)] transition-all duration-300">
                                {t('admissionBtn')}
                            </Link>
                        </div>
                    </div>

                    {/* Навігація */}
                    <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-t-faint mb-8">
                            {t('infoHeading')}
                        </h5>
                        <ul className="space-y-5 text-base md:text-sm font-light text-t-secondary">
                            <li><Link href={`/${locale}`} className="hover:text-primary transition-colors">{t('nav.main')}</Link></li>
                            <li><Link href={`/${locale}/about`} className="hover:text-primary transition-colors">{t('nav.about')}</Link></li>
                            <li><Link href={`/${locale}/team`} className="hover:text-primary transition-colors">{t('nav.team')}</Link></li>
                            <li><Link href={`/${locale}/applicants`} className="hover:text-primary transition-colors">{t('nav.applicants')}</Link></li>
                            <li><Link href={`/${locale}/rnd`} className="hover:text-primary transition-colors">{t('nav.rnd')}</Link></li>
                            <li><Link href={`/${locale}/tour`} className="hover:text-primary transition-colors">{t('nav.tour')}</Link></li>
                        </ul>
                    </div>

                    {/* Контакти */}
                    <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-t-faint mb-8">
                            {t('contactHeading')}
                        </h5>
                        <ul className="space-y-6">
                            <li className="flex flex-col md:flex-row items-center gap-4 text-base md:text-sm text-t-secondary">
                                <span className="material-symbols-outlined text-primary text-2xl md:text-xl">mail</span>
                                <a href="mailto:ai.dept@lpnu.ua" className="hover:text-t-primary transition-colors">ai.dept@lpnu.ua</a>
                            </li>
                            <li className="flex flex-col md:flex-row items-center gap-4 text-base md:text-sm text-t-secondary">
                                <span className="material-symbols-outlined text-primary text-2xl md:text-xl">location_on</span>
                                <span>{t('address')}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Копірайт та юридична інформація */}
                <div className="pt-10 border-t border-glass flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] md:text-[10px] font-bold text-t-faint uppercase tracking-[0.2em] md:tracking-[0.3em] text-center md:text-left">

                    {/* Ліва частина: Копірайт */}
                    <p className="md:w-1/3 text-center md:text-left">{t('copyright')}</p>

                    {/* 🔥 Центральна частина: Акуратне лого Thesis-i 🔥 */}
                    <div className="md:w-1/3 flex justify-center">
                        <a
                            href="https://www.thesis-i.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            // Змінено: додано flex-col та змінено gap на 1.5 для кращого компонування
                            className="group flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-all duration-500"
                            title="Powered by Thesis-i"
                        >
                            <Image
                            src={`${basePath}/ts.png`}
                            alt="Ts"
                            width={60}
                            height={20}
                            className="h-4 md:h-5 w-auto object-contain relative z-10 grayscale group-hover:grayscale-0 group-hover:drop-shadow-[0_0_12px_rgba(108,99,255,0.8)] transition-all duration-500"
                            unoptimized
                        />

                            <span className="text-[8px] md:text-[9px] font-medium text-t-muted uppercase tracking-widest group-hover:text-t-tertiary transition-colors">
                                Powered by Thesis-I
                            </span>

                            <div className="relative flex items-center justify-center mt-1">
                                {/* Світіння приховане за замовчуванням (opacity-0), з'являється тільки на hover */}
                                <div className="absolute inset-0 bg-primary/40 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>


                            </div>
                        </a>
                    </div>

                    {/* Права частина: Посилання */}
                    <div className="md:w-1/3 flex flex-wrap justify-center md:justify-end gap-8 md:gap-12">
                        <Link href={`/${locale}/privacy-policy`} className="hover:text-t-primary transition-colors">{t('privacy')}</Link>
                        <Link href={`/${locale}/terms-of-use`} className="hover:text-t-primary transition-colors">{t('terms')}</Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}