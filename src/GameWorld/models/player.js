import * as THREE from 'three';
import { textureLoader, modelLoader } from "./loaders.js";

export const player = new THREE.Group();

// export function addPlayer(scene, { modelUrl = '', spriteUrl = '', modelScale = 0.3, spriteScale = 1.5 }) {
//     modelLoader.load(
//         modelUrl,
//         gltf => {
//             const model = gltf.scene;

//             model.rotation.x = 0;
//             model.rotation.y = Math.PI;

//             // Optional: adjust pitch if it's nose-up/down
//             // model.rotation.x = -Math.PI / 2;

//             model.scale.set(modelScale, modelScale, modelScale);
//             model.position.set(0, 0, 0);

//             player.add(model);

//             const texture = textureLoader.load(spriteUrl);
//             const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
//             const sprite = new THREE.Sprite(material);
//             sprite.scale.set(spriteScale, spriteScale, spriteScale);
//             sprite.position.set(0, 0, 1);

//             player.add(sprite);
//             scene.add(player);
//         },
//         xhr => {
//             // console.log(`Player model: ${(xhr.loaded / xhr.total) * 100}% loaded`);
//         },
//         err => {
//             console.error("Failed to load player model", err);
//         }
//     );
// }

export function addPlayer(scene) {
    // Balls
    const ballGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const ballMat = new THREE.MeshStandardMaterial({ color: 0xcc8866, roughness: 0.5 });

    const leftBall = new THREE.Mesh(ballGeo, ballMat);
    const rightBall = new THREE.Mesh(ballGeo, ballMat);

    // Balls hang downward along -Z
    const BALL_OFFSET_Z = -1.0;

    leftBall.position.set(-0.35, 0, BALL_OFFSET_Z);
    rightBall.position.set(0.35, 0, BALL_OFFSET_Z);

    player.add(leftBall);
    player.add(rightBall);

    // Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.28, 0.32, 2.6, 16);
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0xddaa88, roughness: 0.3 });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);

    shaft.rotation.x = Math.PI / 2;
    shaft.position.z = 0.9;

    player.add(shaft);

    // Head
    const headGeo = new THREE.SphereGeometry(0.32, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const headMat = shaftMat.clone();
    headMat.color.set(0xffccaa);

    const head = new THREE.Mesh(headGeo, headMat);
    head.position.z = 2.4;

    player.add(head);

    // ==========================
    // ADVANCED PUBES (SPHERE-ALIGNED)
    // ==========================
    const pubeGeo = new THREE.BoxGeometry(0.02, 0.02, 0.25);
    const pubeMat = new THREE.MeshStandardMaterial({ color: 0x332211 });

    const BALL_RADIUS = 0.45;
    const PUBE_COUNT = 120; // 60 per ball — tweak this

    const balls = [
        new THREE.Vector3(-0.35, 0, BALL_OFFSET_Z),
        new THREE.Vector3(0.35, 0, BALL_OFFSET_Z)
    ];

    for (let b = 0; b < balls.length; b++) {
        const center = balls[b];

        for (let i = 0; i < PUBE_COUNT / 2; i++) {

            // Random point on sphere surface (uniform)
            const u = Math.random();
            const v = Math.random();

            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);

            const x = BALL_RADIUS * Math.sin(phi) * Math.cos(theta);
            const y = BALL_RADIUS * Math.sin(phi) * Math.sin(theta);
            const z = BALL_RADIUS * Math.cos(phi);

            // Surface point
            const p = new THREE.Vector3(center.x + x, center.y + y, center.z + z);

            // Outward direction (normal)
            const normal = new THREE.Vector3(x, y, z).normalize();

            // Slight offset so hair doesn’t clip inside ball
            p.addScaledVector(normal, 0.05);

            const pube = new THREE.Mesh(pubeGeo, pubeMat);

            pube.position.copy(p);

            // Orient the pube to face outward from the ball
            const target = new THREE.Vector3().addVectors(pube.position, normal);
            pube.lookAt(target);

            // Add random twist
            pube.rotation.z += (Math.random() - 0.5) * 0.6;

            player.add(pube);
        }
    }

    // Face the camera
    player.rotation.y = Math.PI;

    scene.add(player);
}


// export function addPlayer(scene) {
//     // Main Body
//     const bodyGeo = new THREE.ConeGeometry(0.5, 2, 8);
//     const bodyMat = new THREE.MeshStandardMaterial({ color: 0x00ffff, roughness: 0.4, metalness: 0.8 });
//     const body = new THREE.Mesh(bodyGeo, bodyMat);
//     body.rotation.x = Math.PI / 2;
//     body.rotation.z = Math.PI;
//     player.add(body);

//     // Wings
//     const wingGeo = new THREE.BoxGeometry(2, 0.1, 1);
//     const wingMat = new THREE.MeshStandardMaterial({ color: 0x0088aa, roughness: 0.4 });
//     const wings = new THREE.Mesh(wingGeo, wingMat);
//     wings.position.z = 0.5;
//     player.add(wings);

//     // Engine Glow
//     const engineGeo = new THREE.SphereGeometry(0.3, 16, 16);
//     const engineMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
//     const engine = new THREE.Mesh(engineGeo, engineMat);
//     engine.position.z = 1;
//     player.add(engine);

//     // Engine Light
//     const engineLight = new THREE.PointLight(0x00ffff, 1, 10);
//     engineLight.position.set(0, 0, 1.5);
//     player.add(engineLight);

//     scene.add(player);
// }
