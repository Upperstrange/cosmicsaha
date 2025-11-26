import sfx from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/Audio/sfx.js";
import { spawnRate, baseSpeed as baseSpeedDefault, state } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/constants.js";
import { loopActions } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/actions/loop-actions.js";
import { controlActions } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/actions/control-actions.js";
import { renderActions } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/actions/render-actions.js";
import { player } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/models/player.js";
import { camera } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/core/camera.js";
import { renderer } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/core/renderer.js";
import { scene } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/world.js";

export default function animate() {
    let baseSpeed = baseSpeedDefault
    requestAnimationFrame(animate);

    if (state.isPlaying) sfx.setEnginePitch(state.speed);

    loopActions.moveStars();
    loopActions.particlesLoop();

    if (!state.isPlaying) {
        player.rotation.z = Math.sin(Date.now() * 0.001) * 0.1 + Math.PI;
        renderer.render(scene, camera);
        return;
    }

    controlActions.updateKeyboardInput();
    controlActions.playerMovements();
    controlActions.loadControls();

    // Spawning
    if (Math.random() < spawnRate.obstacle) renderActions.spawnObstacle();
    if (Math.random() < spawnRate.collectible) renderActions.spawnCollectible();

    // Speed update
    state.speed = baseSpeed + (state.score * 0.0001);

    loopActions.obstacleLoop();
    loopActions.collectibleLoop();

    renderer.render(scene, camera);
}