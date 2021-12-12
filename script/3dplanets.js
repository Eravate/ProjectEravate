// USED PREVIOUSLY TO IMPORT VERTEX SHADERS
import gsap from './gsap-core'
import * as THREE from './three.module';
import { MapControls, OrbitControls } from './OrbitControls.js';
import {ObjectControls} from './ObjectControls.js';
//import vertexShader from '../shaders/vertex.glsl';

//Fancy trick that allows a function to become global

window.execute3d = function (object) {
    const canvasContainer = document.querySelector('#object');
    var deltaX = 0, deltaY = 0;
    var mousePrevX = 0, mousePrevY = 0, deltaCurrentX = 0, deltaCurrentY = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75,canvasContainer.offsetWidth / canvasContainer.offsetHeight,0.1,1000);
    const renderer = new THREE.WebGLRenderer({
        //Applying Anti-aliasing
        antialias: true,
        canvas: document.querySelector('canvas'),
        // Alpha allows the background to be transparent ESSENTIAL
        alpha: true
    });
    
    var mouseDown = false;

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
    //scene.add(sphere);

    const group = new THREE.Group();

    group.add(sphere);

    scene.add(group);

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

    const mouse = {
        x: 0,
        y: 0
    };

    /* This was used for adding stars to the background, but it ended up looking quite not that nice
    const starGeometry = new THREE.BufferGeometry();
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
        sphere.rotation.y += 0.0010; 
        sphere.rotation.x += 0.0005;
        //group.rotation.y += deltaX * 0.00005;
        //group.rotation.x += deltaY * 0.00005;
        gsap.to(group.rotation, {
            y: deltaCurrentX,
            x: deltaCurrentY,
            duration: 1
        });
    };

    animate();

    // Since there isn't a mouse drag, I needed to create 3 event listeners

    // ON MOUSE DOWN Returns the object to its original rotation

    addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        mouseDown = true;
        mouse.x = evt.clientX;
        mouse.y = evt.clientY;
        /*mousePrevX = sphere.rotation.x;
        mousePrevY = sphere.rotation.y;*/
        //deltaX = evt.clientX - mouse.x + mousePrevX;
        //deltaY = evt.clientY - mouse.y + mousePrevY;
    }, false);

    // ON MOUSE MOVE can amplify the objects rotation

    addEventListener('mousemove', function (evt) {
        if (!mouseDown) {return}
        //mouse.x = (evt.clientX / canvasContainer.offsetWidth) * 2 - 1;
        //mouse.y = (evt.clientY / canvasContainer.offsetHeight) * 2 + 1;
        deltaX = evt.clientX - mouse.x + mousePrevX;
        deltaY = evt.clientY - mouse.y + mousePrevY;
        evt.preventDefault;
        deltaCurrentX += deltaX * 0.00005;
        deltaCurrentY += deltaY * 0.00005;
    }, false);

    // ON MOUSE UP Stores the previous rotation to counteract it later on

    addEventListener('mouseup', function (evt) {
        
        evt.preventDefault();
        mousePrevX = 0;
        mousePrevY = 0;
        mouseDown = false;
    }, false);
}

// For anyone wondering, getting the right variables for rotation took literal FUCKING DAYS