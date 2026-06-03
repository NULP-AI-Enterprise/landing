import { getTranslations, getLocale } from 'next-intl/server';
import clientPromise from '@/lib/mongodb';
import PartnerCard from './PartnerCard';

async function getUniversities(locale: string) {
    try {
        const client = await clientPromise;
        const db = client.db('lviv_ai');
        // У базі використовується "ua", у Next.js зазвичай "uk"
        const dbLang = locale === 'uk' ? 'ua' : 'en';

        const universities = await db.collection('universities')
            .find({ language: dbLang })
            .toArray();

        return universities.map(u => ({
            id: u._id.toString(),
            title: u.title || 'University',
            country: u.country || '',
            link: u.link || '#',
            photo: u.photo || null,
        }));
    } catch (e) {
        console.error("Помилка завантаження університетів:", e);
        return [];
    }
}

export default async function International() {
    const t = await getTranslations('International');
    const locale = await getLocale();
    const partners = await getUniversities(locale);

    return (
        <section className="bg-surface border-y border-glass py-32 relative overflow-hidden">
            {/* Фонова декоративна сітка */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #6C63FF 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            {/* Велика розмита сфера для глоу */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-6 block">
                        Global Education
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-t-primary mb-8 tracking-tighter">
                        {t('title')}
                    </h2>
                    <p className="text-t-secondary text-lg md:text-xl font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {partners.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {partners.map((partner) => (
                            <PartnerCard key={partner.id} partner={partner} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-glass rounded-[3rem] border border-glass border-dashed">
                        <span className="material-symbols-outlined text-5xl text-gray-700 mb-4 block">language_off</span>
                        <p className="text-t-muted font-light italic">Наразі список партнерів оновлюється...</p>
                    </div>
                )}
            </div>
        </section>
    );
}