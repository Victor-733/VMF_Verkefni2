const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

if(!gl) {
  throw new Error('WebGL is not supported');
}

const vertexData = [ // hnit fyrir þríhyrninginn [x y z]
  0, 1, 0,
  1, -1, 0,
  -1, -1, 0
];

// búa til buffer sem að við munum svo loada data í
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

// búa til shaders, setja x y z punktana í shaders úr bufferinu
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
attribute vec3 position;
void main() {
  gl_Position = vec4(position, 1);
}
`);
gl.compileShader(vertexShader);

// litir
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
void main() {
  gl_FragColor = vec4(1, 0, 0, 1);
}
`);
gl.compileShader(fragmentShader);

// búa til program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgrom(gl.TRIANGLES, 0, 3);
