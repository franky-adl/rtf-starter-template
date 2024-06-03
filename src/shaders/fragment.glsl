uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  gl_FragColor = vec4(vec3(1.0, uv), 1.0);

  // automatically applies the tonemapping settings from the rtf canvas if same renderer is in use
  #include <tonemapping_fragment>
  // transform color from linear colorSpace to sRGBColorSpace
  #include <colorspace_fragment>
}