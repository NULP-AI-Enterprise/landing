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
    try {
        const validLangs = locale === 'uk' ? ['uk', 'ua'] : ['en'];

        let allMembers: any[] = [];
        let currentPage = 1;
        let totalPages = 1;

        const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

        while (currentPage <= totalPages) {
            const url = `${baseUrl}/department-web-api/teachers/v1?pageSize=30&pageNumber=${currentPage}`;

            const res = await fetch(url, {
                next: { revalidate: 60 }
            });

            if (!res.ok) {
                console.error(`API Error on page ${currentPage}: ${res.status}`);
                break;
            }

            const data = await res.json();

            if (data.content && Array.isArray(data.content)) {
                allMembers = [...allMembers, ...data.content];
            }

            const fetchedTotalPages = data.totalPages ?? data.page?.totalPages;

            if (typeof fetchedTotalPages === 'number') {
                totalPages = fetchedTotalPages;
                if (totalPages === 0) break;
            } else {
                break; // Якщо бекенд не віддав інформацію про сторінки, виходимо
            }

            currentPage++;
        }

        // Фільтруємо за масивом валідних мов
        const filteredByLanguage = allMembers.filter(member => validLangs.includes(member.language));

        return filteredByLanguage;

    } catch (e) {
        console.error("Failed to fetch team members from API:", e);
        return [];
    }
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
