
import React from 'react';

const PixelIcon = ({ grid, palette, scale = 4, className }) => {
    const width = grid[0].length * scale;
    const height = grid.length * scale;

    return (
        <div className={className} style={{ width, height, position: 'relative' }}>
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${grid[0].length} ${grid.length}`}
                style={{ display: 'block' }}
            >
                {grid.map((row, y) => (
                    row.split('').map((char, x) => {
                        if (char === '.') return null;
                        const color = palette[char] || palette['1'];
                        return (
                            <rect
                                key={`${x}-${y}`}
                                x={x}
                                y={y}
                                width={1}
                                height={1}
                                fill={color}
                            />
                        );
                    })
                ))}
            </svg>
        </div>
    );
};

export const PixelShopIcon = ({ scale = 4 }) => {
    const grid = [
        "............",
        "......11....",
        ".........1..",
        "..11111111..",
        "..1......1..",
        "..1......1..",
        "..11111111..",
        "....1..1....",
        "....1..1....",
        "............"
    ];
    const palette = {
        '1': '#9b59b6' // Purple
    };
    return <PixelIcon grid={grid} palette={palette} scale={scale} />;
};

export const PixelBagIcon = ({ scale = 4 }) => {
    const grid = [
        "............",
        "....1111....",
        "...1....1...",
        "..11111111..",
        "..1......1..",
        "..1......1..",
        "..1.2222.1..",
        "..11111111..",
        "............",
        "............"
    ];
    const palette = {
        '1': '#2ecc71', // Green
        '2': '#27ae60'  // Darker Green for strap/detail
    };
    return <PixelIcon grid={grid} palette={palette} scale={scale} />;
};

export const PixelCollectionIcon = ({ scale = 4 }) => {
    const grid = [
        "............",
        "...11.......",
        "..1111......",
        "..1111.11...",
        "..1111.11...",
        "..1111......",
        "..1111......",
        "...11.......",
        "............",
        "............"
    ];
    // Wait, let's do a book or folder
    const bookGrid = [
        "............",
        "....111.....",
        "...11111....",
        "..1111111...",
        "..1.222.1...",
        "..1.222.1...",
        "..1111111...",
        "...11111....",
        "....111.....",
        "............"
    ];
    const palette = {
        '1': '#f1c40f', // Yellow
        '2': '#f39c12'  // Darker Yellow
    };
    return <PixelIcon grid={bookGrid} palette={palette} scale={scale} />;
};

export const PixelPlayIcon = ({ scale = 4 }) => {
    const grid = [
        "............",
        "..1.........",
        "..111.......",
        "..11111.....",
        "..1111111...",
        "..11111.....",
        "..111.......",
        "..1.........",
        "............",
        "............"
    ];
    const palette = {
        '1': '#ffffff' // White
    };
    return <PixelIcon grid={grid} palette={palette} scale={scale} />;
};
