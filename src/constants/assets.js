import { SVGS } from './svgs';
// Force Update

// FISH TYPES DB
// Speed: Base movement speed (pixels/frame approx)
// HP: Health points (clicks/damage needed)
// Agile: How often it changes direction / erratic movement
export const FISH_TYPES = [
    // 1 STAR (Common)
    { id: 'lele', name: 'Ikan Lele', tier: 'Common', stars: 1, price: 50, speed: 8, agile: 5, hp: 600, color: '#95a5a6', path: SVGS.common, description: "Ikan berkumis yang suka bersembunyi di lumpur." },
    { id: 'nila', name: 'Ikan Nila', tier: 'Common', stars: 1, price: 60, speed: 8, agile: 5, hp: 660, color: '#bdc3c7', path: SVGS.common, description: "Ikan konsumsi populer yang mudah ditemukan." },
    { id: 'mujair', name: 'Ikan Mujair', tier: 'Common', stars: 1, price: 55, speed: 8, agile: 5, hp: 720, color: '#7f8c8d', path: SVGS.common, description: "Saudara dekat ikan Nila, tahan banting." },
    { id: 'platy', name: 'Ikan Platy', tier: 'Common', stars: 1, price: 45, speed: 8, agile: 10, hp: 540, color: '#e67e22', path: SVGS.common, description: "Ikan kecil berwarna cerah, cocok untuk pemula." },
    { id: 'sepat', name: 'Ikan Sepat', tier: 'Common', stars: 1, price: 40, speed: 8, agile: 5, hp: 600, color: '#A0A0A0', path: SVGS.common, description: "Sering ditemukan di sawah-sawah." },
    { id: 'wader', name: 'Ikan Wader', tier: 'Common', stars: 1, price: 30, speed: 8, agile: 10, hp: 480, color: '#d35400', path: SVGS.common, description: "Kecil tapi lincah, enak digoreng kering." },
    { id: 'gupi', name: 'Ikan Gupi', tier: 'Common', stars: 1, price: 35, speed: 8, agile: 8, hp: 540, color: '#9b59b6', path: SVGS.common, description: "Ekornya cantik meskipun ukurannya kecil." },
    { id: 'molly', name: 'Ikan Molly', tier: 'Common', stars: 1, price: 50, speed: 8, agile: 5, hp: 600, color: '#2c3e50', path: SVGS.common, description: "Hitam legam dan tenang." },
    { id: 'betok', name: 'Ikan Betok', tier: 'Common', stars: 1, price: 65, speed: 8, agile: 5, hp: 720, color: '#5D4037', path: SVGS.common, description: "Kuat bertahan hidup di sedikit air." },
    { id: 'komet', name: 'Ikan Komet', tier: 'Common', stars: 1, price: 70, speed: 8, agile: 10, hp: 660, color: '#e74c3c', path: SVGS.common, description: "Seperti ikan mas tapi lebih ramping." },

    // 2 STARS (Uncommon)
    { id: 'bawal', name: 'Ikan Bawal', tier: 'Uncommon', stars: 2, price: 100, speed: 8, agile: 15, hp: 960, color: '#34495e', path: SVGS.common, description: "Mirip piranha tapi pemakan tumbuhan." },
    { id: 'patin', name: 'Ikan Patin', tier: 'Uncommon', stars: 2, price: 120, speed: 8, agile: 10, hp: 1020, color: '#ecf0f1', path: SVGS.common, description: "Licin dan pandai meloloskan diri." },
    { id: 'gurame', name: 'Ikan Gurame', tier: 'Uncommon', stars: 2, price: 150, speed: 8, agile: 5, hp: 1200, color: '#8e44ad', path: SVGS.common, description: "Raja ikan air tawar, mahal dan enak." },
    { id: 'bandeng', name: 'Ikan Bandeng', tier: 'Uncommon', stars: 2, price: 110, speed: 8, agile: 20, hp: 840, color: '#95a5a6', path: SVGS.common, description: "Berenang sangat cepat dan bertenaga." },
    { id: 'gabus_malas', name: 'Gabus Malas', tier: 'Uncommon', stars: 2, price: 130, speed: 8, agile: 5, hp: 1320, color: '#5E35B1', path: SVGS.common, description: "Jarang bergerak, tapi sangat berat ditarik." },
    { id: 'belut', name: 'Belut Sawah', tier: 'Uncommon', stars: 2, price: 90, speed: 8, agile: 25, hp: 720, color: '#795548', path: SVGS.common, description: "Sangat licin dan sudah dipegang." },
    { id: 'cupang', name: 'Ikan Cupang', tier: 'Uncommon', stars: 2, price: 80, speed: 8, agile: 20, hp: 600, color: '#c0392b', path: SVGS.common, description: "Petarung kecil yang agresif." },
    { id: 'zebra', name: 'Danio Zebra', tier: 'Uncommon', stars: 2, price: 75, speed: 8, agile: 30, hp: 480, color: '#dfe4ea', path: SVGS.common, description: "Bergaris-garis dan tidak bisa diam." },
    { id: 'lemon', name: 'Ikan Lemon', tier: 'Uncommon', stars: 2, price: 95, speed: 8, agile: 15, hp: 900, color: '#f1c40f', path: SVGS.common, description: "Kuning cerah seperti buah lemon." },
    { id: 'buntal', name: 'Buntal Tawar', tier: 'Uncommon', stars: 2, price: 140, speed: 8, agile: 5, hp: 1440, color: '#27ae60', path: SVGS.common, description: "Bisa menggelembung menjadi bola duri." },

    // 3 STARS (Rare)
    { id: 'mas', name: 'Ikan Mas', tier: 'Rare', stars: 3, price: 200, speed: 8, agile: 20, hp: 1320, color: '#f39c12', path: SVGS.rare, description: "Ikan emas klasik, lambang keberuntungan." },
    { id: 'gabus', name: 'Ikan Gabus', tier: 'Rare', stars: 3, price: 250, speed: 8, agile: 20, hp: 1440, color: '#16a085', path: SVGS.rare, description: "Predator air tawar, khasiat obat tinggi." },
    { id: 'toman', name: 'Ikan Toman', tier: 'Rare', stars: 3, price: 300, speed: 8, agile: 25, hp: 1680, color: '#2c2c54', path: SVGS.rare, description: "Monster sungai, gigitan yang kuat." },
    { id: 'belida', name: 'Ikan Belida', tier: 'Rare', stars: 3, price: 350, speed: 8, agile: 15, hp: 1560, color: '#7f8fa6', path: SVGS.rare, description: "Bahan utama pempek asli, punggung unik." },
    { id: 'hampala', name: 'Hampala', tier: 'Rare', stars: 3, price: 280, speed: 8, agile: 35, hp: 1080, color: '#e1b12c', path: SVGS.rare, description: "Perenang cepat yang menyambar kilat." },
    { id: 'baung', name: 'Ikan Baung', tier: 'Rare', stars: 3, price: 220, speed: 8, agile: 20, hp: 1380, color: '#e67e22', path: SVGS.rare, description: "Mirip lele tapi lebih berharga." },
    { id: 'discus', name: 'Discus', tier: 'Rare', stars: 3, price: 400, speed: 8, agile: 25, hp: 1140, color: '#e056fd', path: SVGS.rare, description: "Ratu ikan hias, bentuk pipih indah." },
    { id: 'louhan', name: 'Louhan', tier: 'Rare', stars: 3, price: 450, speed: 8, agile: 10, hp: 1800, color: '#ff6b6b', path: SVGS.rare, description: "Kepala benjol pembawa hoki." },
    { id: 'oscar', name: 'Ikan Oscar', tier: 'Rare', stars: 3, price: 380, speed: 8, agile: 20, hp: 1500, color: '#30336b', path: SVGS.rare, description: "Cerdas dan bisa mengenali pemiliknya." },
    { id: 'manfish', name: 'Manfish', tier: 'Rare', stars: 3, price: 260, speed: 8, agile: 30, hp: 960, color: '#dcdde1', path: SVGS.rare, description: "Seperti layang-layang di dalam air." },

    // 4 STARS (Epic) 
    { id: 'arwana_silver', name: 'Arwana Silver', tier: 'Epic', stars: 4, price: 800, speed: 8, agile: 40, hp: 3600, color: '#bdc3c7', path: SVGS.legendary, description: "Naga perak yang meluncur anggun." },
    { id: 'koi_kohaku', name: 'Koi Kohaku', tier: 'Epic', stars: 4, price: 900, speed: 8, agile: 30, hp: 4200, color: '#e74c3c', path: SVGS.legendary, description: "Koi putih dengan pola merah artistik." },
    { id: 'koi_sanke', name: 'Koi Sanke', tier: 'Epic', stars: 4, price: 950, speed: 8, agile: 30, hp: 4320, color: '#000000', path: SVGS.legendary, description: "Tiga warna elegan: putih, merah, hitam." },
    { id: 'arapaima', name: 'Arapaima Kecil', tier: 'Epic', stars: 4, price: 1200, speed: 8, agile: 20, hp: 6000, color: '#c0392b', path: SVGS.legendary, description: "Bayi monster amazon, sisik lapis baja." },
    { id: 'pari_tawar', name: 'Pari Hias', tier: 'Epic', stars: 4, price: 1100, speed: 8, agile: 60, hp: 3360, color: '#34495e', path: SVGS.legendary, description: "Terbang di dasar sungai dengan motif indah." },
    { id: 'alligator', name: 'Ikan Aligator', tier: 'Epic', stars: 4, price: 1000, speed: 8, agile: 35, hp: 4800, color: '#2c3e50', path: SVGS.legendary, description: "Moncong panjang bergigi tajam purba." },
    { id: 'channa_maru', name: 'Channa Maru', tier: 'Epic', stars: 4, price: 1300, speed: 8, agile: 45, hp: 4560, color: '#f39c12', path: SVGS.legendary, description: "Bunga kuning mekar di tubuhnya." },
    { id: 'channa_barca', name: 'Channa Barca', tier: 'Epic', stars: 4, price: 2500, speed: 8, agile: 50, hp: 3840, color: '#3DC1D3', path: SVGS.legendary, description: "Sangat langka dan mahal, idaman kolektor." },
    { id: 'datnoid', name: 'Tiger Fish', tier: 'Epic', stars: 4, price: 1500, speed: 8, agile: 40, hp: 4080, color: '#f1c40f', path: SVGS.legendary, description: "Loreng harimau yang gagah." },
    { id: 'peacock_bass', name: 'Peacock Bass', tier: 'Epic', stars: 4, price: 1400, speed: 8, agile: 55, hp: 3720, color: '#2ecc71', path: SVGS.legendary, description: "Warna-warni seperti merak, predator ganas." },

    // 5 STARS (Legendary)
    { id: 'arwana_super_red', name: 'Arwana Super Red', tier: 'Legendary', stars: 5, price: 5000, speed: 8, agile: 60, hp: 7200, color: '#ff0000', path: SVGS.mythical, description: "Sang Naga Merah, legenda hidup aquarium." },
    { id: 'arwana_golden', name: 'Arwana Golden', tier: 'Legendary', stars: 5, price: 4500, speed: 8, agile: 55, hp: 6960, color: '#f1c40f', path: SVGS.mythical, description: "Sisik emas 24 karat yang menyilaukan." },
    { id: 'koi_tancho', name: 'Koi Tancho', tier: 'Legendary', stars: 5, price: 4000, speed: 8, agile: 50, hp: 6600, color: '#ecf0f1', path: SVGS.mythical, description: "Putih bersih dengan bulatan merah di kepala." },
    { id: 'arapaima_giga', name: 'Arapaima Giga', tier: 'Legendary', stars: 5, price: 6000, speed: 8, agile: 30, hp: 12000, color: '#A93226', path: SVGS.mythical, description: "Raksasa sungai sesungguhnya, butuh tim untuk menangkapnya." },
    { id: 'mekong_catfish', name: 'Lele Mekong', tier: 'Legendary', stars: 5, price: 5500, speed: 8, agile: 40, hp: 10800, color: '#7f8c8d', path: SVGS.mythical, description: "Lele terbesar di dunia, hampir punah." },
    { id: 'beluga', name: 'Sturgeon', tier: 'Legendary', stars: 5, price: 7000, speed: 8, agile: 45, hp: 8400, color: '#2c3e50', path: SVGS.mythical, description: "Penghasil kaviar, fosil hidup zaman dinosaurus." },
    { id: 'electric_eel', name: 'Belut Listrik', tier: 'Legendary', stars: 5, price: 4800, speed: 8, agile: 70, hp: 4800, color: '#F1C40F', path: SVGS.mythical, description: "Menyengat! Hati-hati saat menariknya." },
    { id: 'lungfish', name: 'Lungfish Purba', tier: 'Legendary', stars: 5, price: 4200, speed: 8, agile: 20, hp: 9600, color: '#8854d0', path: SVGS.mythical, description: "Bisa bernapas di udara, evolusi yang aneh." },
    { id: 'platinum_gar', name: 'Platinum Gar', tier: 'Legendary', stars: 5, price: 8000, speed: 8, agile: 50, hp: 7800, color: '#ffffff', path: SVGS.mythical, description: "Mutasi warna putih salju yang sangat langka." },
    { id: 'kraken_tawar', name: 'Cumi Rawa', tier: 'Legendary', stars: 5, price: 10000, speed: 8, agile: 80, hp: 6000, color: '#ff5252', path: SVGS.mythical, description: "Mitos atau nyata? Penguasa kedalaman rawa." }, // Was 48 -> ~34
];

export const UI_ICONS = {
    play: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z",
    shop: "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z",
    bag: "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z",
    collection: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"
};
