#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

in vec2 vUV;

uniform vec3 iResolution;
uniform sampler2D uTexture;

out vec4 fragColor;

void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    //vec2 uv = (fragCoord.xy / iResolution.xx - 0.8) * 8.0;



    float distThreshold = 0.25;
    float distFromCenterPixels = distance(vec2(fragCoord.x, fragCoord.y), vec2(iResolution.x/2.0, iResolution.y/2.0));
    float distFromCenterX = distFromCenterPixels / iResolution.x;

    vec4 texColor = texture(uTexture, vUV);
    fragColor = vec4(texColor.rgb, 0.7);

    if (distFromCenterX > distThreshold) {
      fragColor.rgba = vec4(0. / 255.0,110. / 255.0, 30. / 255.0, 0.8 - (distFromCenterX * 1.5));
    }

  //fragColor.rgba = vec4(0.75, 0.5, 0.5, 1.0);


  //gl_FragColor = vec4(0.5,0.5,0,1);
  // https://stackoverflow.com/questions/39341564/webgl-how-to-correctly-blend-alpha-channel-png
  fragColor.rgb *= fragColor.a;
  //gl_FragColor = vec4(0.5,0.5,0,1);
}
