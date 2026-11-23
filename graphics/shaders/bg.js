// shaders.js
export const bgVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const bgFragmentShader = `
  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform float uGridSize;

  void main() {
    vec3 orange = vec3(1.0, 0.416, 0.239);
    vec3 purple = vec3(0.478, 0.235, 1.0);

    // diagonal gradient, matches the CSS 135deg look
    float t = clamp((vUv.x + (1.0 - vUv.y)) * 0.5, 0.0, 1.0);
    vec3 color = mix(orange, purple, t);

    // grid
    vec2 cell = (vUv * uResolution) / uGridSize;
    vec2 g = abs(fract(cell - 0.5) - 0.5) / fwidth(cell);
    float line = 1.0 - min(min(g.x, g.y), 1.0);
    color = mix(color, vec3(1.0), line * 0.25);

    gl_FragColor = vec4(color, 1.0);
  }
`;