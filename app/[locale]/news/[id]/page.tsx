import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ShareMenu from "@/components/sections/news/ShareMenu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const SITE_URL = 'https://app.thesis-i.com';
const API_INTERNAL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

async function getNewsById(id: string): Promise<any> {
    return null;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
    const { locale, id } = await params;
    const news = await getNewsById(id);
    const t = await getTranslations({ locale, namespace: 'NewsDetail' });

    if (!news) {
        return { title: t('notFound') };
    }

    const description = news.desc ? (news.desc as string).slice(0, 160) : undefined;

    return {
        title: news.title,
        description,
        alternates: {
            canonical: `${SITE_URL}/${locale}/news/${id}`,
            languages: {
                'uk': `${SITE_URL}/uk/news/${id}`,
                'en': `${SITE_URL}/en/news/${id}`,
                'x-default': `${SITE_URL}/uk/news/${id}`,
            },
        },
        openGraph: news.img ? {
            images: [{ url: news.img }],
        } : undefined,
    };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
    const resolvedParams = await params;
    const news = await getNewsById(resolvedParams.id);

    // Підключаємо переклади
    const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'NewsDetail' });
    const nav = await getTranslations({ locale: resolvedParams.locale, namespace: 'Navbar' });

    if (!news) {
        notFound();
    }

    let imagePath = news.img || '';
    if (typeof imagePath === 'string') {
        if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
            imagePath = news.img;
        } else if (basePath && !imagePath.startsWith(basePath)) {
            imagePath = `${basePath}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
        }
    }

    return (
        <main className="min-h-screen bg-surface pt-32 pb-24 selection:bg-primary selection:text-black">
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: news.title,
                datePublished: news.createdAt,
                ...(news.img ? { image: news.img } : {}),
                inLanguage: news.language === 'en' ? 'en' : 'uk',
                publisher: {
                    '@type': 'EducationalOrganization',
                    name: 'Department of AI Systems — Lviv Polytechnic',
                    url: SITE_URL,
                    logo: { '@type': 'ImageObject', url: `${SITE_URL}/ai-logo.svg` },
                },
                mainEntityOfPage: `${SITE_URL}/${resolvedParams.locale}/news/${resolvedParams.id}`,
            }} />

            {/* Використовуємо nav() замість тернарного оператора */}
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${resolvedParams.locale}` },
                { name: nav('news'), href: `/${resolvedParams.locale}/news` },
                { name: news.title, href: `/${resolvedParams.locale}/news/${resolvedParams.id}` },
            ]} />

            <Navbar />
            <article className="max-w-4xl mx-auto px-6 md:px-8">

                <Link
                    href={`/${resolvedParams.locale}/news`}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-t-muted hover:text-primary transition-colors mb-10 group"
                >
                    <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
                    {t('backToNews')}
                </Link>

                <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs font-black uppercase tracking-[0.2em] px-3 py-1.5 bg-primary/10 text-primary rounded-lg border border-primary/20">
                        {news.createdAt}
                    </span>
                    {/* Назву мови оригіналу статті залишаємо як є, це гарна практика */}
                    <span className="text-xs font-bold uppercase tracking-widest text-t-muted bg-glass px-3 py-1.5 rounded-lg border border-glass-hover">
                        {news.language === 'en' ? 'English' : 'Українська'}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-t-primary mb-12 tracking-tight leading-[1.1]">
                    {news.title}
                </h1>

                {imagePath && (
                    <div className="relative w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-14 border border-glass-hover shadow-2xl shadow-primary/5 bg-white/[0.02] flex items-center justify-center">
                        <Image
                            src={imagePath}
                            alt={news.title}
                            width={1920}
                            height={1080}
                            unoptimized
                            // w-full h-auto: висота підлаштовується під ширину оригінального фото
                            // max-h-[80vh] + object-contain: якщо фото дуже високе, воно не вийде за межі екрана
                            className="w-full h-auto max-h-[80vh] object-contain"
                            priority
                        />
                    </div>
                )}

                <div className="prose prose-invert prose-lg md:prose-xl max-w-none">
                    <p className="text-t-tertiary leading-relaxed font-light whitespace-pre-wrap">
                        {news.desc}
                    </p>
                </div>

                <div className="mt-20 pt-10 border-t border-glass-hover flex justify-between items-center mb-12">
                    <p className="text-sm text-t-muted">
                        {t('published')}: <span className="text-t-primary font-bold">{news.createdAt}</span>
                    </p>
                    <ShareMenu title={news.title} />
                </div>
            </article>
            <Footer />
        </main>
    );
}