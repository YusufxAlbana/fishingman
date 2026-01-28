import React, { useEffect } from 'react';
import pixelGirl from '../assets/Pixel_girl-removebg-preview.png';

const PixelNotification = ({ message, onClose }) => {

    // Close on click anywhere
    useEffect(() => {
        const handleClick = () => onClose();
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [onClose]);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                position: 'relative',
                width: '100%', maxWidth: '800px',
                height: '400px',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Pixel Girl - Left Center */}
                <div style={{
                    position: 'absolute',
                    left: '0',
                    bottom: '0', // Anchor to bottom to look like standing
                    height: '100%',
                    width: '300px', // Estimation
                    display: 'flex',
                    alignItems: 'flex-end'
                }}>
                    <img
                        src={pixelGirl}
                        alt="Pixel Girl"
                        style={{
                            height: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))'
                        }}
                    />
                </div>

                {/* Message Box - Right Center */}
                <div style={{
                    position: 'absolute',
                    right: '20px',
                    width: '60%',
                    background: '#2c3e50',
                    border: '4px solid white',
                    borderRadius: '10px',
                    padding: '30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: '200px'
                }}>
                    {/* Message Text */}
                    <div style={{
                        color: 'white',
                        fontSize: '1.5rem',
                        lineHeight: '1.6',
                        fontFamily: 'monospace',
                        textShadow: '1px 1px 0 black'
                    }}>
                        {message}
                    </div>

                    {/* Continue Text - Bottom Right */}
                    <div style={{
                        marginTop: '30px',
                        textAlign: 'right',
                        color: '#f1c40f',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        animation: 'blink 1s infinite'
                    }}>
                        ▼ Pencet untuk lanjut
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default PixelNotification;
