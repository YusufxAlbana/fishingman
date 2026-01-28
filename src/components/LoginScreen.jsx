import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import SimulatedBackground from './SimulatedBackground';

const LoginScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Success, App.jsx listener will handle redirect/state
            navigate('/');
        }
    };

    return (
        <div className="screen">
            <SimulatedBackground />

            {/* Animated Bubbles Overlay */}
            <div className="bubbles-container">
                <div className="light-rays"></div>
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="bubble"
                        style={{
                            left: `${Math.random() * 100}%`,
                            width: `${10 + Math.random() * 40}px`,
                            height: `${10 + Math.random() * 40}px`,
                            animationDuration: `${5 + Math.random() * 10}s`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="menu-content glass-panel" style={{ padding: '40px', borderRadius: '20px', width: '90%', maxWidth: '400px', backdropFilter: 'blur(20px)' }}>
                <h2 style={{ color: 'white', marginBottom: '10px', textAlign: 'center', fontSize: '2rem', textShadow: '0 0 10px rgba(0,198,255,0.5)' }}>Login</h2>
                <div style={{ width: '50px', height: '4px', background: '#00c6ff', borderRadius: '2px', marginBottom: '30px' }}></div>

                {error && <div style={{ background: 'rgba(231, 76, 60, 0.8)', color: 'white', padding: '10px', borderRadius: '10px', marginBottom: '15px' }}>{error}</div>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                    <div>
                        <label style={{ color: '#ecf0f1', display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Email</label>
                        <div className="input-group">
                            <div className="input-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </div>
                            <input
                                className="auth-input with-icon"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="nama@email.com"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ color: '#ecf0f1', display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Password</label>
                        <div className="input-group">
                            <div className="input-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </div>
                            <input
                                className="auth-input with-icon"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="big-btn primary"
                        disabled={loading}
                        style={{ marginTop: '10px', fontSize: '1.1rem', padding: '15px', borderRadius: '15px' }}
                    >
                        {loading ? 'Memproses...' : 'Masuk sekarang'}
                    </button>
                </form>

                <div style={{ marginTop: '25px', textAlign: 'center', color: '#bdc3c7', fontSize: '0.9rem' }}>
                    Belum punya akun? <span onClick={() => navigate('/register')} style={{ color: '#00c6ff', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>Daftar di sini</span>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', color: '#95a5a6', cursor: 'pointer', fontSize: '0.9rem' }}>
                        ← Simpan & Kembali
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
