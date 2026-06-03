import { notFound } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectHero from '@/components/sections/project-details/ProjectHero';
import ProjectDetails from '@/components/sections/project-details/ProjectDetails';
import ProjectFeatures from '@/components/sections/project-details/ProjectFeatures';
import ProjectTeam from '@/components/sections/project-details/ProjectTeam';
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';
const API_INTERNAL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function getProjectBySlug(slug: string) {
    try {
        const res = await fetch(`${API_INTERNAL}/department-web-api/projects/v1?pageNumber=1&pageSize=1000`, { cache: 'no-store' });
        if (!res.ok) return null;

        const data = await res.json();
        const projects = data.content || [];
        return projects.find((p: any) => p.slug === slug) || null;
    } catch (e) {
        console.error("Помилка завантаження проєкту:", e);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        return { title: 'Project Not Found' };
    }

    const title = project.hero?.title || slug;
    const description = project.details?.description
        ? (project.details.description as string).slice(0, 160)
        : undefined;

    return {
        title,
        description,
        alternates: {
            canonical: `${SITE_URL}/${locale}/projects/${slug}`,
            languages: {
                'uk': `${SITE_URL}/uk/projects/${slug}`,
                'en': `${SITE_URL}/en/projects/${slug}`,
                'x-default': `${SITE_URL}/uk/projects/${slug}`,
            },
        },
    };
}

export default async function UniversalProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const projectTitle = project.hero?.title || slug;

    return (
        <>
            <BreadcrumbJsonLd items={[
                { name: locale === 'uk' ? 'Головна' : 'Home', href: `/${locale}` },
                { name: locale === 'uk' ? 'Проєкти' : 'Projects', href: `/${locale}/rnd` },
                { name: projectTitle, href: `/${locale}/projects/${slug}` },
            ]} />
            <Navbar />
            <main className="bg-surface min-h-screen">
                <ProjectHero data={project.hero} />
                <ProjectDetails data={project.details} />
                <ProjectFeatures items={project.features} />
                <ProjectTeam members={project.team} />
            </main>
            <Footer />
        </>
    );
}
