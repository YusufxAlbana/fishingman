import React from 'react';
import GameCanvas from './GameCanvas';

const SimulatedBackground = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1, // Behind everything
            pointerEvents: 'none', // Not interactive
            filter: 'blur(3px) brightness(0.6)', // Slight blur and darkening
        }}>
            <GameCanvas autoPlay={true} />
        </div>
    );
};

export default SimulatedBackground;
