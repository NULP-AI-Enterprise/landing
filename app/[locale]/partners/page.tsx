import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnersHero from "@/components/sections/partners/PartnersHero";
import PartnersGrid from "@/components/sections/partners/PartnersGrid";
import PartnershipForms from "@/components/sections/partners/PartnershipForms";
import PartnersCTA from "@/components/sections/partners/PartnersCTA";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('partners.title'),
        description: t('partners.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/partners`,
            languages: {
                'uk': `${SITE_URL}/uk/partners`,
                'en': `${SITE_URL}/en/partners`,
                'x-default': `${SITE_URL}/uk/partners`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const nav = await getTranslations({ locale, namespace: 'Navbar' });

    return (
        <main>
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${locale}` },
                { name: nav('partners'), href: `/${locale}/partners` },
            ]} />
            <Navbar />
            <div className="pt-24 pb-12 flex flex-col gap-16 container mx-auto px-8">
                <PartnersHero />
                <PartnersGrid />
                <PartnershipForms />
                <PartnersCTA />
            </div>
            <Footer />
        </main>
    );
}
