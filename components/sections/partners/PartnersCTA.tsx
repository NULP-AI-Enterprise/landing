"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function PartnersCTA() {
    const t = useTranslations('Partners.cta');

    // СТАНИ ДЛЯ МОДАЛКИ ТА ФОРМИ
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    // ОБРОБКА САБМІТУ (Web3Forms)
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormStatus("loading");

        const formData = new FormData(event.currentTarget);
        // Ключ Web3Forms
        formData.append("access_key", "767aa691-4b94-4fa9-9e0b-5099b7690d53");
        // Локалізована тема листа
        formData.append("subject", t('modal.emailSubject'));
        formData.append("from_name", "AI Department Web");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setFormStatus("success");
            } else {
                setFormStatus("error");
            }
        } catch (error) {
            console.error("Помилка відправки форми", error);
            setFormStatus("error");
        }
    };

    // Закриття модалки та скидання статусу
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setFormStatus("idle"), 300);
    };

    return (
        <>
            {/* ГОЛОВНА СЕКЦІЯ CTA */}
            <section className="w-full rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-primary/20 relative overflow-hidden bg-surface shadow-2xl shadow-primary/5">
                {/* Декоративні сфери */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#80E9D4]/10 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-t-primary leading-tight">
                            {t('title')}
                        </h3>
                        <p className="text-t-secondary font-light max-w-xl leading-relaxed text-lg">
                            {t('description')}
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex-shrink-0 gradient-bg text-t-primary font-bold py-5 px-12 rounded-2xl hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] hover:scale-105 transition-all duration-300 flex items-center gap-3 uppercase tracking-[0.2em] text-xs outline-none"
                    >
                        {t('button')}
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </button>
                </div>
            </section>

            {/* --- МОДАЛЬНЕ ВІКНО ФОРМИ --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-surface-card border border-glass-hover rounded-[3rem] w-full max-w-xl p-8 md:p-12 relative shadow-2xl scale-in-center overflow-hidden">

                        {/* Кнопка закриття */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-glass text-t-secondary hover:text-t-primary hover:bg-glass-hover transition-all"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        {/* СТАН УСПІХУ */}
                        {formStatus === "success" ? (
                            <div className="text-center py-10 animate-in zoom-in duration-500">
                                <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                                    <span className="material-symbols-outlined text-5xl">check_circle</span>
                                </div>
                                <h3 className="text-3xl font-bold text-t-primary mb-4">{t('modal.successTitle')}</h3>
                                <p className="text-t-secondary">{t('modal.successMessage')}</p>
                                <button onClick={closeModal} className="mt-8 px-8 py-4 rounded-2xl bg-glass border border-glass-hover hover:bg-glass-hover text-t-primary font-bold uppercase text-xs tracking-widest transition-all">
                                    {t('modal.closeBtn')}
                                </button>
                            </div>
                        ) : (
                            /* ФОРМА */
                            <div className="animate-in fade-in duration-500">
                                <h3 className="text-2xl md:text-3xl font-bold text-t-primary mb-2 tracking-tight">{t('modal.title')}</h3>
                                <p className="text-t-secondary text-sm mb-8">{t('modal.subtitle')}</p>

                                {formStatus === "error" && (
                                    <div className="p-4 mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm text-center">
                                        {t('modal.errorMessage')}
                                    </div>
                                )}

                                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                                    {/* Приховані поля Web3Forms */}
                                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">{t('modal.nameLabel')}</label>
                                        <input type="text" name="name" required className="w-full bg-surface border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary transition-colors" placeholder={t('modal.namePlaceholder')} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">{t('modal.emailLabel')}</label>
                                        <input type="email" name="email" required className="w-full bg-surface border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary transition-colors" placeholder={t('modal.emailPlaceholder')} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">{t('modal.messageLabel')}</label>
                                        <textarea name="message" rows={3} className="w-full bg-surface border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary transition-colors resize-none" placeholder={t('modal.messagePlaceholder')}></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={formStatus === "loading"}
                                        className="w-full mt-4 py-5 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-[0.2em] hover:brightness-110 shadow-lg shadow-primary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-3 outline-none"
                                    >
                                        {formStatus === "loading" ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                                {t('modal.loadingBtn')}
                                            </>
                                        ) : (
                                            <>
                                                {t('modal.submitBtn')}
                                                <span className="material-symbols-outlined text-lg">send</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}