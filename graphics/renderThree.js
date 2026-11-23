//
// Three JS (isolated so a failure here can never break the HTML rendering)
//
// import shaders
import { bgVertexShader, bgFragmentShader } from "./shaders/bg.js";
import { defaultPlacement } from "../items/placement.js";
import { noteVertexShader, noteFragmentShader } from "./shaders/note.js";
import { store } from "../store.js";
import { glassMaterial } from "./materials/glassMaterial.js";
import {glassMaterial2 } from "./materials/glassMaterial2.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three/build/three.module.js";
import { RoundedBoxGeometry } from "https://cdn.jsdelivr.net/npm/three/examples/jsm/geometries/RoundedBoxGeometry.js";

const workspace = document.getElementById("workspace");
const threeCanvas = document.getElementById("three-canvas");

const FOV = 45;
const BACKGROUND_Z = -50;

let width = workspace.clientWidth;
let height = workspace.clientHeight;

// Scene
const scene = new THREE.Scene();
//

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: threeCanvas,
  alpha: true,
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
//

// Camera (perspective, 1 world unit == 1 CSS pixel at z = 0)
function cameraDistance(h) {
  return h / (2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
}
const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 5000);
camera.position.z = cameraDistance(height);
scene.add(camera);
//

// Background: gradient + grid
const backgroundMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uResolution: { value: new THREE.Vector2(width, height) },
    uGridSize: { value: 40.0 },
  },
  vertexShader: bgVertexShader,
  fragmentShader: bgFragmentShader,
});

const background = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  backgroundMaterial,
);
background.position.z = BACKGROUND_Z;
scene.add(background);

function fitBackground(w, h) {
  const dist = camera.position.z - BACKGROUND_Z;
  const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * dist;
  background.scale.set(visibleHeight * (w / h), visibleHeight, 1);
}
fitBackground(width, height);
//

// Light
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(200, 400, 500);
scene.add(directionalLight);
//

// Test object
// const testObject = new THREE.Mesh(
//   new THREE.SphereGeometry(100, 100, 64),
//   glassMaterial,
// // );
// scene.add(testObject);

// Meshes object
export const noteMeshes = {};

// Resize
export function resizeRenderer() {
  width = workspace.clientWidth;
  height = workspace.clientHeight;

  renderer.setSize(width, height, false); // CSS controls canvas size

  camera.aspect = width / height;
  camera.position.z = cameraDistance(height);
  camera.updateProjectionMatrix();

  backgroundMaterial.uniforms.uResolution.value.set(width, height);
  fitBackground(width, height);

  renderer.render(scene, camera);
}

resizeRenderer();
window.addEventListener("resize", resizeRenderer);

// Note material (shared)
const noteMaterialTest = new THREE.ShaderMaterial({
  uniforms: {
    uSize: {
      value: new THREE.Vector2(defaultPlacement.width, defaultPlacement.height),
    },
    uPosition: {
      value: new THREE.Vector2(defaultPlacement.x, defaultPlacement.y),
    },
  },
  vertexShader: noteVertexShader,
  fragmentShader: noteFragmentShader,
});


const noteMaterial = glassMaterial


// todo: one glass mesh per note
function createNoteMesh
(placement) {
  const noteGeometryOld = new THREE.PlaneGeometry(
    placement.width,
    placement.height,
  );

const noteGeometry = new RoundedBoxGeometry(
  placement.width,  // width
  placement.height, // height
  35,               // depth
  25,                // corner smoothness
  25               // corner radius
);



  const mesh = new THREE.Mesh(noteGeometry, noteMaterial);

  // Camera is centred on (0, 0); DOM origin is top-left with y pointing down
  mesh.position.set(
    placement.x + placement.width / 2 - width / 2,
    height / 2 - (placement.y + placement.height / 2),
    0,
  );

  scene.add(mesh);
  renderer.render(scene, camera);
  return mesh;
}

export function addNoteMesh(placement) {
  const mesh = createNoteMesh(placement);
  mesh.name = `note-${placement.id}`;
  noteMeshes[placement.id] = mesh;
}

export function updateNotePosition(placement) {
  console.log("Updating position for note with placement id:", placement.id);
  const mesh = noteMeshes[placement.id];
  if (!mesh) {
    console.log("No mesh found for this placement id");
    return;
  }

  mesh.position.x = placement.x + placement.width / 2 - width / 2;

  mesh.position.y = height / 2 - (placement.y + placement.height / 2);
  renderer.render(scene, camera);
}

export function removeNoteMesh(id) {
  const mesh = noteMeshes[id];
  if (!mesh) return;

  scene.remove(mesh);
  mesh.geometry.dispose();
  delete noteMeshes[id];
}

export function clearNoteMeshes() {
 console.log("clearing note meshes")
  for (const id of Object.keys(noteMeshes)) {
    const mesh = noteMeshes[id];

    scene.remove(mesh);
    mesh.geometry.dispose();

    delete noteMeshes[id];
  }

  renderer.render(scene, camera);
  console.log(
  scene.children.map(child => ({
    type: child.type,
    name: child.name,
    geometry: child.geometry?.type
  }))
);
}