import React, { useRef, useEffect } from 'react';
import { CONFIG } from '../constants/gameConfig';
import { FISH_TYPES } from '../constants/assets';
import { getFishShape } from '../constants/pixelFishShapes';

const GameCanvas = ({ onGameOver, onProgressUpdate, autoPlay = false, rod }) => {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    // Refs for Props to avoid stale closures in animate loop
    const propsRef = useRef({ rod, onProgressUpdate, onGameOver });
    useEffect(() => {
        propsRef.current = { rod, onProgressUpdate, onGameOver };
    }, [rod, onProgressUpdate, onGameOver]);

    // Throttle progress updates to avoid React render spam
    const lastUpdateRef = useRef(0);

    // Mutable Game State (Physics)
    const physics = useRef({
        player: { x: 0, y: 0, vx: 0, vy: 0, radius: CONFIG.playerRadius, catching: false },
        fish: {
            x: 0, y: 0, vx: 0, vy: 0, radius: 25,
            timer: 0, idle: false, idleTimer: 0, targetX: 0, targetY: 0,
            data: null
        },
        keys: { w: false, a: false, s: false, d: false },
        progress: 0,
        width: 0,
        height: 0
    });

    // Initialize Game
    useEffect(() => {
        const p = physics.current;
        p.width = window.innerWidth;
        p.height = window.innerHeight;

        // Spawn Random Fish
        p.fish.data = selectRandomFish();
        p.fish.grid = getFishShape(p.fish.data);
        // p.fish.path = new Path2D(p.fish.data.path); // REMOVED

        // Center Player
        p.player.x = p.width / 2;
        p.player.y = p.height / 2;
        p.fish.x = Math.random() * p.width;
        p.fish.y = Math.random() * p.height;
        p.fish.targetX = p.fish.x;
        p.fish.targetY = p.fish.y;
        p.progress = 0; // Reset progress

        // Resize Listener
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                p.width = window.innerWidth;
                p.height = window.innerHeight;
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Init size

        // Controls
        const handleDown = (e) => { if (p.keys[e.key.toLowerCase()] !== undefined) p.keys[e.key.toLowerCase()] = true; };
        const handleUp = (e) => { if (p.keys[e.key.toLowerCase()] !== undefined) p.keys[e.key.toLowerCase()] = false; };

        if (!autoPlay) {
            window.addEventListener('keydown', handleDown);
            window.addEventListener('keyup', handleUp);
        }

        // Start Loop
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (!autoPlay) {
                window.removeEventListener('keydown', handleDown);
                window.removeEventListener('keyup', handleUp);
            }
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []); // Only run on mount

    const selectRandomFish = () => {
        // Star Gating Logic
        // Default to Bamboo stats (Max 2 stars) if no rod provided
        const currentRod = propsRef.current.rod;
        const maxStars = currentRod ? (currentRod.maxStars || 2) : 2;

        const validFish = FISH_TYPES.filter(f => f.stars <= maxStars);

        // Weighted random could be better, but simple random from pool is fine heavily skewed by data count
        return validFish[Math.floor(Math.random() * validFish.length)];
    };

    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Unmounted
        const ctx = canvas.getContext('2d');
        const p = physics.current;
        const currentProps = propsRef.current;

        // --- UPDATE ---

        // Bot Logic (AutoPlay)
        if (autoPlay) {
            const dx = p.fish.x - p.player.x;
            const dy = p.fish.y - p.player.y;
            // Simple P-controller for bot
            p.keys.d = dx > 20;
            p.keys.a = dx < -20;
            p.keys.s = dy > 20;
            p.keys.w = dy < -20;
        }

        // Player
        if (p.keys.w) p.player.vy -= CONFIG.acceleration;
        if (p.keys.s) p.player.vy += CONFIG.acceleration;
        if (p.keys.a) p.player.vx -= CONFIG.acceleration;
        if (p.keys.d) p.player.vx += CONFIG.acceleration;

        // Rod Friction
        const effectiveFriction = currentProps.rod ? currentProps.rod.friction : CONFIG.friction;

        p.player.vx *= effectiveFriction;
        p.player.vy *= effectiveFriction;
        p.player.x += p.player.vx;
        p.player.y += p.player.vy;

        // Bounds Player
        if (p.player.x < p.player.radius) { p.player.x = p.player.radius; p.player.vx *= -0.5; }
        if (p.player.x > p.width - p.player.radius) { p.player.x = p.width - p.player.radius; p.player.vx *= -0.5; }
        if (p.player.y < p.player.radius) { p.player.y = p.player.radius; p.player.vy *= -0.5; }
        if (p.player.y > p.height - p.player.radius) { p.player.y = p.height - p.player.radius; p.player.vy *= -0.5; }

        // Fish AI
        const f = p.fish;
        const fd = f.data; // Fish Data

        // Idle Logic
        if (f.idle) {
            f.idleTimer--;
            f.vx *= 0.9; f.vy *= 0.9;
            f.x += f.vx; f.y += f.vy;
            if (f.idleTimer <= 0) {
                f.idle = false;
                pickNewTarget(f, p.width, p.height);
            }
        } else {
            // Random Stop
            // Higher stars = less likely to stop
            const stopChance = Math.max(0.0005, 0.005 - (fd.stars * 0.001));
            if (Math.random() < stopChance) {
                f.idle = true;
                f.idleTimer = 100; // frames
            } else {
                // Move
                f.timer++;
                // Agile: Lower agile number = faster direction changes? 
                // In data: Agile 10 (common) to 50 (rare). 
                // Let's interpret 'agile' as 'direction change frequency'.
                // If agile is high (50), it changes direction every 50 frames? Or is it Agility stat where higher = more agile?
                // Let's assume High Agile Value = More Agile = Changes direction MORE OFTEN.
                // So if agile is 50, we want frequent changes. 
                // Let's flip it: Change every (100 - agile) frames.

                const changeInterval = Math.max(20, 100 - fd.agile);

                if (f.timer > changeInterval || Math.random() < 0.01) {
                    pickNewTarget(f, p.width, p.height);
                    f.timer = 0;
                }

                const dx = f.targetX - f.x;
                const dy = f.targetY - f.y;
                const dist = Math.hypot(dx, dy);

                if (dist > 5) {
                    f.vx += (dx / dist) * 0.5;
                    f.vy += (dy / dist) * 0.5;
                    // Cap Speed based on fish stats
                    const curSpeed = Math.hypot(f.vx, f.vy);
                    if (curSpeed > fd.speed) {
                        f.vx = (f.vx / curSpeed) * fd.speed;
                        f.vy = (f.vy / curSpeed) * fd.speed;
                    }
                    f.x += f.vx;
                    f.y += f.vy;
                } else {
                    pickNewTarget(f, p.width, p.height);
                }
            }
        }

        // Bounds Fish
        if (f.x < 0) { f.x = 0; f.vx *= -1; pickNewTarget(f, p.width, p.height); }
        if (f.x > p.width) { f.x = p.width; f.vx *= -1; pickNewTarget(f, p.width, p.height); }
        if (f.y < 0) { f.y = 0; f.vy *= -1; pickNewTarget(f, p.width, p.height); }
        if (f.y > p.height) { f.y = p.height; f.vy *= -1; pickNewTarget(f, p.width, p.height); }

        // Collision
        const dist = Math.hypot(p.player.x - f.x, p.player.y - f.y);
        const isTouching = dist < (p.player.radius + f.radius);
        p.player.catching = isTouching;

        // Progress
        if (isTouching) {
            // Difficulty: Catch Rate depends on HP
            // INCREASED for beginners: 100 / HP.
            // Power Multiplier from Rod
            const power = currentProps.rod ? currentProps.rod.power : 1.0;
            const catchRate = (80 / fd.hp) * power;
            p.progress += catchRate;
        } else {
            // Escape Rate logic removed as per user request (Progress bar only increases)
            // const escapeRate = (fd.agile / 100) * 0.5 + 0.1;
            // p.progress -= escapeRate;
        }
        if (p.progress < 0) p.progress = 0;
        if (p.progress > 100) p.progress = 100;

        // Sync Progress to UI - Throttled to 60ms (~16fps update rate for UI)
        // This prevents React from re-rendering the whole page 60 times a second
        const now = Date.now();
        if (currentProps.onProgressUpdate && !autoPlay) {
            if (now - lastUpdateRef.current > 60) {
                currentProps.onProgressUpdate(p.progress);
                lastUpdateRef.current = now;
            }
        }

        // Win Check
        if (p.progress >= 100) {
            if (autoPlay) {
                // Background Mode: Just reset instantly to keep visual continuity
                p.progress = 0;
                p.fish.data = selectRandomFish();
                p.fish.grid = getFishShape(p.fish.data);
                // p.fish.path = new Path2D(p.fish.data.path);
                p.fish.x = Math.random() * p.width;
                p.fish.y = Math.random() * p.height;
                pickNewTarget(p.fish, p.width, p.height);
            } else {
                currentProps.onGameOver(f.data);
                return; // Stop logic for this frame, next render handleRestart/unmount will kill loop
            }
        }

        // --- DRAW ---
        // Make background a nice ocean gradient instead of transparent (dark)
        const gradient = ctx.createLinearGradient(0, 0, 0, p.height);
        gradient.addColorStop(0, '#2980b9');
        gradient.addColorStop(1, '#2c3e50');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, p.width, p.height);

        // Fish
        ctx.save();
        ctx.translate(f.x, f.y);

        // Face direction of movement
        // If moving LEFT (vx < 0), we might need to flip. 
        // Standard shapes usually face LEFT in the grid definition (head at left).
        // Let's check the grid. "12122221.." tail is left? 
        // Wait, "12122221.." index 0 is left. 
        // Actually, let's assume standard is Left-Facing.
        // If vx > 0 (Right), flip.

        const isFacingRight = f.vx > 0;
        if (isFacingRight) {
            ctx.scale(-1, 1);
        }

        // Bobbing animation
        const bobOffset = Math.sin(Date.now() / 200) * 2;
        ctx.translate(0, bobOffset);

        // Pixel Size
        const pixelSize = 4; // Adjust for fit

        if (f.grid) {
            f.grid.forEach((row, rowIndex) => {
                for (let colIndex = 0; colIndex < row.length; colIndex++) {
                    const char = row[colIndex];
                    if (char === '.') continue;

                    // Center the grid
                    const xPos = (colIndex - row.length / 2) * pixelSize;
                    const yPos = (rowIndex - f.grid.length / 2) * pixelSize;

                    if (char === '1') ctx.fillStyle = '#000000'; // Outline -> Shadow Black
                    else if (char === '4') ctx.fillStyle = '#111'; // Eye
                    else ctx.fillStyle = '#1a1a1a'; // Body -> Dark Gray Shadow

                    // Draw Pixel
                    ctx.fillRect(xPos, yPos, pixelSize, pixelSize);
                }
            });
        }

        ctx.restore();

        // Player
        ctx.beginPath();
        ctx.arc(p.player.x, p.player.y, p.player.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = p.player.catching ? '#38ef7d' : 'rgba(255, 255, 255, 0.8)';
        ctx.stroke();

        requestRef.current = requestAnimationFrame(animate);
    };

    const pickNewTarget = (f, w, h) => {
        f.targetX = Math.random() * (w - 100) + 50;
        f.targetY = Math.random() * (h - 100) + 50;
    };

    return <canvas ref={canvasRef} style={{ display: 'block', width: '100vw', height: '100vh' }} />;
};

export default GameCanvas;
