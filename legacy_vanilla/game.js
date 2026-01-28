/**
 * Fishing Game - Enhanced Version
 * Features: Welcome Screen, Collection, Currency, Progressive Difficulty
 */

// --- Canvas & Core Config ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- Supabase Config ---
const SUPABASE_URL = 'https://ycwwjbojhxfwktbnkgqq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljd3dqYm9qaHhmd2t0Ym5rZ3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzNzkwMjgsImV4cCI6MjA4NDk1NTAyOH0.K2DOUkCN1e62PuR1aIUucBeYBvAUEbSBPdErNqK5-I8';

let supabaseClient = null;
if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// --- UI Elements ---
const ui = {
    welcome: document.getElementById('welcome-screen'),
    collection: document.getElementById('collection-screen'),
    result: document.getElementById('result-modal'),
    progress: document.getElementById('progress-container'),
    progressBar: document.getElementById('progress-fill'),
    controls: document.getElementById('controls-hint'),
    money: document.getElementById('money-display'),
    collectionGrid: document.getElementById('collection-grid'),
    
    // Buttons
    playBtn: document.getElementById('play-btn'),
    collectBtn: document.getElementById('collection-btn'),
    backBtn: document.getElementById('back-home-btn'),
    restartBtn: document.getElementById('restart-btn'), // Now "Lanjut"
    
    // Messages
    catchMsg: document.getElementById('catch-message'),
    rewardMsg: document.getElementById('reward-message')
};

// --- Game Assets (SVG) ---
// Simplified SVG Paths
const SVGS = {
    common: "M -20 0 Q -10 -15 10 0 Q 25 0 30 -10 L 30 10 Q 25 0 10 0 Q -10 15 -20 0 Z",
    rare: "M -25 0 L -10 -15 L 10 -10 L 30 0 L 10 10 L -10 15 Z", // Sharp
    legendary: "M -25 0 Q -15 -20 0 -15 Q 15 -20 30 0 Q 15 20 0 15 Q -15 20 -25 0 Z M 30 0 L 40 -10 L 40 10 Z" // Spiky with tail
};

// --- Game Data ---
const FISH_TYPES = [
    { id: 'lele', name: 'Ikan Lele', tier: 'Common', stars: 1, price: 50, speed: 5, agile: 40, color: '#95a5a6', path: SVGS.common },
    { id: 'nila', name: 'Ikan Nila', tier: 'Common', stars: 1, price: 60, speed: 6, agile: 35, color: '#bdc3c7', path: SVGS.common },
    { id: 'mas', name: 'Ikan Mas', tier: 'Rare', stars: 3, price: 150, speed: 9, agile: 20, color: '#f1c40f', path: SVGS.rare },
    { id: 'gabus', name: 'Ikan Gabus', tier: 'Rare', stars: 3, price: 200, speed: 10, agile: 18, color: '#27ae60', path: SVGS.rare },
    { id: 'koi', name: 'Koi Langka', tier: 'Legendary', stars: 5, price: 500, speed: 13, agile: 12, color: '#e74c3c', path: SVGS.legendary },
    { id: 'arwana', name: 'Arwana Emas', tier: 'Legendary', stars: 5, price: 1000, speed: 15, agile: 8, color: '#d35400', path: SVGS.legendary },
];

const CONFIG = {
    friction: 0.92,
    acceleration: 0.8,
    playerRadius: 80,
    baseCatchRate: 0.3,
    baseEscapeRate: 0.2,
};

let gameState = {
    screen: 'WELCOME', // WELCOME, PLAY, OVER, COLLECTION
    money: 0,
    progress: 0,
    playing: false,
    activeFish: null, // Current target fish data
};

const player = {
    x: 0, y: 0, vx: 0, vy: 0, radius: CONFIG.playerRadius,
    update: function() {
        if (keys.w) this.vy -= CONFIG.acceleration;
        if (keys.s) this.vy += CONFIG.acceleration;
        if (keys.a) this.vx -= CONFIG.acceleration;
        if (keys.d) this.vx += CONFIG.acceleration;
        this.vx *= CONFIG.friction; this.vy *= CONFIG.friction;
        this.x += this.vx; this.y += this.vy;
        
        // Bounds
        if (this.x < this.radius) { this.x = this.radius; this.vx *= -0.5; }
        if (this.x > canvas.width - this.radius) { this.x = canvas.width - this.radius; this.vx *= -0.5; }
        if (this.y < this.radius) { this.y = this.radius; this.vy *= -0.5; }
        if (this.y > canvas.height - this.radius) { this.y = canvas.height - this.radius; this.vy *= -0.5; }
    },
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = this.catching ? '#38ef7d' : 'rgba(255, 255, 255, 0.8)';
        ctx.stroke();
    }
};

