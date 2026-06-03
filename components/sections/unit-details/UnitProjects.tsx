import Image from 'next/image';
import Link from 'next/link';

const currentProjects = [
    { tag: 'Swarm Robotics', title: 'Erasmus+ SmartAgri', desc: 'Automated drone swarms for precision agriculture and crop health monitoring. Developing resilient communication protocols.', img: 'https://via.placeholder.com/600x400' },
    { tag: 'HRI', title: 'SafeCobot', desc: 'Vision-based intention prediction for safe physical human-robot collaboration in manufacturing environments.', img: 'https://via.placeholder.com/600x400', active: true },
    { tag: 'Navigation', title: 'TerrainX SLAM', desc: 'Multi-sensor fusion for robust SLAM in feature-poor, dynamically changing outdoor environments for search and rescue.', img: 'https://via.placeholder.com/600x400' },
];

export default function UnitProjects() {
    return (
        <section className="py-24 bg-surface-card border-t border-glass" id="projects">
            <div className="container mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-t-primary mb-4">Current Projects</h2>
                    <p className="text-lg text-t-secondary max-w-2xl mx-auto font-light">Discover the latest research initiatives being developed within the Robotics Lab.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentProjects.map((proj, i) => (
                        <div key={i} className={`glass-card rounded-3xl overflow-hidden flex flex-col group ${proj.active ? 'border-primary/40 shadow-[0_0_30px_rgba(108,99,255,0.1)]' : 'border-glass'}`}>
                            <div className="relative overflow-hidden h-56 bg-surface">
                                <Image
                                    src={proj.img}
                                    alt={proj.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-card to-transparent opacity-80"></div>
                            </div>

                            <div className="p-8 flex-grow flex flex-col relative z-10 -mt-6">
                                <div className="flex justify-between items-center mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-primary/10 text-primary border border-primary/20">
                    {proj.tag}
                  </span>
                                </div>

                                <h3 className="text-2xl font-bold text-t-primary mb-3">{proj.title}</h3>
                                <p className="text-t-secondary text-sm mb-8 flex-grow leading-relaxed font-light">{proj.desc}</p>

                                <Link href="#" className="w-full py-4 px-6 bg-glass text-center text-t-primary rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-glass-hover transition-colors border border-glass-hover hover:border-glass-strong">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}