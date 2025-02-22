import { Assets, Geometry, GlProgram, Mesh, Shader, Texture, UniformGroup } from 'pixi.js'
import { PixiService } from './PixiService.ts'

import vertex from './draw4/sharedShader.vert?raw'
import fragment from './draw4/sharedShader.frag?raw'

import bg_rotate_url from '../../assets/bg_rotate.jpg'

export function drawBackgroundGraphic4(pixiSrvc: PixiService) {
  const canvasSize = pixiSrvc.getSize()
  if (!canvasSize) {
    return
  }
  // const { width, height } = canvasSize
  // const size = Math.min(canvasSize.width, canvasSize.height)

  console.log('drawBackgroundGraphic4')

  const quadGeometry = new Geometry({
    attributes: {
      aPosition: [
        -1,
        -1, // x, y
        1,
        -1, // x, y
        1,
        1, // x, y
        -1,
        1, // x, y
      ],
      aUV: [0, 0, 1, 0, 1, 1, 0, 1],
    },
    indexBuffer: [0, 1, 2, 0, 2, 3],
  })
  //Assets.load('https://pixijs.com/assets/bg_rotate.jpg')
  Assets.load(bg_rotate_url)
    .then((asset) => {
      // const shader = Shader.from({
      //   gl: {
      //     vertex,
      //     fragment,
      //   },
      //   resources: {
      //     uTexture: texture,
      //   },
      // })
      const glProgram = new GlProgram({
        vertex: vertex,
        fragment: fragment,
      })

      //eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
      const texture = Texture.from(asset.source)

      const iResolution = new Float32Array([canvasSize.width, canvasSize.height, 1.0])
      const uniformGroup = new UniformGroup({
        iResolution: {
          type: 'vec3<f32>',
          value: iResolution,
        },
      })

      console.log('iResolution', iResolution)

      //https://pixijs.com/8.x/guides/migrations/v8
      //https://pixijs.com/8.x/examples/mesh-and-shaders/shader-toy-mesh

      const shader = new Shader({
        glProgram: glProgram,
        //gpuProgram: gpuProgram,
        resources: {
          uTexture: texture.source,
          uSampler: texture,
          //uResolution: iResolution,
          uniformGroup: uniformGroup,
          //iTime: 0,
          //uColor: [1, 0, 0, 1],
        },
      })

      const quad = new Mesh({
        geometry: quadGeometry,
        shader,
      })

      quad.position.set(canvasSize.width / 2, canvasSize.height / 2)
      quad.scale.set(canvasSize.width / 4, canvasSize.height / 4)
      quad.position.set(0, 0)
      quad.scale.set(canvasSize.width, canvasSize.height)

      pixiSrvc.addChild([quad])
    })

    .catch((error) => {
      console.error('Error loading texture:', error)
    })
  // Update time uniform
  // let time = 0
  // pixiSrvc.app?.ticker.add(() => {
  //   time += 0.01
  //   shader.uniforms.uTime = time
  // })
}
