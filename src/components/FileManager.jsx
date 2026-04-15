import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { File, Plus, Trash2, ChevronDown, ChevronRight, Save, X } from 'lucide-react';

const FileManager = ({ socket, language }) => {
    const [files, setFiles] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const [newFileContent, setNewFileContent] = useState('');
    const [showNewFile, setShowNewFile] = useState(false);
    const [editingFile, setEditingFile] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [message, setMessage] = useState(null);

    // Get file extension based on language
    const getDefaultExtension = () => {
        switch (language) {
            case 'c': return '.h';
            case 'cpp': return '.h';
            case 'java': return '.java';
            case 'python': return '.py';
            case 'javascript': return '.js';
            default: return '.txt';
        }
    };

    // Fetch file list
    const fetchFiles = () => {
        if (socket) {
            socket.emit('list_files');
        }
    };

    useEffect(() => {
        fetchFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('files_list', ({ files }) => {
            setFiles(files);
        });

        socket.on('file_saved', ({ message }) => {
            setMessage({ type: 'success', text: message });
            fetchFiles();
            setShowNewFile(false);
            setNewFileName('');
            setNewFileContent('');
            setEditingFile(null);
            setTimeout(() => setMessage(null), 3000);
        });

        socket.on('file_deleted', ({ message }) => {
            setMessage({ type: 'success', text: message });
            fetchFiles();
            setTimeout(() => setMessage(null), 3000);
        });

        socket.on('file_content', ({ filename, content }) => {
            setEditingFile(filename);
            setEditContent(content);
        });

        socket.on('file_error', ({ message }) => {
            setMessage({ type: 'error', text: message });
            setTimeout(() => setMessage(null), 3000);
        });

        fetchFiles();

        return () => {
            socket.off('files_list');
            socket.off('file_saved');
            socket.off('file_deleted');
            socket.off('file_content');
            socket.off('file_error');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    const handleSaveNewFile = () => {
        if (!newFileName.trim()) {
            setMessage({ type: 'error', text: 'Please enter a filename' });
            return;
        }
        const filename = newFileName.includes('.') ? newFileName : newFileName + getDefaultExtension();
        socket.emit('save_file', { filename, content: newFileContent });
    };

    const handleUpdateFile = () => {
        if (editingFile) {
            socket.emit('save_file', { filename: editingFile, content: editContent });
        }
    };

    const handleDeleteFile = (filename) => {
        if (confirm(`Delete ${filename}?`)) {
            socket.emit('delete_file', { filename });
        }
    };

    const handleEditFile = (filename) => {
        socket.emit('get_file', { filename });
    };

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            marginBottom: '10px',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div
                onClick={() => { setIsExpanded(!isExpanded); if (!isExpanded) fetchFiles(); }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    cursor: 'pointer',
                    background: 'rgba(168, 192, 255, 0.05)',
                    borderBottom: isExpanded ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}
            >
                {isExpanded ? <ChevronDown size={16} color="#a8c0ff" /> : <ChevronRight size={16} color="#a8c0ff" />}
                <File size={16} color="#a8c0ff" />
                <span style={{ color: '#a8c0ff', fontSize: '0.85rem', fontWeight: 600 }}>
                    Session Files ({files.length})
                </span>
                <div style={{ flex: 1 }} />
                {isExpanded && (
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowNewFile(true); }}
                        style={{
                            background: 'rgba(168, 192, 255, 0.1)',
                            border: '1px solid rgba(168, 192, 255, 0.3)',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#a8c0ff',
                            cursor: 'pointer',
                            fontSize: '0.75rem'
                        }}
                    >
                        <Plus size={12} /> New
                    </button>
                )}
            </div>

            {/* Content */}
            <AnimatePresence>
                {isExpanded && (
                    <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        {/* Message */}
                        {message && (
                            <div style={{
                                padding: '8px 12px',
                                background: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                                color: message.type === 'error' ? '#ef4444' : '#22c55e',
                                fontSize: '0.8rem'
                            }}>
                                {message.text}
                            </div>
                        )}

                        {/* New File Form */}
                        {showNewFile && (
                            <div style={{ padding: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                    <input
                                        type="text"
                                        placeholder={`filename${getDefaultExtension()}`}
                                        value={newFileName}
                                        onChange={(e) => setNewFileName(e.target.value)}
                                        style={{
                                            flex: 1,
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '4px',
                                            padding: '6px 10px',
                                            color: 'white',
                                            fontSize: '0.85rem'
                                        }}
                                    />
                                    <button onClick={handleSaveNewFile} style={{
                                        background: 'rgba(34, 197, 94, 0.2)',
                                        border: '1px solid rgba(34, 197, 94, 0.4)',
                                        borderRadius: '4px',
                                        padding: '6px 10px',
                                        color: '#22c55e',
                                        cursor: 'pointer'
                                    }}>
                                        <Save size={14} />
                                    </button>
                                    <button onClick={() => setShowNewFile(false)} style={{
                                        background: 'rgba(239, 68, 68, 0.2)',
                                        border: '1px solid rgba(239, 68, 68, 0.4)',
                                        borderRadius: '4px',
                                        padding: '6px 10px',
                                        color: '#ef4444',
                                        cursor: 'pointer'
                                    }}>
                                        <X size={14} />
                                    </button>
                                </div>
                                <textarea
                                    placeholder="File content..."
                                    value={newFileContent}
                                    onChange={(e) => setNewFileContent(e.target.value)}
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        background: 'rgba(0, 0, 0, 0.3)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.85rem',
                                        fontFamily: "'JetBrains Mono', monospace",
                                        resize: 'vertical'
                                    }}
                                />
                            </div>
                        )}

                        {/* Edit File Form */}
                        {editingFile && (
                            <div style={{ padding: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span style={{ color: '#a8c0ff', fontSize: '0.85rem', fontWeight: 600 }}>
                                        Editing: {editingFile}
                                    </span>
                                    <div style={{ flex: 1 }} />
                                    <button onClick={handleUpdateFile} style={{
                                        background: 'rgba(34, 197, 94, 0.2)',
                                        border: '1px solid rgba(34, 197, 94, 0.4)',
                                        borderRadius: '4px',
                                        padding: '6px 10px',
                                        color: '#22c55e',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        fontSize: '0.75rem'
                                    }}>
                                        <Save size={12} /> Save
                                    </button>
                                    <button onClick={() => setEditingFile(null)} style={{
                                        background: 'rgba(239, 68, 68, 0.2)',
                                        border: '1px solid rgba(239, 68, 68, 0.4)',
                                        borderRadius: '4px',
                                        padding: '6px 10px',
                                        color: '#ef4444',
                                        cursor: 'pointer'
                                    }}>
                                        <X size={14} />
                                    </button>
                                </div>
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    style={{
                                        width: '100%',
                                        height: '150px',
                                        background: 'rgba(0, 0, 0, 0.3)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        color: 'white',
                                        fontSize: '0.85rem',
                                        fontFamily: "'JetBrains Mono', monospace",
                                        resize: 'vertical'
                                    }}
                                />
                            </div>
                        )}

                        {/* File List */}
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {files.length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                                    No files yet. Click "New" to create one.
                                </div>
                            ) : (
                                files.map((file) => (
                                    <div
                                        key={file.name}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '8px 12px',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleEditFile(file.name)}
                                    >
                                        <File size={14} color="#94a3b8" />
                                        <span style={{ flex: 1, color: '#e5e7eb', fontSize: '0.85rem' }}>{file.name}</span>
                                        <span style={{ color: '#64748b', fontSize: '0.75rem' }}>
                                            {file.size < 1024 ? `${file.size}B` : `${(file.size / 1024).toFixed(1)}KB`}
                                        </span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteFile(file.name); }}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#ef4444',
                                                cursor: 'pointer',
                                                padding: '4px'
                                            }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Usage Hint */}
                        {files.length > 0 && (
                            <div style={{
                                padding: '8px 12px',
                                background: 'rgba(168, 192, 255, 0.05)',
                                color: '#94a3b8',
                                fontSize: '0.75rem'
                            }}>
                                💡 Use <code style={{ color: '#a8c0ff' }}>#include "{files[0]?.name}"</code> in your code
                            </div>
                        )}
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FileManager;
