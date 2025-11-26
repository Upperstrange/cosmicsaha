import {collectibleMat} from "../models/collectibles.js";
import {obstacleMat} from "../models/obstacles.js";
import { obstacles, collectibles, particles } from "../constants.js";
import { scene } from "../world.js";
import * as THREE from 'three';

export const renderActions = {
    spawnCollectible() {
        const geo = new THREE.SphereGeometry(0.3, 16, 16);
        const mesh = new THREE.Mesh(geo, collectibleMat);

        mesh.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 6,
            -50 - Math.random() * 20
        );

        const light = new THREE.PointLight(0x00ff00, 1, 5);
        mesh.add(light);

        scene.add(mesh);
        collectibles.push(mesh);
    },
    spawnObstacle() {
        const geo = new THREE.DodecahedronGeometry(Math.random() * 0.5 + 0.3, 0);
        const mesh = new THREE.Mesh(geo, obstacleMat);

        mesh.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 6,
            -50 - Math.random() * 20
        );

        mesh.userData = {
            rotX: Math.random() * 0.05,
            rotY: Math.random() * 0.05
        };

        scene.add(mesh);
        obstacles.push(mesh);
    },
    createExplosion(position, color) {
        for (let i = 0; i < 10; i++) {
            const geo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
            const mat = new THREE.MeshBasicMaterial({ color: color });
            const part = new THREE.Mesh(geo, mat);

            part.position.copy(position);

            part.userData = {
                vel: new THREE.Vector3(
                    (Math.random() - 0.5),
                    (Math.random() - 0.5),
                    (Math.random() - 0.5)
                ),
                life: 1.0
            };

            scene.add(part);
            particles.push(part);
        }

    },
}