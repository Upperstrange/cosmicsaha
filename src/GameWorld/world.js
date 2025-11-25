import { addRenderer } from "./core/renderer.js";
import { addCamera } from "./core/camera.js";
import { addFog } from "./core/fog.js";
import { addLights } from "./core/lights.js";
import { addPlayer, loadPlayerModel } from "./models/player.js"
import { addStars } from "./models/stars.js"

export const scene = new THREE.Scene();
export default function loadWorld() {
    addFog(scene);
    addCamera();
    addRenderer();
    addLights(scene);

    // addPlayer(scene);
    loadPlayerModel(scene, "https://cdn.jsdelivr.net/gh/USERNAME/REPO/path/to/model.glb")
    addStars(scene);
}