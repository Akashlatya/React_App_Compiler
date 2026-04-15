import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const hasAccepted = localStorage.getItem('cookieConsent');
        if (!hasAccepted) {
            // Show banner after a short delay
            setTimeout(() => setShowBanner(true), 1000);
        }
    }, []);

    const acceptCookies = () => {
        // Save consent to localStorage
        localStorage.setItem('cookieConsent', 'true');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());

        // Also set a cookie (optional)
        document.cookie = `cookieConsent=true; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;

        setShowBanner(false);
    };

    const rejectCookies = () => {
        localStorage.setItem('cookieConsent', 'false');
        setShowBanner(false);
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <m.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="cookie-consent-banner"
                >
                    <div className="cookie-consent-content">
                        <Cookie size={24} className="cookie-icon" />

                        <div className="cookie-text-container">
                            <h3 className="cookie-title">
                                🍪 We Use Cookies
                            </h3>
                            <p className="cookie-description">
                                We use cookies to enhance your experience and analyze usage. By continuing, you consent to our use of cookies.
                            </p>

                            <div className="cookie-buttons">
                                <button
                                    onClick={acceptCookies}
                                    className="cookie-btn cookie-btn-accept"
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                    Accept All
                                </button>

                                <button
                                    onClick={rejectCookies}
                                    className="cookie-btn cookie-btn-decline"
                                    onMouseEnter={(e) => {
                                        e.target.style.borderColor = '#a8c0ff';
                                        e.target.style.color = '#fff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                        e.target.style.color = '#cbd5e1';
                                    }}
                                >
                                    Decline
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={rejectCookies}
                            className="cookie-close-btn"
                            aria-label="Close cookie banner"
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'none';
                                e.target.style.color = '#94a3b8';
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <style>{`
                        .cookie-consent-banner {
                            position: fixed;
                            bottom: 20px;
                            left: 20px;
                            max-width: 450px;
                            background: rgba(30, 30, 46, 0.95);
                            backdrop-filter: blur(10px);
                            border: 1px solid rgba(168, 192, 255, 0.3);
                            border-radius: 16px;
                            padding: 24px;
                            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
                            z-index: 9999;
                        }

                        .cookie-consent-content {
                            display: flex;
                            gap: 16px;
                            align-items: flex-start;
                        }

                        .cookie-icon {
                            color: #a8c0ff;
                            flex-shrink: 0;
                            margin-top: 2px;
                        }

                        .cookie-text-container {
                            flex: 1;
                        }

                        .cookie-title {
                            color: #fff;
                            font-size: 1.1rem;
                            font-weight: 600;
                            margin: 0 0 8px 0;
                        }

                        .cookie-description {
                            color: #cbd5e1;
                            font-size: 0.9rem;
                            line-height: 1.5;
                            margin: 0 0 16px 0;
                        }

                        .cookie-buttons {
                            display: flex;
                            gap: 12px;
                            flex-wrap: wrap;
                        }

                        .cookie-btn {
                            padding: 10px 24px;
                            border-radius: 8px;
                            font-size: 0.9rem;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.2s;
                            border: none;
                        }

                        .cookie-btn-accept {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: #fff;
                            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                        }

                        .cookie-btn-decline {
                            background: rgba(255, 255, 255, 0.05);
                            color: #cbd5e1;
                            border: 1px solid rgba(255, 255, 255, 0.2);
                        }

                        .cookie-close-btn {
                            background: none;
                            border: none;
                            color: #94a3b8;
                            cursor: pointer;
                            padding: 4px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 4px;
                            transition: all 0.2s;
                        }

                        /* Mobile Optimization */
                        @media (max-width: 768px) {
                            .cookie-consent-banner {
                                left: 10px;
                                right: 10px;
                                bottom: 10px;
                                max-width: none;
                                padding: 14px;
                                border-radius: 12px;
                            }

                            .cookie-consent-content {
                                gap: 10px;
                            }

                            .cookie-icon {
                                width: 20px;
                                height: 20px;
                            }

                            .cookie-title {
                                font-size: 0.95rem;
                                margin-bottom: 6px;
                            }

                            .cookie-description {
                                font-size: 0.8rem;
                                line-height: 1.4;
                                margin-bottom: 12px;
                            }

                            .cookie-btn {
                                padding: 8px 16px;
                                font-size: 0.85rem;
                            }

                            .cookie-close-btn {
                                padding: 2px;
                            }

                            .cookie-close-btn svg {
                                width: 18px;
                                height: 18px;
                            }
                        }

                        /* Extra small screens */
                        @media (max-width: 400px) {
                            .cookie-consent-banner {
                                padding: 12px;
                            }

                            .cookie-title {
                                font-size: 0.9rem;
                            }

                            .cookie-description {
                                font-size: 0.75rem;
                            }

                            .cookie-buttons {
                                gap: 8px;
                            }

                            .cookie-btn {
                                padding: 7px 14px;
                                font-size: 0.8rem;
                            }
                        }
                    `}</style>
                </m.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
