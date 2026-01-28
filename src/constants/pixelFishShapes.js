
export const FISH_SHAPES = {
    // 10x10 approx grids, scaled up
    // . = empty
    // 1 = outline (darker)
    // 2 = body (main color)
    // 3 = highlight (lighter)
    // 4 = eye (black/white)
    // 5 = fin/accent

    small: [
        "..........",
        "..........",
        "....111...",
        "...12221..",
        "..123221..",
        ".1122221..",
        "12122221..", // Tail left
        ".111111...",
        "..........",
        ".........."
    ],

    medium: [
        "............",
        "......111...",
        "....112221..",
        "...12232221.",
        "..112222221.",
        ".1212222421.",
        "1221222221..",
        ".11122111...",
        "...111......",
        "............"
    ],

    round: [ // Buntal, etc
        "............",
        "....1111....",
        "..11222211..",
        ".1222332221.",
        "122222224221",
        "122222222221",
        ".1222222221.",
        "..11222211..",
        "....1111....",
        "............"
    ],

    long: [ // Lele, Arwana, Eel
        "................",
        "................",
        "11..............",
        "12111...........",
        ".12221111111....",
        "..122222222211..",
        "..1222222224221.",
        "...11122222221..",
        "......1111111...",
        "................"
    ],

    monster: [ // Legendary
        "....................",
        "..........1111......",
        "........1132221.....",
        "......1122222221....",
        "....1122222222221...",
        "..1122332222224221..",
        "112222222233222221..",
        ".1122222111122211...",
        "...11111....111.....",
        "...................."
    ]
};

// Map Fish IDs to Shapes
export const getFishShape = (fish) => {
    // Custom mapping for specific fish
    if (fish.id.includes('buntal')) return FISH_SHAPES.round;
    if (fish.id.includes('lele') || fish.id.includes('belut') || fish.id.includes('arwana') || fish.id.includes('alligator')) return FISH_SHAPES.long;
    if (fish.stars >= 4) return FISH_SHAPES.monster;
    if (fish.stars === 3) return FISH_SHAPES.medium;
    if (fish.stars <= 2) return FISH_SHAPES.small;
    
    return FISH_SHAPES.medium; // Default
};
