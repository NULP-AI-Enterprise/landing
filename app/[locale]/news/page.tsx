import UpcomingEvents from "@/components/sections/news/UpcomingEvents";
import NewsArchive from "@/components/sections/news/NewsArchive";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsHero from "@/components/sections/news/NewsHero";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';
const API_INTERNAL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('news.title'),
        description: t('news.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/news`,
            languages: {
                'uk': `${SITE_URL}/uk/news`,
                'en': `${SITE_URL}/en/news`,
                'x-default': `${SITE_URL}/uk/news`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

async function getNews() {
    try {
        const res = await fetch(`${API_INTERNAL}/department-web-api/news/v1?pageNumber=1&pageSize=100`, {
            cache: 'no-store'
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.content || [];
    } catch (e) {
        console.error("Помилка завантаження новин:", e);
        return [];
    }
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const nav = await getTranslations({ locale, namespace: 'Navbar' });
    const allNews = await getNews();

    const now = new Date();
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const recentNews: any[] = [];
    const archiveNews: any[] = [];

    allNews.forEach((item: any) => {
        const newsDate = new Date(item.createdAt);
        if (newsDate >= twoWeeksAgo) {
            recentNews.push(item);
        } else {
            archiveNews.push(item);
        }
    });

    recentNews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    archiveNews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <main className="min-h-screen bg-surface">
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${locale}` },
                { name: nav('news'), href: `/${locale}/news` },
            ]} />
            <Navbar />
            <NewsHero />
            <UpcomingEvents initialEvents={recentNews} />
            <NewsArchive initialNews={archiveNews} />
            <Footer />
        </main>
    );
}
