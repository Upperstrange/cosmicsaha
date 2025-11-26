import * as THREE from 'three';

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

export function addCamera() {
    camera.position.z = 5;
    camera.position.y = 1;
}