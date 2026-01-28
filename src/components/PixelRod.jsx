import React, { useMemo } from 'react';

const PixelRod = ({ rod }) => {
    // Pixel Art Grid System (24x24)
    // 0/. = empty
    // 1 = outline/dark
    // 2 = main body
    // 3 = highlight
    // 4 = handle (grip)
    // 5 = reel body
    // 6 = reel highlight/detail
    // 8 = guide/ring

    const { palette, grid, linePoints } = useMemo(() => {
        // Palettes
        const palettes = {
            bamboo: { dark: '#8e44ad', main: '#e67e22', light: '#f1c40f', handle: '#d35400', reel: '#bdc3c7', guide: '#95a5a6' },
            kayu_jati: { dark: '#5d4037', main: '#795548', light: '#8d6e63', handle: '#3e2723', reel: '#95a5a6', guide: '#b0bec5' },
            fiber_glass_v1: { dark: '#1e8449', main: '#2ecc71', light: '#82e0aa', handle: '#2c3e50', reel: '#bdc3c7', guide: '#000000' },

            composite: { dark: '#1f618d', main: '#3498db', light: '#85c1e9', handle: '#2c3e50', reel: '#95a5a6', guide: '#2c3e50' },
            carbon_steel: { dark: '#2c3e50', main: '#7f8c8d', light: '#bdc3c7', handle: '#000000', reel: '#95a5a6', guide: '#c0392b' },
            graphite_x: { dark: '#17202a', main: '#34495e', light: '#5d6d7e', handle: '#17202a', reel: '#ecf0f1', guide: '#e74c3c' },
            alloy_pro: { dark: '#117a65', main: '#16a085', light: '#76d7c4', handle: '#0e6251', reel: '#d5d8dc', guide: '#f1c40f' },

            titanium_jr: { dark: '#6c3483', main: '#8e44ad', light: '#bb8fce', handle: '#4a235a', reel: '#f5b7b1', guide: '#f1c40f' },
            nano_carbon: { dark: '#922b21', main: '#c0392b', light: '#e74c3c', handle: '#641e16', reel: '#f1948a', guide: '#ffffff' },
            plasma_rod: { dark: '#d35400', main: '#e67e22', light: '#f39c12', handle: '#a04000', reel: '#edbb99', guide: '#3498db' },
            golden_karp: { dark: '#b7950b', main: '#f1c40f', light: '#f7dc6f', handle: '#7d6608', reel: '#ffffff', guide: '#b7950b' },

            void_walker: { dark: '#000000', main: '#2c3e50', light: '#8e44ad', handle: '#000000', reel: '#4a235a', guide: '#8e44ad' },
            neptune_spear: { dark: '#1a5276', main: '#2980b9', light: '#5dade2', handle: '#154360', reel: '#aed6f1', guide: '#f1c40f' },
            galaxy_stardust: { dark: '#4a235a', main: '#9b59b6', light: '#e056fd', handle: '#2e0f35', reel: '#ffffff', guide: '#00ffff' },
            poseidon_master: { dark: '#a04000', main: '#e67e22', light: '#f39c12', handle: '#6e2c00', reel: '#f1c40f', guide: '#e74c3c' }
        };

        const p = palettes[rod.id] || palettes.bamboo;

        // Shape Ref: "Katana Like"
        // Needs a clear handle, a guard (reel seat), and a long thin blade (rod) with guides.
        // The rod is diagonal.

        // Shape 1: Standard Rod (Bamboo, Jati)
        const shapeStandard = [
            "........................",
            "......................11", // Tip
            "....................1221",
            "...................1821.", // Guide
            "..................1221..",
            ".................1221...",
            "................1821....", // Guide
            "...............1221.....",
            "..............1221......",
            ".............1821.......", // Guide
            "............1221........",
            "...........1221.........",
            "..........15551.........", // Reel Seat Start
            ".........156651.........", // Reel Body
            "........156555..........",
            ".......14415............", // Handle Start
            "......1441..............",
            ".....1441...............",
            "....1441................",
            "...1111................."  // Handle End
        ];

        // Shape 2: Slim/Tactical (Modern) - Thinner, sleeker
        const shapeSlim = [
            "........................",
            ".......................1",
            ".....................181",
            "....................121.",
            "...................181..",
            "..................121...",
            ".................181....", // Guide
            "................121.....",
            "...............181......",
            "..............121.......",
            ".............181........", // Guide
            "............121.........",
            "...........1551.........",
            "..........1565..........", // Compact Reel
            ".........1455...........",
            "........1441............",
            ".......1441.............",
            "......1441..............",
            ".....1111...............",
            "........................"
        ];

        // Shape 3: Heavy/Power (Legendary) - Thicker, more jagged
        const shapeHeavy = [
            "........................",
            "......................11",
            "....................1131",
            "...................1831.",
            "..................1221..",
            ".................1821...",
            "................1331....",
            "...............1831.....",
            "..............1221......",
            ".............15551......",
            "............156651......",
            "...........156651.......",
            "..........15555.........",
            ".........14441..........",
            "........14441...........",
            ".......14441............",
            "......11111.............",
            "........................",
            "........................",
            "........................"
        ];

        let targetParams = shapeStandard;
        if (['fiber_glass_v1', 'composite', 'carbon_steel', 'graphite_x', 'nano_carbon'].includes(rod.id)) targetParams = shapeSlim;
        if (['titanium_jr', 'plasma_rod', 'golden_karp', 'void_walker', 'neptune_spear', 'galaxy_stardust', 'poseidon_master'].includes(rod.id)) targetParams = shapeHeavy;

        // --- Calculate Line Points ---
        const guides = [];
        let reelPos = null;
        let tipPos = null;

        // Scan the grid to find key points
        targetParams.forEach((row, y) => {
            row.split('').forEach((char, x) => {
                if (char === '5' && !reelPos) {
                    // Reel Center (Approx)
                    reelPos = { x: x + 1.5, y: y + 1.5 };
                }
                if (char === '8') {
                    // Guide Center
                    guides.push({ x: x + 0.5, y: y + 0.5 });
                }
                // Determine Tip: The 'highest' and 'right-most' part of the rod body
                if (['1', '2', '3'].includes(char)) {
                    // We want the point closest to top-right (MAX x, MIN y)
                    // Simple heuristic: Update if x is larger
                    if (!tipPos || x > tipPos.x) {
                        tipPos = { x: x + 0.5, y: y + 0.5 };
                    }
                }
            });
        });

        // The scan above might catch '1's from the handle as tip if we aren't careful, 
        // but since we scan top-down, the first '1's we see are usually the tip.
        // Let's verify Tip finding with a reverse scan logic for safety.
        // Scan for Top-Right most non-empty pixel
        let foundTip = false;
        for (let r = 0; r < targetParams.length; r++) {
            for (let c = targetParams[0].length - 1; c >= 0; c--) {
                const ch = targetParams[r][c];
                if (['1', '2', '3', '8'].includes(ch)) {
                    tipPos = { x: c + 0.5, y: r + 0.5 };
                    foundTip = true;
                    break;
                }
            }
            if (foundTip) break;
        }

        const points = [];
        if (reelPos) points.push(reelPos);
        // Guides: The scan finds them Top->Bottom (Tip->Handle). 
        // We want Reel->Handle guide->Tip guide->Tip.
        // So we need to reverse the guides list.
        [...guides].reverse().forEach(g => points.push(g));
        if (tipPos) points.push(tipPos);

        return { palette: p, grid: targetParams, linePoints: points };
    }, [rod.id]);

    const getColor = (char) => {
        switch (char) {
            case '1': return palette.dark;
            case '2': return palette.main;
            case '3': return palette.light;
            case '4': return palette.handle;
            case '5': return palette.reel;
            case '6': return '#ffffff';    // Reel Highlight
            case '8': return palette.guide; // Guide
            default: return null;
        }
    };

    const pixelSize = 5;
    const width = grid[0].length * pixelSize;
    const height = grid.length * pixelSize;

    const generateLinePath = () => {
        if (linePoints.length < 2) return '';
        const start = linePoints[0]; // Reel
        let d = `M ${start.x * pixelSize} ${start.y * pixelSize}`;

        for (let i = 1; i < linePoints.length; i++) {
            const p = linePoints[i];
            d += ` L ${p.x * pixelSize} ${p.y * pixelSize}`;
        }

        // Hang down from tip
        const last = linePoints[linePoints.length - 1];
        d += ` L ${last.x * pixelSize} ${last.y * pixelSize + 60}`;

        return d;
    };

    return (
        <svg
            width="200"
            height="200"
            viewBox={`0 0 ${width} ${height + 60}`}
            style={{
                filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.5))',
                // Rotate to standard viewing angle (diagonal up-left to down-right is drawn, rotate 45 to stand up?)
                // The drawing is Diagonal (Top Left empty -> Bottom Right items). 
                // Wait, my grid puts Tip at Top Right (Row 0, Col ~20). Handle at Bottom Left (Row 20, Col ~5).
                // So it's ALREADY Diagonal /.
                // If I apply rotate(-45deg), it will stand vertical |.
                // The provided image was diagonal \ (Top Left to Bottom Right).
                // My grid is Tip Top Right / (Bottom Left to Top Right).
                // Let's KEEP it diagonal but maybe flip if needed. 
                // Actually the user reference seems to be Tip Top Left, Handle Bottom Right?
                // "JORAN.jpg" ... pixel art usually diagonal \ or /.
                // Let's assume standard diagonal is fine.
                overflow: 'visible'
            }}
        >
            {/* Fishing Line */}
            <path
                d={generateLinePath()}
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="1.5"
                fill="none"
            />

            {/* Pixels */}
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

export default PixelRod;
