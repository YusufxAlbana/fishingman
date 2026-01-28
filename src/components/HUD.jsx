import React from 'react';

import pixelGirl from '../assets/Pixel_girl-removebg-preview.png';

const PixelProgressBar = ({ progress }) => {
    // 20 segments, each 5%
    const segments = 20;
    const filledSegments = Math.ceil((progress / 100) * segments);

    // Pixel size multiplier
    const s = 4;

    return (
        <div style={{
            position: 'fixed',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            zIndex: 100
        }}>
            {/* The Bar */}
            <svg width={8 * s} height={(segments * 2 + 4) * s} viewBox={`0 0 ${8} ${segments * 2 + 4}`}>
                {/* Border */}
                <rect x="0" y="0" width="8" height={segments * 2 + 4} fill="#2c3e50" />
                <rect x="1" y="1" width="6" height={segments * 2 + 2} fill="#34495e" />

                {/* Segments (drawn bottom up) */}
                {[...Array(segments)].map((_, i) => {
                    // i=0 is bottom (visually), so we map index to position
                    // SVG y=0 is top. 
                    // Let's draw from bottom: y = height - (i * 2) - something
                    const isFilled = i < filledSegments;

                    // Color logic
                    let color = '#555'; // Empty
                    if (isFilled) {
                        if (progress > 80) color = '#2ecc71'; // Green
                        else if (progress > 40) color = '#f1c40f'; // Yellow
                        else color = '#e74c3c'; // Red (low progress usually means catching is hard? Or is 100% caught?)
                        // Game logic: 100% = Caught. So 0% = Empty.
                        // So Red -> Yellow -> Green is good.
                    }

                    return (
                        <rect
                            key={i}
                            x="2"
                            y={(segments * 2 + 2) - (i * 2) - 2} // Bottom up
                            width="4"
                            height="1" // 1 pixel gap
                            fill={color}
                        />
                    );
                })}
            </svg>

            {/* Icon/Emoji */}
            <div style={{ fontSize: '2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                🎣
            </div>

            {/* Text Percentage */}
            <div style={{
                fontFamily: 'monospace', fontWeight: 'bold',
                color: 'white', textShadow: '2px 2px 0 #000',
                background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '4px'
            }}>
                {Math.round(progress)}%
            </div>
        </div>
    );
};

const TutorialHint = () => {
    return (
        <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            zIndex: 90,
            display: 'flex',
            alignItems: 'flex-end',
            gap: '10px',
            pointerEvents: 'none' // Don't block clicks
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
                fontFamily: '"Press Start 2P", monospace', // Try pixel font if available, fallback to monospace
                fontSize: '0.7rem',
                color: '#2c3e50',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                border: '2px solid #2c3e50',
                marginBottom: '10px',
                animation: 'float 2s infinite ease-in-out'
            }}>
                WASD untuk gerak
            </div>

            <style>
                {`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                `}
            </style>
        </div>
    );
};

const HUD = ({ money, progress, showProgress }) => {
    return (
        <>
            <div id="hud" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
                <div className="money-display" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ color: '#f1c40f', fontWeight: 'bold' }}>$</span> {money}
                </div>
            </div>

            <TutorialHint />

            {showProgress && <PixelProgressBar progress={progress} />}
        </>
    );
};

export default HUD;
