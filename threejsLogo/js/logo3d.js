var scene = new THREE.Scene(); // búa til scene
var camera = new // búa til camera (aspect ratio, stærð á glugga, near distance, far distance)
    THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer(); // renderer sem að renderar scene
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// basic grænn kubbur
var geometry = new THREE.BoxGeometry( 4, 2, 1 ); // stærðir á x y z ásum fyrir kassann
var material = new THREE.MeshBasicMaterial( { color: 0xfffffff } ); // material sem hann er úr
var cube = new THREE.Mesh( geometry, material );
scene.add( cube ); // bæta við scene-ið

camera.position.z = 5;

function animate() { // animate fall sem að updater á 60fps
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();