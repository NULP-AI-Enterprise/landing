import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import RnD from "@/components/sections/RnD";
import Projects from "@/components/sections/Projects";
import Partners from "@/components/sections/Partners";
import Social from "@/components/sections/Social";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';
const API_INTERNAL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('home.title'),
        description: t('home.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}`,
            languages: {
                'uk': `${SITE_URL}/uk`,
                'en': `${SITE_URL}/en`,
                'x-default': `${SITE_URL}/uk`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

async function getLatestProjects(locale: string) {
    try {
        const res = await fetch(`${API_INTERNAL}/department-web-api/projects/v1?pageNumber=1&pageSize=20`, {
            cache: 'no-store'
        });

        if (!res.ok) return [];

        const data = await res.json();
        const allProjects = data.content || [];

        return allProjects
            .filter((proj: any) => {
                if (locale === 'uk') {
                    return proj.language === 'ua' || proj.language === 'uk';
                }
                return proj.language === 'en';
            })
            .slice(0, 3);

    } catch (e) {
        console.error("Помилка завантаження проєктів для головної:", e);
        return [];
    }
}

export default async function HomePage() {
    const locale = await getLocale();
    const latestProjects = await getLatestProjects(locale);

    return (
        <main>
            <BreadcrumbJsonLd items={[
                { name: locale === 'uk' ? 'Головна' : 'Home', href: `/${locale}` },
            ]} />
            <Navbar />
            <Hero />
            <About />
            <Education />
            <Partners />
            <RnD />
            <Projects initialProjects={latestProjects} />
            <Social />
            <Footer />
        </main>
    );
}
