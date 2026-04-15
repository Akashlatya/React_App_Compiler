import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import Editor from '../components/Editor';
import Terminal from '../components/Terminal';
// import FileManager from '../components/FileManager';
import { CODE_SNIPPETS as SNIPPETS, DSA_CODE_SNIPPETS as DSA_SNIPPETS } from '../constants';
import MusicPlayer from '../components/MusicPlayer';

// Socket loaded lazy

const CompilerPage = () => {
    const { language: urlLangParam } = useParams();
    const urlLang = urlLangParam?.toLowerCase();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [dsaLang, setDsaLang] = useState('java');


    // Effective language
    const lang = urlLang === 'dsa' ? dsaLang : (urlLang || 'javascript');

    // SEO
    const title = urlLang === 'dsa'
        ? "DSA Compiler - Data Structures & Algorithms"
        : `${lang.charAt(0).toUpperCase() + lang.slice(1)} Compiler - Run Code Online`;

    const desc = urlLang === 'dsa'
        ? "Practice Data Structures and Algorithms online with our fast DSA compiler. Support for Java, C++, Python, and more."
        : `Write, compile and run ${lang} code online. Free, fast and secure ${lang} compiler with real-time output.`;

    const url = `https://www.ogcompiler.com/${urlLang}/Compiler`;

    const keywords = urlLang === 'dsa'
        ? "DSA compiler, data structures algorithms, java dsa, cpp dsa, python dsa, practice dsa online, free dsa compiler"
        : `${lang} compiler, online ${lang} compiler, run ${lang} online, learn ${lang}, free ${lang} ide, browser ${lang} compiler`;

    const snippets = urlLang === 'dsa' ? DSA_SNIPPETS : SNIPPETS;

    const [states, setStates] = useState({
        javascript: { code: snippets["javascript"], input: "", output: [], isError: false },
        python: { code: snippets["python"], input: "", output: [], isError: false },
        java: { code: snippets["java"], input: "", output: [], isError: false },
        c: { code: snippets["c"], input: "", output: [], isError: false },
        cpp: { code: snippets["cpp"], input: "", output: [], isError: false },
    });

    const [loading, setLoading] = useState(false);

    const [output, setOutput] = useState([]);
    const [status, setStatus] = useState('');
    const [waiting, setWaiting] = useState(false);
    const socket = useRef(null);

    const current = states[lang] || { code: "", input: "", output: [], isError: false };

    const updateState = (updates) => {
        setStates(prev => ({
            ...prev,
            [lang]: { ...prev[lang], ...updates }
        }));
    };

    // Load DSA code
    useEffect(() => {
        if (urlLang === 'dsa') {
            setStates(prev => {
                const code = prev[lang]?.code || '';
                const dsa = DSA_SNIPPETS[lang];
                const reg = SNIPPETS[lang];

                if (!code || code === reg) {
                    return { ...prev, [lang]: { ...prev[lang], code: dsa } };
                }
                return prev;
            });
        }
    }, [lang, urlLang]);

    const initSocket = async () => {
        if (socket.current) return socket.current;

        const { io } = await import('socket.io-client');
        const BACKEND = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

        const ioSocket = io(BACKEND, {
            transports: ['polling'], reconnection: true,
            reconnectionDelay: 1000, reconnectionAttempts: 10, timeout: 10000,
        });

        const onConnect = () => setStatus('');

        const onStatus = (s) => {
            if (s === 'Completed' || s === 'Error') {
                setLoading(false);
                setWaiting(false);
                if (s === 'Completed') setStatus('');
                if (s === 'Error') setStatus('Error');
            }
        };

        const onOutput = (data) => {
            setOutput(prev => [...prev, data]);
            setWaiting(true);
        };

        const onError = (err) => {
            console.error("Conn error:", err);
            setLoading(false);
            setStatus('Error');

            const isTimeout = err.message === 'timeout' || err.message === 'xhr poll error';
            const msg = isTimeout ? 'Connecting to server...' : `Socket Error: ${err.message}`;
            const color = isTimeout ? '#a8c0ff' : '#f59e0b';

            setOutput(prev => {
                const last = prev[prev.length - 1];
                if (last && last.text && last.text.includes(msg)) return prev;
                return [...prev, { text: `\r\n⚠️ ${msg}\r\n`, color }];
            });
        };

        ioSocket.on('connect', onConnect);
        ioSocket.on('status', onStatus);
        ioSocket.on('output', onOutput);
        ioSocket.on('connect_error', onError);

        socket.current = ioSocket;
        return ioSocket;
    };

    useEffect(() => {
        const handleRejection = (e) => {
            if (e.reason?.name === 'Canceled' || e.reason?.message === 'Canceled') e.preventDefault();
        };
        window.addEventListener('unhandledrejection', handleRejection);

        return () => {
            window.removeEventListener('unhandledrejection', handleRejection);
            if (socket.current) {
                const s = socket.current;
                s.off('connect'); s.off('status'); s.off('output'); s.off('connect_error');
                if (s.connected) s.disconnect();
                socket.current = null;
            }
        };
    }, []);

    const run = () => {
        setOutput([]);
        setWaiting(false);

        if (!current.code || !current.code.trim()) {
            setOutput([
                { text: "⚠️ Code is empty.", color: "#fbbf24", bold: true },
                { text: "Please write some code before running.", color: "#e5e7eb" }
            ]);
            return;
        }
        execute();
    };

    const reset = () => {
        setOutput([]);
        setWaiting(false);
        setLoading(false);
        setStatus('');
    };

    const execute = async () => {
        setLoading(true);
        try {
            const s = await initSocket();
            if (s && s.connected) {
                s.emit('start_terminal', { language: lang, code: current.code });
                setWaiting(true);
            } else {
                s.connect();
                s.once('connect', () => {
                    s.emit('start_terminal', { language: lang, code: current.code });
                    setWaiting(true);
                });
            }
        } catch (e) {
            console.error("Socket init failed:", e);
            setOutput(prev => [...prev, { text: "\r\n⚠️ Failed to connect to server.\r\n", color: '#ef4444' }]);
            setLoading(false);
        }
    };

    const handleInput = (val) => {
        if (socket.current) {
            socket.current.emit('input', val + '\n');
            setOutput(prev => {
                if (prev.length === 0) return prev;
                const newOut = [...prev];
                const last = newOut[newOut.length - 1];
                if (typeof last === 'string') newOut[newOut.length - 1] = last + val;
                else newOut[newOut.length - 1] = { ...last, text: last.text + val };
                return newOut;
            });
        }
    };

    const [activeMobileTab, setActiveMobileTab] = useState('editor');

    return (
        <div className="compiler-container">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={desc} />
                <meta name="keywords" content={keywords} />
                <link rel="canonical" href={url} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={desc} />
                <meta property="og:url" content={url} />
                <meta property="og:image" content="https://www.ogcompiler.com/og-image.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={desc} />
                <meta name="twitter:image" content="https://www.ogcompiler.com/og-image.png" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org", "@type": "BreadcrumbList",
                        "itemListElement": [{
                            "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.ogcompiler.com"
                        }, {
                            "@type": "ListItem", "position": 2, "name": `${lang.charAt(0).toUpperCase() + lang.slice(1)} Compiler`, "item": url
                        }]
                    })}
                </script>
            </Helmet>
            <m.header
                initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
                className="glass-panel compiler-header"
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')} title="Go to Home">
                    <div className="logo-circle">OG</div>
                    <h1 className="compiler-title-text">
                        {urlLang === 'dsa' ? t('dsa_compiler_title') : t('compiler_title', { lang: t(`languages.${lang}`, lang) })}
                    </h1>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {urlLang === 'dsa' && (
                        <m.select
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                            value={lang} onChange={(e) => setDsaLang(e.target.value)}
                            className="lang-select"
                        >
                            <option value="java" style={{ background: '#1e1e1e', color: 'white' }}>☕ Java</option>
                            <option value="cpp" style={{ background: '#1e1e1e', color: 'white' }}>⚡ C++</option>
                            <option value="python" style={{ background: '#1e1e1e', color: 'white' }}>🐍 Python</option>
                            <option value="c" style={{ background: '#1e1e1e', color: 'white' }}>🔧 C</option>
                        </m.select>
                    )}
                    <MusicPlayer compact={true} />
                </div>
            </m.header >

            {/* Mobile Tabs Navigation */}
            <div className="mobile-tabs-nav" style={{ display: 'none' }}>
                <button
                    className={`mobile-tab-btn ${activeMobileTab === 'editor' ? 'active' : ''}`}
                    onClick={() => setActiveMobileTab('editor')}
                >
                    {/* Code Icon */}
                    <span style={{ marginRight: '8px' }}>{'</>'}</span>
                    Code
                </button>
                <button
                    className={`mobile-tab-btn ${activeMobileTab === 'terminal' ? 'active' : ''}`}
                    onClick={() => setActiveMobileTab('terminal')}
                >
                    {/* Terminal Icon */}
                    <span style={{ marginRight: '8px' }}>{'>_'}</span>
                    Output
                </button>
            </div>

            <m.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
                className="welcome-text"
            >
                {t('welcome_message')}
            </m.div>

            <m.main className="main-layout"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
                style={{ pointerEvents: 'auto' }}
            >
                <div className="editor-wrapper">
                    <Editor
                        language={lang}
                        code={current.code}
                        onChange={(val) => updateState({ code: val || "" })}
                        onRun={run}
                        isLoading={loading}
                    />
                </div>

                <div className="sidebar-column">
                    <div className="terminal-wrapper">
                        <Terminal
                            output={output}
                            waiting={waiting}
                            status={status}
                            onSubmit={handleInput}
                            loading={loading}
                            onReset={reset}
                        />
                    </div>
                </div>
            </m.main>

            {/* Info Section */}
            <m.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
                className="info-section"
            >
                <p className="info-text">
                    <strong style={{ color: '#a8c0ff' }}>OG Compiler</strong> provides a fast, secure, and completely free online coding environment.
                    Execute code in <strong style={{ color: '#d946ef' }}>Java, Python, C, C++, and JavaScript</strong> with real-time output
                    in an isolated sandbox - no registration required.
                </p>
                <div className="feature-badges">
                    <span>⚡ Fast Execution</span><span>🔒 Secure</span><span>💯 100% Free</span><span>🌍 Multi-Language</span>
                </div>
            </m.div>

            {/* Footer */}
            <footer className="compiler-footer">
                <div className="footer-grid">
                    <div className="footer-column">
                        <h4>OG Compiler</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>Fast, secure, and free online compiler for multiple programming languages.</p>
                    </div>
                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <div className="footer-links">
                            <a href="/" className="footer-link">Home</a>
                            <a href="/about" className="footer-link">About</a>
                            <a href="/contact" className="footer-link">Contact</a>
                        </div>
                    </div>
                    <div className="footer-column">
                        <h4>Languages</h4>
                        <div className="footer-links">
                            <span className="footer-link">☕ Java</span>
                            <span className="footer-link">🐍 Python</span>
                            <span className="footer-link">⚡ C / C++</span>
                            <span className="footer-link">📜 JavaScript</span>
                        </div>
                    </div>
                    <div className="footer-column">
                        <h4>Connect</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>Built with ❤️ by developers, for developers</p>
                    </div>
                </div>
                <div className="copyright">
                    © 2025 OG Compiler. All rights reserved.
                </div>
            </footer>
        </div >
    );
};

export default CompilerPage;
