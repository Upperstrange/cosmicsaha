import * as THREE from 'three';
import {modelLoader} from "./model-loader.js";


export const player = new THREE.Group();

export function loadPlayerModel(scene, url, scale) {
    modelLoader.load(
        url,
        gltf => {
            const model = gltf.scene;

            model.rotation.x = 0;
            model.rotation.y = Math.PI;

            // Optional: adjust pitch if it's nose-up/down
            // model.rotation.x = -Math.PI / 2;

            model.scale.set(scale, scale, scale);

            model.position.set(0, 0, 0); 

            player.add(model);

            scene.add(player);
        },
        xhr => {
            console.log(`Player model: ${(xhr.loaded / xhr.total) * 100}% loaded`);
        },
        err => {
            console.error("Failed to load player model", err);
        }
    );
}

export function loadPlayerSprite(scene, shipUrl, glowUrl) {
    const textureLoader = new THREE.TextureLoader();

    // Ship sprite
    const shipTexture = textureLoader.load(shipUrl);
    const shipMaterial = new THREE.SpriteMaterial({ map: shipTexture, transparent: true });
    const ship = new THREE.Sprite(shipMaterial);
    ship.scale.set(2, 2, 1); // adjust size as you want
    player.add(ship);

    // glow of engine
    const glowTexture = new THREE.TextureLoader().load(glowUrl);
    const spriteMat = new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        opacity: 0.8
    });
    const glow = new THREE.Sprite(spriteMat);
    glow.scale.set(1, 1, 1);
    glow.position.set(0, 0, 1.2); // tweak based on your model

    player.add(glow);

    scene.add(player);
}

export function addPlayer(scene) {
    // Main Body
    const bodyGeo = new THREE.ConeGeometry(0.5, 2, 8);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x00ffff, roughness: 0.4, metalness: 0.8 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.x = Math.PI / 2;
    body.rotation.z = Math.PI;
    player.add(body);

    // Wings
    const wingGeo = new THREE.BoxGeometry(2, 0.1, 1);
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x0088aa, roughness: 0.4 });
    const wings = new THREE.Mesh(wingGeo, wingMat);
    wings.position.z = 0.5;
    player.add(wings);

    // Engine Glow
    const engineGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const engineMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const engine = new THREE.Mesh(engineGeo, engineMat);
    engine.position.z = 1;
    player.add(engine);

    // Engine Light
    const engineLight = new THREE.PointLight(0x00ffff, 1, 10);
    engineLight.position.set(0, 0, 1.5);
    player.add(engineLight);

    scene.add(player);
}
