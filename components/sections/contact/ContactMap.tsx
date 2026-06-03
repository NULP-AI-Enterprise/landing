import { useTranslations } from 'next-intl';

export default function ContactMap() {
    const t = useTranslations('ContactMap');

    // Вставте сюди свій чистий лінк з Google Maps Embed
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d995.3303243969065!2d24.03338943201565!3d49.83698520587498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473adde220274cd3%3A0x72058f5b16a1be99!2z0J3QoyAi0JvQnyIgMjAg0LrQvtGA0L_Rg9GB!5e0!3m2!1suk!2sua!4v1772816363088!5m2!1suk!2sua";

    return (
        <section className="w-full h-[500px] relative overflow-hidden border-y border-glass bg-surface">
            <div className="absolute inset-0 z-0">
                <iframe
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{border: 0}}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                    // Додаємо фільтри для ідеального темного вигляду
                    className="grayscale-[1] invert-[0.92] contrast-[1.1] brightness-[0.8] opacity-50 hover:opacity-70 transition-opacity duration-700 w-full h-full"
                ></iframe>
            </div>

            {/* Оверлей з інформацією */}
            <div className="absolute bottom-10 left-8 md:left-12 z-10 max-w-sm">
                <div
                    className="glass-card p-6 md:p-8 rounded-[2rem] border border-glass-hover bg-surface-card/90 backdrop-blur-md shadow-2xl transition-all hover:-translate-y-2 duration-500">
                    <div
                        className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-5 text-primary">
                        <span className="material-symbols-outlined text-2xl">location_on</span>
                    </div>

                    <h3 className="text-xl font-bold text-t-primary mb-2">{t('title')}</h3>
                    <p className="text-sm text-t-secondary font-light mb-6 leading-relaxed">
                        {t('address')}
                    </p>

                    <a
                        href="https://www.google.com/maps/dir/?api=1&destination=49.839891,24.032887"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-bold text-xs tracking-widest uppercase hover:text-t-primary transition-colors"
                    >
                        {t('openBtn')}
                        <span className="material-symbols-outlined text-lg">open_in_new</span>
                    </a>
                </div>
            </div>

            {/* Внутрішня тінь для ефекту глибини */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(10,10,21,0.9)]"></div>
        </section>
    );
}