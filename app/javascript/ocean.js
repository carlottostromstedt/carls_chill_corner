import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Water } from 'three/examples/jsm/objects/Water.js';

import { Sky } from 'three/examples/jsm/objects/Sky.js';



let container;
      let camera, scene, renderer;
      let controls, water, sun, mesh;

      init();
      animate();

      function init() {

        container = document.getElementById( 'canvas-container' );

        //

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        container.appendChild( renderer.domElement );

        //

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
        camera.position.set( 30, 30, 100 );

        //

        sun = new THREE.Vector3();

        // Water

        const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

        water = new Water(
          waterGeometry,
          {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/IanUme/ThreejsTest/master/textures/waternormals.jpg', function ( texture ) {

              texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
          }
        );

        water.rotation.x = - Math.PI / 2;

        scene.add( water );

        // Skybox

        const sky = new Sky();
        sky.scale.setScalar( 10000 );
        scene.add( sky );

        const skyUniforms = sky.material.uniforms;

        skyUniforms[ 'turbidity' ].value = 10;
        skyUniforms[ 'rayleigh' ].value = 2;
        skyUniforms[ 'mieCoefficient' ].value = 0.005;
        skyUniforms[ 'mieDirectionalG' ].value = 0.8;

        const parameters = {
          elevation: 2,
          azimuth: 180
        };

        const pmremGenerator = new THREE.PMREMGenerator( renderer );

        function updateSun() {

          const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
          const theta = THREE.MathUtils.degToRad( parameters.azimuth );

          sun.setFromSphericalCoords( 1, phi, theta );

          sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
          water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

          scene.environment = pmremGenerator.fromScene( sky ).texture;

        }

        updateSun();

        //


        //

        controls = new OrbitControls( camera, renderer.domElement );
        controls.maxPolarAngle = Math.PI * 0.495;
        controls.target.set( 0, 10, 0 );
        controls.minDistance = 40.0;
        controls.maxDistance = 200.0;
        controls.update();

      }

      function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

      }

      function animate() {

        requestAnimationFrame( animate );
        render();
        stats.update();

      }

      function render() {

        const time = performance.now() * 0.001;

        water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

        renderer.render( scene, camera );

      }