import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import FacultyCard from './FacultyCard';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Тягнемо реальні дані з вашого API
const fetchTopFacultyFromAPI = async (locale: string) => {
    try {
        const validLangs = locale === 'uk' ? ['uk', 'ua'] : ['en'];

        let allMembers: any[] = [];
        let currentPage = 1; // Пам'ятаємо, що ваш Swagger починає з 1
        let totalPages = 1;

        // 1. Стягуємо абсолютно всі сторінки з бекенду
        while (currentPage <= totalPages) {
            const url = `${baseUrl}/department-web-api/teachers/v1?pageSize=30&pageNumber=${currentPage}`;

            const res = await fetch(url, {
                next: { revalidate: 60 } // Кешуємо для швидкості
            });

            if (!res.ok) {
                console.error(`API Error on page ${currentPage}: ${res.status}`);
                break;
            }

            const data = await res.json();

            if (data.content && Array.isArray(data.content)) {
                allMembers = [...allMembers, ...data.content];
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

        // 2. Фільтруємо за мовою
        const filteredMembers = allMembers.filter(member => validLangs.includes(member.language));

        // 3. Сортуємо в JavaScript (хто без orderNumber - іде в кінець на 999)
        const sortedMembers = filteredMembers.sort((a, b) => {
            const orderA = a.orderNumber != null ? Number(a.orderNumber) : 999;
            const orderB = b.orderNumber != null ? Number(b.orderNumber) : 999;
            return orderA - orderB;
        });

        // 4. Беремо лише перших 4-х осіб (топ-керівництво)
        const top4Members = sortedMembers.slice(0, 4);

        // 5. Мапимо для карток (адаптуємо поля API під FacultyCardProps)
        return top4Members.map(member => ({
            id: member.id || Math.random().toString(),
            img: member.photoUrl || null,
            name: member.fullName || 'Ім\'я не вказано',
            role: member.jobPosition || 'Викладач',
        }));
    } catch (e) {
        console.error("Failed to fetch faculty from API:", e);
        return [];
    }
};

export default async function Faculty() {
    const t = await getTranslations('Faculty');
    const locale = await getLocale();

    // Стягуємо дані керівництва через API
    const facultyMembers = await fetchTopFacultyFromAPI(locale);

    return (
        <section className="pt-8 pb-12 md:pt-12 md:pb-20 border-t border-glass bg-surface relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-8 relative z-10">

                {/* Шапка секції з кнопкою "Переглянути всіх" */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-8">
                    <div>
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-700">
                            {t('subtitle')}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-t-primary tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {t('title')}
                        </h2>
                    </div>

                    {/* Кнопка-посилання на сторінку /team */}
                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        <Link
                            href={`/${locale}/team`}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-glass-hover bg-glass backdrop-blur-md text-t-primary hover:bg-glass-hover hover:border-glass-strong hover:-translate-y-1 transition-all text-[10px] font-bold tracking-[0.2em] uppercase"
                        >
                            {t('viewAll')}
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>

                {/* Сітка з 4 викладачів */}
                {facultyMembers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {facultyMembers.map((member, i) => (
                            <div
                                key={member.id}
                                className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                                style={{ animationDelay: `${i * 150}ms` }}
                            >
                                <FacultyCard member={member} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-t-muted py-10">
                        Викладачів не знайдено.
                    </div>
                )}
            </div>
        </section>
    );
}