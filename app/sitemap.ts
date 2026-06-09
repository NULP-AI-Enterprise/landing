import type { MetadataRoute } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

const UNIT_SLUGS = [
    'somatic', 'data-science-club', 'startup-club', 'milltech-club',
    'algorithmic-programming', 'go-club', 'robotics-lab', 'ai-lab', '3d-modelling',
];

const API_INTERNAL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function getProjectSlugs(): Promise<string[]> {
    return [];
}

async function getNewsIds(): Promise<string[]> {
    return [];
}

function staticRoute(
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
): MetadataRoute.Sitemap {
    return ['uk', 'en'].map((locale) => ({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
            languages: {
                uk: `${SITE_URL}/uk${path}`,
                en: `${SITE_URL}/en${path}`,
            },
        },
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [projectSlugs, newsIds] = await Promise.all([
        getProjectSlugs(),
        getNewsIds(),
    ]);

    const staticRoutes: MetadataRoute.Sitemap = [
        ...staticRoute('', 1.0, 'weekly'),
        ...staticRoute('/about', 0.8, 'monthly'),
        ...staticRoute('/team', 0.7, 'monthly'),
        ...staticRoute('/applicants', 0.9, 'monthly'),
        ...staticRoute('/applicants/bachelors', 0.8, 'monthly'),
        ...staticRoute('/applicants/masters', 0.8, 'monthly'),
        ...staticRoute('/rnd', 0.8, 'weekly'),
        ...staticRoute('/research-units', 0.8, 'weekly'),
        ...staticRoute('/news', 0.9, 'daily'),
        ...staticRoute('/contacts', 0.6, 'yearly'),
        ...staticRoute('/partners', 0.6, 'monthly'),
        ...staticRoute('/donate', 0.5, 'yearly'),
        ...staticRoute('/privacy-policy', 0.3, 'yearly'),
        ...staticRoute('/terms-of-use', 0.3, 'yearly'),
    ];

    const unitRoutes: MetadataRoute.Sitemap = UNIT_SLUGS.flatMap((slug) =>
        ['uk', 'en'].map((locale) => ({
            url: `${SITE_URL}/${locale}/research-units/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
            alternates: {
                languages: {
                    uk: `${SITE_URL}/uk/research-units/${slug}`,
                    en: `${SITE_URL}/en/research-units/${slug}`,
                },
            },
        })),
    );

    const projectRoutes: MetadataRoute.Sitemap = projectSlugs.flatMap((slug) =>
        ['uk', 'en'].map((locale) => ({
            url: `${SITE_URL}/${locale}/projects/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
            alternates: {
                languages: {
                    uk: `${SITE_URL}/uk/projects/${slug}`,
                    en: `${SITE_URL}/en/projects/${slug}`,
                },
            },
        })),
    );

    const newsRoutes: MetadataRoute.Sitemap = newsIds.flatMap((id) =>
        ['uk', 'en'].map((locale) => ({
            url: `${SITE_URL}/${locale}/news/${id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
            alternates: {
                languages: {
                    uk: `${SITE_URL}/uk/news/${id}`,
                    en: `${SITE_URL}/en/news/${id}`,
                },
            },
        })),
    );

    return [...staticRoutes, ...unitRoutes, ...projectRoutes, ...newsRoutes];
}
