import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourContent from "@/components/sections/tour/TourContent";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('tour.title'),
        description: t('tour.description'),
        robots: { index: true, follow: true },
        alternates: {
            canonical: `${SITE_URL}/${locale}/tour`,
            languages: {
                'uk': `${SITE_URL}/uk/tour`,
                'en': `${SITE_URL}/en/tour`,
                'x-default': `${SITE_URL}/uk/tour`,
            },
        },
        openGraph: {
            title: t('tour.title'),
            description: t('tour.description'),
            url: `${SITE_URL}/${locale}/tour`,
            type: 'website',
            images: [
                {
                    url: '/research-unit.jpg',
                    width: 1200,
                    height: 630,
                    alt: t('tour.title'),
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('tour.title'),
            description: t('tour.description'),
            images: ['/research-unit.jpg'],
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

export default function VirtualTourPage() {
    return (
        <main className="bg-surface min-h-screen font-sans text-t-primary flex flex-col relative overflow-hidden">
            <Navbar />
            <TourContent />
            <Footer />
        </main>
    );
}
