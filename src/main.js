import sfx from 'https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/Audio/sfx.js';
import { loadingActions } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/actions/loading-actions.js";
import animate from 'https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/animate.js';
import loadWorld from 'https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/world.js';

(async () => {
    await sfx.init();
    loadingActions.loadGame();
    loadWorld();
    animate();
})();

