import * as THREE from './three.module';
import { MapControls, OrbitControls } from './OrbitControls.js';
//import vertexShader from '../shaders/vertex.glsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,innerWidth / innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
    //Applying Anti-aliasing
    antialias: true
});
renderer.setSize(innerWidth,innerHeight);
//Adapting Pixel ratio to screen
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Sphere Creation
//                                        Radius / Polygon Width / Poligon Height
const sphere = new THREE.Mesh(new THREE.SphereGeometry(5,50,50), new THREE.MeshBasicMaterial({
    //Loading planet texture
    map: new THREE.TextureLoader().load('../models/earth/earth8k.jpg')
    //vertexShader: ,
    //fragmentShader: 
}));

// Add the sphere to the scene
scene.add(sphere);

// Position the camera
camera.position.z = 10.6;

// OrbitControls allows you to move the camera around the object, since that would be easier than moving the object itself
//var controls = new OrbitControls(camera, renderer.domElement);


//controls.enablePan = false;
//controls.enableZoom = false;


// Update on window resize (it doesn't do it automatically)
window.onresize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

};

/*const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
});

const starVertices = []
for (let i=0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 2000
    const z = -Math.random() * 1000
    starVertices.push(x,y,z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

const stars = new THREE.Points(
    starGeometry, starMaterial
);

scene.add(stars);*/

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    // Used for slow rotation of the planet in X and Y axis
    sphere.rotation.y += 0.0005
    sphere.rotation.x += 0.0002
};

animate();