			var camera, scene, renderer;
			var mesh;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 70, 1, 1, 1000 );
				camera.position.z = 400;

				scene = new THREE.Scene();

				var texture = THREE.ImageUtils.loadTexture( 'imgs/problem-solving.jpg' );

				var geometry = new THREE.BoxGeometry( 200, 200, 200 );
				var material = new THREE.MeshBasicMaterial( { map: texture } );

				mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );

				renderer = new THREE.WebGLRenderer({canvas:document.getElementById("3DCanvas"), alpha: true });
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = 1;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				mesh.rotation.x += 0.005;
				mesh.rotation.y += 0.01;

				renderer.render( scene, camera );

			}
