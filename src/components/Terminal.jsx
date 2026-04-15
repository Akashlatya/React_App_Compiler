import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { m, AnimatePresence } from 'framer-motion';
import { Terminal as Icon, RotateCcw } from 'lucide-react';

const Terminal = ({ output, waiting, onSubmit, prompt, status, onReset }) => {
    const { t } = useTranslation();
    const [input, setInput] = useState('');
    const bottom = useRef(null);
    const field = useRef(null);

    // Focus input when waiting
    useEffect(() => {
        if (waiting) field.current?.focus();
    }, [waiting]);

    const submit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSubmit(input);
            setInput('');
        }
    };

    return (
        <div className="terminal-container">
            {/* Header */}
            <div className="terminal-header">
                <Icon size={16} color="#a8c0ff" />
                <span className="terminal-title">{t('terminal_title')}</span>
                <div style={{ flex: 1 }} />
                {status && (
                    <span className="terminal-status">
                        {status}
                    </span>
                )}
                {onReset && (
                    <button onClick={onReset} className="terminal-reset-btn">
                        <RotateCcw size={14} />
                        <span>{t('reset')}</span>
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="terminal-content"
                onClick={() => waiting && field.current?.focus()}
            >
                <AnimatePresence initial={false}>
                    {output.map((line, i) => (
                        <m.div key={i}
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}
                            style={{
                                marginBottom: '4px', color: typeof line === 'string' ? '#e5e7eb' : line.color,
                                fontWeight: typeof line === 'object' && line.bold ? 'bold' : 'normal',
                                whiteSpace: 'pre-wrap', wordBreak: 'break-word'
                            }}
                        >
                            {typeof line === 'string' ? line : line.text}
                        </m.div>
                    ))}
                </AnimatePresence>

                {/* Input */}
                {waiting && (
                    <m.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={submit}
                        className="terminal-input-form"
                    >
                        <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{prompt || '>'}</span>
                        <input ref={field} type="text" value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="terminal-input"
                            autoFocus
                        />
                    </m.form>
                )}
                <div ref={bottom} />
            </div>
        </div>
    );
};

export default Terminal;
