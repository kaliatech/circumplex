#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

in vec2 vUV;

uniform vec2 uResolution;
uniform sampler2D uTexture;

out vec4 fragColor;

void main() {
    vec4 texColor = texture(uTexture, vUV);
    fragColor = vec4(texColor.rgb, 0.5);
    //gl_FragColor = vec4(0.5,0.5,0,1);
}
