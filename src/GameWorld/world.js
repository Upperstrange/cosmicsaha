import { addRenderer } from "./core/renderer.js";
import { addCamera } from "./core/camera.js";
import { addFog } from "./core/fog.js";
import { addLights } from "./core/lights.js";
import { addPlayer, loadPlayerModel } from "./models/player.js"
import { addStars } from "./models/stars.js"
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export const scene = new THREE.Scene();
export default function loadWorld() {
    addFog(scene);
    addCamera();
    addRenderer();
    addLights(scene);

    // addPlayer(scene);
    loadPlayerModel(scene, "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/spaceship-low.glb")
    addStars(scene);
}