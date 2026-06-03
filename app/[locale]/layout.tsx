import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import ThemeProvider from "@/components/ThemeProvider";
import JsonLd from "@/components/JsonLd";
import "../globals.css";

const SITE_URL = 'https://app.thesis-i.com';

const manrope = Manrope({
    subsets: ["latin", "cyrillic"],
    variable: '--font-display',
    weight: ['300', '400', '500', '600', '700']
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    const alternateLocale = locale === 'uk' ? 'en' : 'uk';

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            template: `%s | ${t('siteName')}`,
            default: t('home.title'),
        },
        description: t('home.description'),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'uk': '/uk',
                'en': '/en',
                'x-default': '/uk',
            },
        },
        openGraph: {
            siteName: t('siteName'),
            locale: locale === 'uk' ? 'uk_UA' : 'en_US',
            alternateLocale: alternateLocale === 'uk' ? 'uk_UA' : 'en_US',
            type: 'website',
            images: [
                {
                    url: '/og-default.jpg',
                    width: 1200,
                    height: 630,
                    alt: t('siteName'),
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
        },
    };
}

export default async function RootLayout({
                                             children,
                                             params,
                                         }: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else{document.documentElement.setAttribute('data-theme','dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`,
                }}
            />
        </head>
        <body className={`${manrope.variable}`}>
        <JsonLd data={{
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: locale === 'uk'
                ? 'Кафедра систем штучного інтелекту'
                : 'Department of Artificial Intelligence Systems',
            url: SITE_URL,
            logo: `${SITE_URL}/ai-logo.svg`,
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'вул. Князя Романа 5, корп. 20',
                addressLocality: 'Львів',
                postalCode: '79000',
                addressCountry: 'UA',
            },
            parentOrganization: {
                '@type': 'CollegeOrUniversity',
                name: locale === 'uk'
                    ? 'Національний університет «Львівська політехніка»'
                    : 'Lviv Polytechnic National University',
                url: 'https://lpnu.ua',
            },
            contactPoint: {
                '@type': 'ContactPoint',
                email: 'ai.dept@lpnu.ua',
                contactType: 'general',
            },
            sameAs: [
                'https://www.instagram.com/ai.department.lpnu/',
                'https://www.facebook.com/ai.department.lpnu/',
            ],
        }} />
        <NextIntlClientProvider messages={messages} locale={locale}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
