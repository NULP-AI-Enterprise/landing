import Link from 'next/link';

// Додаємо поле href до кожного об'єкта
const researchUnits = [
    { icon: 'smart_toy', title: 'Robotics Lab', desc: 'Autonomous systems and human-robot interaction.', href: '/research-units/robotics' },
    { icon: 'psychology', title: 'AI Lab', desc: 'Core artificial intelligence algorithms and models.', href: '/research-units/ai' },
    { icon: 'analytics', title: 'Data Science Club', desc: 'Big data analytics and predictive modeling.', href: '/research-units/data-science' },
    { icon: 'visibility', title: 'Computer Vision', desc: 'Image processing and visual recognition systems.', href: '/research-units/computer-vision' },
    { icon: 'translate', title: 'NLP Group', desc: 'Natural language processing and understanding.', href: '/research-units/nlp' },
    { icon: 'memory', title: 'Edge AI', desc: 'Implementing AI on resource-constrained devices.', href: '/research-units/edge-ai' },
    { icon: 'health_and_safety', title: 'AI in Healthcare', desc: 'Medical imaging and predictive diagnostics.', href: '/research-units/healthcare' },
    { icon: 'security', title: 'Cybersecurity AI', desc: 'Threat detection and automated response systems.', href: '/research-units/cybersecurity' },
];

export default function ResearchUnits() {
    return (
        <section className="py-24 bg-surface relative">
            <div className="container mx-auto px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-t-primary mb-4">Research Units</h2>
                    <p className="text-lg text-t-secondary max-w-2xl mx-auto font-light">
                        Specialized laboratories and clubs driving innovation in various AI domains.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {researchUnits.map((unit, i) => (
                        /* Замінили div на Link і передали href */
                        <Link
                            href={unit.href}
                            key={i}
                            className="glass-card rounded-2xl p-8 text-center flex flex-col items-center hover:-translate-y-2 hover:border-primary/40 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-3xl">{unit.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-t-primary mb-3 group-hover:text-primary transition-colors">{unit.title}</h3>
                            <p className="text-sm text-t-secondary leading-relaxed font-light">
                                {unit.desc}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}