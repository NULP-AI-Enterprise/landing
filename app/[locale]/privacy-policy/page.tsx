import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyPolicy from "@/components/sections/legal/PrivacyPolicy";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('privacyPolicy.title'),
        description: t('privacyPolicy.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/privacy-policy`,
            languages: {
                'uk': `${SITE_URL}/uk/privacy-policy`,
                'en': `${SITE_URL}/en/privacy-policy`,
                'x-default': `${SITE_URL}/uk/privacy-policy`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return (
        <main className="bg-surface min-h-screen">
            <BreadcrumbJsonLd items={[
                { name: locale === 'uk' ? 'Головна' : 'Home', href: `/${locale}` },
                { name: t('privacyPolicy.title'), href: `/${locale}/privacy-policy` },
            ]} />
            <Navbar />
            <PrivacyPolicy />
            <Footer />
        </main>
    );
}
