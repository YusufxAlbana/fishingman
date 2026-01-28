import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { FISH_TYPES as FISH_DATA } from '../constants/assets';
import { useNavigate } from 'react-router-dom';
import SimulatedBackground from './SimulatedBackground';
import PixelFish from './PixelFish';

const CollectionScreen = () => {
    const [loading, setLoading] = useState(true);
    const [counts, setCounts] = useState({});
    const [selectedFish, setSelectedFish] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadCollection();
    }, []);

    const loadCollection = async () => {
        setLoading(true);
        if (supabase) {
            const { data, error } = await supabase
                .from('catches')
                .select('fish_name');

            if (error) {
                console.error(error);
                setError('Gagal memuat data');
            } else {
                const newCounts = {};
                data.forEach(c => {
                    newCounts[c.fish_name] = (newCounts[c.fish_name] || 0) + 1;
                });
                setCounts(newCounts);
            }
        }
        setLoading(false);
    };

    const handleFishClick = (fish, isUnlocked) => {
        if (isUnlocked) {
            setSelectedFish(fish);
        }
    };

    return (
        <div id="collection-screen" className="screen">
            <SimulatedBackground />

            <div className="screen-header">
                <h2>Koleksi Ikan ({Object.keys(counts).length}/{FISH_DATA.length})</h2>
                <button className="back-btn" onClick={() => navigate('/')} title="Kembali">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                </button>
            </div>

            <div id="collection-grid">
                {/* Sort by difficulty (stars) ascending */}
                {FISH_DATA.sort((a, b) => a.stars - b.stars).map((fishType) => {
                    const count = counts[fishType.name] || 0;
                    const isUnlocked = count > 0;

                    const stars = '★'.repeat(fishType.stars);

                    return (
                        <div
                            className={`fish-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                            key={fishType.id}
                            onClick={() => handleFishClick(fishType, isUnlocked)}
                            style={{
                                opacity: 1,
                                cursor: isUnlocked ? 'pointer' : 'default',
                                position: 'relative'
                            }}
                        >
                            <div className="fish-svg-anim" style={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                filter: isUnlocked ? 'none' : 'grayscale(100%) brightness(0)'
                            }}>
                                <PixelFish fish={fishType} />
                            </div>

                            <div className="fish-name">
                                {isUnlocked ? fishType.name : '???'}
                            </div>

                            <div className="fish-stars" style={{ fontSize: '1rem' }}>
                                {stars}
                            </div>

                            {/* Indikator Baru/Count */}
                            {isUnlocked && <div className="fish-count">x{count}</div>}
                        </div>
                    );
                })}
            </div>

            {/* DETAIL MODAL */}
            {selectedFish && (
                <div className="modal-overlay" onClick={() => setSelectedFish(null)} style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    animation: 'fadeIn 0.2s ease'
                }}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        padding: '30px',
                        borderRadius: '20px',
                        maxWidth: '80%',
                        width: '400px',
                        color: 'white',
                        textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.2)',
                        boxShadow: '0 0 30px rgba(0,0,0,0.5)'
                    }}>
                        <h2 style={{ marginBottom: '10px', fontSize: '2rem' }}>{selectedFish.name}</h2>
                        <div style={{ color: '#f1c40f', fontSize: '1.5rem', marginBottom: '20px' }}>
                            {'★'.repeat(selectedFish.stars)}
                        </div>

                        <div style={{ margin: '20px auto', width: '150px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ transform: 'scale(2)' }}>
                                <PixelFish fish={selectedFish} />
                            </div>
                        </div>

                        <p style={{ fontStyle: 'italic', marginBottom: '20px', opacity: 0.9 }}>
                            "{selectedFish.description || 'Tidak ada deskripsi.'}"
                        </p>

                        <div style={{
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',
                            background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '15px'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>HARGA</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2ecc71' }}>${selectedFish.price}</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>KELANGKAAN</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#9b59b6' }}>{selectedFish.tier}</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>KECEPATAN</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3498db' }}>{selectedFish.speed}</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>KETAHANAN (HP)</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e74c3c' }}>{selectedFish.hp}</div>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedFish(null)}
                            style={{
                                marginTop: '25px',
                                padding: '10px 30px',
                                background: 'white',
                                color: 'black',
                                border: 'none',
                                borderRadius: '50px',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}

            {loading && <div style={{ position: 'absolute', bottom: 10, color: 'white' }}>Syncing data...</div>}
        </div>
    );
};
export default CollectionScreen;
