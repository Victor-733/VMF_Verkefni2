var scene = new THREE.Scene(); // búa til scene

// búa til camera sem er með (FOV, svæði, near & far plane)
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// búa til renderer sem að renderar scene-ið okkar
var renderer = new THREE.WebGLRenderer( {antialias: true}); // antialias gerir útlínurnar ekki eins grófar
renderer.setClearColor("#e5e5e5"); // bakgrunnslitur
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => { // event listener sem að rezise-ar scene-ið ef að glugginn breytist
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

renderer.render(scene, camera);

var geometry = new THREE.BoxGeometry(1, 1, 1); // búa til shape
var material = new THREE.MeshLambertMaterial({color: 0xFFBACA}); // búa til material (MeshLambertMaterial)
var mesh = new THREE.Mesh(geometry, material); // blanda forminu og material Í mesh

scene.add(mesh);

var light = new THREE.PointLight(0xFFFFFF, 1, 500); // búa til ljós sem hefur (lit, intensity, distance)
light.position.set(10, 0, 25); // staðsetning á ljósinu
scene.add(light);

var render = function() { // teiknar scene-ið alltaf aftur um leið og glugginn er breyttur eða refreshaður
    requestAnimationFrame(render);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

render();

renderer.render(scene, camera);