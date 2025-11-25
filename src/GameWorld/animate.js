import sfx from "../Audio/sfx.js";
import { spawnRate, baseSpeed as baseSpeedDefault, state } from "./constants.js";
import { loopActions } from "./actions/loop-actions.js";
import { controlActions } from "./actions/control-actions.js";
import { renderActions } from "./actions/render-actions.js";
import { player } from "./models/player.js";
import { camera } from "./core/camera.js";
import { renderer } from "./core/renderer.js";
import { scene } from "./world.js";

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