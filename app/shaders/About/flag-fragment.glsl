precision highp float;

uniform sampler2D uTexture;
uniform float uOpacity;
uniform float uShade;

varying vec2 vUv;

void main(){
  vec2 uv = vUv;

  vec4 texture = texture2D(uTexture, uv);
  gl_FragColor = vec4(texture.xyz * uShade, uOpacity);
}