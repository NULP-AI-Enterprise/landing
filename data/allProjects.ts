// data/allProjects.ts

export interface Project {
    slug: string;
    cat: 'international' | 'national' | 'industrial';
    title: string;
    partner: string;
    leads: string;
    icon: string;
}

export const allProjects: Project[] = [
    // МІЖНАРОДНІ
    { slug: "ai-trust", cat: "international", title: "Horizon Europe: AI-Trust", partner: "EU Commission", leads: "Наталія Шаховська", icon: "security" },
    { slug: "smart-agri", cat: "international", title: "Erasmus+ SmartAgri", partner: "EU Partners", leads: "R&D Team", icon: "agriculture" },
    { slug: "machine-price", cat: "international", title: "Machine type price prediction", partner: "Lectura (Німеччина)", leads: "Н. Шаховська, Н. Бойко", icon: "payments" },
    { slug: "patient-hae", cat: "international", title: "Реєстр пацієнтів (HAE)", partner: "Takeda (Японія)", leads: "Н. Шаховська, Н. Мельникова", icon: "monitor_heart" },
    { slug: "comm-services", cat: "international", title: "Супровод комунікаційних послуг", partner: "НОВАР (Швейцарія)", leads: "Н. Мельникова, Є. Орза", icon: "support_agent" },

    // НАЦІОНАЛЬНІ
    { slug: "kindergarten-queue", cat: "national", title: "Електронна черга до садків", partner: "Львівська обласна рада", leads: "Н. Шаховська, П. Поберейко", icon: "child_care" },
    { slug: "archive-dalo", cat: "national", title: "Цифровий архів ДАЛО", partner: "Державний архів Львівської області", leads: "Наталія Шаховська", icon: "inventory_2" },
    { slug: "lost-relics", cat: "national", title: "Втрачені реліквії (XR)", partner: "Львівська обласна рада", leads: "Н. Шаховська, Н. Мельникова", icon: "history_edu" },
    { slug: "knyhokrai", cat: "national", title: "Книгокрай", partner: "Львівська обласна рада", leads: "Н. Шаховська, Д. Пастушенко", icon: "auto_stories" },
    { slug: "immune-register", cat: "national", title: "Реєстр пацієнтів з імунодефіцитом", partner: "БФ Біофарма / ЛБОЛІР", leads: "Н. Шаховська, Н. Мельникова", icon: "medical_services" },

    // ІНДУСТРІАЛЬНІ
    { slug: "city-traffic", cat: "industrial", title: "City Traffic Management", partner: "Lviv Smart City", leads: "R&D Lab", icon: "traffic" },
    { slug: "niania-chat", cat: "industrial", title: "Niania24 Chat AI", partner: "Startup niania24chat", leads: "Євгеній Орза", icon: "chat" },
    { slug: "part-accounting", cat: "industrial", title: "Автоматичний облік деталей", partner: "СФЕРОС-ЕЛЕКТРОН", leads: "Н. Шаховська, Н. Мельникова", icon: "settings_suggest" },
    { slug: "puzzle-ready", cat: "industrial", title: "Визначення готовності пазлів", partner: "Pecode OU", leads: "О. Басистюк, І. Думин", icon: "extension" },
    { slug: "unbroken-monitoring", cat: "industrial", title: "AI моніторинг Unbroken", partner: "Перше ТМО / Unbroken", leads: "Команда СШІ", icon: "visibility" },
    { slug: "time-space", cat: "industrial", title: "Time and Space", partner: "ТОВ ТАЙМ ЕНД СПЕЙС", leads: "Н. Шаховська, С. Лясковська", icon: "table_restaurant" },
    { slug: "leocart", cat: "industrial", title: "Система обліку Леокарт", partner: "Колегія студентів", leads: "Student R&D", icon: "credit_card" }
];