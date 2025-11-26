import { keys, state } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/constants.js";
import { camera } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/core/camera.js";
import { player } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/models/player.js";
import { renderer } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/core/renderer.js";
import * as THREE from 'three';

export const controlActions = {
    updateKeyboardInput() {
        const moveSpeed = 0.15;
        if (keys.w || keys.W || keys.ArrowUp) state.targetY += moveSpeed;
        if (keys.s || keys.S || keys.ArrowDown) state.targetY -= moveSpeed;
        if (keys.a || keys.A || keys.ArrowLeft) state.targetX -= moveSpeed;
        if (keys.d || keys.D || keys.ArrowRight) state.targetX += moveSpeed;

        state.targetX = Math.max(-8, Math.min(8, state.targetX));
        state.targetY = Math.max(-4, Math.min(4, state.targetY));
    },
    playerMovements() {
        player.position.x += (state.targetX - player.position.x) * 0.1;
        player.position.y += (state.targetY - player.position.y) * 0.1;
        player.rotation.z = Math.PI + (player.position.x - state.targetX) * 0.5;
        player.rotation.x = (player.position.y - state.targetY) * 0.2;
    },
    loadControls() {
        // CONTROLS 
        const pointer = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const intersection = new THREE.Vector3();

        window.addEventListener('keydown', (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = true; });
        window.addEventListener('keyup', (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = false; });

        function handleInput(x, y) {
            pointer.x = (x / window.innerWidth) * 2 - 1;
            pointer.y = -(y / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(pointer, camera);
            raycaster.ray.intersectPlane(plane, intersection);
            state.targetX = intersection.x;
            state.targetY = intersection.y;
        }

        window.addEventListener('mousemove', (e) => { if (state.isPlaying) handleInput(e.clientX, e.clientY); });
        window.addEventListener('touchmove', (e) => { if (e.touches.length > 0 && state.isPlaying) handleInput(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

    }
}