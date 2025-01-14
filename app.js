// Set up Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#threeCanvas'),
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("grey", 0.95); // Dark background with slight transparency

// Create geometric shapes
const geometry1 = new THREE.TorusGeometry(1, 0.4, 16, 100);
const geometry2 = new THREE.OctahedronGeometry(1.2);
const geometry3 = new THREE.IcosahedronGeometry(1);
const geometry4 = new THREE.DodecahedronGeometry(0.8);
const geometry5 = new THREE.TetrahedronGeometry(0.9);
const geometry6 = new THREE.TorusKnotGeometry(0.7, 0.2, 100, 16);

// Create materials with different colors and shininess
const material1 = new THREE.MeshPhongMaterial({ color: 0x52c7fd, shininess: 100 });
const material2 = new THREE.MeshPhongMaterial({ color: 0x420177, shininess: 100 });
const material3 = new THREE.MeshPhongMaterial({ color: 0x2b3dda, shininess: 100 });
const material4 = new THREE.MeshPhongMaterial({ color: 0xff0055, shininess: 100 });
const material5 = new THREE.MeshPhongMaterial({ color: 0x00ff88, shininess: 100 });
const material6 = new THREE.MeshPhongMaterial({ color: 0xffaa00, shininess: 100 });

// Create meshes
const torus = new THREE.Mesh(geometry1, material1);
const octahedron = new THREE.Mesh(geometry2, material2);
const icosahedron = new THREE.Mesh(geometry3, material3);
const dodecahedron = new THREE.Mesh(geometry4, material4);
const tetrahedron = new THREE.Mesh(geometry5, material5);
const torusKnot = new THREE.Mesh(geometry6, material6);

// Position shapes randomly in 3D space
function randomPosition() {
    return (Math.random() - 0.5) * 10;
}

torus.position.set(randomPosition(), randomPosition(), randomPosition());
octahedron.position.set(randomPosition(), randomPosition(), randomPosition());
icosahedron.position.set(randomPosition(), randomPosition(), randomPosition());
dodecahedron.position.set(randomPosition(), randomPosition(), randomPosition());
tetrahedron.position.set(randomPosition(), randomPosition(), randomPosition());
torusKnot.position.set(randomPosition(), randomPosition(), randomPosition());

// Add shapes to scene
scene.add(torus);
scene.add(octahedron);
scene.add(icosahedron);
scene.add(dodecahedron);
scene.add(tetrahedron);
scene.add(torusKnot);

// Enhanced lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xff0000, 1, 100);
pointLight1.position.set(5, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x00ff00, 1, 100);
pointLight2.position.set(-5, -5, 5);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0x0000ff, 1, 100);
pointLight3.position.set(0, 0, -5);
scene.add(pointLight3);

// Position camera
camera.position.z = 15;

// Animation loop with varied rotation speeds
function animate() {
    requestAnimationFrame(animate);

    // Rotate shapes with different speeds
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.02;
    
    octahedron.rotation.x += 0.02;
    octahedron.rotation.y += 0.01;
    
    icosahedron.rotation.x += 0.015;
    icosahedron.rotation.y += 0.015;

    dodecahedron.rotation.x += 0.02;
    dodecahedron.rotation.z += 0.01;

    tetrahedron.rotation.y += 0.025;
    tetrahedron.rotation.z += 0.01;

    torusKnot.rotation.x += 0.02;
    torusKnot.rotation.y += 0.02;

    // Animate lights
    const time = Date.now() * 0.001;
    pointLight1.position.x = Math.sin(time) * 5;
    pointLight2.position.y = Math.cos(time) * 5;

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();
