import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        suggestion: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('https://formsubmit.co/ajax/ogcompiler@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.suggestion,
                    _subject: `New Suggestion from ${formData.name}`,
                    _captcha: 'false'
                })
            });

            if (response.ok) {
                setStatus({
                    type: 'success',
                    message: '✓ Suggestion sent successfully! We\'ll review it soon.'
                });
                setFormData({ name: '', email: '', suggestion: '' });
            } else {
                throw new Error('Failed to send');
            }
        } catch {
            setStatus({
                type: 'error',
                message: 'Failed to send suggestion. Please try again or email us directly at ogcompiler@gmail.com'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    Contact Us
                </h1>
                <p style={{
                    fontSize: '1.3rem',
                    color: '#cbd5e1',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: 1.6
                }}>
                    Have suggestions or feedback? We'd love to hear from you!
                </p>
            </m.div>

            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '40px',
                padding: '0 20px'
            }}>
                {/* Email Card */}
                <m.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '40px',
                        textAlign: 'center'
                    }}
                >
                    <Mail size={48} style={{ color: '#a8c0ff', marginBottom: '20px' }} />
                    <h2 style={{
                        fontSize: '1.8rem',
                        marginBottom: '15px',
                        color: '#fff'
                    }}>
                        Email Us Directly
                    </h2>
                    <a
                        href="mailto:ogcompiler@gmail.com"
                        style={{
                            fontSize: '1.3rem',
                            color: '#a8c0ff',
                            textDecoration: 'none',
                            fontWeight: 600,
                            display: 'inline-block',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(168, 192, 255, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                        }}
                    >
                        ogcompiler@gmail.com
                    </a>
                </m.div>

                {/* Social Media Links */}
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '40px',
                        textAlign: 'center'
                    }}
                >
                    <h2 style={{
                        fontSize: '1.8rem',
                        marginBottom: '25px',
                        color: '#fff'
                    }}>
                        Follow Us
                    </h2>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        flexWrap: 'wrap'
                    }}>
                        {/* GitHub */}
                        <m.a
                            href="https://github.com/Akashlatya/ogcompiler"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, translateY: -5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '1.8rem',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#a8c0ff';
                                e.currentTarget.style.background = 'rgba(168, 192, 255, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            }}
                        >
                            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </m.a>

                        {/* Instagram */}
                        <m.a
                            href="https://instagram.com/ogcompiler"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, translateY: -5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '1.8rem',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#E4405F';
                                e.currentTarget.style.background = 'rgba(228, 64, 95, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            }}
                        >
                            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </m.a>

                        {/* LinkedIn */}
                        <m.a
                            href="https://linkedin.com/company/ogcompiler"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, translateY: -5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '1.8rem',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#0A66C2';
                                e.currentTarget.style.background = 'rgba(10, 102, 194, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            }}
                        >
                            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </m.a>

                        {/* YouTube */}
                        <m.a
                            href="https://youtube.com/@ogcompiler"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, translateY: -5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '1.8rem',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#FF0000';
                                e.currentTarget.style.background = 'rgba(255, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            }}
                        >
                            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </m.a>
                    </div>
                </m.div>

                {/* Suggestion Form */}
                <m.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '40px'
                    }}
                >
                    <h2 style={{
                        fontSize: '1.8rem',
                        marginBottom: '30px',
                        color: '#fff',
                        textAlign: 'center'
                    }}>
                        Send Us a Suggestion
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#cbd5e1',
                                fontSize: '0.95rem',
                                fontWeight: 500
                            }}>
                                Your Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#a8c0ff'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#cbd5e1',
                                fontSize: '0.95rem',
                                fontWeight: 500
                            }}>
                                Your Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#a8c0ff'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            />
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#cbd5e1',
                                fontSize: '0.95rem',
                                fontWeight: 500
                            }}>
                                Your Suggestion *
                            </label>
                            <textarea
                                name="suggestion"
                                value={formData.suggestion}
                                onChange={handleChange}
                                required
                                rows="6"
                                placeholder="Share your ideas, feedback, or feature requests..."
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    resize: 'vertical',
                                    fontFamily: 'inherit',
                                    transition: 'all 0.3s ease',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#a8c0ff'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            />
                        </div>

                        {status.message && (
                            <m.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    padding: '15px 20px',
                                    borderRadius: '12px',
                                    marginBottom: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    background: status.type === 'success'
                                        ? 'rgba(16, 185, 129, 0.1)'
                                        : 'rgba(239, 68, 68, 0.1)',
                                    border: `1px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`
                                }}
                            >
                                {status.type === 'success' ?
                                    <CheckCircle size={20} style={{ color: '#10b981' }} /> :
                                    <AlertCircle size={20} style={{ color: '#ef4444' }} />
                                }
                                <span style={{
                                    color: status.type === 'success' ? '#10b981' : '#ef4444',
                                    fontSize: '0.95rem'
                                }}>
                                    {status.message}
                                </span>
                            </m.div>
                        )}

                        <m.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                opacity: isSubmitting ? 0.7 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Send size={20} />
                            {isSubmitting ? 'Sending...' : 'Send Suggestion'}
                        </m.button>
                    </form>
                </m.div>

                {/* FAQ Section */}
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    style={{
                        marginTop: '60px',
                        padding: '40px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px'
                    }}
                >
                    <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#fff', textAlign: 'center' }}>
                        Frequently Asked Questions
                    </h2>
                    <div style={{ display: 'grid', gap: '25px' }}>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', color: '#a8c0ff', marginBottom: '10px' }}>Is OG Compiler completely free?</h3>
                            <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>Yes, OG Compiler is 100% free to use for all supported languages including Java, Python, C++, C, and JavaScript.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', color: '#a8c0ff', marginBottom: '10px' }}>Do I need to sign up?</h3>
                            <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>No registration is required. You can start coding instantly in your browser.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', color: '#a8c0ff', marginBottom: '10px' }}>How do I report a bug?</h3>
                            <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>You can use the form above to send us directly, or email us at ogcompiler@gmail.com.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', color: '#a8c0ff', marginBottom: '10px' }}>Is my code saved?</h3>
                            <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>Currently, we do not store your code persistently on our servers to ensure privacy. Please save your code locally.</p>
                        </div>
                    </div>
                </m.div>
            </div>
        </div>
    );
};

export default ContactPage;
