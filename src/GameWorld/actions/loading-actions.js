import { state, spawnRate, baseSpeed as baseSpeedDefault, keys, basemodel } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/constants.js";
import sfx from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/Audio/sfx.js";
import dom from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/dom.js";
import { gameplayActions } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/actions/gameplay-actions.js";


export const loadingActions = {
    loadGame() {
        this.loadDifficulty();
        this.loadUIEvents();
    },
    loadUIEvents() {
        // UI events
        dom.startBtn.addEventListener('click', () => {
            sfx.init();
            sfx.playAnimeSound('nani');
            dom.menuOverlay.classList.add('hidden');
            gameplayActions.resetGame();
            state.isPlaying = true;
        });

        dom.helpBtn.addEventListener('click', () => {
            state.isPlaying = false;
            sfx.playAnimeSound('rikkaOw');
            dom.instructionsModal.classList.remove('hidden');
        });

        dom.muteBtn.addEventListener('click', () => {
            sfx.init();
            sfx.toggleMute();
        });

        const closeInstructions = () => {
            dom.instructionsModal.classList.add('hidden');
            if (state.health > 0 && dom.menuOverlay.classList.contains('hidden')) {
                state.isPlaying = true;
                sfx.playAnimeSound('rikkaOw');
            }
        };
        dom.closeHelp.addEventListener('click', closeInstructions);
        dom.resumeBtn.addEventListener('click', closeInstructions);
    },
    loadDifficulty() {
        // Difficulty and spawn settings
        let baseSpeed = baseSpeedDefault;

        const diffButtons = document.querySelectorAll('#difficulty-chips .chip');
        diffButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                diffButtons.forEach(b => b.classList.remove('bg-gray-700'));
                btn.classList.add('bg-gray-700');

                const diff = btn.dataset.diff;
                if (diff === 'easy') {
                    baseSpeed = 0.3;
                    spawnRate.obstacle = 0.03;
                    spawnRate.collectible = 0.05;
                }
                if (diff === 'medium') {
                    baseSpeed = 0.5;
                    spawnRate.obstacle = 0.05;
                    spawnRate.collectible = 0.03;
                }
                if (diff === 'hard') {
                    baseSpeed = 0.8;
                    spawnRate.obstacle = 0.09;
                    spawnRate.collectible = 0.02;
                }

                state.speed = baseSpeed;
                console.log('Difficulty:', diff, 'Speed:', baseSpeed, 'Spawns:', spawnRate);
            });
        });
    },
    loadPlayerModel() {
        const modelButtons = document.querySelectorAll('#player-chips .chip');
        modelButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modelButtons.forEach(b => b.classList.remove('bg-gray-700'));
                btn.classList.add('bg-gray-700');

                basemodel = btn.dataset.model;
                console.log('Model:', basemodel);
            });
        });
    },

}