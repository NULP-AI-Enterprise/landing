import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RndHero from "@/components/sections/rnd/RndHero";
import OngoingProjects from "@/components/sections/rnd/OngoingProjects";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';
const API_INTERNAL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('rnd.title'),
        description: t('rnd.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/rnd`,
            languages: {
                'uk': `${SITE_URL}/uk/rnd`,
                'en': `${SITE_URL}/en/rnd`,
                'x-default': `${SITE_URL}/uk/rnd`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

async function getProjects(locale: string) {
    try {
        const res = await fetch(`${API_INTERNAL}/department-web-api/projects/v1?pageNumber=1&pageSize=100`, {
            cache: 'no-store'
        });

        if (!res.ok) return [];

        const data = await res.json();
        const allProjects = data.content || [];

        return allProjects.filter((proj: any) => {
            if (locale === 'uk') {
                return proj.language === 'ua' || proj.language === 'uk';
            }
            return proj.language === 'en';
        });
    } catch (e) {
        console.error("Помилка завантаження проєктів:", e);
        return [];
    }
}

export default async function RndPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const nav = await getTranslations({ locale, namespace: 'Navbar' });
    const projects = await getProjects(locale);

    return (
        <main>
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${locale}` },
                { name: nav('rnd'), href: `/${locale}/rnd` },
            ]} />
            <Navbar />
            <RndHero />
            <OngoingProjects initialProjects={projects} />
            <Footer />
        </main>
    );
}
