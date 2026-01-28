import React from 'react';

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

const HUD = ({ money, progress, showProgress }) => {
    return (
        <>
            <div id="hud" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
                <div className="money-display" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ color: '#f1c40f', fontWeight: 'bold' }}>$</span> {money}
                </div>
            </div>

            {showProgress && <PixelProgressBar progress={progress} />}
        </>
    );
};

export default HUD;
