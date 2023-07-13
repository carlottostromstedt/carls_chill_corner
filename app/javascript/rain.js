import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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


  
  