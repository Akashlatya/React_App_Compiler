import React from 'react';
import { m } from 'framer-motion';
import { ExternalLink, Github, Code2, Zap } from 'lucide-react';

const ProjectsPage = () => {
    const projects = [
        {
            title: 'OG Compiler',
            description: 'A modern, lightning-fast online code compiler supporting multiple programming languages with real-time execution and multilingual interface.',
            tags: ['React', 'Node.js', 'Socket.IO', 'Docker'],
            github: 'https://github.com/Akashlatya/ogcompiler',
            demo: 'https://www.ogcompiler.com',
            features: [
                'Multi-language support (Java, Python, C, C++, JavaScript)',
                'Real-time code execution',
                'Secure sandboxed environment',
                'Multilingual UI (5 languages)'
            ]
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0a19 0%, #1a1230 100%)',
            color: '#fff',
            padding: '40px 20px'
        }}>
            {/* Hero Section */}
            <m.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    textAlign: 'center',
                    marginBottom: '60px',
                    paddingTop: '40px'
                }}
            >
                <h1 style={{
                    fontSize: '3.5rem',
                    marginBottom: '20px',
                    background: 'linear-gradient(to right, #fff, #a8c0ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800
                }}>
                    Projects
                </h1>
                <p style={{
                    fontSize: '1.3rem',
                    color: '#cbd5e1',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: 1.6
                }}>
                    Explore the projects I've built with passion and dedication.
                </p>
            </m.div>

            {/* Projects Grid */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                {projects.map((project, index) => (
                    <m.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '24px',
                            padding: '40px',
                            marginBottom: '30px'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            marginBottom: '20px',
                            flexWrap: 'wrap',
                            gap: '20px'
                        }}>
                            <div>
                                <h2 style={{
                                    fontSize: '2rem',
                                    marginBottom: '10px',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <Code2 size={28} style={{ color: '#a8c0ff' }} />
                                    {project.title}
                                </h2>
                                <p style={{
                                    fontSize: '1.1rem',
                                    color: '#cbd5e1',
                                    lineHeight: 1.6,
                                    marginBottom: '20px'
                                }}>
                                    {project.description}
                                </p>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '15px'
                            }}>
                                <m.a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '12px 24px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#a8c0ff';
                                        e.currentTarget.style.background = 'rgba(168, 192, 255, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                >
                                    <Github size={18} />
                                    GitHub
                                </m.a>

                                <m.a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '12px 24px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <ExternalLink size={18} />
                                    Live Demo
                                </m.a>
                            </div>
                        </div>

                        {/* Features */}
                        <div style={{ marginBottom: '25px' }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                marginBottom: '15px',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <Zap size={20} style={{ color: '#a8c0ff' }} />
                                Key Features
                            </h3>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '12px'
                            }}>
                                {project.features.map((feature, i) => (
                                    <li key={i} style={{
                                        color: '#cbd5e1',
                                        padding: '8px 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span style={{
                                            color: '#a8c0ff',
                                            fontSize: '1.2rem'
                                        }}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h3 style={{
                                fontSize: '0.9rem',
                                marginBottom: '12px',
                                color: '#94a3b8',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Tech Stack
                            </h3>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '10px'
                            }}>
                                {project.tags.map((tag, i) => (
                                    <span key={i} style={{
                                        padding: '6px 16px',
                                        background: 'rgba(168, 192, 255, 0.1)',
                                        border: '1px solid rgba(168, 192, 255, 0.3)',
                                        borderRadius: '8px',
                                        fontSize: '0.85rem',
                                        color: '#a8c0ff',
                                        fontWeight: 600
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </m.div>
                ))}

                {/* More Projects Coming Soon */}
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '2px dashed rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        padding: '60px 40px',
                        textAlign: 'center'
                    }}
                >
                    <h3 style={{
                        fontSize: '1.5rem',
                        marginBottom: '10px',
                        color: '#cbd5e1'
                    }}>
                        More Projects Coming Soon...
                    </h3>
                    <p style={{
                        color: '#94a3b8',
                        fontSize: '1rem'
                    }}>
                        Stay tuned for more exciting projects!
                    </p>
                </m.div>
            </div>
        </div>
    );
};

export default ProjectsPage;
