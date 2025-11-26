import sfx from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/Audio/sfx.js";
import { gameplayActions } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/actions/gameplay-actions.js";
import { renderActions } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/actions/render-actions.js";
import { state, particles, collectibles, obstacles } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/constants.js";
import { stars } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/models/stars.js";
import { player } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/models/player.js";
import { scene } from "https://cdn.jsdelivr.net/gh/Upperstrange/cosmicsaha/src/GameWorld/world.js";

export const loopActions = {
    moveStars() {
        const positions = stars.geometry.attributes.position.array;
        for (let i = 2; i < positions.length; i += 3) {
            positions[i] += (state.speed * 2);
            if (positions[i] > 10) positions[i] = -200;
        }
        stars.geometry.attributes.position.needsUpdate = true;
    },
    particlesLoop() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.position.add(p.userData.vel);
            p.userData.life -= 0.05;
            p.material.opacity = p.userData.life;
            p.material.transparent = true;
            p.rotation.x += 0.1;
            if (p.userData.life <= 0) { scene.remove(p); particles.splice(i, 1); }
        }

    },
    collectibleLoop() {
        for (let i = collectibles.length - 1; i >= 0; i--) {
            const obj = collectibles[i];
            obj.position.z += state.speed;
            obj.rotation.y += 0.1;

            const dist = player.position.distanceTo(obj.position);
            if (dist < 1.5) {
                renderActions.createExplosion(obj.position, 0x00ffff);
                sfx.playPickup();
                sfx.playAnimeSound('araAra');
                scene.remove(obj);
                collectibles.splice(i, 1);
                state.score += 100;
                gameplayActions.updateHUD();
                continue;
            }
            if (obj.position.z > 5) {
                scene.remove(obj);
                collectibles.splice(i, 1);
            }
        }
    },
    obstacleLoop() {
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obj = obstacles[i];
            obj.position.z += state.speed;
            obj.rotation.x += obj.userData.rotX;
            obj.rotation.y += obj.userData.rotY;

            const dist = player.position.distanceTo(obj.position);
            if (dist < 1.5) {
                renderActions.createExplosion(obj.position, 0xff0000);
                sfx.playDamage();
                sfx.playAnimeSound('yameteAh');
                scene.remove(obj);
                obstacles.splice(i, 1);
                state.health -= 25;
                gameplayActions.updateHUD();
                if (state.health <= 0) gameplayActions.gameOver();
                continue;
            }
            if (obj.position.z > 5) {
                scene.remove(obj);
                obstacles.splice(i, 1);
            }
        }
    },

}