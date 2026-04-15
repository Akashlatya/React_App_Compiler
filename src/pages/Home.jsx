import React from 'react';

import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import LanguageSelector from '../components/LanguageSelector';
import { FEATURES } from '../constants';
const bgImage = '/bg.webp';



const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="home-container" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '100px', // Header offset
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Helmet>
                <title>{t('home_title')} - OG Compiler</title>
                <meta name="description" content={t('home_subtitle')} />
                <meta name="keywords" content="online compiler, free code editor, java compiler, python compiler, c++ compiler, javascript compiler, dsa practice, learn coding, browser ide" />
                <link rel="canonical" href="https://www.ogcompiler.com/" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${t('home_title')} - OG Compiler`} />
                <meta property="og:description" content={t('home_subtitle')} />
                <meta property="og:url" content="https://www.ogcompiler.com/" />
                <meta property="og:image" content="https://www.ogcompiler.com/og-image.png" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${t('home_title')} - OG Compiler`} />
                <meta name="twitter:description" content={t('home_subtitle')} />
                <meta name="twitter:image" content="https://www.ogcompiler.com/og-image.png" />
            </Helmet>

            {/* Background Image with Overlay */}
            <picture>
                <source media="(max-width: 768px)" srcSet="/bg-mobile.webp" />
                <img
                    src={bgImage}
                    alt="Background"
                    fetchPriority="high"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -2,
                        filter: 'brightness(0.6)'
                    }}
                />
            </picture>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(15, 10, 25, 0.85)', // Darker overlay for better text contrast
                backdropFilter: 'blur(3px)',
                zIndex: -1
            }} />

            {/* Hero Section */}
            <div
                style={{
                    textAlign: 'center',
                    marginBottom: '80px',
                    padding: '0 20px',
                    maxWidth: '900px',
                    zIndex: 1
                }}
            >
                <m.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                        marginBottom: '20px',
                        background: 'linear-gradient(to right, #fff, #a8c0ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 800,
                        letterSpacing: '-1.5px',
                        lineHeight: 1.1,
                        textShadow: '0 20px 40px rgba(0,0,0,0.5)'
                    }}
                >
                    {t('home_title')}
                </m.h1>
                <m.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{
                        fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                        color: '#cbd5e1',
                        maxWidth: '650px',
                        margin: '0 auto',
                        lineHeight: 1.7
                    }}
                >
                    {t('home_subtitle')}
                </m.p>
            </div>

            {/* Language Selector */}
            <h2 className="sr-only">Available Compilers</h2>
            <div style={{
                width: '100%',
                padding: '0 20px',
                marginBottom: '60px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <LanguageSelector />
            </div>

            {/* Features Section - Simplified Layout */}
            <h2 className="sr-only">Features</h2>
            <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                    maxWidth: '1200px',
                    margin: '40px auto 0',
                    padding: '0 20px',
                    width: '100%'
                }}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px'
                }}>

                    {FEATURES.map((feature, index) => (
                        <m.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            style={{
                                background: feature.type === 'highlight'
                                    ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))'
                                    : 'rgba(255, 255, 255, 0.02)',
                                border: feature.type === 'highlight'
                                    ? '1px solid rgba(139, 92, 246, 0.3)'
                                    : '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '16px',
                                padding: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {feature.type === 'highlight' && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: 'linear-gradient(90deg, #8b5cf6, #ec4899)'
                                }} />
                            )}
                            <span style={{
                                fontSize: '2rem',
                                marginBottom: '16px',
                                filter: feature.type === 'highlight' ? 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))' : 'none'
                            }}>{feature.icon}</span>
                            <h3 style={{ color: '#fff', marginBottom: '8px', fontSize: '1.1rem' }}>{feature.title}</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{feature.description}</p>
                        </m.div>
                    ))}
                </div>
            </m.div>

            {/* Stats Section */}
            <div style={{
                marginTop: '100px',
                marginBottom: '60px',
                display: 'flex',
                gap: '60px',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {[
                    { number: '100%', label: 'Free Forever' },
                    { number: '5+', label: 'Languages' },
                    { number: '⚡', label: 'Real-Time' }
                ].map((stat, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{
                            fontSize: '2.5rem',
                            fontWeight: 800,
                            background: 'linear-gradient(to bottom, #fff, #94a3b8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>{stat.number}</div>
                        <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
