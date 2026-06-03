import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ContactResources() {
    const t = useTranslations('ContactResources');

    const resources = [
        {
            href: "https://youtu.be/ng2SFLNYtj0",
            icon: "play_circle",
            color: "red",
            title: t('youtube.title'),
            desc: t('youtube.desc')
        },
        {
            href: "https://linkedin.com/in/ai-lviv",
            icon: "work",
            color: "blue",
            title: t('linkedin.title'),
            desc: t('linkedin.desc')
        },
        {
            href: "https://www.instagram.com/ai_lpnu",
            icon: "camera",
            color: "pink",
            title: t('instagram.title'),
            desc: t('instagram.desc')
        },
        {
            href: "https://www.facebook.com/share/1A48b66KhS/",
            icon: "groups",
            color: "blue",
            title: t('facebook.title'),
            desc: t('facebook.desc')
        },
        {
            href: "https://www.tiktok.com/@ai_lpnu",
            icon: "grade",
            color: "cyan",
            title: t('tiktok.title'),
            desc: t('tiktok.desc')
        },
        {
            href: "https://huggingface.co/ai-department-lpnu",
            customIcon: "🤗",
            color: "yellow",
            title: t('huggingface.title'),
            desc: t('huggingface.desc'),
            comingSoon: false
        }
    ];

    return (
        <section className="py-24 bg-surface border-t border-glass">
            <div className="max-w-5xl mx-auto px-8">
                <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-t-primary tracking-tight">
                    {t('title')}
                </h2>

                <div className="row row-cols-1 md:row-cols-2 gap-6">
                    {resources.map((res, i) => (
                        <Link
                            key={i}
                            href={res.href}
                            target={res.href !== "#" ? "_blank" : "_self"}
                            className={`flex items-center justify-between p-6 rounded-3xl glass-card hover:border-primary/40 group transition-all duration-500 border-glass bg-surface-card/40 ${res.comingSoon ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl transition-all duration-500
                                    ${res.color === 'red' ? 'bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-t-primary' : ''}
                                    ${res.color === 'blue' ? 'bg-blue-600/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-t-primary' : ''}
                                    ${res.color === 'pink' ? 'bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-t-primary' : ''}
                                    ${res.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-t-primary' : ''}
                                    ${res.color === 'yellow' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                                `}>
                                    {res.customIcon ? res.customIcon : <span className="material-symbols-outlined text-3xl">{res.icon}</span>}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-t-primary group-hover:text-primary transition-colors duration-300">
                                        {res.title}
                                    </h4>
                                    <p className="text-xs md:text-sm text-t-muted font-light leading-relaxed">
                                        {res.desc}
                                    </p>
                                </div>
                            </div>
                            {!res.comingSoon && (
                                <span className="material-symbols-outlined text-t-faint group-hover:text-primary transition-all transform group-hover:translate-x-1">
                                    arrow_forward
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}