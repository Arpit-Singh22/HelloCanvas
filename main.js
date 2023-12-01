import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// console.log(OrbitControls);
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);

// adding directional light

const color = 0xffffff;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

// const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

// const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

// scene.add(cubeMesh);

function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({ color });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x;
  return cube;
}

const cubes = [
  makeInstance(geometry, 0x44aa88, 0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844, 2),
];

//initialize the camera
const fov = 75; // radian
const aspectRatio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 30;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

//position the camera
camera.position.z = 5;

//initialize the rederer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight, false);
// renderer.render(scene, camera);

// function render(time) {
//   time *= 0.001; // convert time to seconds

//   cubeMesh.rotation.x = time;
//   cubeMesh.rotation.y = time;

//   renderer.render(scene, camera);

//   requestAnimationFrame(render);
// }
// requestAnimationFrame(render);

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

function render(time) {
  time *= 0.001; // convert time to seconds
  controls.update();
  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * 0.1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
}
// requestAnimationFrame(render);
render();
