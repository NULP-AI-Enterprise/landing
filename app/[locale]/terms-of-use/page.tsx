import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TermsOfUse from "@/components/sections/legal/TermsOfUse";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('termsOfUse.title'),
        description: t('termsOfUse.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/terms-of-use`,
            languages: {
                'uk': `${SITE_URL}/uk/terms-of-use`,
                'en': `${SITE_URL}/en/terms-of-use`,
                'x-default': `${SITE_URL}/uk/terms-of-use`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

export default async function TermsOfUsePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return (
        <main className="bg-surface min-h-screen">
            <BreadcrumbJsonLd items={[
                { name: locale === 'uk' ? 'Головна' : 'Home', href: `/${locale}` },
                { name: t('termsOfUse.title'), href: `/${locale}/terms-of-use` },
            ]} />
            <Navbar />
            <TermsOfUse />
            <Footer />
        </main>
    );
}
