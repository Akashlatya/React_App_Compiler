import { useRef, useEffect, useState, lazy, Suspense, useMemo } from "react";

// Lazy load Monaco Editor
const Monaco = lazy(() => import("@monaco-editor/react"));

// Loading component
const Loader = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        background: '#1b112c',
        color: '#a8c0ff',
    }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{
                width: '40px', height: '40px',
                border: '3px solid #2d1b4e', borderTop: '3px solid #8b5cf6',
                borderRadius: '50%', animation: 'spin 1s linear infinite',
            }} />
            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Loading...</span>
        </div>
    </div>
);

const Editor = ({ language: lang, code, onChange, errors = [], onRun, isLoading: loading }) => {
    const editor = useRef(null);
    const monaco = useRef(null);
    const [ready, setReady] = useState(false);

    const onMount = (e, m) => {
        editor.current = e;
        monaco.current = m;

        m.editor.defineTheme('premium-dark', {
            base: 'vs-dark', inherit: true, rules: [],
            colors: {
                'editor.background': '#1b112c',
                'editor.lineHighlightBackground': '#2d1b4e',
            }
        });

        m.editor.setTheme('premium-dark');
        setReady(true);
    };

    // Update markers
    useEffect(() => {
        if (editor.current && monaco.current && ready) {
            const model = editor.current.getModel();
            if (model) {
                const count = model.getLineCount();
                const markers = errors
                    .filter(e => e.line > 0 && e.line <= count)
                    .map(e => ({
                        severity: monaco.current.MarkerSeverity.Error,
                        startLineNumber: e.line, startColumn: e.column || 1,
                        endLineNumber: e.line, endColumn: model.getLineContent(e.line).length + 1,
                        message: e.message,
                    }));
                monaco.current.editor.setModelMarkers(model, 'owner', markers);
            }
        }
    }, [errors, ready]);

    // Optimized Editor Options
    const options = useMemo(() => ({
        minimap: { enabled: false },
        fontSize: 14,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        padding: { top: 16 },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        accessibilitySupport: 'off',
        renderValidationDecorations: 'on',
        scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 12,
            horizontalScrollbarSize: 12,
            useShadows: true,
            alwaysConsumeMouseWheel: false
        },
        // VS Code Features
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        cursorWidth: 2,
        unfoldOnClickAfterEndOfLine: true,
        mouseWheelZoom: true, // Enable Zoom for Desktop/Mobile
        contextmenu: true,
        folding: true,
        foldingHighlight: true,
        showFoldingControls: 'always',
        bracketPairColorization: { enabled: true },
        guides: {
            bracketPairs: true,
            indentation: true
        },
        wordWrap: 'on',
        formatOnPaste: true,
        formatOnType: true,
    }), []);

    return (
        <div style={{
            height: "100%", width: "100%", borderRadius: "12px", overflow: "hidden",
            border: "1px solid var(--border-color)", display: "flex", flexDirection: "column",
            background: "#1b112c", flex: "1 1 0", minHeight: "300px", position: "relative", pointerEvents: "auto",
        }}>
            {/* Header */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 16px', background: '#1b112c', borderBottom: '1px solid #332940'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ marginLeft: '10px', textTransform: 'capitalize', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
                        {lang === 'cpp' ? 'C++' : lang} Compiler
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={onRun} disabled={loading}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                            color: 'white', padding: '6px 14px', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem',
                            boxShadow: '0 2px 8px var(--accent-glow)', opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer', transition: 'transform 0.1s', flexShrink: 0
                        }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5V19L19 12L8 5Z" />
                        </svg>
                        {loading ? 'Running...' : 'Run'}
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, minHeight: 0, pointerEvents: 'auto', userSelect: 'text', position: 'relative' }}>
                <Suspense fallback={<Loader />}>
                    <Monaco
                        height="100%"
                        language={lang}
                        value={code}
                        theme="premium-dark"
                        onChange={onChange}
                        onMount={onMount}
                        options={options}
                    />
                </Suspense>
            </div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default Editor;

