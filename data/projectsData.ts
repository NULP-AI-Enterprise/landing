// data/projectsData.ts

export const projectsData = {
    // --- МІЖНАРОДНІ ПРОЄКТИ ---
    "ai-trust": {
        hero: {
            lab: "AI Lab",
            category: "International",
            title: "Horizon Europe: AI-Trust",
            desc: "Розробка пояснюваних моделей ШІ для систем прийняття критичних рішень у безпілотних автомобілях.",
            image: "/students/welcome1.jpg",
            links: { portal: "#", github: "#" }
        },
        details: {
            challenge: "Сучасні системи автономного водіння діють як 'чорні скриньки', що обмежує довіру суспільства та регуляторів.",
            solution: "Нейро-символічна архітектура, що поєднує глибоке навчання з логічним висновком.",
            results: "Точність 94% у міських сценаріях з наданням верифікованих пояснень кожного маневру."
        },
        features: [
            { icon: 'security', version: 'v2.1', title: 'AI Transparency', desc: 'Пояснюваність алгоритмів прийняття рішень.', color: 'text-primary' }
        ],
        team: [{ name: 'Наталія Шаховська', role: 'Керівник проєкту', desc: 'Професор, д.т.н.' }]
    },
    "smart-agri": {
        hero: {
            lab: "R&D Lab",
            category: "International",
            title: "Erasmus+ SmartAgri",
            desc: "Автоматизовані рої дронів для точного землеробства та моніторингу стану врожаю.",
            image: "/students/welcome2.jpg",
            links: { portal: "#", github: "#" }
        },
        details: {
            challenge: "Необхідність мінімізації використання добрив та точного виявлення хвороб рослин на ранніх стадіях.",
            solution: "Використання мультиспектральних камер та алгоритмів комп'ютерного зору для аналізу полів.",
            results: "Зменшення витрат ресурсів на 20% завдяки точковому внесенню засобів захисту."
        },
        features: [
            { icon: 'agriculture', version: 'v1.0', title: 'Drone Swarms', desc: 'Координація групи БПЛА для аналізу великих площ.', color: 'text-[#80E9D4]' }
        ],
        team: [{ name: 'R&D Team', role: 'Розробники', desc: 'Кафедра СШІ' }]
    },
    "machine-price": {
        hero: { lab: "Data Science Lab", category: "International", title: "Machine type price prediction", desc: "Прогнозування вартості промислової техніки.", image: "/students/welcome4.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Ненадано інформації", solution: "Алгоритми машинного навчання для аналізу ринкових даних Lectura.", results: "Висока точність оцінки активів." },
        features: [],
        team: [{ name: 'Наталія Шаховська', role: 'Керівник', desc: 'Кафедра СШІ' }, { name: 'Наталя Бойко', role: 'Експерт', desc: 'Кафедра СШІ' }]
    },
    "patient-hae": {
        hero: { lab: "Medical AI", category: "International", title: "Реєстр пацієнтів (HAE)", desc: "Електронний реєстр пацієнтів зі спадковим ангіоневротичним набряком.", image: "/students/welcome5.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Складність збору та систематизації даних пацієнтів з рідкісними захворюваннями.", solution: "Безпечна хмарна платформа для моніторингу стану пацієнтів.", results: "Покращення координації між лікарями та фармацевтичною компанією Takeda." },
        features: [{ icon: 'monitor_heart', version: 'v1.0', title: 'Medical Security', desc: 'Захист персональних медичних даних.', color: 'text-primary' }],
        team: [{ name: 'Наталія Шаховська', role: 'Керівник', desc: '' }, { name: 'Наталя Мельникова', role: 'Керівник', desc: '' }]
    },
    "comm-services": {
        hero: { lab: "NLP Lab", category: "International", title: "Супровод комунікаційних послуг", desc: "Розробка систем для покращення взаємодії з клієнтами компанії НОВАР.", image: "/students/welcome6.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Не надано інформації", solution: "Інтелектуальні системи обробки запитів.", results: "Оптимізація роботи сервісу підтримки." },
        features: [],
        team: [{ name: 'Наталя Мельникова', role: 'Керівник', desc: '' }, { name: 'Євген Орза', role: 'Розробник', desc: '' }]
    },

    // --- НАЦІОНАЛЬНІ ПРОЄКТИ ---
    "kindergarten-queue": {
        hero: { lab: "Software Lab", category: "National", title: "Електронна черга до садків", desc: "Система автоматичного обліку та реєстрації дітей у дошкільні заклади Львівщини.", image: "/students/welcome7.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Прозорість та автоматизація процесу зарахування дітей.", solution: "Розподілена система з валідацією даних.", results: "Успішне впровадження у Львівській області." },
        features: [{ icon: 'child_care', version: 'Prod', title: 'Public Service', desc: 'Зручний інтерфейс для батьків та адміністраторів.', color: 'text-primary' }],
        team: [{ name: 'Наталія Шаховська', role: 'Керівник', desc: '' }, { name: 'Петро Поберейко', role: 'Розробник', desc: '' }]
    },
    "archive-dalo": {
        hero: { lab: "Digital Archive", category: "National", title: "Цифровий архів ДАЛО", desc: "Створення цифрової копії Державного архіву Львівської області.", image: "/students/welcome8.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Величезний обсяг паперових документів, що потребують оцифрування та каталогізації.", solution: "Система автоматичного розпізнавання тексту та управління контентом.", results: "Збереження історичної спадщини в цифровому форматі." },
        features: [],
        team: [{ name: 'Наталія Шаховська', role: 'Керівник', desc: '' }]
    },
    "lost-relics": {
        hero: { lab: "XR Lab", category: "National", title: "Втрачені реліквії (XR)", desc: "Відтворення архітектурних пам'яток через доповнену реальність.", image: "/students/welcome1.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Візуалізація зруйнованих об'єктів культурної спадщини.", solution: "XR-додатки для смартфонів та окулярів.", results: "Не надано інформації" },
        features: [{ icon: 'history_edu', version: 'XR', title: 'Visual Heritage', desc: '3D моделювання історичних пам’яток.', color: 'text-primary' }],
        team: [{ name: 'Наталя Мельникова', role: 'Керівник', desc: '' }, { name: 'Віталій Бретско', role: 'Lead Dev', desc: '' }]
    },
    "knyhokrai": {
        hero: { lab: "Social Tech", category: "National", title: "Книгокрай", desc: "Платформа для розвитку читання та літературної освіти.", image: "/students/welcome2.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Не надано інформації", solution: "Веб-портал для Львівської обласної ради.", results: "Не надано інформації" },
        features: [],
        team: [{ name: 'Наталія Шаховська', role: 'Керівник', desc: '' }, { name: 'Дмитро Пастушенко', role: 'Розробник', desc: '' }]
    },
    "immune-register": {
        hero: { lab: "Medical AI", category: "National", title: "Реєстр пацієнтів з імунодефіцитом", desc: "Створення національної бази даних пацієнтів з імунодефіцитом.", image: "/students/welcome3.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Не надано інформації", solution: "Спільна розробка з Biopharma.", results: "Покращення діагностики та лікування." },
        features: [],
        team: [{ name: 'Наталія Шаховська', role: 'Керівник', desc: '' }, { name: 'Наталя Мельникова', role: 'Керівник', desc: '' }]
    },

    // --- ІНДУСТРІАЛЬНІ ПРОЄКТИ ---
    "city-traffic": {
        hero: { lab: "AI Lab", category: "Industrial", title: "City Traffic Management", desc: "Система інтелектуального керування міським трафіком.", image: "/students/welcome4.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Затори та неефективна робота світлофорів у пікові години.", solution: "Розподілена система з використанням комп'ютерного зору для аналізу потоків.", results: "Зниження часу очікування на перехрестях на 15%." },
        features: [{ icon: 'traffic', version: 'v1.1', title: 'Traffic Flow AI', desc: 'Аналіз відеопотоків у реальному часі.', color: 'text-primary' }],
        team: [{ name: 'R&D Lab', role: 'Команда розробки', desc: 'Lviv Smart City Partners' }]
    },
    "niania-chat": {
        hero: {
            lab: "NLP Lab",
            category: "Industrial",
            title: "Niania24 Chat AI",
            desc: "Система інтелектуальної обробки повідомлень для автоматизації комунікації.",
            image: "/students/welcome6.jpg",
            links: { portal: "#", github: "#" }
        },
        details: {
            challenge: "Необхідність швидкої та точної відповіді на запити користувачів у мобільному додатку.",
            solution: "Інтеграція NLP моделей для класифікації та автоматичної генерації відповідей.",
            results: "Зменшення навантаження на операторів на 40%."
        },
        features: [
            { icon: 'chat', version: 'LLM', title: 'Chat Automation', desc: 'Швидка обробка великої кількості повідомлень.', color: 'text-primary' }
        ],
        team: [{ name: 'Євгеній Орза', role: 'Lead Developer', desc: 'Startup niania24chat' }]
    },
    "part-accounting": {
        hero: { lab: "Industry 4.0", category: "Industrial", title: "Автоматичний облік деталей", desc: "Система обліку для СФЕРОС-ЕЛЕКТРОН.", image: "/students/welcome5.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Людський фактор та помилки при ручному обліку на виробництві.", solution: "Система ідентифікації деталей за допомогою AI.", results: "Автоматизація складських процесів." },
        features: [],
        team: [{ name: 'Наталія Шаховська', role: 'Керівник', desc: '' }, { name: 'Юрій Кривенчук', role: 'Експерт', desc: '' }]
    },
    "puzzle-ready": {
        hero: { lab: "CV Lab", category: "Industrial", title: "Визначення готовності пазлів", desc: "Алгоритм комп'ютерного зору для оцінки прогресу збору пазлів.", image: "/students/welcome7.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Не надано інформації", solution: "Розробка для Pecode OU.", results: "Не надано інформації" },
        features: [],
        team: [{ name: 'Олег Басистюк', role: 'Керівник', desc: '' }, { name: 'Ігор Думин', role: 'Керівник', desc: '' }]
    },
    "unbroken-monitoring": {
        hero: { lab: "Health Tech", category: "Industrial", title: "AI моніторинг Unbroken", desc: "Система підтримки пацієнтів у реабілітаційному центрі.", image: "/students/welcome8.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Необхідність постійного моніторингу стану пацієнтів під час реабілітації.", solution: "Комп'ютерний зір для аналізу вправ та рухів пацієнта.", results: "Підвищення ефективності відновлення." },
        features: [{ icon: 'visibility', version: 'Beta', title: 'Pose Estimation', desc: 'Відстеження рухів пацієнта в реальному часі.', color: 'text-primary' }],
        team: [{ name: 'Команда СШІ', role: 'R&D', desc: 'Unbroken Center Partner' }]
    },
    "time-space": {
        hero: { lab: "Interactive Tech", category: "Industrial", title: "Time and Space", desc: "Інтерактивні столи та системи для компанії ТАЙМ ЕНД СПЕЙС.", image: "/students/welcome1.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Не надано інформації", solution: "Не надано інформації", results: "Не надано інформації" },
        features: [],
        team: [{ name: 'Наталія Шаховська', role: 'Керівник', desc: '' }, { name: 'Соломія Лясковська', role: 'Розробник', desc: '' }]
    },
    "leocart": {
        hero: { lab: "IoT Lab", category: "Industrial", title: "Система обліку Леокарт", desc: "Аналіз та облік студентських можливостей через Леокарт.", image: "/students/welcome2.jpg", links: { portal: "#", github: "#" } },
        details: { challenge: "Необхідність цифровізації студентських сервісів.", solution: "Інтеграція з існуючою транспортною карткою міста.", results: "Автоматизація видачі пільг та послуг." },
        features: [],
        team: [{ name: 'Student R&D', role: 'Розробники', desc: 'Колегія студентів НУЛП' }]
    }
};