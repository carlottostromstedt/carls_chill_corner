import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Water } from 'three/examples/jsm/objects/Water.js';

import { Sky } from 'three/examples/jsm/objects/Sky.js';

function SceneManager(canvas) {

    const scene = buildScene();
    const renderer = buildRenderer(canvas);
    const camera = buildCamera();
    const sphere = buildSphere();
    const sky = buildSky();
    const sun = buildSun();
    const water = buildWater();
    const orbitCon = setOrbitControls();

    const canvas = document.getElementById("canvas-container");
    const sceneManager = new SceneManager(canvas);
    function buildScene() {
        const scene = new THREE.Scene();
        return scene;
    }

    function buildCamera() {
        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
        camera.position.set(30, 30, 100);
        return camera;
    }

    function buildRenderer(canvas) {
        const renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvas.appendChild(renderer.domElement);
        return renderer;
    }

    function buildSky() {
        const sky = new Sky();
        sky.scale.setScalar(10000);
        scene.add(sky);
        return sky;
    }

    function buildSun() {
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const sun = new THREE.Vector3();

        // Defining the x, y and z value for our 3D Vector
        const theta = Math.PI * (0.49 - 0.5);
        const phi = 2 * Math.PI * (0.205 - 0.5);
        sun.x = Math.cos(phi);
        sun.y = Math.sin(phi) * Math.sin(theta);
        sun.z = Math.sin(phi) * Math.cos(theta);

        sky.material.uniforms['sunPosition'].value.copy(sun);
        scene.environment = pmremGenerator.fromScene(sky).texture;
        return sun;
    }

    function buildWater() {
        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
        const water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load('', function ( texture ) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                }),
                alpha: 1.0,
                sunDirection: new THREE.Vector3(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: scene.fog !== undefined
            }
        );
        water.rotation.x =- Math.PI / 2;
        scene.add(water);

        const waterUniforms = water.material.uniforms;
        return water;
    }

    function buildSphere() {
        const geometry = new THREE.SphereGeometry(20, 20, 20);
        const material = new THREE.MeshStandardMaterial({color: 0xfcc742});

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        return sphere;
    }

    function setOrbitControls() {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.495;
        controls.target.set(0, 10, 0);
        controls.minDistance = 40.0;
        controls.maxDistance = 200.0;
        controls.update();
        return controls;
    }

    this.update = function() {
        // Animates our water
        water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

        // Reposition our sphere to appear to float up and down
        const time = performance.now() * 0.001;
        sphere.position.y = Math.sin( time ) * 2;
        sphere.rotation.x = time * 0.3;
        sphere.rotation.z = time * 0.3;

        // Finally, render our scene
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

}



function animate() {
    requestAnimationFrame(animate);
    sceneManager.update();
}
animate();