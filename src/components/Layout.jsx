import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram, Facebook, Youtube, MoreVertical, X } from 'lucide-react';
import logo from '../assets/logo.svg';
import CookieConsent from './CookieConsent';

const Layout = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    React.useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 100) { // Scroll Down > 100px
                    setIsVisible(false);
                } else { // Scroll Up
                    setIsVisible(true);
                }
                setLastScrollY(window.scrollY);
            }
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 30px',
                background: 'rgba(30, 30, 46, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'all 0.3s ease-in-out'
            }} className="nav-header">
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={logo} alt="OG Compiler Logo" style={{
                        width: '32px',
                        height: '32px'
                    }} />
                    <span style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        background: 'linear-gradient(to right, #a8c0ff, #9f7aea)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        OG Compiler
                    </span>
                </Link>

                {/* Desktop Links */}
                <div style={{ display: 'flex', gap: '20px' }} className="nav-links desktop-only">
                    {['About', 'Projects', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            style={{
                                color: '#a6accd',
                                textDecoration: 'none',
                                fontSize: '0.95rem',
                                fontWeight: 500,
                                transition: 'color 0.2s'
                            }}
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{ color: '#fff' }}
                    aria-label="Toggle mobile menu"
                >
                    {isMenuOpen ? <X size={24} /> : <MoreVertical size={24} />}
                </button>

                {/* Mobile Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <m.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mobile-menu-dropdown"
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                background: 'rgba(30, 30, 46, 0.95)',
                                backdropFilter: 'blur(10px)',
                                padding: '20px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px',
                                alignItems: 'center'
                            }}
                        >
                            {['About', 'Projects', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase()}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{
                                        color: '#fff',
                                        textDecoration: 'none',
                                        fontSize: '1.1rem',
                                        fontWeight: 500
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </m.div>
                    )}
                </AnimatePresence>
            </nav>

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </main>


            <footer className="main-footer" style={{
                padding: '60px 40px 30px',
                textAlign: 'center',
                background: 'linear-gradient(180deg, rgba(15, 10, 25, 0) 0%, rgba(30, 30, 46, 0.8) 100%)',
                borderTop: '1px solid rgba(168, 192, 255, 0.2)',
                position: 'relative',
                marginTop: 'auto'
            }}>
                {/* Gradient Line at Top */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '200px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #a8c0ff, transparent)',
                    opacity: 0.5
                }} />

                <div className="footer-container" style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {/* Footer Content Grid */}
                    <div className="footer-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '40px',
                        marginBottom: '40px',
                        textAlign: 'left'
                    }}>
                        {/* About Section */}
                        <div>
                            <h4 style={{
                                color: '#fff',
                                fontSize: '1.1rem',
                                marginBottom: '15px',
                                fontWeight: 600
                            }}>
                                OG Compiler
                            </h4>
                            <p style={{
                                color: '#94a3b8',
                                fontSize: '0.85rem',
                                lineHeight: 1.6,
                                margin: 0
                            }}>
                                Lightning-fast online code compiler for Java, Python, C, C++, and JavaScript. 100% free forever.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 style={{
                                color: '#fff',
                                fontSize: '1.1rem',
                                marginBottom: '15px',
                                fontWeight: 600
                            }}>
                                Quick Links
                            </h4>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}>
                                {[
                                    { name: 'About', path: '/about' },
                                    { name: 'Projects', path: '/projects' },
                                    { name: 'Contact', path: '/contact' }
                                ].map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        style={{
                                            color: '#94a3b8',
                                            fontSize: '0.85rem',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = '#a8c0ff'}
                                        onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Connect Section */}
                        <div>
                            <h4 style={{
                                color: '#fff',
                                fontSize: '1.1rem',
                                marginBottom: '15px',
                                fontWeight: 600
                            }}>
                                Connect With Us
                            </h4>
                            <div style={{
                                display: 'flex',
                                gap: '15px',
                                flexWrap: 'wrap'
                            }}>
                                {[
                                    { icon: Github, url: 'https://github.com/Akashlatya', color: '#fff', label: "GitHub" },
                                    { icon: Twitter, url: 'https://twitter.com', color: '#1DA1F2', label: "Twitter" },
                                    { icon: Linkedin, url: 'https://www.linkedin.com/in/akashlatya/', color: '#0A66C2', label: "LinkedIn" },
                                    { icon: Instagram, url: 'https://www.instagram.com/akzlatya/', color: '#E4405F', label: "Instagram" },
                                    { icon: Facebook, url: 'https://www.facebook.com/akash.latya.3', color: '#1877F2', label: "Facebook" },
                                    { icon: Youtube, url: 'https://www.youtube.com/@Linuxhunt', color: '#FF0000', label: "YouTube" }
                                ].map(({ icon: Icon, url, color, label }) => (
                                    <m.a
                                        key={url}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        whileHover={{ scale: 1.2, y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                        style={{
                                            color: '#94a3b8',
                                            transition: 'color 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = color}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                    >
                                        <Icon size={22} />
                                    </m.a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(168, 192, 255, 0.2), transparent)',
                        marginBottom: '25px'
                    }} />

                    {/* Bottom Section */}
                    <div className="footer-bottom" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '15px'
                    }}>
                        <p style={{
                            color: '#64748b',
                            fontSize: '0.85rem',
                            margin: 0
                        }}>
                            © {new Date().getFullYear()} <span style={{
                                background: 'linear-gradient(to right, #a8c0ff, #f0abfc)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 600
                            }}>OG Compiler</span>. All rights reserved.
                        </p>
                        <p style={{
                            color: '#64748b',
                            fontSize: '0.85rem',
                            margin: 0
                        }}>
                            Made with ❤️ by developers, for developers
                        </p>
                    </div>
                </div>
            </footer>

            {/* Cookie Consent Banner */}
            <CookieConsent />
        </div>
    );
};

export default Layout;
