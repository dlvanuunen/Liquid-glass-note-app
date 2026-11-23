import * as THREE from "https://cdn.jsdelivr.net/npm/three/build/three.module.js";


export const glassMaterial2 = new THREE.MeshPhysicalMaterial({
  color: 0xeaf5ff,

  metalness: 0,
  roughness: 0.05,

  transmission: 1,
  thickness: 8,
  ior: 1.45,

  attenuationColor: new THREE.Color(0xd5eaff),
  attenuationDistance: 250,

  transparent: false,
});