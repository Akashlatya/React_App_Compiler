import React, { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react';
import { m } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, SkipForward, SkipBack } from 'lucide-react';

// Playlist of algorithmic (AI-generated) royalty-free tracks
// Moved outside component to prevent recreation on every render
const playlist = [
    {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        name: "Soft Focus (AI Gen)"
    },
    {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        name: "Deep Learning (AI Gen)"
    },
    {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        name: "Midnight Logic (AI Gen)"
    },
    {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        name: "Algorithm Rhythm (AI Gen)"
    },
    {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        name: "Energetic Pulse (AI Gen)"
    },
    {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        name: "Binary Beats (AI Gen)"
    },
    {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        name: "Creative Flow (AI Gen)"
    }
];

const MusicPlayer = ({ inline = false, compact = false }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef(null);

    const currentTrack = playlist[currentTrackIndex];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        // When track changes, update the audio source and play if it was playing
        if (audioRef.current && isPlaying) {
            audioRef.current.load();
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTrackIndex]);

    const togglePlay = useCallback(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            }
            setIsPlaying(prev => !prev);
        }
    }, [isPlaying]);

    const toggleMute = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(prev => !prev);
        }
    }, [isMuted]);

    const playNext = useCallback(() => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }, []);

    const playPrevious = useCallback(() => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    }, []);

    const handleTrackEnd = useCallback(() => {
        playNext();
    }, [playNext]);

    const containerStyle = useMemo(() => {
        if (compact) {
            return {
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '50px',
                padding: '4px 12px 4px 4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backdropFilter: 'blur(5px)'
            };
        }

        return inline ? {
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '50px',
            padding: '6px 16px 6px 6px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backdropFilter: 'blur(5px)'
        } : {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            background: 'rgba(30, 30, 46, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: '15px 20px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            zIndex: 1000
        };
    }, [inline, compact]);

    return (
        <m.div
            initial={{ opacity: 0, y: inline || compact ? -20 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: inline || compact ? -20 : 50 }}
            style={containerStyle}
        >
            <audio ref={audioRef} src={currentTrack.url} loop={false} onEnded={handleTrackEnd} />

            {!compact && (
                <>
                    <div style={{
                        width: inline ? '32px' : '40px',
                        height: inline ? '32px' : '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <Music size={inline ? 16 : 20} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: inline ? '0.75rem' : '0.9rem', fontWeight: 600, color: '#fff', letterSpacing: '0.5px' }}>AI Focus Mode</span>
                        <span style={{ fontSize: inline ? '0.65rem' : '0.75rem', color: '#a6accd' }}>{currentTrack.name}</span>
                    </div>

                    <div style={{ width: '1px', height: inline ? '24px' : '30px', background: 'rgba(255,255,255,0.1)', margin: '0 5px' }} />
                </>
            )}

            <button
                onClick={playPrevious}
                style={{
                    color: '#fff',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    width: compact ? '26px' : (inline ? '28px' : '36px'),
                    height: compact ? '26px' : (inline ? '28px' : '36px'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s',
                    cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                title="Previous Track"
            >
                <SkipBack size={compact ? 12 : 14} />
            </button>

            <button
                onClick={togglePlay}
                style={{
                    color: '#fff',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: compact ? '28px' : (inline ? '32px' : '36px'),
                    height: compact ? '28px' : (inline ? '32px' : '36px'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s',
                    cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >
                {isPlaying ? <Pause size={compact ? 13 : 16} fill="currentColor" /> : <Play size={compact ? 13 : 16} fill="currentColor" style={{ marginLeft: '2px' }} />}
            </button>

            <button
                onClick={playNext}
                style={{
                    color: '#fff',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    width: compact ? '26px' : (inline ? '28px' : '36px'),
                    height: compact ? '26px' : (inline ? '28px' : '36px'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                title="Next Track"
            >
                <SkipForward size={compact ? 12 : 14} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: compact ? '6px' : '8px' }}>
                <button onClick={toggleMute} style={{ color: '#a6accd', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}>
                    {isMuted ? <VolumeX size={compact ? 14 : 16} /> : <Volume2 size={compact ? 14 : 16} />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        if (isMuted) toggleMute();
                    }}
                    style={{
                        width: compact ? '45px' : (inline ? '50px' : '60px'),
                        accentColor: '#8b5cf6',
                        cursor: 'pointer'
                    }}
                />
            </div>
        </m.div>
    );
};

export default memo(MusicPlayer);
