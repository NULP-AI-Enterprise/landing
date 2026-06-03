import Image from 'next/image';

const infrastructureList = [
    "KUKA LBR iiwa Collaborative Robots",
    "DJI Matrice & Custom Swarm UAV Fleet",
    "Clearpath Jackal UGVs",
    "Vicon Motion Capture System",
    "High-Performance Computing Cluster for AI Training"
];

export default function UnitInfrastructure() {
    return (
        <section className="py-24 bg-surface relative border-t border-glass">
            <div className="container mx-auto px-8 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 items-center">

                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl font-bold text-t-primary mb-6">Lab Infrastructure</h2>
                        <p className="text-lg text-t-secondary mb-8 font-light">Equipped with industry-standard hardware and software to support advanced research and prototype development.</p>

                        <ul className="space-y-4">
                            {infrastructureList.map((item, i) => (
                                <li key={i} className="flex items-center gap-4 glass-card p-4 rounded-xl border-glass hover:border-primary/30 transition-colors">
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                    <span className="text-t-tertiary font-medium text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full md:w-1/2 relative">
                        {/* Глоу ефект під картинкою */}
                        <div className="absolute -inset-4 gradient-bg rounded-3xl opacity-20 blur-2xl"></div>
                        <div className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-glass-hover glass-card">
                            <Image
                                src="https://via.placeholder.com/800x1000"
                                alt="Robotics Lab Infrastructure"
                                fill
                                className="object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}