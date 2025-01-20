import { Assets, Geometry, Mesh, Shader } from 'pixi.js'
import { PixiService } from './PixiService.ts'

import vertex from './draw3/sharedShader.vert?raw'
import fragment from './draw3/sharedShader.frag?raw'

export function drawBackgroundGraphic3(pixiSrvc: PixiService) {
  const canvasSize = pixiSrvc.getSize()
  if (!canvasSize) {
    return
  }
  // const { width, height } = canvasSize
  // const size = Math.min(canvasSize.width, canvasSize.height)

  console.log('drawBackgroundGraphic3')

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

  const geometry = new Geometry({
    attributes: {
      aPosition: [
        -100,
        -100, // x, y
        100,
        -100, // x, y
        50,
        50, // x, y,
      ],
      aUV: [0, 0, 1, 0, 1, 1],
    },
  })

  // const shader = Shader.from({
  //   gl: {
  //     vertex,
  //     fragment,
  //   },
  //   resources: {
  //     uTexture: Assets.load('https://pixijs.com/assets/bg_rotate.jpg').then((result) => {
  //       return result.source
  //     }),
  //   },
  // })

  Assets.load('https://pixijs.com/assets/bg_rotate.jpg')
    .then((texture) => {
      const shader = Shader.from({
        gl: {
          vertex,
          fragment,
        },
        resources: {
          uTexture: texture,
        },
      })

      const quad = new Mesh({
        geometry: quadGeometry,
        shader,
      })

      const triangle = new Mesh({
        geometry,
        shader,
      })

      quad.position.set(canvasSize.width / 4, canvasSize.height / 2)
      quad.scale.set(canvasSize.width / 4, canvasSize.height / 4)

      triangle.position.set(200, 100)
      triangle.scale.set(1)

      pixiSrvc.addChild([quad, triangle])

      // Update time uniform
      // let time = 0
      // pixiSrvc.app?.ticker.add(() => {
      //   time += 0.01
      //   shader.uniforms.uTime = time
      // })
    })

    .catch((error) => {
      console.error('Error loading texture:', error)
    })
}
