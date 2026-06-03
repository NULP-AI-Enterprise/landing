import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonateContent from "@/components/sections/donate/DonateContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('donate.title'),
        description: t('donate.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/donate`,
            languages: {
                'uk': `${SITE_URL}/uk/donate`,
                'en': `${SITE_URL}/en/donate`,
                'x-default': `${SITE_URL}/uk/donate`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

export default async function DonatePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const nav = await getTranslations({ locale, namespace: 'Navbar' });

    return (
        <main className="bg-surface min-h-screen flex flex-col">
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${locale}` },
                { name: nav('donate'), href: `/${locale}/donate` },
            ]} />
            <Navbar />
            <DonateContent />
            <Footer />
        </main>
    );
}
