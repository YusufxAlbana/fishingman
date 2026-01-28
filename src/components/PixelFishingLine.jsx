import React from 'react';

const PixelFishingLine = () => {
    const pixelSize = 4;

    // Simple palette based on the image (Gold/Yellow line, Black/White spool)
    const C = {
        _: 'transparent',
        B: '#000000', // Black Case
        W: '#ECECEC', // White Label/Plastic
        G: '#F1C40F', // Gold Line
        D: '#B7950B', // Dark Gold (Shadow)
        R: '#E74C3c', // Red Text detail
    };

    // 2 Spools: One Standing (Left), One Flat (Right)
    // 24x24 Grid roughly
    const shape = [
        "________________________",
        "_______BBBBBB___________",
        "_____BBWWWWWBB__________",
        "___BBWWWWWWWWWBB________",
        "__BWWWWWWWWWWWWWB_______",
        "__BWGGGWWWWWGGGWB_______", // Top rim of standing spool
        "_BWWGGGGGGGGGGGWWB______",
        "_BWGGGGGGGGGGGGGWB______",
        "_BWGGGGGGGGGGGGGWB______",
        "_BWGGGGGGGGGGGGGWB______", // Gold line wound
        "_BWGGGGGGGGGGGGGWB______",
        "_BWWGGGGGGGGGGGWWB______",
        "__BWWRRWWWWWGGGWB_______", // Label detail
        "__BWWWWWWWWWWWWWB_______",
        "___BBWWWWWWWWWBB________",
        "_____BBWWWWWBB__________",
        "_______BBBBBB___________",
        "________________________",
        "________BBBBBB__________", // Flat spool foreground (shifted right/down)
        "______BBWWWWBB__________",
        "____BBGGGGGGBB__________",
        "____BBGGGGGGBB__________",
        "______BBWWWWBB__________",
        "________BBBB____________",
    ];

    // Let's refine the shape to match the reference: 
    // Reference: One Flat in front (leftish), One Standing behind (rightish).
    // Actually the image shows two distinct spools.
    // Let's draw one nice Standing Spool first, then maybe a second one if space permits.
    // Or just one good icon. The user said "ADA 2, 1 TIDURAN 1 LAGI BERDIRI".

    // Revised Grid for 2 Spools
    const combinedShape = [
        "__________BBBB__________", // Standing (Back Right)
        "________BBWWWWBB________",
        "_______BWWGGGGWWB_______",
        "_______BWGGGGGGWB_______",
        "_______BWGGGGGGWB_______",
        "_______BWGGGGGGWB_______",
        "_______BWWGGGGWWB_______",
        "________BBWWWWBB________",
        "__________BBBB__________",
        "________________________",
        "________________________",
        "__BBBBBBBB______________", // Flat (Front Left)
        "_BWWWWWWWWB_____________",
        "BWWGGGGGGWWB____________",
        "BWGGGGGGGGWB____________",
        "BWWGGGGGGWWB____________",
        "_BWWWWWWWWB_____________",
        "__BBBBBBBB______________",
    ];

    return (
        <svg width={24 * pixelSize} height={18 * pixelSize} viewBox="0 0 24 18">
            {combinedShape.map((row, y) => (
                row.split('').map((char, x) => {
                    const color = C[char];
                    if (char === '_') return null;
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
    );
};

export default PixelFishingLine;
