import { addRenderer } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/core/renderer.js";
import { addCamera } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/core/camera.js";
import { addFog } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/core/fog.js";
import { addLights } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/core/lights.js";
import { addSlong, addModel } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/models/player.js";
import { addStars } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/models/stars.js";
import { basemodel } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/constants.js"
import * as THREE from 'three';

export const scene = new THREE.Scene();
export default function loadWorld() {
    addFog(scene);
    addCamera();
    addRenderer();
    addLights(scene);

    if (basemodel === 'slong') {
        addSlong(scene);
    }

    if (basemodel === 'spaceship') {
        addModel(scene, {
            modelUrl: 'https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/spaceship-low.glb'
        });
    }

    if (basemodel === 'lilamy') {
        addModel(scene, {
            modelUrl: 'https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/lilamy.glb'
        });
    }


    addStars(scene);
}

