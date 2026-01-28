import React from 'react';
import { useNavigate } from 'react-router-dom';
import SimulatedBackground from './SimulatedBackground';

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
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    marginBottom: '40px',
                    transform: 'perspective(1000px) rotateX(2deg)', // 3D effect
                    transition: 'transform 0.3s ease'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateX(2deg)'}
                >
                    <img
                        src="/gameplay_preview.png"
                        alt="Gameplay Preview"
                        style={{ width: '100%', display: 'block' }}
                    />
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
