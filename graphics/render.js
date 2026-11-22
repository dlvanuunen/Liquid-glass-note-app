import { makeDraggable } from "../physics/drag.js";
import { store } from "../store.js";
import { addTestNotes } from "../test.js";
import { createView } from "./createView.js";
// import shaders
import { vertexShaderSource, fragmentShaderSource } from "./shaders.js";


import * as THREE from
  "https://cdn.jsdelivr.net/npm/three/build/three.module.js";



const workspaceContent = document.getElementById("workspace-content");
const workspace = document.getElementById("workspace");
const threeCanvas = document.getElementById("three-canvas");


const width = workspace.clientWidth
const height=workspace.clientHeight

//
// Main render function
//

export function render() {
  console.log("render.js started...");
  console.log("clearing workspace...");
  workspaceContent.replaceChildren();

  console.log("creating new views...");

  for (const placement of Object.values(store.placements)) {
    // console.log(placement)

    const storedItem = store.items[placement.itemId];
    if (!storedItem) continue;

    const element = createView(storedItem, placement);
    if (element) {
      workspaceContent.append(element);

      makeDraggable(element, placement, () => {
        element.style.transform = `translate(${placement.x}px, ${placement.y}px)`;
      });
    }
  }
  return;
}


const scene = new THREE.Scene()
const camera = new THREE.OrthographicCamera(
  -width / 2,
  width / 2,
  height / 2,
  -height / 2,
  0.1,
  1000
);

camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
canvas: threeCanvas,
alpha: true, 
antialias: true

})

function resizeRenderer() {
  const width = workspace.clientWidth;
  const height = workspace.clientHeight;

  renderer.setSize(width, height);

  camera.left = -width / 2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = -height / 2;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
}



const geometry = new THREE.BoxGeometry(
  100, // width
  100, // height
  10   // depth
);
const material = new THREE.MeshBasicMaterial({
  color: 0x4488ff
});

const testObject = new THREE.Mesh(geometry, material);

scene.add(testObject);

resizeRenderer();
window.addEventListener("resize", resizeRenderer);



// todo
function createNoteMesh(placement) {

  // Create geometry using placement.width and placement.height
  const geometry = new THREE.BoxGeometry(
    // TODO
  );

  // Create a material
  const material = new THREE.MeshBasicMaterial({
    color: 0x4488ff
  });

  // Combine geometry and material
  const mesh = new THREE.Mesh(geometry, material);

  // TODO: Set mesh position using placement.x and placement.y
  // Remember that the camera is centred around (0, 0).

  // Add mesh to scene
  scene.add(mesh);

  return mesh;
}