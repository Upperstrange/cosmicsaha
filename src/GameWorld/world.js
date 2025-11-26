import { addRenderer } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/core/renderer.js";
import { addCamera } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/core/camera.js";
import { addFog } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/core/fog.js";
import { addLights } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/core/lights.js";
import { addPlayer } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/models/player.js"
import { addStars } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/models/stars.js"
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

