export const noteVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix *
                  modelViewMatrix *
                  vec4(position, 1.0);
  }
`;

export const noteFragmentShader = `
  uniform vec2 uSize;
  uniform vec2 uPosition;

  varying vec2 vUv;

  void main() {
    vec2 notePosition = uPosition;
    vec2 noteSize = uSize;

    gl_FragColor = vec4(
      vUv.x,
      vUv.y,
      0.5,
      1.0
    );
  }
`;