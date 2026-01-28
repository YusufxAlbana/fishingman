import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UI_ICONS } from '../constants/assets';
import { ROD_TYPES } from '../constants/gameConfig';
import PixelRod from './PixelRod';
import PixelFishingLine from './PixelFishingLine';
import HookImage from '../assets/GAMBAR KAIL.png';

const ShopScreen = ({ money, ownedRods, equippedRodId, onBuy, onEquip, onBuyHooks, showNotification }) => {
    const navigate = useNavigate();

    const HOOK_ITEM = {
        id: 'hooks_pack',
        name: '10x Kail Pancing',
        price: 100,
        type: 'consumable',
        description: "Kail pancing baja karbon yang sangat tajam.\n\nKENAPA BUTUH KAIL?\nSetiap kali memancing, kail bisa rusak atau putus. Stok kail yang banyak memastikan Anda bisa terus memancing tanpa henti dan tidak melewatkan ikan legendaris!\n\nJangan biarkan tas pancingmu kosong saat ikan besar lewat!",
        image: HookImage
    };

    const [selectedItem, setSelectedItem] = useState(ROD_TYPES.find(r => r.id === equippedRodId) || ROD_TYPES[0]);

    const handleBuy = (item) => {
        if (money >= item.price) {
            if (item.type === 'consumable') {
                onBuyHooks();
            } else {
                onBuy(item);
            }
        } else {
            showNotification('Uang tidak cukup!');
        }
    };

    const isOwned = (rod) => ownedRods.includes(rod.id);
    const isEquipped = (rod) => equippedRodId === rod.id;
    const isRod = (item) => !item.type; // Rods don't have 'type' property in current config, or strictly check ID

    return (
        <div className="screen" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            paddingBottom: '300px', // Lift it UP
            boxSizing: 'border-box'
        }}>
            {/* Scaling Wrapper */}
            <div style={{
                transform: 'scale(0.7)',
                transformOrigin: 'center center',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div className="menu-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                    maxWidth: '1200px',
                    marginBottom: '30px'
                }}>
                    <button className="back-btn" onClick={() => navigate('/')} style={{ background: '#e74c3c' }}>
                        {/* X Icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <h1 style={{ margin: 0, textShadow: '0 0 10px rgba(0,0,0,0.5)', fontSize: '2.5rem', color: 'white' }}>TOKO</h1>
                    <div className="money-pill" style={{ fontSize: '1.5rem', padding: '10px 20px', color: '#f1c40f' }}>
                        <span>$</span> {money}
                    </div>
                </div>

                <style>
                    {`
                        .hide-scrollbar::-webkit-scrollbar { display: none; }
                        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                    `}
                </style>

                <div className="menu-content" style={{
                    display: 'grid',
                    gridTemplateColumns: '350px 1fr',
                    gap: '30px',
                    height: '65vh', // Fixed height for alignment
                    width: '90%',
                    maxWidth: '1200px',
                    alignItems: 'start'
                }}>

                    {/* UNIFIED LEFT CARD: Rods + Perlengkapan */}
                    <div className="hide-scrollbar" style={{
                        background: 'rgba(20, 20, 30, 0.6)', // Semi-transparent card
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        padding: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%', // Fill parent height
                        overflowY: 'auto', // Scroll inside this card
                        boxSizing: 'border-box'
                    }}>

                        {/* Rods Section */}
                        <h3 style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginTop: 0, marginBottom: '15px', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            Joran Pancing
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
                            {ROD_TYPES.map(rod => (
                                <div
                                    key={rod.id}
                                    onClick={() => setSelectedItem(rod)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '15px',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        background: selectedItem.id === rod.id ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                                        cursor: 'pointer',
                                        border: isEquipped(rod) ? '1px solid #2ecc71' : '1px solid transparent',
                                        transition: 'all 0.2s',
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{ width: '48px', height: '48px', background: rod.color, borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}></div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>{rod.name}</div>
                                        <div style={{ color: '#bdc3c7', fontSize: '0.8rem' }}>{rod.price === 0 ? 'Milikmu' : `$${rod.price}`}</div>
                                    </div>
                                    {isEquipped(rod) && <div style={{ color: '#e67e22', fontSize: '1.2rem' }}>★</div>}
                                    {(!isEquipped(rod) && isOwned(rod)) && <div style={{ color: '#2ecc71', fontSize: '1.2rem' }}>✓</div>}
                                </div>
                            ))}
                        </div>

                        {/* Perlengkapan Section */}
                        <h3 style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginTop: 0, marginBottom: '15px', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            Perlengkapan
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div
                                onClick={() => setSelectedItem(HOOK_ITEM)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '15px',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    background: selectedItem.id === HOOK_ITEM.id ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                                    border: '1px solid transparent',
                                    cursor: 'pointer'
                                }}>
                                <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                                    <PixelFishingLine />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>10x Kail Pancing</div>
                                    <div style={{ color: '#bdc3c7', fontSize: '0.8rem' }}>$100</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT CARD: Details */}
                    <div className="shop-details hide-scrollbar" style={{
                        background: 'rgba(20, 20, 30, 0.9)',
                        padding: '30px',
                        borderRadius: '20px',
                        height: '100%', // Match height of left card
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxSizing: 'border-box',
                        overflowY: 'auto'
                    }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'white', marginTop: 0 }}>{selectedItem.name}</h2>

                        {/* Preview Box */}
                        <div style={{
                            height: '240px', // Increased height to ensure full visibility
                            background: 'radial-gradient(circle at center, #2c3e50 0%, #000000 100%)',
                            borderRadius: '15px',
                            marginBottom: '20px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            position: 'relative', overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)',
                            flexShrink: 0
                        }}>
                            {isRod(selectedItem) ? (
                                <div style={{ transform: 'scale(1)' }}>
                                    <PixelRod rod={selectedItem} />
                                </div>
                            ) : (
                                <img src={selectedItem.image} alt={selectedItem.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                            )}
                        </div>

                        {/* Stats - Only for Rods */}
                        {isRod(selectedItem) && (
                            <div style={{ display: 'grid', gap: '15px', marginBottom: '20px', flexShrink: 0 }}>
                                <div className="stat-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ width: '80px', color: '#bdc3c7' }}>Power</span>
                                    <div style={{ flex: 1, height: '8px', background: '#34495e', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${selectedItem.power * 20}%`, height: '100%', background: '#5dade2' }}></div>
                                    </div>
                                </div>
                                <div className="stat-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ width: '80px', color: '#bdc3c7' }}>Friction</span>
                                    <div style={{ flex: 1, height: '8px', background: '#34495e', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${selectedItem.friction * 100}%`, height: '100%', background: '#5dade2' }}></div>
                                    </div>
                                </div>
                                <div className="stat-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ width: '80px', color: '#bdc3c7' }}>Stars</span>
                                    <div style={{ color: '#f1c40f', fontSize: '1.2rem', letterSpacing: '2px' }}>
                                        {'★'.repeat(selectedItem.maxStars)}
                                        <span style={{ opacity: 0.3 }}>{'★'.repeat(5 - selectedItem.maxStars)}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <p style={{ lineHeight: '1.5', color: '#bdc3c7', fontSize: '1rem', marginBottom: '20px', flex: 1, overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
                            {selectedItem.description}
                        </p>

                        {/* Actions */}
                        <div style={{ marginTop: 'auto', flexShrink: 0 }}>
                            {(isRod(selectedItem) && isOwned(selectedItem)) ? (
                                <button
                                    className={`big-btn ${isEquipped(selectedItem) ? 'secondary' : 'primary'}`}
                                    style={{ width: '100%', padding: '15px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', background: isEquipped(selectedItem) ? '#7f8c8d' : '#2ecc71', color: 'white' }}
                                    disabled={isEquipped(selectedItem)}
                                    onClick={() => onEquip(selectedItem.id)}
                                >
                                    {isEquipped(selectedItem) ? 'Sedang Dipakai' : 'Pakai Joran Ini'}
                                </button>
                            ) : (
                                <button
                                    className="big-btn primary"
                                    style={{ width: '100%', padding: '15px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', background: '#3498db', color: 'white' }}
                                    onClick={() => handleBuy(selectedItem)}
                                >
                                    Beli Sekarang (${selectedItem.price})
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopScreen;
