import React from 'react';
import { useNavigate } from 'react-router-dom';
import SimulatedBackground from './SimulatedBackground';
import { UI_ICONS } from '../constants/assets';

const WelcomeScreen = ({ money, user, onLogout, hooks, maxHooks, currentLevel, xp, nextHookTime, invCount }) => {
    const navigate = useNavigate();

    // XP Progress: (XP % 100) / 100
    const progressPercent = (xp % 100);

    // Format Timer
    const formatTime = (ms) => {
        if (ms <= 0) return '';
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="screen" style={{ overflow: 'hidden' }}>
            <SimulatedBackground />

            {/* Dashboard Container */}
            <div className="dashboard-grid">

                {/* Header Section */}
                <div className="dashboard-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {/* Avatar */}
                        <div style={{
                            width: '60px', height: '60px',
                            borderRadius: '50%', background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.8rem', fontWeight: 'bold', color: 'white',
                            boxShadow: '0 0 15px rgba(0, 198, 255, 0.5)',
                            position: 'relative'
                        }}>
                            {user ? user.email[0].toUpperCase() : 'G'}
                            <div style={{
                                position: 'absolute', bottom: -5, right: -5,
                                background: '#f1c40f', color: '#333',
                                borderRadius: '50%', width: '24px', height: '24px',
                                fontSize: '0.8rem', fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: '2px solid white'
                            }}>{currentLevel}</div>
                        </div>

                        {/* User Info */}
                        <div>
                            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                {user ? user.email.split('@')[0] : 'Guest Captain'}
                            </div>
                            <div style={{ color: '#bdc3c7', fontSize: '0.8rem', marginBottom: '5px' }}>
                                Lv {currentLevel} • Hooks: {hooks}/{maxHooks}
                                {hooks < maxHooks && (
                                    <span style={{ marginLeft: '8px', color: '#e74c3c', fontSize: '0.9rem' }}>
                                        (+1 in {formatTime(nextHookTime)})
                                    </span>
                                )}
                            </div>

                            {/* Level Progress Bar */}
                            <div style={{ marginBottom: '2px', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#bdc3c7' }}>
                                <span>XP</span>
                                <span>{(xp % 100)} / 100</span>
                            </div>
                            <div style={{ width: '150px', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${progressPercent}%`,
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #f1c40f, #e67e22)',
                                    transition: 'width 0.5s ease'
                                }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Money & Logout */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{
                            background: 'rgba(0,0,0,0.5)', padding: '8px 20px', borderRadius: '30px',
                            display: 'flex', alignItems: 'center', gap: '10px',
                            border: '1px solid rgba(241, 196, 15, 0.3)'
                        }}>
                            <span style={{ color: '#f1c40f', fontSize: '1.2rem' }}>$</span>
                            <span style={{ color: '#f1c40f', fontWeight: 'bold', fontSize: '1.2rem' }}>{money}</span>
                        </div>
                        <button
                            onClick={onLogout}
                            style={{
                                background: 'rgba(231, 76, 60, 0.2)', color: '#e74c3c',
                                border: '1px solid rgba(231, 76, 60, 0.5)',
                                padding: '8px 15px', borderRadius: '15px', cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        </button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="dashboard-main">

                    {/* Play Card (Big) */}
                    <div className="feature-card play-card" onClick={() => navigate('/play')}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, opacity: 0.3 }}>
                            <div className="bubble" style={{ left: '20%', width: '100px', height: '100px', animationDuration: '4s' }}></div>
                            <div className="bubble" style={{ left: '80%', width: '60px', height: '60px', animationDuration: '6s' }}></div>
                        </div>

                        <div className="card-icon" style={{ width: '100px', height: '100px', marginBottom: '20px' }}>
                            <svg viewBox="0 0 24 24" fill="white" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }}><path d={UI_ICONS.play} /></svg>
                        </div>
                        <div className="card-title" style={{ fontSize: '2.5rem' }}>BERLAYAR</div>
                        <div className="card-subtitle">Mulai memancing ikan legendaris</div>
                    </div>

                    {/* Sidebar Cards */}
                    <div className="dashboard-sidebar">

                        {/* Shop Card */}
                        <div className="feature-card" onClick={() => navigate('/shop')}>
                            <div className="card-icon">
                                <svg viewBox="0 0 24 24" fill="#9b59b6" style={{ width: '100%', height: '100%' }}><path d={UI_ICONS.shop} /></svg>
                            </div>
                            <div className="card-title">TOKO</div>
                            <div className="card-subtitle">Upgrade joran & beli kail</div>
                        </div>

                        {/* Backpack Card */}
                        <div className="feature-card" onClick={() => navigate('/backpack')}>
                            <div className="card-icon">
                                <svg viewBox="0 0 24 24" fill="#2ecc71" style={{ width: '100%', height: '100%' }}><path d={UI_ICONS.bag} /></svg>
                            </div>
                            <div className="card-title">TAS SAYA</div>
                            <div className="card-subtitle">{invCount} Ikan ditangkap</div>
                        </div>

                        {/* Collection Card */}
                        <div className="feature-card" onClick={() => navigate('/collection')}>
                            <div className="card-icon">
                                <svg viewBox="0 0 24 24" fill="#f1c40f" style={{ width: '100%', height: '100%' }}><path d={UI_ICONS.collection} /></svg>
                            </div>
                            <div className="card-title">KOLEKSI</div>
                            <div className="card-subtitle">Buku panduan ikan</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
