import { BlurFilter, Graphics } from 'pixi.js'
import { PixiService } from './PixiService.ts'

export function drawBackgroundGraphic(pixiSrvc: PixiService) {
  const canvasSize = pixiSrvc.getSize()
  if (!canvasSize) {
    return
  }
  const { width, height } = canvasSize
  const size = Math.min(canvasSize.width, canvasSize.height)
  console.log('width', width)
  console.log('height', height)

  //const obj = new Graphics().circle(0, 0, 50).stroke({})
  const c1 = new Graphics()
  c1.strokeStyle = { color: 0xffa53e, alpha: 0.9, width: 5 }
  c1.circle(0, 0, size / 8)
  c1.stroke()
  c1.x = width / 2
  c1.y = height / 2
  pixiSrvc.addChild(c1)
  c1.filters = [new BlurFilter({ strength: 4 })]

  const c2 = new Graphics()
  c2.strokeStyle = { color: 0xf96707, alpha: 0.6, width: 5 }
  c2.circle(0, 0, size / 3)
  c2.stroke()
  c2.x = width / 2
  c2.y = height / 2
  pixiSrvc.addChild(c2)
  c2.filters = [new BlurFilter({ strength: 5.5 })]

  const c3 = new Graphics()
  c3.strokeStyle = { color: 0xffe7c6, alpha: 0.7, width: 5 }
  c3.circle(0, 0, size / 2.1)
  c3.stroke()
  c3.x = width / 2
  c3.y = height / 2
  pixiSrvc.addChild(c3)
  c3.filters = [new BlurFilter({ strength: 7 })]
}
