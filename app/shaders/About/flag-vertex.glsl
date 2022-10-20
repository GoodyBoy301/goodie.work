uniform float uTime;

varying vec2 vUv;

void main(){
  vUv = uv;
  float wind = uTime * 0.002;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += sin(modelPosition.x * 5.0 - wind) * 0.2;
  modelPosition.z += sin(modelPosition.y  - wind) * 0.2;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}