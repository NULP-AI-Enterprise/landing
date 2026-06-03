import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Geoanalytics from "@/components/sections/applicants/geoanalys"; // Змініть шлях, якщо ваш компонент лежить в іншому місці
import JsonLd from "@/components/JsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('geoanalytics.title'),
        description: t('geoanalytics.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/applicants/geoanalytics`,
            languages: {
                'uk': `${SITE_URL}/uk/applicants/geoanalytics`,
                'en': `${SITE_URL}/en/applicants/geoanalytics`,
                'x-default': `${SITE_URL}/uk/applicants/geoanalytics`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

export default async function GeoanalyticsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });
    const nav = await getTranslations({ locale, namespace: 'Navbar' });

    return (
        <main>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'Course',
                name: locale === 'uk' ? 'Бакалаврська програма — Геоаналітика' : "Bachelor's Program — Geoanalytics",
                description: t('geoanalytics.description'),
                provider: {
                    '@type': 'EducationalOrganization',
                    name: locale === 'uk'
                        ? 'Кафедра СШІ та Кафедра ВГА, Львівська політехніка'
                        : 'Departments of AI Systems & Higher Geodesy, Lviv Polytechnic',
                    url: SITE_URL,
                },
                inLanguage: locale === 'uk' ? 'uk' : 'en',
                educationalLevel: 'Bachelor',
                timeToComplete: 'P4Y', // 4 роки для бакалаврату
            }} />
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${locale}` },
                { name: nav('applicants'), href: `/${locale}/applicants` },
                { name: t('geoanalytics.title'), href: `/${locale}/applicants/geoanalytics` },
            ]} />
            <Navbar />
            <Geoanalytics />
            <Footer />
        </main>
    );
}