
export const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

export const fragmentShaderSource = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, .1);
  }
`;


// // 
// export const fragmentShaderSource = `
//   precision mediump float;

//   uniform vec2 u_resolution;
//   uniform float u_time;

//   void main() {
//     vec2 uv = gl_FragCoord.xy / u_resolution;

//     // Center coordinates
//     vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution)
//              / min(u_resolution.x, u_resolution.y);

//     float radius = length(p);

//     // Circular shape
//     float shape = 1.0 - smoothstep(0.35, 0.36, radius);

//     // Surface lighting
//     vec3 normal = normalize(vec3(p * 1.8, sqrt(max(0.0, 1.0 - radius * radius * 3.0))));

//     vec3 lightDir = normalize(vec3(-0.5, 0.7, 1.0));

//     float diffuse = max(dot(normal, lightDir), 0.0);

//     // Soft reflective highlight
//     float highlight = pow(
//       max(dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0)), 0.0),
//       24.0
//     );

//     // Glass-like color
//     vec3 baseColor = vec3(0.35, 0.55, 0.85);
//     vec3 color = baseColor * (0.35 + diffuse * 0.45);
//     color += vec3(0.8, 0.9, 1.0) * highlight;

//     // Edge highlight
//     float edge = smoothstep(0.30, 0.35, radius);
//     color += vec3(0.3, 0.5, 0.8) * edge * 0.5;

//     gl_FragColor = vec4(color, shape);
//   }
// `;
