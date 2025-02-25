import { Geometry, GlProgram, Mesh, Shader, UniformGroup } from 'pixi.js'
import { PixiService } from './PixiService.ts'

import vertex from './shaders/cplex-background.vert?raw'
import fragment from './shaders/cplex-background.frag?raw'
import { CircumplexConfig } from '../CircumplexConfig.ts'

export function drawBackground(pixiSrvc: PixiService, config: CircumplexConfig) {
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
    colorNW: {
      type: 'vec3<f32>',
      value: config.nw?.color?.coords ?? [1, 0, 0], // Default yellow
    },
    colorNE: {
      type: 'vec3<f32>',
      value: config.ne?.color?.coords ?? [0, 1, 0], // Default green
    },
    colorSE: {
      type: 'vec3<f32>',
      value: config.se?.color?.coords ?? [0, 0, 1], // Default blue
    },
    colorSW: {
      type: 'vec3<f32>',
      value: config.sw?.color?.coords ?? [1, 0, 0], // Default red
    },
  })

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

  quad.position.set(0, 0)
  quad.scale.set(canvasSize.width, canvasSize.height)

  pixiSrvc.addChild([quad])

  // Update time uniform
  // let time = 0
  // pixiSrvc.app?.ticker.add(() => {
  //   time += 0.01
  //   shader.uniforms.uTime = time
  // })
}
