import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

export const modelLoader = new GLTFLoader();
export const textureLoader = new THREE.TextureLoader();