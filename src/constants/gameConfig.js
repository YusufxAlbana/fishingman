export const CONFIG = {
    friction: 0.85, // Default base friction (used if no rod)
    acceleration: 0.8,
    playerRadius: 80,
    baseCatchRate: 0.3,
    baseEscapeRate: 0.2,
};

export const ROD_TYPES = [
    // --- TIER 1 (Star 1-2) ---
    {
        id: 'bamboo',
        name: 'Joran Bambu',
        price: 0,
        friction: 0.96, 
        power: 1.0,     
        maxStars: 2,
        color: '#e67e22', // Match main bamboo color
        description: 'Joran sederhana dari bambu. Hanya kuat menarik ikan kecil.'
    },
    {
        id: 'kayu_jati',
        name: 'Kayu Jati',
        price: 150,
        friction: 0.94,
        power: 1.1,
        maxStars: 2,
        color: '#795548', // Brown, not purple
        description: 'Lebih kokoh dari bambu, tapi masih terasa kaku.'
    },
    {
        id: 'fiber_glass_v1',
        name: 'Fiber Glass V1',
        price: 400,
        friction: 0.92,
        power: 1.25,
        maxStars: 2,
        color: '#27ae60',
        description: 'Joran pemula modern. Cukup enak dipakai.'
    },

    // --- TIER 2 (Star 1-3) ---
    {
        id: 'composite',
        name: 'Composite Lite',
        price: 1000,
        friction: 0.90,
        power: 1.4,
        maxStars: 3,
        color: '#2980b9',
        description: 'Campuran bahan ringan. Bisa menjangkau ikan menengah.'
    },
    {
        id: 'carbon_steel',
        name: 'Carbon Steel',
        price: 2500,
        friction: 0.88,
        power: 1.6,
        maxStars: 3,
        color: '#7f8c8d',
        description: 'Kuat dan anti karat. Favorit pemancing harian.'
    },
    {
        id: 'graphite_x',
        name: 'Graphite X',
        price: 4500,
        friction: 0.86,
        power: 1.8,
        maxStars: 3,
        color: '#34495e',
        description: 'Sensitivitas tinggi. Ikan lincah pun terasa.'
    },
    {
        id: 'alloy_pro',
        name: 'Alloy Pro',
        price: 7000,
        friction: 0.84,
        power: 2.0,
        maxStars: 3,
        color: '#16a085',
        description: 'Logam ringan kelas turnamen amatir.'
    },

    // --- TIER 3 (Star 1-4) ---
    {
        id: 'titanium_jr',
        name: 'Titanium Jr',
        price: 12000,
        friction: 0.82,
        power: 2.3,
        maxStars: 4,
        color: '#8e44ad',
        description: 'Logam premium. Ikan besar mulai gemetar.'
    },
    {
        id: 'nano_carbon',
        name: 'Nano Carbon',
        price: 18000,
        friction: 0.80,
        power: 2.6,
        maxStars: 4,
        color: '#c0392b',
        description: 'Teknologi nano membuat joran ini ringan tapi mematikan.'
    },
    {
        id: 'plasma_rod',
        name: 'Plasma Z',
        price: 25000,
        friction: 0.78,
        power: 3.0,
        maxStars: 4,
        color: '#d35400',
        description: 'Desain futuristik dengan keseimbangan sempurna.'
    },
    {
        id: 'golden_karp',
        name: 'Golden Karp',
        price: 35000,
        friction: 0.76,
        power: 3.5,
        maxStars: 4,
        color: '#f1c40f',
        description: 'Dilapisi emas. Menarik kemewahan dan ikan langka.'
    },

    // --- TIER 4 (Star 1-5) ---
    {
        id: 'void_walker',
        name: 'Void Walker',
        price: 50000,
        friction: 0.74,
        power: 4.0,
        maxStars: 5,
        color: '#000000',
        description: 'Hitam pekat. Menyerap energi perlawanan ikan.'
    },
    {
        id: 'neptune_spear',
        name: 'Neptune Spear',
        price: 75000,
        friction: 0.72,
        power: 4.5,
        maxStars: 5,
        color: '#2980b9',
        description: 'Pusaka laut dalam. Legenda para nelayan.'
    },
    {
        id: 'galaxy_stardust',
        name: 'Galaxy Stardust',
        price: 100000,
        friction: 0.70,
        power: 5.0,
        maxStars: 5,
        color: '#9b59b6',
        description: 'Ditempa dari serpihan bintang. Kekuatan kosmos.'
    },
    {
        id: 'poseidon_master',
        name: 'Trisula Poseidon',
        price: 150000,
        friction: 0.65, // Instant stop
        power: 6.0,     // Insane power
        maxStars: 5,
        color: '#e67e22',
        description: 'Kekuasaan mutlak atas tujuh samudra.'
    }
];
