//
// start here
//
function main() {
  // kallar á canvas og webgl
  const canvas = document.querySelector('canvas');
  const gl = canvas.getContext('webgl');

  // ef að browserinn styður ekki webgl byrtist error
  if (!gl) {
      throw new Error('WebGL not supported');
  }

  // hnitin fyrir þríhyrninginn
  const vertexData = [
      0, 1, 0,
      1, -1, 0,
      -1, -1, 0,
  ];

  // RGB gildi fyrir liti
  const colorData = [
    1, 0, 0, // litur á horni/vertex 1
    0, 1, 0, // litur á horni/vertex 2
    0, 0, 1, // litur á horni/vertex 3
  ];

  // búa til buffer sem að við munum loada vertex í
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

  // búa til annað buffer fyrir liti
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

  // búa til shaders sem að birta hnitin úr bufferinu sem við vorum að gera
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, `
  precision mediump float;
  attribute vec3 position;
  attribute vec3 color;
  varying vec3 vColor;

  void main() {
      vColor = color;
      gl_Position = vec4(position, 1);
  }
  `);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, `
  precision mediump float;

  varying vec3 vColor;

  void main() {
      gl_FragColor = vec4(vColor, 1);
  }
  `);
  gl.compileShader(fragmentShader);

  // búa til program og loada shaderunum sem við vorum að búa til í programið
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // staðsetningin á attribute sem að hann á að loada
  const positionLocation = gl.getAttribLocation(program, `position`);
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // nota positionBuffer hér með því að binda það
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0); // lesa 3 hnit í einu

  const colorLocation = gl.getAttribLocation(program, `color`);
  gl.enableVertexAttribArray(colorLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer); // nota colorBuffer hér
  gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

  // segja forritinu hvaða program það á að teikna
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

window.onload = main;
