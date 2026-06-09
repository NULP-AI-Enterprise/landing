import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamDirectory from '@/components/sections/team/TeamDirectory';
import TeamHero from '@/components/sections/team/TeamHero';
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('team.title'),
        description: t('team.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/team`,
            languages: {
                'uk': `${SITE_URL}/uk/team`,
                'en': `${SITE_URL}/en/team`,
                'x-default': `${SITE_URL}/uk/team`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

async function getTeamMembers(locale: string) {
    return [];
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const nav = await getTranslations({ locale, namespace: 'Navbar' });
    const members = await getTeamMembers(locale);

    return (
        <main className="bg-surface min-h-screen">
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${locale}` },
                { name: nav('team'), href: `/${locale}/team` },
            ]} />
            <Navbar />
            <TeamHero />
            <TeamDirectory initialMembers={members} />
            <Footer />
        </main>
    );
}
