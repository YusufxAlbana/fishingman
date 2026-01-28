import React, { useMemo } from 'react';
import { getFishShape } from '../constants/pixelFishShapes';

const PixelFish = ({ fish }) => {
    const { grid, palette } = useMemo(() => {
        const grid = getFishShape(fish);
        // Generate palette based on fish.color
        const baseColor = fish.color;

        const palette = {
            1: '#2c3e50', // Outline
            2: baseColor, // Main Body
            3: '#ffffff', // Highlight
            4: '#000000', // Eye
            5: baseColor  // Fin
        };

        return { grid, palette };
    }, [fish]);

    const pixelSize = 4;
    const width = grid[0].length * pixelSize;
    const height = grid.length * pixelSize;

    const getColor = (char) => {
        if (char === '.') return null;
        if (char === '3') return 'rgba(255,255,255,0.4)'; // Highlight overlay
        return palette[char] || palette[2];
    };

    return (
        <svg
            width={width * 2} // Scale up for display
            height={height * 2}
            viewBox={`0 0 ${width} ${height}`}
            style={{
                overflow: 'visible',
                filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.3))'
            }}
        >
            {grid.map((row, y) => (
                row.split('').map((char, x) => {
                    const color = getColor(char);
                    if (!color) return null;
                    return (
                        <rect
                            key={`${x}-${y}`}
                            x={x * pixelSize}
                            y={y * pixelSize}
                            width={pixelSize}
                            height={pixelSize}
                            fill={color}
                        />
                    );
                })
            ))}
        </svg>
    );
};

export default PixelFish;
