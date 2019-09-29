function main() {
  // kallar á canvas og webgl
  const canvas = document.querySelector('canvas');
  const gl = canvas.getContext('webgl');

  // ef að browserinn styður ekki webgl birtist error
  if (!gl) {
      throw new Error('WebGL not supported');
  }

  // ------- PROCESSIÐ Á ÖLLU -------- //

  /* vertexData = [...]

  // búa til buffer
   - loada Data í buffer

   - búa til vertex shader
   - búa til fragment shader
   - búa til program
   - tengja shaders við program-ið

   - kveikja á vertex gildunum

   -  teikna/animate-a */

  // --------------------------------- //

  // hnitin fyrir þríhyrninginn [x y z] notum ekki z því þett er 2D form
  const vertexData = [
      0, 0.707, 0,
      1, -1, 0,
      -1, -1, 0,
  ];

  // RGB gildi fyrir liti
  const colorData = [
    1, 0, 0, // litur á horni/vertex 1
    0, 1, 0, // litur á horni/vertex 2
    0, 0, 1, // litur á horni/vertex 3
  ];

  // búa til buffer sem að við munum loada data í
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

  // búa til annað buffer fyrir liti
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

  // búa til shaders sem að birta hnitin úr bufferinu sem við vorum að gera
  // búa til vectora fyrir position og liti
  // margfalda uniform með position fyrir snúninginn
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, `
  precision mediump float;
  attribute vec3 position;
  attribute vec3 color;
  varying vec3 vColor;

  uniform mat4 matrix;

  void main() {
      vColor = color;
      gl_Position = matrix * vec4(position, 1);
  }
  `);
  gl.compileShader(vertexShader);

  // fragment shader
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
  gl.attachShader(program, vertexShader); // bæta við vertex shader
  gl.attachShader(program, fragmentShader); // bæta við fragment shader
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

  const uniformLocations = {
    matrix: gl.getUniformLocation(program, `matrix`),
  };

  // búa til matrix
  const matrix = mat4.create();
  mat4.scale(matrix, matrix, [0.7, 0.7, 0.7]); // scala-a þríhyrninginn niður annars fer hann útaf canvas

  function animate() { // animate fall sem að rotate-ar þríhyrninginn um ás. Geri Math.PI / 200 til að stilla hraðan á snúninginum
    requestAnimationFrame(animate);
    gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix);
    mat4.rotateY(matrix, matrix, Math.PI / 200);
    gl.drawArrays(gl.TRIANGLES, 0, 3); // teikna þríhyrning
  }

  animate(); // kalla á animate fallið
  
}

window.onload = main;

/* þríhyrningurinn er ekki að snúast um miðjuna þegar hann snýst um Z-ás vegna þess að staðsetningin á honum er ekki í miðjunni
og animate fallið er að snúast um miðjuna á canvasinu */
