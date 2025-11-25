import sfx from './Audio/sfx.js';
import { loadingActions } from "./GameWorld/actions/loading-actions.js";
import animate from './GameWorld/animate.js';
import loadWorld from './GameWorld/world.js';

(async () => {
    await sfx.init();
    loadingActions.loadGame();
    loadWorld();
    animate();
})();

