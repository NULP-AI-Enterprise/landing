import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UnitHero from '@/components/sections/unit-details/UnitHero';
import UnitAbout from '@/components/sections/unit-details/UnitAbout';
import UnitAreas from '@/components/sections/unit-details/UnitAreas';
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

const UNIT_SLUGS = [
    'somatic', 'data-science-club', 'startup-club', 'milltech-club',
    'algorithmic-programming', 'go-club', 'robotics-lab', 'ai-lab', '3d-modelling',
];

export function generateStaticParams() {
    return UNIT_SLUGS.flatMap(slug => [
        { locale: 'uk', slug },
        { locale: 'en', slug },
    ]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'ResearchUnits' });

    // Try to find unit name from translations
    let unitName = slug;
    try {
        const units = t.raw('units') as Array<{ slug: string; title: string; desc: string }>;
        const unit = units.find((u) => u.slug === slug);
        if (unit) {
            unitName = unit.title;
        }
    } catch {
        // fallback to slug
    }

    return {
        title: unitName,
        description: t('subtitle'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/research-units/${slug}`,
            languages: {
                'uk': `${SITE_URL}/uk/research-units/${slug}`,
                'en': `${SITE_URL}/en/research-units/${slug}`,
                'x-default': `${SITE_URL}/uk/research-units/${slug}`,
            },
        },
    };
}

export default async function UnitPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const resolvedParams = await params;
    const { locale, slug: currentSlug } = resolvedParams;
    const t = await getTranslations({ locale, namespace: 'ResearchUnits' });
    const nav = await getTranslations({ locale, namespace: 'Navbar' });

    let unitName = currentSlug;
    try {
        const units = t.raw('units') as Array<{ slug: string; title: string }>;
        const unit = units.find((u) => u.slug === currentSlug);
        if (unit) unitName = unit.title;
    } catch { /* fallback */ }

    return (
        <main className="bg-surface min-h-screen text-t-primary font-sans overflow-hidden">
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${locale}` },
                { name: nav('researchUnits'), href: `/${locale}/research-units` },
                { name: unitName, href: `/${locale}/research-units/${currentSlug}` },
            ]} />
            <Navbar />
            <UnitHero slug={currentSlug} />
            <UnitAbout slug={currentSlug} />
            <UnitAreas slug={currentSlug} />
            <Footer />
        </main>
    );
}
