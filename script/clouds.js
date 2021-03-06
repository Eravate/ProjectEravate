let scene, camera, cloudParticles = [],composer;
const canvasContainer = document.querySelector('#object');

function initClouds() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60,canvasContainer.offsetWidth / canvasContainer.offsetHeight,1,1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    let ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0xff8c19);
    directionalLight.position.set(0,0,1);
    scene.add(directionalLight);

    let purpleLight = new THREE.PointLight(0x8B008B,50,450,1.7);
    purpleLight.position.set(200,300,100);
    scene.add(purpleLight);
    let corsaLight = new THREE.PointLight(0xCC0000,50,450,1.7);
    corsaLight.position.set(100,300,100);
    scene.add(corsaLight);
    let blueLight = new THREE.PointLight(0x0000CC,50,450,1.7);
    blueLight.position.set(300,300,200);
    scene.add(blueLight);

    /*let orangeLight = new THREE.PointLight(0xccaa2d,50,450,1.7);
    orangeLight.position.set(200,300,100);
    scene.add(orangeLight);
    let purpleLight = new THREE.PointLight(0x8B008B,50,450,1.7);
    purpleLight.position.set(100,300,100);
    scene.add(purpleLight);
    let blueLight = new THREE.PointLight(0x2daacc,50,450,1.7);
    blueLight.position.set(300,300,200);
    scene.add(blueLight);*/

    const renderer = new THREE.WebGLRenderer({
        //Applying Anti-aliasing
        antialias: true,
        canvas: document.querySelector('canvas'),
        // Alpha allows the background to be transparent ESSENTIAL
        alpha: true
    });
    renderer.setSize(canvasContainer.offsetWidth,canvasContainer.offsetHeight);
    scene.fog = new THREE.FogExp2(0x121212, 0.001);
    renderer.setClearColor(scene.fog.color);

    let loader = new THREE.TextureLoader();

    loader.load("icons/smoke.png", function(texture){
        cloudGeo = new THREE.PlaneBufferGeometry(500,500);
        cloudMaterial = new THREE.MeshLambertMaterial({
        map:texture,
        transparent: true
        });

        for(let p=0; p<50; p++) {
        let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.set(
            Math.random()*800 -400,
            500,
            Math.random()*500-500
        );
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random()*2*Math.PI;
        cloud.material.opacity = 0.55;
        cloudParticles.push(cloud);
        scene.add(cloud);
        }
    });

    loader.load("icons/stars.jpg", function(texture){

        const textureEffect = new POSTPROCESSING.TextureEffect({
        blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
        texture: texture
        });
        textureEffect.blendMode.opacity.value = 0.2;

        const bloomEffect = new POSTPROCESSING.BloomEffect({
            blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
            kernelSize: POSTPROCESSING.KernelSize.SMALL,
            useLuminanceFilter: true,
            luminanceThreshold: 0.3,
            luminanceSmoothing: 0.75
            });
        bloomEffect.blendMode.opacity.value = 1.5;

        let effectPass = new POSTPROCESSING.EffectPass(
        camera,
        bloomEffect,
        textureEffect
        );
        effectPass.renderToScreen = true;

        composer = new POSTPROCESSING.EffectComposer(renderer);
        composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
        composer.addPass(effectPass);
        
        render();
    });

    window.onresize = function () {

        camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( canvasContainer.offsetWidth, canvasContainer.offsetHeight );

    };
}

function render() {
    cloudParticles.forEach(p => {
        p.rotation.z -=0.001;
    });
    composer.render(0.1);
    requestAnimationFrame(render);
}