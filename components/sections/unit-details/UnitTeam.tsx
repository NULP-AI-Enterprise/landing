import Image from 'next/image';

const teamMembers = [
    { name: 'Dr. Ivan Petrenko', role: 'Head of Lab', desc: 'Expert in Swarm Intelligence and Autonomous Systems.', img: 'https://via.placeholder.com/200x200' },
    { name: 'Olena Koval', role: 'Lead Researcher', desc: 'Specializes in Human-Robot Interaction and Cobots.', img: 'https://via.placeholder.com/200x200' },
    { name: 'Andriy Shevchenko', role: 'Robotics Engineer', desc: 'Focuses on Computer Vision for Robotic Navigation.', img: 'https://via.placeholder.com/200x200' },
    { name: 'Mariya Boyko', role: 'Ph.D. Candidate', desc: 'Researching robust SLAM in unstructured environments.', img: 'https://via.placeholder.com/200x200' },
];

export default function UnitTeam() {
    return (
        <section className="py-24 bg-surface border-t border-glass relative">
            <div className="container mx-auto px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-t-primary mb-4">Lab Team</h2>
                    <p className="text-lg text-t-secondary max-w-2xl mx-auto font-light">Meet the researchers and engineers driving innovation.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, i) => (
                        <div key={i} className="glass-card rounded-2xl p-6 text-center border-glass hover:border-primary/30 transition-colors group">
                            <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors">
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-t-primary">{member.name}</h3>
                            <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1 mb-4">{member.role}</p>
                            <p className="text-xs text-t-secondary font-light leading-relaxed">{member.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}