let scene = new THREE.Scene(); // búa til scene

// búa til camera sem er með (FOV, svæði, near & far plane)
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// búa til renderer sem að renderar scene-ið okkar
let renderer = new THREE.WebGLRenderer( {antialias: true}); // antialias gerir útlínurnar ekki eins grófar
renderer.setClearColor("#e5e5e5"); // bakgrunnslitur
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => { // event listener sem að rezise-ar scene-ið ef að glugginn breytist
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

renderer.render(scene, camera);

let group = new THREE.Object3D();
let geometry = new THREE.BoxGeometry(1, 1, 1); // búa til shape
let geometry2 = new THREE.BoxGeometry(0.7, 0.7, 0.7);
let geometry3 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
let material = new THREE.MeshLambertMaterial({color: 0xFFBACA}); // búa til material (MeshLambertMaterial)
let mesh = new THREE.Mesh(geometry, material); // blanda forminu og material Í mesh
let mesh2 = new THREE.Mesh(geometry2, material);
let mesh3 = new THREE.Mesh(geometry3, material);

group.add(mesh);
group.add(mesh2);
group.add(mesh3); // adda kössum í grúppuna

scene.add(group); // adda grúpunni í scene-ið

mesh2.position.y = 0.8;
mesh3.position.y = 1.4;

let light = new THREE.PointLight(0xFFFFFF, 1, 500); // búa til ljós sem hefur (lit, intensity, distance)
light.position.set(10, 0, 25); // staðsetning á ljósinu
scene.add(light);

let directionX = 0.01;
let directionY = 0.01;

let render = function() { // teiknar scene-ið alltaf aftur um leið og glugginn er breyttur eða refreshaður
    requestAnimationFrame(render);
    group.rotation.x += directionX; // kubburinn snýst
    group.rotation.y += directionY;
    renderer.render(scene, camera);
}

render();

document.body.addEventListener('click', switchDirections);

function switchDirections() {
    directionX = -directionX; // ef maður ýtir á skjáinn þá breytist kubburinn um átt
    directionY = -directionY;
}