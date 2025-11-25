export function addFog(scene){
    scene.fog = new THREE.FogExp2(0x000000, 0.02);
}