export const keys = {
    w: false, W: false, ArrowUp: false,
    a: false, A: false, ArrowLeft: false,
    s: false, S: false, ArrowDown: false,
    d: false, D: false, ArrowRight: false
};

export const state = {
    isPlaying: false,
    score: 0,
    health: 100,
    speed: 0.5,
    mouseX: 0,
    mouseY: 0,
    targetX: 0,
    targetY: 0
};

export let obstacles = [];
export let collectibles = [];
export let particles = [];

export const baseSpeed = 0.5;
export const spawnRate = {
    obstacle: 0.05,
    collectible: 0.03
};