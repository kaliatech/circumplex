import { Geometry, GlProgram, Mesh, Shader, UniformGroup } from 'pixi.js'
import { PixiService } from './PixiService.ts'

import vertex from './shaders/cplex-background.vert?raw'
import fragment from './shaders/cplex-background.frag?raw'

export function drawBackground(pixiSrvc: PixiService) {
  const canvasSize = pixiSrvc.getSize()
  if (!canvasSize) {
    return
  }

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
      //aUV: [0, 0, 1, 0, 1, 1, 0, 1],
    },
    indexBuffer: [0, 1, 2, 0, 2, 3],
  })

  const glProgram = new GlProgram({
    vertex: vertex,
    fragment: fragment,
  })

  const iResolution = new Float32Array([canvasSize.width, canvasSize.height, 1.0])
  const uniformGroup = new UniformGroup({
    iResolution: {
      type: 'vec3<f32>',
      value: iResolution,
    },
  })

  //https://pixijs.com/8.x/guides/migrations/v8
  //https://pixijs.com/8.x/examples/mesh-and-shaders/shader-toy-mesh

  const shader = new Shader({
    glProgram: glProgram,
    resources: {
      uniformGroup: uniformGroup,
    },
  })

  const quad = new Mesh({
    geometry: quadGeometry,
    shader,
  })

  // quad.position.set(canvasSize.width / 2, canvasSize.height / 2)
  // quad.scale.set(canvasSize.width / 4, canvasSize.height / 4)
  quad.position.set(0, 0)
  quad.scale.set(canvasSize.width, canvasSize.height)
  // quad.position.set(125, 125)
  // quad.scale.set(canvasSize.width - 125, canvasSize.height - 125)

  pixiSrvc.addChild([quad])

  // Update time uniform
  // let time = 0
  // pixiSrvc.app?.ticker.add(() => {
  //   time += 0.01
  //   shader.uniforms.uTime = time
  // })
}
