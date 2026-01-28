import React from 'react';
import { useNavigate } from 'react-router-dom';
import SimulatedBackground from './SimulatedBackground';
import { FISH_TYPES } from '../constants/assets';
import pixelGirl from '../assets/Pixel_girl-removebg-preview.png';
import PixelFish from './PixelFish';

const BackpackScreen = ({ inventory, onSellAll, showNotification }) => {
    const navigate = useNavigate();

    // Group inventory by ID/Name to count stacks (Optional, but user asked for "Collection vs Backpack")
    // If backpack is distinct items, we usually show them one by one or stacked.
    // User wants to see what they have to sell. Stacking is cleaner.
    const stacks = {};
    inventory.forEach(fish => {
        if (!stacks[fish.name]) stacks[fish.name] = { ...fish, count: 0 };
        stacks[fish.name].count++;
    });

    const totalValue = inventory.reduce((sum, f) => sum + f.price, 0);

    const [showSellModal, setShowSellModal] = React.useState(false);
    const [soldAmount, setSoldAmount] = React.useState(0);

    const handleSell = () => {
        if (totalValue > 0) {
            const earned = onSellAll();
            setSoldAmount(earned);
            setShowSellModal(true);
        }
    };

    return (
        <div id="backpack-screen" className="screen">
            <SimulatedBackground />

            <div className="screen-header">
                <h2>Tas Ikan ({inventory.length})</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="back-btn" onClick={() => navigate('/')} title="Kembali">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div id="collection-grid">
                {Object.values(stacks).map((fish, idx) => (
                    <div className="fish-card" key={idx}>
                        {/* Find full data to get path/color if needed, but we populated stacks from inventory items which have props */}
                        {/* Inventory items might lose 'path' if we only stored minimal data. Let's assume full object is stored for now. */}
                        {/* Find full data to get path/color if needed, but we populated stacks from inventory items which have props */}
                        {/* Inventory items might lose 'path' if we only stored minimal data. Let's assume full object is stored for now. */}
                        <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <PixelFish fish={fish} />
                        </div>
                        <div className="fish-name">{fish.name}</div>
                        <div className="fish-stars">{'★'.repeat(fish.stars)}</div>
                        <div className="fish-count">x{fish.count}</div>
                        <div style={{ color: '#f1c40f', fontSize: '0.9rem', marginTop: '5px' }}>${fish.price * fish.count}</div>
                    </div>
                ))}

            </div>

            {inventory.length === 0 && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20,
                    width: '100%',
                    display: 'flex', justifyContent: 'center'
                }}>
                    <div style={{
                        position: 'relative',
                        width: 'auto',
                        minWidth: '500px',
                        background: 'rgba(44, 62, 80, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '20px',
                        padding: '40px',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '30px'
                    }}>
                        {/* Pixel Girl Image */}
                        <div style={{
                            width: '120px',
                            height: '160px',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img
                                src={pixelGirl}
                                alt="Pixel Girl"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))'
                                }}
                            />
                        </div>

                        {/* Message & Button */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{
                                color: 'white',
                                fontSize: '1.3rem',
                                lineHeight: '1.5',
                                fontWeight: '500',
                                maxWidth: '300px'
                            }}>
                                Tas kamu kosong nih! Ayo mancing dulu untuk mendapatkan ikan!
                            </div>
                            <button
                                className="big-btn primary"
                                onClick={() => navigate('/play')}
                                style={{ alignSelf: 'flex-start', padding: '12px 30px', fontSize: '1.1rem' }}
                            >
                                Mancing Sekarang!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* SELL SUCCESS MODAL */}
            {showSellModal && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 30,
                    width: '100%',
                    display: 'flex', justifyContent: 'center'
                }}>
                    <div style={{
                        position: 'relative',
                        width: 'auto',
                        minWidth: '500px',
                        background: 'rgba(39, 174, 96, 0.95)', // Green background for success
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '20px',
                        padding: '40px',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '30px'
                    }}>
                        {/* Pixel Girl Image */}
                        <div style={{
                            width: '120px',
                            height: '160px',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img
                                src={pixelGirl}
                                alt="Pixel Girl"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))'
                                }}
                            />
                        </div>

                        {/* Message & Button */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{
                                color: 'white',
                                fontSize: '1.5rem',
                                lineHeight: '1.5',
                                fontWeight: 'bold',
                                maxWidth: '400px',
                                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                            }}>
                                WOW! Kamu menjual semua ikan dan mendapatkan <span style={{ color: '#f1c40f', fontSize: '1.8rem' }}>${soldAmount}</span>!
                            </div>
                            <button
                                className="big-btn secondary"
                                onClick={() => setShowSellModal(false)}
                                style={{ alignSelf: 'flex-start', padding: '12px 30px', fontSize: '1.1rem', background: 'white', color: '#27ae60' }}
                            >
                                Mantap!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{
                position: 'absolute', bottom: '20px',
                background: 'rgba(0,0,0,0.6)', // Dark glass
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '15px 30px',
                borderRadius: '50px', display: 'flex', gap: '20px', alignItems: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
                    Total: <span style={{ color: '#f1c40f' }}>${totalValue}</span>
                </div>
                <button
                    className="big-btn secondary"
                    onClick={handleSell}
                    disabled={totalValue === 0}
                    style={{
                        padding: '10px 40px',
                        fontSize: '1.1rem',
                        boxShadow: '0 5px 15px rgba(243, 156, 18, 0.4)'
                    }}
                >
                    Jual Semua ($)
                </button>
            </div>
        </div>
    );
};

export default BackpackScreen;
