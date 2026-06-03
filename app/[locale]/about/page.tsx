import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutPresentation from "@/components/sections/about/AboutPresentation";
import ResearchDirections from "@/components/sections/about/ResearchDirections";
import Faculty from "@/components/sections/about/Faculty";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('about.title'),
        description: t('about.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/about`,
            languages: {
                'uk': `${SITE_URL}/uk/about`,
                'en': `${SITE_URL}/en/about`,
                'x-default': `${SITE_URL}/uk/about`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const nav = await getTranslations({ locale, namespace: 'Navbar' });

    return (
        <main className="bg-surface min-h-screen">
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${locale}` },
                { name: nav('about'), href: `/${locale}/about` },
            ]} />
            <Navbar />
            <AboutHero />
            <AboutPresentation />
            <ResearchDirections />
            <Faculty />
            <Footer />
        </main>
    );
}