const fish = {
    x: 0, y: 0, vx: 0, vy: 0, radius: 25,
    timer: 0, idle: false, idleTimer: 0,
    data: null, // Ref to FISH_TYPES item
    path: null,
    
    init: function(fishType) {
        this.data = fishType;
        this.path = new Path2D(fishType.path);
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.targetX = this.x; this.targetY = this.y;
        this.vx = 0; this.vy = 0;
    },
    
    update: function() {
        if (!this.data) return;

        // Custom Behavior based on Tier (Data)
        
        // Idle Logic
        if (this.idle) {
            this.idleTimer--;
            this.vx *= 0.9; this.vy *= 0.9;
            this.x += this.vx; this.y += this.vy;
            if (this.idleTimer <= 0) {
                this.idle = false;
                this.pickNewTarget();
            }
            return;
        }

        // Random Idle Chance (Rarity affects this? Maybe Legends never stop?)
        // Common stops more often.
        const stopChance = this.data.tier === 'Legendary' ? 0.0005 : 0.002;
        if (Math.random() < stopChance) {
            this.idle = true;
            this.idleTimer = 100; // ~1.5s
            return;
        }

        // Timer for erratic movement
        this.timer++;
        if (this.timer > this.data.agile || Math.random() < 0.01) {
            this.pickNewTarget();
            this.timer = 0;
        }

        // Move
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 5) {
            const speed = this.data.speed;
            this.vx += (dx / dist) * 0.5;
            this.vy += (dy / dist) * 0.5;
            
            // Cap speed
            const currentSpeed = Math.hypot(this.vx, this.vy);
            if (currentSpeed > speed) {
                this.vx = (this.vx / currentSpeed) * speed;
                this.vy = (this.vy / currentSpeed) * speed;
            }
            this.x += this.vx;
            this.y += this.vy;
        } else {
            this.pickNewTarget();
        }
        
        // Bounds
        if (this.x < 0) { this.x = 0; this.vx *= -1; this.pickNewTarget(); }
        if (this.x > canvas.width) { this.x = canvas.width; this.vx *= -1; this.pickNewTarget(); }
        if (this.y < 0) { this.y = 0; this.vy *= -1; this.pickNewTarget(); }
        if (this.y > canvas.height) { this.y = canvas.height; this.vy *= -1; this.pickNewTarget(); }
    },
    
    pickNewTarget: function() {
        this.targetX = Math.random() * (canvas.width - 100) + 50;
        this.targetY = Math.random() * (canvas.height - 100) + 50;
    },
    
    draw: function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        const angle = Math.atan2(this.vy, this.vx);
        ctx.rotate(angle);
        
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fill(this.path);
        
        // Body
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1;
        ctx.fillStyle = this.idle ? '#ffffff' : this.data.color;
        ctx.fill(this.path);
        ctx.stroke(this.path);
        
        // Eye
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(15, -3, 3, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.arc(16, -3, 1, 0, Math.PI*2);
        ctx.fill();

        ctx.restore();
    }
};

const keys = { w:false, a:false, s:false, d:false };

// --- Main Functions ---

function init() {
    loadMoney();
    resizeCanvas();
    player.x = canvas.width/2; 
    player.y = canvas.height/2;
    showScreen('WELCOME');
    loop();
}

function startGame() {
    gameState.playing = true;
    gameState.progress = 0;
    gameState.activeFish = selectRandomFish();
    fish.init(gameState.activeFish);
    
    showScreen('PLAY');
}

function selectRandomFish() {
    // Weighted Random
    const roll = Math.random();
    let tier = 'Common';
    if (roll > 0.9) tier = 'Legendary'; // 10%
    else if (roll > 0.6) tier = 'Rare'; // 30%
    
    const candidates = FISH_TYPES.filter(f => f.tier === tier);
    return candidates[Math.floor(Math.random() * candidates.length)];
}

function loop() {
    if (gameState.screen === 'PLAY') {
        updateGame();
    }
    drawGame();
    requestAnimationFrame(loop);
}

