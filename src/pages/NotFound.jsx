import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { m } from 'framer-motion';

const NotFound = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#0f0a19',
            color: '#fff',
            textAlign: 'center',
            padding: '20px'
        }}>
            <Helmet>
                <title>404 - Page Not Found | OG Compiler</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <m.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    fontSize: '6rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0'
                }}
            >
                404
            </m.h1>

            <m.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                    fontSize: '2rem',
                    marginBottom: '20px',
                    color: '#e2e8f0'
                }}
            >
                Page Not Found
            </m.h2>

            <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                    marginBottom: '30px',
                    color: '#94a3b8',
                    maxWidth: '400px',
                    lineHeight: '1.6'
                }}
            >
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </m.p>

            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Link
                    to="/"
                    style={{
                        padding: '12px 30px',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '30px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Go Home
                </Link>
            </m.div>
        </div>
    );
};

export default NotFound;
