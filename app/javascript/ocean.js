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
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 1).normalize();
scene.add(light);

// Create the water plane
const waterGeometry = new THREE.PlaneGeometry(10, 10, 100, 100);

// Custom shader material for water
const waterMaterial = new THREE.ShaderMaterial({
    uniforms: {
        amplitude: { value: 0.4 },
        speed: { value: 0.1 }
    },
    vertexShader: `
    uniform float amplitude;
    uniform float speed;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 transformed = position.xyz;
      transformed.z += sin(transformed.x * speed + transformed.y * speed) * amplitude;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `,
    fragmentShader: `
    varying vec2 vUv;

    void main() {
      gl_FragColor = vec4(0.2, 0.6, 0.8, 0.8);
    }
  `
});

const controls = new OrbitControls( camera, renderer.domElement );

const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI / 2;
scene.add(water);

// Create the skybox
const skyGeometry = new THREE.SphereGeometry(500, 60, 40);
const skyMaterial = new THREE.MeshBasicMaterial({ color: 0xddeeff, side: THREE.BackSide });
const skybox = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skybox);

// Add controls to adjust wave height and speed
const controls = {
    waveHeight: 0.4,
    waveSpeed: 0.1
};

function animate() {
    requestAnimationFrame(animate);

    // Update the water material uniforms for wave animation
    waterMaterial.uniforms.amplitude.value = controls.waveHeight;
    waterMaterial.uniforms.speed.value = controls.waveSpeed;

    renderer.render(scene, camera);
}

animate();

