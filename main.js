/****------------ Creating Texture for box----------------------------------- */
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 16;
canvas.height = 16;

var gradient = context.createLinearGradient(0,0,8,0);
gradient.addColorStop(0, "#ff3737");
gradient.addColorStop(1, "#3884ff");
context.fillStyle = gradient;
context.fillRect(0,0,canvas.width, canvas.height);
/**---------------------------------------------------------------------- */

//Initializing THREE.js
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x555555);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var texture = new THREE.CanvasTexture(canvas);

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setClearColor(0xffffff, 0);
renderer.setSize( window.innerWidth, window.innerHeight );


var controls = new THREE.OrbitControls(camera, renderer.domElement);

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { map: texture, transparent: true, opacity: 0.5 } );

var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 3;


function animate() {
    controls.update();
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();


document.body.appendChild( renderer.domElement );
