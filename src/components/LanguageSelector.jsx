import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LANGUAGES } from '../constants';

const LanguageSelector = () => {
    const [search, setSearch] = useState('');

    const filteredLanguages = LANGUAGES.filter(lang =>
        lang.name.toLowerCase().includes(search.toLowerCase()) ||
        lang.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10
        }}>
            {/* Search Bar */}
            <div className="search-container">
                <div className="search-icon">🔍</div>
                <input
                    type="text"
                    placeholder="Search compilers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* Grid Area */}
            <div className="languages-grid">
                <AnimatePresence>
                    {filteredLanguages.map((lang) => (
                        <Link
                            key={lang.id}
                            to={lang.path || `/${lang.id}/Compiler`}
                            style={{ textDecoration: 'none' }}
                        >
                            <m.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{
                                    y: -8,
                                    boxShadow: `0 20px 40px -10px ${lang.color}30`,
                                    borderColor: lang.color
                                }}
                                className="language-card"
                                style={{
                                    border: `1px solid ${lang.color}20`,
                                    background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '4px',
                                    background: lang.color
                                }} />
                                {/* Top Bar: Icon and Badge */}
                                <div className="language-card-header">
                                    <div className="language-icon" style={{
                                        border: `1px solid ${lang.color}80`,
                                        boxShadow: `0 0 20px ${lang.color}15`
                                    }}>
                                        {lang.icon}
                                    </div>
                                    {lang.badge && (
                                        <span className="language-badge" style={{
                                            background: lang.badge === 'Free Tier' ? 'rgba(63, 185, 80, 0.15)' : 'rgba(56, 139, 253, 0.15)',
                                            color: lang.badge === 'Free Tier' ? '#3fb950' : '#79c0ff',
                                            border: `1px solid ${lang.badge === 'Free Tier' ? '#3fb95040' : '#79c0ff40'}`,
                                        }}>
                                            {lang.badge}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="language-info">
                                    <h3 className="language-name">
                                        {lang.name}
                                    </h3>
                                    <p className="language-description">
                                        {lang.description}
                                    </p>
                                </div>

                            </m.div>
                        </Link>
                    ))}
                </AnimatePresence>
            </div>

            {filteredLanguages.length === 0 && (
                <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <p>No compilers found matching "{search}"</p>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
