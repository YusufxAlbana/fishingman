import React, { useState, useEffect } from 'react';
import GameCanvas from '../components/GameCanvas';
import HUD from '../components/HUD';
import ResultModal from '../components/ResultModal';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const GamePage = ({ money, onCatch, equippedRod, totalCatches, onLevelUp, hooks, onConsumeHook, showNotification }) => {
    const [progress, setProgress] = useState(0);
    const [caughtFish, setCaughtFish] = useState(null);
    const [gameKey, setGameKey] = useState(0); // Key to force remount
    const [isLevelUp, setIsLevelUp] = useState(false);
    const navigate = useNavigate();

    // Check hooks on mount
    useEffect(() => {
        if (hooks <= 0) {
            showNotification('Kail kamu habis! Tunggu regen atau beli di Toko.');
            navigate('/shop');
        }
    }, [hooks, navigate, showNotification]);

    const handleGameOver = (fish) => {
        // Consume Hook on Catch (Success)
        onConsumeHook();

        setCaughtFish(fish);

        // Check for Level Up (Every 5 catches)
        if ((totalCatches + 1) % 5 === 0) {
            setIsLevelUp(true);
            if (onLevelUp) onLevelUp(500);
        } else {
            setIsLevelUp(false);
        }

        // Add to inventory
        onCatch(fish);

        // Log to history
        // Supabase logic handled in App.jsx via onCatch
    };

    const handleRestart = () => {
        if (hooks <= 0) {
            // Should be handled by useEffect but let's be safe
            showNotification('Kail kamu habis! Tunggu regen atau beli di Toko.');
            navigate('/shop');
            return;
        }

        setCaughtFish(null);
        setIsLevelUp(false);
        setGameKey(k => k + 1);
    };

    return (
        <>
            <GameCanvas
                key={gameKey}
                onProgressUpdate={setProgress}
                onGameOver={handleGameOver}
                rod={equippedRod}
            />
            <HUD money={money} progress={progress} showProgress={!caughtFish} />

            {caughtFish && (
                <ResultModal
                    fish={caughtFish}
                    onRestart={handleRestart}
                    isLevelUp={isLevelUp}
                />
            )}

            {/* Overlay Back Button */}
            {!caughtFish && (
                <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 100 }}>
                    <button className="back-btn" onClick={() => navigate('/')} title="Home">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
};

export default GamePage;
