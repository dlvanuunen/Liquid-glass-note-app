import * as THREE from "https://cdn.jsdelivr.net/npm/three/build/three.module.js";

export const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0,
  roughness: 0.05,
  transmission: 1,
  thickness: 30,
  ior: 1.5,
  envMapIntensity: 1,
  attenuationColor: new THREE.Color(0xadd8ff),
  attenuationDistance: 200,
});