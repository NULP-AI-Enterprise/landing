import { getLocale } from 'next-intl/server';
import PartnerCard, { Partner } from './PartnerCard';

async function getUniversities(locale: string): Promise<Partner[]> {
    try {
        const validLangs = locale === 'uk' ? ['uk', 'ua'] : ['en'];

        // 🔥 ВИПРАВЛЕНО: Використовуємо внутрішню адресу для серверних компонентів
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

        let allUniversities: Partner[] = [];
        let currentPage = 1;
        let totalPages = 1;

        while (currentPage <= totalPages) {
            const url = `${baseUrl}/department-web-api/universities/v1?pageSize=30&pageNumber=${currentPage}`;

            // 🔥 ВИПРАВЛЕНО: Вимикаємо кеш, щоб завжди отримувати свіжі дані
            const res = await fetch(url, {
                cache: 'no-store'
            });

            if (!res.ok) {
                console.error(`API Error on universities page ${currentPage}: ${res.status}`);
                break;
            }

            const data = await res.json();

            if (data.content && Array.isArray(data.content)) {
                allUniversities = [...allUniversities, ...data.content];
            }

            if (data.page && typeof data.page.totalPages === 'number') {
                totalPages = data.page.totalPages;
                if (totalPages === 0) break;
            } else if (data.totalPages && typeof data.totalPages === 'number') {
                totalPages = data.totalPages;
                if (totalPages === 0) break;
            } else {
                break;
            }

            currentPage++;
        }

        // Фільтруємо за масивом валідних мов
        return allUniversities
            .filter(uni => validLangs.includes(uni.language || ''))
            .map((uni, index) => ({
                ...uni,
                id: uni.id || `uni-${index}` // Якщо бекенд колись почне віддавати ID, використаємо його
            }));

    } catch (e) {
        console.error("Failed to fetch universities from API:", e);
        return [];
    }
}

export default async function PartnersSection() {
    const locale = await getLocale();
    const partners = await getUniversities(locale);

    return (
        <section className="py-24 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-t-primary mb-6 tracking-tight">
                        Наші партнери
                    </h2>
                    <div className="w-20 h-1 gradient-bg mx-auto rounded-full opacity-50"></div>
                </div>

                {partners.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {partners.map((partner, i) => (
                            <div
                                key={partner.id}
                                className="animate-in fade-in slide-in-from-bottom-6"
                                style={{ animationDelay: `${(i % 4) * 150}ms` }}
                            >
                                <PartnerCard partner={partner} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-t-muted py-10">
                        Партнерів не знайдено.
                    </div>
                )}
            </div>
        </section>
    );
}