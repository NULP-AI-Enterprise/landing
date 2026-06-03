import JsonLd from './JsonLd';

interface BreadcrumbItem {
    name: string;
    href: string;
}

const SITE_URL = 'https://app.thesis-i.com';

export default function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.href}`,
        })),
    };

    return <JsonLd data={data} />;
}