function updateGame() {
    player.update();
    fish.update();
    
    // Collision
    const dist = Math.hypot(player.x - fish.x, player.y - fish.y);
    const isTouching = dist < (player.radius + fish.radius);
    
    player.catching = isTouching;
    
    if (isTouching) {
        gameState.progress += CONFIG.baseCatchRate; 
    } else {
        gameState.progress -= CONFIG.baseEscapeRate;
    }
    
    if (gameState.progress < 0) gameState.progress = 0;
    if (gameState.progress > 100) gameState.progress = 100;
    
    // Update Progress Bar
    ui.progressBar.style.height = `${gameState.progress}%`;
    
    // Win
    if (gameState.progress >= 100) {
        winGame();
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // If Playing or Just Finished, draw entities
    if (gameState.screen === 'PLAY' || gameState.screen === 'OVER') {
        fish.draw();
        player.draw();
    }
}

function winGame() {
    gameState.playing = false;
    gameState.screen = 'OVER';
    
    const caughtFish = gameState.activeFish;
    
    // Reward
    addMoney(caughtFish.price);
    saveCatchToSupabase(caughtFish.name);
    
    // UI
    const stars = '★'.repeat(caughtFish.stars);
    ui.catchMsg.innerHTML = `Kamu mendapatkan:<br><strong style="font-size:1.2rem">${caughtFish.name}</strong><br><span style="color:#f1c40f;font-size:1.5rem">${stars}</span>`;
    ui.rewardMsg.textContent = `+ $${caughtFish.price}`;
    ui.result.classList.remove('hidden');
    ui.controls.classList.add('hidden');
    ui.progress.classList.add('hidden');
}

// --- Screens Logic ---

function showScreen(screenName) {
    gameState.screen = screenName;
    
    // Hide all
    ui.welcome.classList.add('hidden');
    ui.collection.classList.add('hidden');
    ui.result.classList.add('hidden');
    ui.progress.classList.add('hidden');
    ui.controls.classList.add('hidden');
    
    if (screenName === 'WELCOME') {
        ui.welcome.classList.remove('hidden');
    } else if (screenName === 'PLAY') {
        ui.progress.classList.remove('hidden');
        ui.controls.classList.remove('hidden');
    } else if (screenName === 'COLLECTION') {
        ui.collection.classList.remove('hidden');
        loadCollection();
    }
}

// --- Wallet & Data ---

function loadMoney() {
    const saved = localStorage.getItem('fishing_money');
    gameState.money = saved ? parseInt(saved) : 0;
    updateMoneyUI();
}

function addMoney(amount) {
    gameState.money += amount;
    localStorage.setItem('fishing_money', gameState.money);
    updateMoneyUI();
}

function updateMoneyUI() {
    ui.money.textContent = gameState.money;
}

// --- Supabase ---

async function saveCatchToSupabase(fishName) {
    if (!supabaseClient) return;
    try {
        await supabaseClient.from('catches').insert([
            { fish_name: fishName, created_at: new Date() }
        ]);
    } catch(e) { console.error(e); }
}

async function loadCollection() {
    ui.collectionGrid.innerHTML = '<p style="color:white">Memuat data...</p>';
    if (!supabaseClient) {
        ui.collectionGrid.innerHTML = '<p style="color:white">Supabase tidak terkoneksi.</p>';
        return;
    }
    
    const { data, error } = await supabaseClient
        .from('catches')
        .select('fish_name, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        ui.collectionGrid.innerHTML = '<p style="color:red">Gagal memuat data.</p>';
        return;
    }
    
    renderCollection(data);
}

function renderCollection(catches) {
    ui.collectionGrid.innerHTML = '';
    
    if (catches.length === 0) {
        ui.collectionGrid.innerHTML = '<p style="color:white">Belum ada ikan yang ditangkap.</p>';
        return;
    }
    
    // Count per fish type
    const counts = {};
    catches.forEach(c => {
        counts[c.fish_name] = (counts[c.fish_name] || 0) + 1;
    });
    
    // Render Cards
    for (let [name, count] of Object.entries(counts)) {
        const fishType = FISH_TYPES.find(f => f.name === name) || FISH_TYPES[0];
        const stars = '★'.repeat(fishType.stars);
        
        const card = document.createElement('div');
        card.className = 'fish-card';
        card.innerHTML = `
            <svg viewBox="-30 -30 60 60">
                <path d="${fishType.path}" fill="${fishType.color}" stroke="#222"/>
            </svg>
            <div class="fish-name">${name}</div>
            <div class="fish-stars">${stars}</div>
            <div class="fish-count">x${count}</div>
        `;
        ui.collectionGrid.appendChild(card);
    }
}

// --- Event Listeners ---

window.addEventListener('resize', resizeCanvas);
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    if (keys[k] !== undefined) keys[k] = true;
});
window.addEventListener('keyup', e => {
    const k = e.key.toLowerCase();
    if (keys[k] !== undefined) keys[k] = false;
});

ui.playBtn.addEventListener('click', startGame);
ui.collectBtn.addEventListener('click', () => showScreen('COLLECTION'));
ui.backBtn.addEventListener('click', () => showScreen('WELCOME'));
ui.restartBtn.addEventListener('click', () => showScreen('WELCOME'));

// Start
init();
