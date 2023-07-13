import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { Water } from 'three/examples/jsm/objects/Water.js';

import { Sky } from 'three/examples/jsm/objects/Sky.js';

let scene_selector = document.getElementById('scene-input')

if (scene_selector.innerText == "rain"){

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

// sets fixed size. ideal would be that all containers are responsive and the size is updated according to current width
//const camera = new THREE.PerspectiveCamera(70, 1000 / 500, 0.1, 1000);
//renderer.setSize(1000, 500);
let container = document.getElementById('canvas-container');
const camera = new THREE.PerspectiveCamera(70, container.offsetWidth / container.offsetHeight, 0.1, 1000);
renderer.setSize(container.offsetWidth, container.offsetHeight);


container.appendChild(renderer.domElement);

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
  
    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  
      // update any render target sizes here
    }
  }


// Set camera to look straight sidewards
camera.position.x=-20; // Adjust the position as needed
camera.lookAt(0,0,0);

// Set camera to look upwards
// camera.position.y=-20; // Adjust the position as needed
// camera.lookAt(0,0,0);

// Set camera to look straight downwards
// camera.position.y=20; // Adjust the position as needed
// camera.lookAt(0,0,0);

camera.position.set(10, 0, 0); // Adjust the position as needed
camera.rotation.set(20, 20, 2);


//set camera to look 45 degrees upward
camera.position.z = 1;
camera.rotation.x = 0.9;
camera.rotation.y = -0.12;
camera.rotation.z = 0.27;

const controls = new OrbitControls( camera, renderer.domElement );

const loader = new GLTFLoader();
//loader.load(
 //   'treehouse.glb',
 //   function ( gltf ) {
//
//		scene.add( gltf.scene );
//
//
//		gltf.asset; // Object
//
//	},
//)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Adjust the intensity as needed
scene.add(ambientLight);

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );


// Create the raindrop geometry
function createRaindrops() {
  const raindropGeometry = new THREE.BufferGeometry();
  const raindropVertices = [];
  for (let i = 0; i < 100000; i++) {
    const x = (Math.random() - 0.5) * 100;
    const y = Math.random() * 100;
    const z = (Math.random() - 0.5) * 100;
    raindropVertices.push(x, y, z);
  }
  raindropGeometry.setAttribute('position', new THREE.Float32BufferAttribute(raindropVertices, 3));
  return raindropGeometry;
}



let raindropGeometry = createRaindrops();

// Create the raindrop material
const raindropMaterial = new THREE.PointsMaterial({ color: 0x77aaff, size: 0.05 });

// Create the raindrops
const raindrops = new THREE.Points(raindropGeometry, raindropMaterial);
scene.add(raindrops);
let colorInput = document.getElementById('color-input');
let hexCode = colorInput.innerHTML;

function updateRaindrops() {
    colorInput = document.getElementById('color-input');
    hexCode = colorInput.innerHTML;
    let test = 0xff0000
    const color2 = new THREE.Color( hexCode );

  // Update the raindrop material color
    raindropMaterial.color.set(color2);
    const positions = raindropGeometry.attributes.position.array;
    const count = positions.length / 3;
  
    for (let i = 0; i < count; i++) {
      const index = i * 3;
      positions[index + 1] -= 0.75; // Move raindrop downwards
  
      if (positions[index + 1] < -10) {
        // Reset raindrop position if it has moved through
        positions[index + 1] = Math.random() * 100; // Adjust the spawn range as needed
      }
    }
  
    raindropGeometry.attributes.position.needsUpdate = true;
  }
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
  
    updateRaindrops();
    
  
    renderer.render(scene, camera);
  }
  
  // Start the animation loop
  animate();
} else if (scene_selector.innerText == "ocean"){


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
                waterColor: 0x001E0F,
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

} else {
    // Set up the scene
    const scene = new THREE.Scene();

// Set up the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

// Set up the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    let container = document.getElementById('canvas-container');
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    const snowflakes = [];
    const snowflakeCount = 1000;

// Create snowflake geometry and material
    const snowflakeGeometry = new THREE.CircleGeometry(0.05, 6);
    const snowflakeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial);
        snowflake.position.set(
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5
        );
        snowflakes.push(snowflake);
        scene.add(snowflake);
    }

// Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Update snowflake positions
        snowflakes.forEach((snowflake) => {
            snowflake.position.y -= Math.random() * 0.05; // Adjust the falling speed as needed

            // Reset snowflake position if it falls below a certain threshold
            if (snowflake.position.y < -5) {
                snowflake.position.y = 5;
            }
        });

        renderer.render(scene, camera);
    }

    animate();

}