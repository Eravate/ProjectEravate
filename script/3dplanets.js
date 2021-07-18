import * as THREE from './three.module';
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

scene.add(sphere);

camera.position.z = 10.6;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
};

animate();