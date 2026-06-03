import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UnitsHero from "@/components/sections/research-units/UnitsHero";
import UnitsGrid from "@/components/sections/research-units/UnitsGrid";
import UnitsResources from "@/components/sections/research-units/UnitsResources";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('researchUnits.title'),
        description: t('researchUnits.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/research-units`,
            languages: {
                'uk': `${SITE_URL}/uk/research-units`,
                'en': `${SITE_URL}/en/research-units`,
                'x-default': `${SITE_URL}/uk/research-units`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

export default async function ResearchUnitsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const nav = await getTranslations({ locale, namespace: 'Navbar' });

    return (
        <main>
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${locale}` },
                { name: nav('researchUnits'), href: `/${locale}/research-units` },
            ]} />
            <Navbar />
            <UnitsHero />
            <UnitsResources />
            <UnitsGrid />
            <Footer />
        </main>
    );
}
