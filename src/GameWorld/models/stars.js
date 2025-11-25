export const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
export const starGeo = new THREE.BufferGeometry();
export const stars = new THREE.Points(starGeo, starMat);

export function addStars(scene) {
    const starCount = 2000;
    const starPos = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
        starPos[i] = (Math.random() - 0.5) * 200;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

    scene.add(stars);
}