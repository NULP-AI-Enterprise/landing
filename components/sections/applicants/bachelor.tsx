import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function BachelorPage() {
    const t = useTranslations('BachelorPageDetails');

    // Масив для каруселі з 14 фото
    const welcomeImages = Array.from({ length: 14 }, (_, i) => `/students/welcome${i + 1}.jpg`);

    return (
        <main className="bg-surface min-h-screen pt-32 pb-24 font-sans text-t-primary">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">

                {/* 1. HERO СЕКЦІЯ */}
                <section className="mb-24 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-[16px]">school</span>
                        {t('hero.badge')}
                    </div>
                    <p className="text-primary font-bold tracking-widest mb-2">{t('hero.program')}</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter leading-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-lg text-t-secondary mb-8 font-light">{t('hero.specialty')}</p>
                    <div className="flex flex-col items-center justify-center p-6 border border-glass-hover rounded-3xl bg-glass max-w-sm mx-auto">
                        <span className="text-5xl font-black text-t-primary">{t('hero.seats')}</span>
                        <span className="text-xs text-t-muted uppercase tracking-widest mt-2">{t('hero.seatsLabel')}</span>
                    </div>
                </section>

                {/* 2. МЕТА ТА НАВИЧКИ */}
                <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-surface-card border border-glass rounded-[2.5rem] p-10">
                        <h2 className="text-3xl font-bold mb-6 tracking-tight text-[#80E9D4]">{t('mission.title')}</h2>
                        <p className="text-t-secondary leading-relaxed font-light">{t('mission.desc')}</p>
                    </div>
                    <div className="bg-surface-card border border-glass rounded-[2.5rem] p-10">
                        <h2 className="text-3xl font-bold mb-6 tracking-tight text-primary">{t('skills.title')}</h2>
                        <ul className="space-y-4">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-xl">done_all</span>
                                    <span className="text-t-tertiary text-sm font-light">{t(`skills.items.${i}`)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-stretch">
                    {/* Картка 1: Наталія Мельникова */}
                    <div className="p-10 lg:p-14 border border-glass bg-gradient-to-br from-surface-card to-surface rounded-[3rem] shadow-2xl relative flex flex-col h-full group">
                        <span className="material-symbols-outlined text-8xl md:text-9xl absolute top-6 right-8 text-t-primary/[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500">format_quote</span>

                        {/* Текст цитати (збільшений шрифт text-lg/xl) */}
                        <p className="text-t-tertiary italic mb-12 relative z-10 grow text-lg lg:text-xl leading-relaxed font-light">
                            {t('quotes.melnykova.text')}
                        </p>

                        {/* Блок з фотографією (збільшено аватар до 24x24) */}
                        <div className="flex items-center gap-6 mt-auto relative z-10">
                            <div className="w-20 h-20 lg:w-24 lg:h-24 relative shrink-0 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg group-hover:border-primary/50 transition-colors duration-500">
                                <Image
                                    src="/melnukova.jpg"
                                    alt="Наталія Мельникова"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-t-primary text-xl lg:text-2xl mb-1">{t('quotes.melnykova.name')}</h4>
                                <p className="text-xs lg:text-sm font-bold text-primary uppercase tracking-widest">{t('quotes.melnykova.role')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Картка 2: Наталія Шаховська */}
                    <div className="p-10 lg:p-14 border border-glass bg-gradient-to-br from-surface-card to-surface rounded-[3rem] shadow-2xl relative flex flex-col h-full group">
                        <span className="material-symbols-outlined text-8xl md:text-9xl absolute top-6 right-8 text-t-primary/[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500">format_quote</span>

                        {/* Текст цитати */}
                        <p className="text-t-tertiary italic mb-12 relative z-10 grow text-lg lg:text-xl leading-relaxed font-light">
                            {t('quotes.shakhovska.text')}
                        </p>

                        {/* Блок з фотографією */}
                        <div className="flex items-center gap-6 mt-auto relative z-10">
                            <div className="w-20 h-20 lg:w-24 lg:h-24 relative shrink-0 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg group-hover:border-primary/50 transition-colors duration-500">
                                <Image
                                    src="/shahovska.png"
                                    alt="Наталія Шаховська"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-t-primary text-xl lg:text-2xl mb-1">{t('quotes.shakhovska.name')}</h4>
                                <p className="text-xs lg:text-sm font-bold text-primary uppercase tracking-widest">{t('quotes.shakhovska.role')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. КЛЮЧОВІ ІНІЦІАТИВИ */}
                <section className="mb-24 mt-24">
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight text-center">{t('initiatives.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <div key={i} className="bg-surface-card border border-glass rounded-[2rem] p-8 hover:border-primary/30 transition-all">
                                <span className="text-primary font-black text-2xl mb-4 block">{t(`initiatives.items.${i}.num`)}</span>
                                <h3 className="text-lg font-bold mb-3">{t(`initiatives.items.${i}.title`)}</h3>
                                <p className="text-xs text-t-muted font-light leading-relaxed">{t(`initiatives.items.${i}.desc`)}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-t-secondary italic font-light max-w-3xl mx-auto">{t('initiatives.footer')}</p>
                </section>

                {/* 4. КАРУСЕЛЬ ФОТО (welcome1 - welcome14) */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold mb-10 tracking-tight text-center">{t('galleryTitle')}</h2>
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 custom-scrollbar">
                        {welcomeImages.map((img, idx) => (
                            <div key={idx} className="min-w-[85vw] md:min-w-[calc(33.333%-1rem)] h-64 relative rounded-[2rem] overflow-hidden snap-center border border-glass-hover shrink-0">
                                <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. КАР'ЄРА */}
                <section className="mb-24 bg-gradient-to-br from-surface-card to-surface border border-glass rounded-[3rem] p-10 md:p-16 relative overflow-hidden group/section">
                    {/* Декоративне світіння на фоні (стає яскравішим при наведенні на секцію) */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none group-hover/section:bg-primary/10 transition-colors duration-700"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-t-primary">
                            {t('career.title')}
                        </h2>
                        <p className="text-t-secondary mb-12 font-light max-w-2xl text-lg leading-relaxed">
                            {t('career.desc')}
                        </p>

                        {/* Структурована сітка в 1, 2 або 3 колонки залежно від екрану */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 px-6 py-5 bg-white/[0.02] border border-glass rounded-2xl hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group cursor-default shadow-lg shadow-shadow"
                                >
                                    {/* Іконка професії з анімацією кольору */}
                                    <div className="w-12 h-12 rounded-xl bg-glass flex items-center justify-center border border-glass-hover group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors duration-300 shrink-0">
                        <span className="material-symbols-outlined text-t-muted group-hover:text-primary transition-colors text-[24px]">
                            work_outline
                        </span>
                                    </div>

                                    {/* Текст професії */}
                                    <span className="text-sm md:text-base font-medium text-t-tertiary group-hover:text-t-primary transition-colors leading-snug">
                        {t(`career.roles.${i}`)}
                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}