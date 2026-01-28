import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UI_ICONS } from '../constants/assets';

import pixelGirl from '../assets/Pixel_girl-removebg-preview.png';

const ResultModal = ({ fish, onRestart, isLevelUp }) => {
    const navigate = useNavigate();
    if (!fish) return null;
    const stars = '★'.repeat(fish.stars);

    return (
        <div id="result-modal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="modal-content" style={{
                position: 'relative',
                width: '100%', maxWidth: '700px', height: '400px',
                display: 'flex', alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '4px solid white',
                borderRadius: '30px',
                padding: '0',
                overflow: 'hidden', // Contain everything inside
                boxShadow: '0 0 30px rgba(0,0,0,0.5)'
            }}>

                {/* Left Side: Pixel Girl */}
                <div style={{
                    flex: '0 0 40%', // Slightly wider to fit her
                    height: '100%',
                    background: 'rgba(0,0,0,0.05)', // Subtle background for her area
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    borderRight: '2px solid rgba(0,0,0,0.1)'
                }}>
                    <img
                        src={pixelGirl}
                        alt="Pixel Girl"
                        style={{
                            height: '90%', // Fit inside (90% height)
                            marginBottom: '0',
                            objectFit: 'contain',
                            filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.2))'
                        }}
                    />
                </div>

                {/* Right Side: Content */}
                <div style={{
                    flex: '1',
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    {/* Speech Bubble */}
                    <div style={{
                        position: 'relative',
                        background: 'white',
                        border: '2px solid #2c3e50',
                        borderRadius: '15px',
                        padding: '10px 20px',
                        marginBottom: '20px',
                        boxShadow: '4px 4px 0 #bdc3c7',
                        maxWidth: '90%'
                    }}>
                        <div style={{
                            fontSize: '1.2rem', color: '#2c3e50', fontWeight: 'bold', textAlign: 'center'
                        }}>
                            "Selamat! Kamu mendapatkan <span style={{ color: '#0072ff' }}>{fish.name}</span>!"
                        </div>
                        {/* Little triangle arrow pointing left to girl */}
                        <div style={{
                            position: 'absolute',
                            left: '-10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '0',
                            height: '0',
                            borderTop: '10px solid transparent',
                            borderBottom: '10px solid transparent',
                            borderRight: '10px solid #2c3e50'
                        }}></div>
                    </div>

                    <h2 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', color: '#2c3e50', textTransform: 'uppercase', letterSpacing: '2px' }}>Tangkap!</h2>

                    {isLevelUp && (
                        <div style={{
                            background: 'linear-gradient(45deg, #f1c40f, #e67e22)',
                            color: 'white', padding: '5px 15px', borderRadius: '10px',
                            fontWeight: 'bold', fontSize: '1rem', marginBottom: '15px',
                            boxShadow: '0 5px 15px rgba(241, 196, 15, 0.4)',
                            animation: 'bounce 0.5s infinite alternate'
                        }}>
                            LEVEL UP! +$500
                        </div>
                    )}

                    <div style={{ color: '#f1c40f', fontSize: '2rem', marginBottom: '30px', letterSpacing: '5px', textShadow: '0 2px 0 rgba(0,0,0,0.1)' }}>{stars}</div>

                    {/* Buttons Row */}
                    <div style={{ display: 'flex', gap: '15px', width: '100%', justifyContent: 'center' }}>
                        <button
                            onClick={() => navigate('/backpack')}
                            style={{
                                background: 'white', border: '2px solid #bdc3c7', borderRadius: '15px',
                                padding: '10px 20px', color: '#7f8c8d', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                fontWeight: 'bold', fontSize: '1rem',
                                boxShadow: '0 4px 0 #bdc3c7',
                                transition: 'transform 0.1s'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#7f8c8d"><path d={UI_ICONS.bag} /></svg>
                            Tas
                        </button>

                        <button className="big-btn primary" onClick={onRestart} style={{
                            padding: '10px 30px',
                            fontSize: '1rem',
                            borderRadius: '15px',
                            boxShadow: '0 4px 0 #0056b3',
                            width: 'auto'
                        }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginRight: '5px' }}><path d={UI_ICONS.play} /></svg>
                            Main Lagi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultModal;
