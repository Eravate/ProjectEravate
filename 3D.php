<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>My first three.js app</title>
		<style>
			body { margin: 0; }
		</style>
	</head>
	<body>
		<script src="script/three.js"></script>
        <script type="module" src="script/GLTFLoader.js"></script>
        <script type="module" src="script/OrbitControls.js"></script>
		<script  type="module">
            import { GLTFLoader } from './script/GLTFLoader.js';

            let scene;
            let camera;
            let hlight;
            let renderer;
            let planet;
            let directionalLight;
            let light;
            let light2;
            let light3;
            let light4;
            let controls;
            let hemiLight;

            function init() {
                scene = new THREE.Scene();
                scene.background= new THREE.Color(0x000000);

                camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,5000);
                camera.position.set( 0, 0, 3 );

                hlight = new THREE.AmbientLight (0xffffff,1.5 );
                scene.add(hlight);

                //scene.add(new THREE.AxesHelper(500));
                //const light = new THREE.PointLight( 0xff0000, 1, 100 );
                //light.position.set( 50, 50, 50 );
                //scene.add( light );

                
                scene.add( camera ); // required in this case since the camera will have a child


                renderer = new THREE.WebGLRenderer({antialias:true});
                renderer.setSize(window.innerWidth,window.innerHeight);
                document.body.appendChild(renderer.domElement);
                
                controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.minDistance=2;
                
                let loader = new GLTFLoader();
                loader.load('models/neptune/neptune.gltf', function(gltf){
                    
                    scene.add(gltf.scene);
                    renderer.render(scene,camera);
                    animate();
                })
            }
            function animate() {
                renderer.render(scene,camera);
                requestAnimationFrame(animate);
            }
            init();
            /*scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			const animate = function () {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

			animate();*/
		</script>
	</body>
</html>