import React from 'react';
import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Code, Zap, Globe, Shield, Sparkles, Rocket, Brain, Users } from 'lucide-react';

const AboutPage = () => {
    // const { t } = useTranslation();

    const features = [
        {
            icon: <Code size={40} />,
            title: 'Multiple Languages',
            description: 'Supports Java, Python, C, C++, and JavaScript with real-time execution.'
        },
        {
            icon: <Zap size={40} />,
            title: 'Lightning Fast',
            description: 'Optimized backend execution with instant feedback and results.'
        },
        {
            icon: <Globe size={40} />,
            title: 'Multilingual Interface',
            description: 'Available in English, German, Spanish, Chinese, and Hindi.'
        },
        {
            icon: <Shield size={40} />,
            title: 'Secure Execution',
            description: 'Sandboxed environment with security validations and rate limiting.'
        }
    ];

    const techStack = [
        { name: 'React + Vite', category: 'Frontend' },
        { name: 'Node.js + Express', category: 'Backend' },
        { name: 'Socket.IO', category: 'Real-time' },
        { name: 'Docker', category: 'Deployment' },
        { name: 'Cloud', category: 'Hosting' }
    ];

    const futuristicGoals = [
        {
            icon: <Sparkles size={36} />,
            title: 'AI Code Assistant',
            description: 'Intelligent code completion and debugging suggestions powered by AI',
            status: 'Coming Soon'
        },
        {
            icon: <Users size={36} />,
            title: 'Collaborative Coding',
            description: 'Real-time code collaboration with multiple users simultaneously',
            status: 'Planned'
        },
        {
            icon: <Brain size={36} />,
            title: 'Smart Code Analysis',
            description: 'Automatic code quality checks, optimization suggestions, and best practices',
            status: 'In Development'
        },
        {
            icon: <Rocket size={36} />,
            title: 'Cloud IDE',
            description: 'Full-featured cloud-based development environment with project management',
            status: 'Roadmap'
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
                    About OG Compiler
                </h1>
                <p style={{
                    fontSize: '1.3rem',
                    color: '#cbd5e1',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: 1.6
                }}>
                    A modern, lightning-fast online code compiler supporting multiple programming languages.
                    Write, compile, and execute code right in your browser with real-time feedback.
                </p>
            </m.div>

            {/* Features Grid */}
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto 80px',
                }}
            >
                <h2 style={{
                    fontSize: '2.5rem',
                    textAlign: 'center',
                    marginBottom: '50px',
                    color: '#fff'
                }}>
                    Features
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '30px',
                    padding: '0 20px'
                }}>
                    {features.map((feature, index) => (
                        <m.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.05, translateY: -10 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '20px',
                                padding: '40px 30px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ color: '#a8c0ff', marginBottom: '20px' }}>
                                {feature.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.4rem',
                                marginBottom: '15px',
                                color: '#fff'
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{
                                color: '#cbd5e1',
                                lineHeight: 1.6
                            }}>
                                {feature.description}
                            </p>
                        </m.div>
                    ))}
                </div>
            </m.div>

            {/* Tech Stack */}
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{
                    maxWidth: '900px',
                    margin: '0 auto 80px',
                    textAlign: 'center'
                }}
            >
                <h2 style={{
                    fontSize: '2.5rem',
                    marginBottom: '40px',
                    color: '#fff'
                }}>
                    Built With
                </h2>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'center',
                    padding: '0 20px'
                }}>
                    {techStack.map((tech, index) => (
                        <m.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + index * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                            style={{
                                background: 'rgba(168, 192, 255, 0.1)',
                                border: '1px solid rgba(168, 192, 255, 0.3)',
                                borderRadius: '12px',
                                padding: '15px 25px',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: '#a8c0ff',
                                marginBottom: '5px'
                            }}>
                                {tech.name}
                            </div>
                            <div style={{
                                fontSize: '0.85rem',
                                color: '#94a3b8'
                            }}>
                                {tech.category}
                            </div>
                        </m.div>
                    ))}
                </div>
            </m.div>

            {/* Futuristic Goals */}
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto 80px',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        marginBottom: '15px',
                        background: 'linear-gradient(to right, #fff, #f0abfc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 800
                    }}>
                        🚀 Future Roadmap
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#cbd5e1',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        The future of OG Compiler is bright. Here's what we're working on:
                    </p>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '30px',
                    padding: '0 20px'
                }}>
                    {futuristicGoals.map((goal, index) => (
                        <m.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.05, translateY: -10 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(236, 72, 153, 0.2)',
                                borderRadius: '20px',
                                padding: '40px 30px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {/* Status Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'rgba(167, 139, 250, 0.2)',
                                border: '1px solid rgba(167, 139, 250, 0.4)',
                                borderRadius: '20px',
                                padding: '5px 12px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: '#c4b5fd'
                            }}>
                                {goal.status}
                            </div>

                            <div style={{ color: '#f0abfc', marginBottom: '20px' }}>
                                {goal.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.4rem',
                                marginBottom: '15px',
                                color: '#fff'
                            }}>
                                {goal.title}
                            </h3>
                            <p style={{
                                color: '#cbd5e1',
                                lineHeight: 1.6
                            }}>
                                {goal.description}
                            </p>
                        </m.div>
                    ))}
                </div>
            </m.div>

            {/* Call to Action */}
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                style={{
                    textAlign: 'center',
                    padding: '60px 20px'
                }}
            >
                <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '30px',
                    color: '#fff'
                }}>
                    Ready to Start Coding?
                </h2>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#fff',
                            padding: '16px 40px',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                        }}
                    >
                        Try OG Compiler Now
                    </m.button>
                </Link>
            </m.div>
        </div>
    );
};

export default AboutPage;
