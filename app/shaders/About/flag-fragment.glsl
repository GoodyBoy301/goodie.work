precision highp float;

uniform sampler2D uTexture;

varying vec2 vUv;

void main(){
  vec2 uv = vUv;

  vec4 texture = texture2D(uTexture, uv);
  gl_FragColor = texture;
}