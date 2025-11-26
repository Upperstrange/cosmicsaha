import * as THREE from 'three';
import {modelLoader} from "./model-loader.js";

export const obstacleMat = new THREE.MeshStandardMaterial({
    color: 0xaa4444,
    roughness: 0.9,
    flatShading: true
});

export function loadObstacleModel(url, callback) {
    modelLoader.load(
        url,
        gltf => {
            const model = gltf.scene;

            // Scale down — models are usually huge
            model.scale.set(0.3, 0.3, 0.3);

            // Optional orientation fix
            model.rotation.y = Math.PI; 

            callback(model);
        },
        undefined,
        err => console.error("Obstacle load error:", err)
    );
}