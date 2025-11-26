import dom from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/dom.js";
import * as THREE from 'three';

export const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

export function addRenderer() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    dom.container.appendChild(renderer.domElement);
}