const blue = "#3884ff";
const red = "#ff3737";

/****------------ Creating Texture for box----------------------------------- */
/*var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 16;
canvas.height = 16;

var gradient = context.createLinearGradient(0,-1,5,0);
gradient.addColorStop(0, red);
gradient.addColorStop(1, blue);
//blue:3884ff
context.fillStyle = gradient;
context.fillRect(0,0,canvas.width, canvas.height);*/
/**---------------------------------------------------------------------- */


var points = [{x:1, y:1, z:1, val: 25}, {x:0, y:0, z:0, val: 25}, {x:1, y:0, z:1, val: 25}];


//Initializing THREE.js
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x555555);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//var texture = new THREE.CanvasTexture(canvas);

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setClearColor(0xffffff, 0);
renderer.setSize( window.innerWidth, window.innerHeight );


//translating the points from 3d cordinates to coordinates on a plane.
var flatPoints = {"right":[], "left": [], "top": [], "bottom": [], "front": [], "back": []};
points.forEach(function(point){
	if(point.z == 1){
		//back
		flatPoints.back.push({x: 1-point.x, y: point.y});
	}else if(point.z == 0){
		//front
		flatPoints.front.push({x: point.x, y: point.y})
	}
	if(point.x == 1){
		//right
		flatPoints.right.push({x: point.z, y: point.y});
	}else if(point.x == 0){
		//left
		flatPoints.left.push({x: 1-point.z, y: point.y});
	}
	if(point.y == 1){
		//bottom
		flatPoints.bottom.push({x:point.x, y: point.z})
	}
	else if(point.y == 0){
		//top
		flatPoints.top.push({x: point.x, y: 1-point.z});
	}
});
var materials = [];
let stringslol = ["right", "left", "top", "bottom", "front", "back"];
for(let i = 0; i < 6; i++){
	var face = stringslol[i];
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	canvas.width = 16;
	canvas.height = 16;
	context.fillStyle = "#3884ff"
	context.fillRect(0,0,16,16);
	flatPoints[face].forEach(function(point){
		var grad = context.createRadialGradient(point.x*16, point.y*16, 5, point.x*16, point.y*16, 15);
		grad.addColorStop(0, red);
		grad.addColorStop(1, "rgba(255,255,255,0)");
		context.fillStyle = grad;
		context.fillRect(0,0,16,16);
	});

	var texture = new THREE.CanvasTexture(canvas);

	materials.push(new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.3 }));
}

console.log(materials);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var geometry = new THREE.BoxGeometry( 1.605, 0.9, 1.405 );
//var material = new THREE.MeshBasicMaterial( { map: texture, transparent: true, opacity: 0.3 } );

/** 0: Right, 1: Left, 2: Top, 3: Bottom, 4: Front, 5: back */

var cube = new THREE.Mesh( geometry, materials );
cube.position.set(-0.199,0.44,0.299);
scene.add( cube );

camera.position.z = 3;

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

var loader = new THREE.OBJLoader();
loader.load("124771.obj", function(obj){
	console.log(obj)
	obj.position.set(0,0,0);
	obj.rotation.set(Math.PI/2,0,0);
	obj.scale.set(0.02,0.02,0.02);
	scene.add(obj);
});

function animate() {
    controls.update();
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();


document.body.appendChild( renderer.domElement );
