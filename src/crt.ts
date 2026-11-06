const VERTEX = `#version 300 es
out vec2 uv;
void main() {
  vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  uv = corner;
  gl_Position = vec4(corner * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 colour;
uniform sampler2D screen;
uniform float time;
uniform float glitch;
uniform float height;
uniform float bend;

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 curve(vec2 p) {
  p = p * 2.0 - 1.0;
  vec2 offset = abs(p.yx) / (vec2(7.0, 5.5) * bend);
  p += p * offset * offset;
  return p * 0.5 + 0.5;
}

void main() {
  vec2 p = curve(vec2(uv.x, 1.0 - uv.y));
  if (p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0) {
    colour = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  float wave = sin(p.y * 9.0 + time * 1.3) * 0.0007;
  float tear = sin(p.y * 90.0 + time * 40.0) * glitch * 0.02;
  p.x += wave + tear;

  float shift = 0.0012 + glitch * 0.006;
  vec3 picture = vec3(
    texture(screen, p + vec2(shift, 0.0)).r,
    texture(screen, p).g,
    texture(screen, p - vec2(shift, 0.0)).b
  );

  float lines = 0.86 + 0.14 * sin(p.y * height * 1.6);
  float grain = (noise(p * 900.0 + time) - 0.5) * 0.07;
  float roll = 0.03 * sin(p.y * 3.0 - time * 0.8);
  vec2 edge = p * (1.0 - p);
  float vignette = pow(edge.x * edge.y * 18.0, 0.22);

  colour = vec4((picture * lines + grain + roll * picture) * vignette, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "Shader failed");
  return shader;
}

// Tall screens get a flatter curve, or their text would visibly tilt.
export const bendFor = (width: number, height: number) => (width >= height ? 1 : 2.6);

// The shader samples the menu through this same curve, so clicks use it too.
export function toScreen(x: number, y: number, bend: number) {
  const px = x * 2 - 1;
  const py = y * 2 - 1;
  const ox = Math.abs(py) / (7 * bend);
  const oy = Math.abs(px) / (5.5 * bend);
  return { x: (px + px * ox * ox) * 0.5 + 0.5, y: (py + py * oy * oy) * 0.5 + 0.5 };
}

export function createCrt(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl2", { antialias: false });
  if (!gl) return null;

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  gl.useProgram(program);
  gl.bindVertexArray(gl.createVertexArray());

  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const time = gl.getUniformLocation(program, "time");
  const glitch = gl.getUniformLocation(program, "glitch");
  const height = gl.getUniformLocation(program, "height");
  const bend = gl.getUniformLocation(program, "bend");

  return (source: HTMLCanvasElement, seconds: number, amount: number) => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    gl.uniform1f(time, seconds);
    gl.uniform1f(glitch, amount);
    gl.uniform1f(height, canvas.height);
    gl.uniform1f(bend, bendFor(canvas.width, canvas.height));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
}
