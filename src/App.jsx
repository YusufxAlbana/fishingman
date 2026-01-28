import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import CollectionScreen from './components/CollectionScreen';
import BackpackScreen from './components/BackpackScreen';
import ShopScreen from './components/ShopScreen';
import GamePage from './pages/GamePage';
import { ROD_TYPES } from './constants/gameConfig';
import LandingPage from './components/LandingPage';
import PixelNotification from './components/PixelNotification'; // Import
import logo from './assets/logo.png'; // Import Logo

import { supabase } from './supabaseClient';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';

function App() {
  const [user, setUser] = useState(null);
  const [money, setMoney] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [ownedRods, setOwnedRods] = useState(['bamboo']);
  const [equippedRodId, setEquippedRodId] = useState('bamboo');
  // Persistent Leveling State
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  const [loading, setLoading] = useState(true);

  // Notification State
  const [notification, setNotification] = useState({ visible: false, message: '' });

  // Auth & Initial Load
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      loadLocal();
      return;
    }

    const handleAuth = (session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
        if (window.location.pathname === '/' || window.location.pathname === '/login' || window.location.pathname === '/register') {
        }
      } else {
        loadLocal();
      }
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => handleAuth(session));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuth(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadLocal = () => {
    const savedMoney = localStorage.getItem('fishing_money');
    if (savedMoney) setMoney(parseInt(savedMoney));
    const savedInv = localStorage.getItem('fishing_inventory');
    if (savedInv) setInventory(JSON.parse(savedInv));
    const savedRods = localStorage.getItem('fishing_rods');
    if (savedRods) setOwnedRods(JSON.parse(savedRods));
    const savedEquipped = localStorage.getItem('fishing_equipped');
    if (savedEquipped) setEquippedRodId(savedEquipped || 'bamboo');

    // Load Leveling
    const savedXp = localStorage.getItem('fishing_xp');
    if (savedXp) setXp(parseInt(savedXp));
    const savedLevel = localStorage.getItem('fishing_level');
    if (savedLevel) setLevel(parseInt(savedLevel));
  };

  const loadProfile = async (userId) => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setMoney(data.money || 0);
      setInventory(data.inventory || []);
      setOwnedRods(data.owned_rods || ['bamboo']);
      setEquippedRodId(data.equipped_rod_id || 'bamboo');
      // Load Leveling from DB
      setXp(data.xp || 0);
      setLevel(data.level || 1);
    }
  };

  // Cloud Sync Effect
  useEffect(() => {
    if (!user || !supabase) return;

    const syncToCloud = async () => {
      await supabase.from('profiles').update({
        money,
        inventory,
        owned_rods: ownedRods,
        equipped_rod_id: equippedRodId,
        xp,
        level,
        updated_at: new Date()
      }).eq('id', user.id);
    };

    const timeout = setTimeout(syncToCloud, 2000);
    return () => clearTimeout(timeout);
  }, [money, inventory, ownedRods, equippedRodId, xp, level, user]);

  // Local Sync
  useEffect(() => {
    localStorage.setItem('fishing_money', money);
    localStorage.setItem('fishing_inventory', JSON.stringify(inventory));
    localStorage.setItem('fishing_rods', JSON.stringify(ownedRods));
    localStorage.setItem('fishing_equipped', equippedRodId);
    localStorage.setItem('fishing_xp', xp);
    localStorage.setItem('fishing_level', level);
  }, [money, inventory, ownedRods, equippedRodId, xp, level]);


  const addToInventory = (fish) => {
    setInventory(prev => [...prev, fish]);

    // Save to database for Collection
    if (user && supabase) {
      supabase.from('catches').insert({
        user_id: user.id,
        fish_name: fish.name,
        fish_stars: fish.stars,
        fish_price: fish.price
      }).then(({ error }) => {
        if (error) {
          console.error('Error recording catch:', error);
          showNotification(`Gagal simpan ke DB: ${error.message}`);
        } else {
          // Optional: confirm save
          // showNotification(`Ikan tersimpan di koleksi cloud!`);
        }
      });
    } else {
      if (!user) showNotification('Mode Tamu: Koleksi tidak disimpan ke cloud.');
      if (!supabase) showNotification('Offline: Koleksi tidak disimpan.');
    }

    // XP Logic
    // Each fish gives XP equal to its stars * 10 (or simple 5 per fish)
    const xpGain = 10 * fish.stars;
    const newXp = xp + xpGain;
    setXp(newXp);

    // Level Up Formula: 
    // Geometric progression: Level L requires L * 100 XP to pass? 
    // Simply: Total XP / 100 => Level. 
    // Progress % = (XP % 100) / 100.

    // Check if newXp reached next level threshold
    const currentLevelXp = (level - 1) * 100;
    const nextLevelXp = level * 100;

    if (newXp >= nextLevelXp) {
      handleLevelUp(level + 1);
    }

    // Check if we hit the requirement (this is simplified, might need while loop for multi-level)
    // Actually we should track 'xp' as total accumulated.
    // Let's say Level 2 needs 100 total XP. Level 3 needs 300.
    // If xp >= threshold, Level++

    // Simple incremental:
    if (newXp >= xpRequiredForNextLevel * level) {
      // Wait, if I use `level * 100` as the GAP, then it's harder each time.
      // Current Level 1. Next needs 100.
      // Current Level 2. Next needs 200 more (300 total)?

      // Let's just do: XP resets? No, "accumulated".
      // Let's simplify: Level = Floor(XP / 100) + 1.
      // 0-99 XP = Lv 1
      // 100-199 XP = Lv 2
      // etc.
      const calculatedLevel = Math.floor(newXp / 100) + 1;

      if (calculatedLevel > level) {
        handleLevelUp(calculatedLevel);
      }
    }
  };

  const sellAll = () => {
    const total = inventory.reduce((sum, fish) => sum + fish.price, 0);
    setMoney(prev => prev + total);
    setInventory([]);
    return total;
  };

  const showNotification = (message) => {
    setNotification({ visible: true, message });
  };

  const buyRod = (rod) => {
    if (money >= rod.price && !ownedRods.includes(rod.id)) {
      setMoney(prev => prev - rod.price);
      setOwnedRods(prev => [...prev, rod.id]);
      showNotification(`Berhasil membeli joran ${rod.name}!`);
    }
  };

  const equipRod = (rodId) => {
    if (ownedRods.includes(rodId)) {
      setEquippedRodId(rodId);
    }
  };

  const logout = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    showNotification('Berhasil keluar!');
    // window.location.href = '/'; // Removed to prevent session restoration race condition
  };

  const currentRod = ROD_TYPES.find(r => r.id === equippedRodId) || ROD_TYPES[0];

  // --- Hook System ---
  // Max Hooks increases with Level
  const maxHooks = 10 + (level - 1);

  /* Hook System */
  const [hooks, setHooks] = useState(10);
  const [lastHookTime, setLastHookTime] = useState(Date.now());
  const [timeToNextHook, setTimeToNextHook] = useState(0);

  useEffect(() => {
    const savedHooks = localStorage.getItem('fishing_hooks');
    const savedTime = localStorage.getItem('fishing_hook_time');
    if (savedHooks) setHooks(parseInt(savedHooks));
    if (savedTime) setLastHookTime(parseInt(savedTime));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (hooks < maxHooks) {
        const timePassed = now - lastHookTime;
        const regenTime = 5 * 60 * 1000; // 5 minutes 
        const remaining = Math.max(0, regenTime - timePassed);
        setTimeToNextHook(remaining);

        if (timePassed >= regenTime) {
          // REGEN
          setHooks(prev => Math.min(prev + 1, maxHooks));
          setLastHookTime(now);
        }
      } else {
        setTimeToNextHook(0);
        setLastHookTime(now); // Reset timer if full
      }

      localStorage.setItem('fishing_hooks', hooks);
      localStorage.setItem('fishing_hook_time', lastHookTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [hooks, lastHookTime, maxHooks]);

  const handleLevelUp = (newLevel) => {
    setLevel(newLevel);
    // Reward: Full hooks + Bonus Money
    const bonusMoney = newLevel * 100;
    setMoney(prev => prev + bonusMoney);

    const newMaxHooks = 10 + (newLevel - 1);
    setHooks(newMaxHooks); // Refill to new max

    showNotification(`LEVEL UP! Lv ${newLevel}! Bonus $${bonusMoney} & Kail Penuh!`);
  };

  const buyHooks = () => {
    if (money >= 100) {
      setMoney(prev => prev - 100);
      setHooks(prev => prev + 10);
      showNotification('Berhasil membeli 10 Kail Pancing!');
    } else {
      showNotification('Uang tidak cukup!');
    }
  };

  const consumeHook = () => {
    if (hooks > 0) {
      setHooks(prev => prev - 1);
      setLastHookTime(Date.now());
      if (hooks === maxHooks) setLastHookTime(Date.now());
    }
  };

  if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Loading...</div>;

  return (
    <Router>
      <div id="game-container">
        {notification.visible && (
          <PixelNotification
            message={notification.message}
            onClose={() => setNotification({ ...notification, visible: false })}
          />
        )}

        <img
          src={logo}
          alt="Fishingman Logo"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: '80px',
            zIndex: 1000,
            pointerEvents: 'none' // Prevent blocking clicks if it overlaps
          }}
        />

        <Routes>
          <Route path="/" element={user ? <WelcomeScreen money={money} user={user} onLogout={logout} hooks={hooks} maxHooks={maxHooks} currentLevel={level} xp={xp} nextHookTime={timeToNextHook} invCount={inventory.length} /> : <LandingPage />} />
          <Route path="/lobby" element={user ? <WelcomeScreen money={money} user={user} onLogout={logout} hooks={hooks} maxHooks={maxHooks} currentLevel={level} xp={xp} nextHookTime={timeToNextHook} invCount={inventory.length} /> : <LandingPage />} />

          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          <Route path="/collection" element={user ? <CollectionScreen /> : <LandingPage />} />
          <Route path="/backpack" element={user ? <BackpackScreen inventory={inventory} onSellAll={sellAll} showNotification={showNotification} /> : <LandingPage />} />
          <Route path="/shop" element={
            user ? (
              <ShopScreen
                money={money}
                ownedRods={ownedRods}
                equippedRodId={equippedRodId}
                onBuy={buyRod}
                onEquip={equipRod}
                onBuyHooks={buyHooks}
                showNotification={showNotification}
              />) : <LandingPage />
          } />
          <Route path="/play" element={
            user ?
              <GamePage
                onCatch={addToInventory}
                money={money}
                equippedRod={currentRod}
                totalCatches={inventory.length} // Maybe rename prop or remove if not used
                // onLevelUp={handleLevelUp} // No longer needed passed to GamePage, handled in addToInventory
                hooks={hooks}
                onConsumeHook={consumeHook}
                showNotification={showNotification}
              /> : <LandingPage />
          } />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
