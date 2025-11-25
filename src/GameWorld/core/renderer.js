import dom from "../../dom.js";

export const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

export function addRenderer() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    dom.container.appendChild(renderer.domElement);
}