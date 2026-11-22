import { makeDraggable } from "../physics/drag.js";
import { store } from "../store.js";
import { addTestNotes } from "../test.js";
import { createView } from "./createView.js";
// import shaders
import { vertexShaderSource, fragmentShaderSource } from "./shaders.js";

const workspaceContent = document.getElementById("workspace-content");
const workspace = document.getElementById("workspace");

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

//
// WebGL Boilerplate
//

export function initWebGL() {
  console.log("WebGL initialization started");
  const shaderCanvas = document.getElementById("shader-canvas");
  const gl = shaderCanvas.getContext("webgl", {
    alpha: true,
    antialias: true,
  });

  if (!gl) {
    console.error("WebGL is not supported");
    return null;
  }

  console.log(shaderCanvas);
  console.log(gl);

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource,
  );

  if (!vertexShader || !fragmentShader) return null;

  const program = createProgram(gl, vertexShader, fragmentShader);
  console.log("Shader program:", program);

  if (!program) return null;

  gl.useProgram(program);

  const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

  const buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, "a_position");

  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  function resizeCanvas() {
    const { width, height } = workspace.getBoundingClientRect();

    shaderCanvas.width = width * window.devicePixelRatio;
    shaderCanvas.height = height * window.devicePixelRatio;

    gl.viewport(0, 0, shaderCanvas.width, shaderCanvas.height);
  }

  function clear() {
    gl.clearColor(0, 0, 0, 0.5);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.uniform2f(
      gl.getUniformLocation(program, "u_resolution"),
      shaderCanvas.width,
      shaderCanvas.height,
    );

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    console.log(gl.getError());
  }

  const resizeObserver = new ResizeObserver(() => {
    resizeCanvas();
    clear();
  });

  resizeObserver.observe(workspace);
  resizeCanvas();
  clear();

  return { gl, shaderCanvas, clear, resizeCanvas };
}

//
// WebGL / Shader Helper fuctions
//

function createShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}
