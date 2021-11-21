// USED PREVIOUSLY TO IMPORT VERTEX SHADERS
import * as THREE from './three.module';
import { MapControls, OrbitControls } from './OrbitControls.js';
//import vertexShader from '../shaders/vertex.glsl';

//Fancy trick that allows a function to become global

window.execute3d = function (object) {
    const canvasContainer = document.querySelector('#object');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75,canvasContainer.offsetWidth / canvasContainer.offsetHeight,0.1,1000);
    const renderer = new THREE.WebGLRenderer({
        //Applying Anti-aliasing
        antialias: true,
        canvas: document.querySelector('canvas'),
        // Alpha allows the background to be transparent ESSENTIAL
        alpha: true
    });

    renderer.setSize(canvasContainer.offsetWidth,canvasContainer.offsetHeight);

    //Adapting Pixel ratio to screen

    renderer.setPixelRatio(window.devicePixelRatio);

    // USED PREVIOUSLY TO GENERATE CANVAS

    //document.body.appendChild(renderer.domElement);

    // Sphere Creation

    //                                        Radius / Polygon Width / Poligon Height
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(5,50,50), new THREE.MeshBasicMaterial({
        //Loading planet texture
        map: new THREE.TextureLoader().load('../models/'+object+'.jpg')
        //vertexShader: ,
        //fragmentShader: 
    }));

    // Add the sphere to the scene
    scene.add(sphere);

    // Position the camera
    camera.position.z = 8.3;

    // OrbitControls allows you to move the camera around the object, since that would be easier than moving the object itself
    //var controls = new OrbitControls(camera, renderer.domElement);


    //controls.enablePan = false;
    //controls.enableZoom = false;


    // Update on window resize (it doesn't do it automatically)
    window.onresize = function () {

        camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( canvasContainer.offsetWidth, canvasContainer.offsetHeight );

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

}