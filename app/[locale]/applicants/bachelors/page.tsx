import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Bachelor from "@/components/sections/applicants/bachelor";
import JsonLd from "@/components/JsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('bachelors.title'),
        description: t('bachelors.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/applicants/bachelors`,
            languages: {
                'uk': `${SITE_URL}/uk/applicants/bachelors`,
                'en': `${SITE_URL}/en/applicants/bachelors`,
                'x-default': `${SITE_URL}/uk/applicants/bachelors`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

export default async function BachelorsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });
    const nav = await getTranslations({ locale, namespace: 'Navbar' });

    return (
        <main>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'Course',
                name: locale === 'uk' ? 'Бакалаврська програма — Системи ШІ' : "Bachelor's Program — AI Systems",
                description: t('bachelors.description'),
                provider: {
                    '@type': 'EducationalOrganization',
                    name: locale === 'uk'
                        ? 'Кафедра систем штучного інтелекту, Львівська політехніка'
                        : 'Department of AI Systems, Lviv Polytechnic',
                    url: SITE_URL,
                },
                inLanguage: locale === 'uk' ? 'uk' : 'en',
                educationalLevel: 'Bachelor',
                timeToComplete: 'P4Y',
            }} />
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${locale}` },
                { name: nav('applicants'), href: `/${locale}/applicants` },
                { name: t('bachelors.title'), href: `/${locale}/applicants/bachelors` },
            ]} />
            <Navbar />
            <Bachelor />
            <Footer />
        </main>
    );
}
