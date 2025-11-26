import sfx from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/Audio/sfx.js";
import dom from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/dom.js";
import { state, obstacles, collectibles } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/constants.js";
import { player } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/models/player.js";
import { scene } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/world.js";

export const gameplayActions = {
    updateHUD() {
        dom.score.innerText = Math.floor(state.score);
        dom.health.style.width = state.health + '%';
        dom.speed.innerText = Math.floor(1000 + (state.score * 2));

        if (state.health > 60) dom.health.className = "h-full w-full transition-all duration-300 bg-green-500";
        else if (state.health > 30) dom.health.className = "h-full w-full transition-all duration-300 bg-yellow-500";
        else dom.health.className = "h-full w-full transition-all duration-300 bg-red-600 animate-pulse";
    },
    gameOver() {
        state.isPlaying = false;
        sfx.playExplosion();
        sfx.playAnimeSound('yamete');
        sfx.stopEngine();
        dom.menuTitle.innerText = "SAHA BUSTED";
        dom.menuTitle.className = "text-4xl md:text-5xl font-bold text-red-500 mb-2 tracking-tighter";
        dom.menuSubtitle.innerText = `Final Score: ${Math.floor(state.score)}`;
        dom.startBtn.innerText = "REBOOT INSTRUMENTATION AMPLIFIER";
        dom.menuOverlay.classList.remove('hidden');
    },
    resetGame() {
        state.score = 0;
        state.health = 100;
        state.speed = 0.5;
        player.position.set(0, 0, 0);
        state.targetX = 0;
        state.targetY = 0;

        obstacles.forEach(o => scene.remove(o));
        collectibles.forEach(c => scene.remove(c));
        // clear arrays in-place to keep exported references usable
        obstacles.length = 0;
        collectibles.length = 0;

        this.updateHUD();
        sfx.playAnimeSound('nani');
    }
}