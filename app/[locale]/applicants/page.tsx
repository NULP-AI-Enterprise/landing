import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplicantsHero from "@/components/sections/applicants/ApplicantsHero";
import Programs from "@/components/sections/applicants/Programs";
import International from "@/components/sections/applicants/International";
import Testimonial from "@/components/sections/applicants/Testimonial";
import JsonLd from "@/components/JsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('applicants.title'),
        description: t('applicants.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/applicants`,
            languages: {
                'uk': `${SITE_URL}/uk/applicants`,
                'en': `${SITE_URL}/en/applicants`,
                'x-default': `${SITE_URL}/uk/applicants`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

export default async function ApplicantsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });
    const nav = await getTranslations({ locale, namespace: 'Navbar' });

    return (
        <main>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        item: {
                            '@type': 'Course',
                            name: locale === 'uk' ? 'Системи штучного інтелекту' : 'Artificial Intelligence Systems',
                            description: t('applicants.description'),
                            url: `${SITE_URL}/${locale}/applicants`,
                            provider: {
                                '@type': 'EducationalOrganization',
                                name: locale === 'uk'
                                    ? 'Кафедра систем штучного інтелекту, Львівська політехніка'
                                    : 'Department of AI Systems, Lviv Polytechnic',
                                url: SITE_URL,
                            },
                            inLanguage: locale === 'uk' ? 'uk' : 'en',
                            educationalLevel: 'Bachelor, Master',
                        }
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        item: {
                            '@type': 'Course',
                            name: locale === 'uk' ? 'Геоаналітика' : 'Geoanalytics',
                            description: locale === 'uk'
                                ? 'Інноваційна міждисциплінарна бакалаврська програма на перетині комп\'ютерних наук та наук про Землю.'
                                : 'Innovative interdisciplinary bachelor\'s program at the intersection of computer science and Earth sciences.',
                            url: `${SITE_URL}/${locale}/applicants/geoanalytics`,
                            provider: {
                                '@type': 'EducationalOrganization',
                                name: locale === 'uk'
                                    ? 'Кафедра СШІ та Кафедра ВГА, Львівська політехніка'
                                    : 'Departments of AI Systems & Higher Geodesy, Lviv Polytechnic',
                                url: SITE_URL,
                            },
                            inLanguage: locale === 'uk' ? 'uk' : 'en',
                            educationalLevel: 'Bachelor',
                            timeToComplete: 'P4Y'
                        }
                    }
                ]
            }} />
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${locale}` },
                { name: nav('applicants'), href: `/${locale}/applicants` },
            ]} />
            <Navbar />
            <ApplicantsHero />

            {/* Не забудьте додати картку/посилання на Геоаналітику всередині компонента Programs */}
            <Programs />

            <International />
            <Testimonial />
            <Footer />
        </main>
    );
}