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

  // búa til buffer sem að við munum loada vertex í
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

  // búa til shaders sem að birta hnitin úr bufferinu sem við vorum að gera
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, `
  attribute vec3 position;
  void main() {
      gl_Position = vec4(position, 1);
  }
  `);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, `
  void main() {
      gl_FragColor = vec4(1, 0, 0, 1);
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
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

window.onload = main;
