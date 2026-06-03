import type { MetadataRoute } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/*/settings/', '/*/tour', '/api/', '/_next/'],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
