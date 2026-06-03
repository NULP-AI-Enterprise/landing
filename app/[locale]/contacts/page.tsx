import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactMap from "@/components/sections/contact/ContactMap";
import ContactResources from "@/components/sections/contact/ContactResources";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const SITE_URL = 'https://app.thesis-i.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('contacts.title'),
        description: t('contacts.description'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/contacts`,
            languages: {
                'uk': `${SITE_URL}/uk/contacts`,
                'en': `${SITE_URL}/en/contacts`,
                'x-default': `${SITE_URL}/uk/contacts`,
            },
        },
    };
}

export function generateStaticParams() {
    return [{ locale: 'uk' }, { locale: 'en' }];
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const nav = await getTranslations({ locale, namespace: 'Navbar' });

    return (
        <main>
            <BreadcrumbJsonLd items={[
                { name: nav('main'), href: `/${locale}` },
                { name: nav('contact'), href: `/${locale}/contacts` },
            ]} />
            <Navbar />
            <ContactHero />

            <section className="py-16 lg:py-24 relative bg-surface">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        <ContactInfo />
                        <ContactForm />
                    </div>
                </div>
            </section>

            <ContactMap />
            <ContactResources />

            <Footer />
        </main>
    );
}
