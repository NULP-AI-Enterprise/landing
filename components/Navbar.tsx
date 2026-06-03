"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import ThemeToggle from './ThemeToggle';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('Navbar');

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const switchLanguage = () => {
        const nextLocale = locale === 'uk' ? 'en' : 'uk';
        const newPath = pathname.replace(new RegExp(`^/${locale}`), `/${nextLocale}`);

        if (pathname === '/') {
            router.push(`/${nextLocale}`);
        } else {
            router.push(newPath);
        }
        router.refresh();
    };

    const navLinks = [
        { name: t('main'), href: `/${locale}` },
        { name: t('about'), href: `/${locale}/about` },
        { name: t('team'), href: `/${locale}/team` },
        { name: t('applicants'), href: `/${locale}/applicants` },
        { name: t('rnd'), href: `/${locale}/rnd` },
        { name: t('researchUnits'), href: `/${locale}/research-units` },
        { name: t('news'), href: `/${locale}/news` },
        { name: t('partners'), href: `/${locale}/partners` },
        { name: t('contact'), href: `/${locale}/contacts` },
        { name: t('tour'), href: `/${locale}/tour` },
    ];

    return (
        <>
            <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-glass shadow-lg shadow-shadow">
                <div className="container mx-auto px-6 md:px-8 h-24 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href={`/${locale}`} className="relative flex items-center hover:opacity-80 transition-opacity">
                            <Image
                                src={`${basePath}/ai-logo.svg`}
                                alt="AIS Logo"
                                width={120}
                                height={40}
                                className="logo-img object-contain h-10 w-auto"
                                unoptimized
                            />
                        </Link>
                    </div>

                    <div className="hidden xl:flex items-center space-x-8 text-[13px] font-medium tracking-wide">
                        {navLinks.map((link) => {
                            const isActive = link.href === `/${locale}`
                                ? pathname === `/${locale}` || pathname === `/${locale}/`
                                : pathname?.startsWith(link.href);

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`transition-all duration-300 relative py-2 ${
                                        isActive
                                            ? 'text-primary'
                                            : 'text-t-secondary hover:text-t-primary'
                                    }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-full shadow-[0_0_10px_rgba(108,99,255,0.8)]"></span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-5 md:gap-6">
                        <div
                            className="lang-toggle"
                            data-active={locale === 'uk' ? 'left' : 'right'}
                            onClick={switchLanguage}
                        >
                            <div className="lang-toggle__slider" />
                            <span className={`lang-toggle__label ${locale === 'uk' ? 'lang-toggle__label--active' : ''}`}>UA</span>
                            <span className={`lang-toggle__label ${locale === 'en' ? 'lang-toggle__label--active' : ''}`}>EN</span>
                        </div>
                        <ThemeToggle />
                        <Link
                            href={`/${locale}/donate`}
                            title={t('donate')}
                            className="flex items-center text-t-secondary hover:text-red-400 transition-all duration-300 hover:scale-110"
                        >
                            <span className="material-symbols-outlined text-[26px]">volunteer_activism</span>
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="xl:hidden text-t-primary hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined text-3xl">menu</span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`fixed inset-0 z-[60] bg-surface/95 backdrop-blur-2xl transition-all duration-500 xl:hidden flex flex-col ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="h-24 px-6 md:px-8 flex items-center justify-between border-b border-glass">
                    <Image
                        src={`${basePath}/ai-logo.svg`}
                        alt="AIS Logo"
                        width={100}
                        height={32}
                        className="logo-img object-contain h-8 w-auto"
                        unoptimized
                    />
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-t-secondary hover:text-t-primary transition-colors bg-glass p-2 rounded-full border border-glass-hover"
                        >
                            <span className="material-symbols-outlined text-2xl">close</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-10 px-8 flex flex-col gap-6">
                    {navLinks.map((link, i) => {
                        const isActive = link.href === `/${locale}`
                            ? pathname === `/${locale}` || pathname === `/${locale}/`
                            : pathname?.startsWith(link.href);

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-2xl font-bold tracking-tight transition-colors ${isActive ? 'text-primary' : 'text-t-tertiary hover:text-t-primary'}`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                </div>

                <div className="p-8 border-t border-glass bg-surface-card/50">
                    <Link
                        href={`/${locale}/donate`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 text-sm font-bold uppercase tracking-[0.2em]"
                    >
                        <span className="material-symbols-outlined text-xl">volunteer_activism</span>
                        {t('donate')}
                    </Link>
                </div>
            </div>
        </>
    );
}
