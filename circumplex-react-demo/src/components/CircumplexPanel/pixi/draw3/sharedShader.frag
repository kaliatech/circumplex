in vec2 vUV;

uniform vec2 uResolution;
uniform sampler2D uTexture;

void main() {
    gl_FragColor = texture2D(uTexture, vUV).rgba;
    //gl_FragColor = vec4(0.5,0.5,0,1);
}
