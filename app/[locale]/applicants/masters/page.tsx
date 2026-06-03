import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Master from "@/components/sections/applicants/master";
import JsonLd from "@/components/JsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('masters.title'),
        description: t('masters.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/applicants/masters`,
            languages: {
                'uk': `${SITE_URL}/uk/applicants/masters`,
                'en': `${SITE_URL}/en/applicants/masters`,
                'x-default': `${SITE_URL}/uk/applicants/masters`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

export default async function MastersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });
    const nav = await getTranslations({ locale, namespace: 'Navbar' });

    return (
        <main>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'Course',
                name: locale === 'uk' ? 'Магістерська програма — Системи ШІ' : "Master's Program — AI Systems",
                description: t('masters.description'),
                provider: {
                    '@type': 'EducationalOrganization',
                    name: locale === 'uk'
                        ? 'Кафедра систем штучного інтелекту, Львівська політехніка'
                        : 'Department of AI Systems, Lviv Polytechnic',
                    url: SITE_URL,
                },
                inLanguage: locale === 'uk' ? 'uk' : 'en',
                educationalLevel: 'Master',
                timeToComplete: 'P1Y6M',
            }} />
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${locale}` },
                { name: nav('applicants'), href: `/${locale}/applicants` },
                { name: t('masters.title'), href: `/${locale}/applicants/masters` },
            ]} />
            <Navbar />
            <Master />
            <Footer />
        </main>
    );
}
