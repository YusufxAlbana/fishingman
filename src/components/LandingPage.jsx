import React from 'react';
import { useNavigate } from 'react-router-dom';
import SimulatedBackground from './SimulatedBackground';
import pixelGirl from '../assets/Pixel_girl-removebg-preview.png';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="screen" style={{ overflowY: 'auto' }}>
            <SimulatedBackground />

            {/* Animated Bubbles Overlay */}
            <div className="bubbles-container">
                <div className="light-rays"></div>
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="bubble"
                        style={{
                            left: `${Math.random() * 100}%`,
                            width: `${10 + Math.random() * 40}px`,
                            height: `${10 + Math.random() * 40}px`,
                            animationDuration: `${5 + Math.random() * 15}s`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    ></div>
                ))}
            </div>

            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '20px',
                textAlign: 'center'
            }}>
                <h1 className="game-title" style={{ fontSize: '4rem', marginBottom: '10px', textShadow: '0 0 20px rgba(0,198,255,0.8)' }}>Mancing Mania</h1>
                <p style={{ color: '#ecf0f1', fontSize: '1.2rem', marginBottom: '40px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Tangkap Ikan Legendaris & Kuasai Samudera!
                </p>

                {/* Gameplay Preview */}
                <div style={{
                    width: '100%',
                    maxWidth: '800px',
                    height: '400px', // Fixed height for preview
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    marginBottom: '40px',
                    transform: 'perspective(1000px) rotateX(2deg)',
                    transition: 'transform 0.3s ease',
                    position: 'relative',
                    background: '#2980b9' // Fallback blue
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateX(2deg)'}
                >
                    <SimulatedBackground />

                    {/* Fake HUD */}
                    <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: '10px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '5px 15px', borderRadius: '20px', color: '#f1c40f', fontWeight: 'bold' }}>
                            $ 999
                        </div>
                    </div>

                    {/* Fake Player Cursor */}
                    <div style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100px', height: '100px',
                        border: '4px solid rgba(255,255,255,0.8)',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)'
                    }}></div>

                    {/* Pixel Girl Prompt */}
                    <div style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '10px'
                    }}>
                        <img
                            src={pixelGirl}
                            alt="Guide"
                            style={{
                                width: '60px',
                                filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.5))'
                            }}
                        />
                        <div style={{
                            background: 'white',
                            padding: '8px 12px',
                            borderRadius: '15px 15px 15px 0',
                            fontFamily: 'monospace',
                            fontSize: '0.8rem',
                            color: '#2c3e50',
                            boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                            fontWeight: 'bold'
                        }}>
                            Ayo Mancing!
                        </div>
                    </div>
                </div>

                {/* Auth Actions */}
                <div className="glass-panel" style={{
                    display: 'flex',
                    gap: '20px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    padding: '30px',
                    borderRadius: '20px',
                    width: '100%',
                    maxWidth: '600px'
                }}>
                    <button
                        className="big-btn primary"
                        onClick={() => navigate('/login')}
                        style={{ minWidth: '200px' }}
                    >
                        Login
                    </button>
                    <button
                        className="big-btn secondary"
                        onClick={() => navigate('/register')}
                        style={{ minWidth: '200px', background: 'linear-gradient(to right, #9b59b6, #8e44ad)' }}
                    >
                        Daftar Akun
                    </button>
                </div>

                <div style={{ marginTop: '30px', color: '#bdc3c7', fontSize: '0.9rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                    *Wajib login untuk menyimpan progress permainan.
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
