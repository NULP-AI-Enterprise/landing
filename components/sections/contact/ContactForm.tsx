"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
    const t = useTranslations('ContactForm');

    // Стани для відправки форми
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormStatus("loading");

        const formData = new FormData(event.currentTarget);

        // Ваш ключ Web3Forms для цієї форми
        formData.append("access_key", "fe7da6cd-fd6d-486e-b4c0-147788a73e0b");
        formData.append("from_name", "Сайт Кафедри (Сторінка контактів)");

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

    return (
        <div className="glass-card p-8 lg:p-10 rounded-3xl relative border-glass overflow-hidden bg-surface-card/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/20">
            {/* Фонове декоративне світіння */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>

            {formStatus === "success" ? (
                /* СТАН УСПІХУ */
                <div className="relative z-10 flex flex-col items-center justify-center text-center py-12 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
                        <span className="material-symbols-outlined text-4xl">check_circle</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-t-primary tracking-tight">
                        {t('success.title')} {/* "Дякуємо за звернення!" */}
                    </h3>
                    <p className="text-t-secondary font-light leading-relaxed">
                        {t('success.message')} {/* "Ваше повідомлення успішно надіслано. Ми відповімо вам найближчим часом." */}
                    </p>
                    <button
                        onClick={() => setFormStatus("idle")}
                        className="mt-8 px-6 py-3 rounded-xl border border-glass-hover text-t-primary hover:bg-glass transition-colors uppercase text-xs tracking-widest font-bold"
                    >
                        {t('success.button')} {/* "Надіслати ще" */}
                    </button>
                </div>
            ) : (
                /* САМА ФОРМА */
                <>
                    <h3 className="text-2xl md:text-3xl font-bold mb-8 text-t-primary relative z-10 tracking-tight">
                        {t('title')}
                    </h3>

                    {formStatus === "error" && (
                        <div className="relative z-10 p-4 mb-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center animate-in fade-in">
                            {t('error')} {/* "Сталася помилка при відправці. Будь ласка, спробуйте ще раз." */}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-6 relative z-10">
                        {/* Прихований інпут для захисту від спаму */}
                        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-t-secondary ml-1">
                                    {t('labels.name')}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"         // 🔥 ОБОВ'ЯЗКОВО ДЛЯ ФОРМИ
                                    required            // 🔥 Валідація браузера
                                    placeholder={t('placeholders.name')}
                                    className="block w-full rounded-xl bg-surface/80 border border-glass-hover text-t-primary placeholder-gray-600 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all p-4 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-t-secondary ml-1">
                                    {t('labels.email')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"        // 🔥 ОБОВ'ЯЗКОВО ДЛЯ ФОРМИ
                                    required
                                    placeholder={t('placeholders.email')}
                                    className="block w-full rounded-xl bg-surface/80 border border-glass-hover text-t-primary placeholder-gray-600 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all p-4 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="block text-sm font-medium text-t-secondary ml-1">
                                {t('labels.subject')}
                            </label>
                            <div className="relative">
                                <select
                                    id="subject"
                                    name="subject"      // 🔥 ОБОВ'ЯЗКОВО ДЛЯ ФОРМИ
                                    className="block w-full rounded-xl bg-surface/80 border border-glass-hover text-t-primary focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all p-4 appearance-none outline-none cursor-pointer"
                                >
                                    {/* Значення option буде надіслано в листі */}
                                    <option value={t('subjects.admission')} className="bg-surface-card">{t('subjects.admission')}</option>
                                    <option value={t('subjects.partnership')} className="bg-surface-card">{t('subjects.partnership')}</option>
                                    <option value={t('subjects.general')} className="bg-surface-card">{t('subjects.general')}</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-t-secondary">
                                    <span className="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-sm font-medium text-t-secondary ml-1">
                                {t('labels.message')}
                            </label>
                            <textarea
                                id="message"
                                name="message"          // 🔥 ОБОВ'ЯЗКОВО ДЛЯ ФОРМИ
                                required
                                rows={5}
                                placeholder={t('placeholders.message')}
                                className="block w-full rounded-xl bg-surface/80 border border-glass-hover text-t-primary placeholder-gray-600 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all p-4 outline-none resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={formStatus === "loading"}
                            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-t-primary font-bold gradient-bg hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:-translate-y-0 disabled:cursor-not-allowed"
                        >
                            {formStatus === "loading" ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                    {t('sending')} {/* "Відправка..." */}
                                </>
                            ) : (
                                t('submit')
                            )}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}