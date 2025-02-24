#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 iResolution;
uniform vec3 colorNW;

out vec4 fragColor;

float normalizeAngle(float angle) {
  return mod(angle, 360.0);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;

  // Map coordinates so that the center of the viewport is (0,0)
  vec2 uv = (fragCoord - 0.5 * iResolution.xy) / min(iResolution.x-20.0, iResolution.y-20.0);

  // Compute the radial distance from the center.
  float r = length(uv);

  // Rotate the coordinate system so 0° = north.
  // (By swapping the arguments to atan, we get 0° when uv points upward.)
  float angle = degrees(atan(uv.x, uv.y));
  if (angle < 0.0) angle += 360.0;

  // Define quadrant colors.
  //vec3 colorNW = vec3(1.0, 1.0, 0.0); // Yellow (NW)
  vec3 colorNE = vec3(0.0, 1.0, 0.0); // Green (NE)
  vec3 colorSE = vec3(0.0, 0.0, 1.0); // Blue (SE)
  vec3 colorSW = vec3(1.0, 0.0, 0.0); // Red (SW)

  // We'll use these parameters to restrict the blending to a narrow range.
  float blendStart = 0.25;
  float blendEnd   = 0.75;

  vec3 ringColor;
  float t; // normalized angle within a 90° segment
  float t2; // re-mapped t for quick transition

  if(angle >= 45.0 && angle < 135.0) {
    // East side: from NE (green at 45°) to SE (blue at 135°)
    t = (angle - 45.0) / 90.0;
    t2 = smoothstep(blendStart, blendEnd, t);
    ringColor = mix(colorNE, colorSE, t2);
  }
  else if(angle >= 135.0 && angle < 225.0) {
    // South side: from SE (blue at 135°) to SW (red at 225°)
    t = (angle - 135.0) / 90.0;
    t2 = smoothstep(blendStart, blendEnd, t);
    ringColor = mix(colorSE, colorSW, t2);
  }
  else if(angle >= 225.0 && angle < 315.0) {
    // West side: from SW (red at 225°) to NW (yellow at 315°)
    t = (angle - 225.0) / 90.0;
    t2 = smoothstep(blendStart, blendEnd, t);
    ringColor = mix(colorSW, colorNW, t2);
  }
  else {
    // Top (north): from NW (yellow at 315°) to NE (green at 45°)
    if(angle >= 315.0) {
      t = (angle - 315.0) / 90.0;
    } else {
      t = (angle + 45.0) / 90.0;
    }
    t2 = smoothstep(blendStart, blendEnd, t);
    ringColor = mix(colorNW, colorNE, t2);
  }

  // Compute a radial alpha ramp:
  // - The inner fade (center) makes the dial start as transparent (alpha 0)
  // - The outer fade makes it disappear again at the rim.
  float innerFadeStart = 0.1;
  float innerFadeEnd   = 0.8;
  float outerFadeStart = 0.475;
  float outerFadeEnd   = 0.5;

  float alphaInner = smoothstep(innerFadeStart, innerFadeEnd, r);
  float alphaOuter = 1.0 - smoothstep(outerFadeStart, outerFadeEnd, r);
  float alpha = alphaInner * alphaOuter;

  fragColor = vec4(ringColor, alpha);
  // Premultiply RGB by alpha for proper blending.
  fragColor.rgb *= fragColor.a;
}
