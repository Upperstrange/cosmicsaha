import { addRenderer } from "./core/renderer.js";
import { addCamera } from "./core/camera.js";
import { addFog } from "./core/fog.js";
import { addLights } from "./core/lights.js";
import { addPlayer } from "./models/player.js"
import { addStars } from "./models/stars.js"
import * as THREE from 'three';

export const scene = new THREE.Scene();
export default function loadWorld() {
    addFog(scene);
    addCamera();
    addRenderer();
    addLights(scene);

    addPlayer(scene, {
        modelUrl: 'https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/spaceship-low.glb',
        spriteUrl: 'https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/saha.png'
    });
    //loadPlayerModel(scene, "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/spaceship-low.glb", 0.3);
    addStars(scene);
}