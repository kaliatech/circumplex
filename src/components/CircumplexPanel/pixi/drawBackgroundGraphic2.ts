import { FillGradient, Graphics } from 'pixi.js'
import { PixiService } from './PixiService.ts'

export function drawBackgroundGraphic2(pixiSrvc: PixiService) {
  const canvasSize = pixiSrvc.getSize()
  if (!canvasSize) {
    return
  }
  const { width, height } = canvasSize
  const size = Math.min(canvasSize.width, canvasSize.height)

  console.log('drawBackgroundGraphic2')

  // ----
  //https://github.com/pixijs/pixijs/discussions/10756
  //gradientFill.type = 'radial'

  // Create a color array for the linear gradient
  //const colorStops = [0xffffff, 0xff0000, 0x00ff00, 0x0000ff, 0x000000]
  // const colorStops = ['rgba(255, 255, 255, 1)', 'rgba(0,0,255,1)', 0x00ff00, 0x0000ff, 0x000000]
  // // Add the color stops to the fill gradient
  // // colorStops.forEach((number, index) => {
  // //   const ratio = index / colorStops.length
  // //
  // //   gradientFill.addColorStop(ratio, number)
  // // })

  // Create a fill gradient

  // ----

  //Antialiasing circles
  //https://stackoverflow.com/questions/41932258/how-do-i-antialias-graphics-circle-in-pixijs

  //const obj = new Graphics().circle(0, 0, 50).stroke({})
  // NW
  const gradientFill1 = new FillGradient(0, 0, size / 2, size / 2)
  gradientFill1.addColorStop(0, 'rgba(255, 255, 255, 0)')
  gradientFill1.addColorStop(0.51, 'rgba(255, 255, 255, 0)')

  //  gradientFill1.addColorStop(0.511, 'rgba(255, 0, 0, 1)')
  //  gradientFill1.addColorStop(0.7, 'rgba(255, 0, 0, 1)')

  gradientFill1.addColorStop(0.52, 'rgba(0, 255, 0, 0.1)')
  gradientFill1.addColorStop(0.7, 'rgba(0, 0, 255, 0.2)')

  gradientFill1.addColorStop(1.0, 'rgba(255, 255, 255, 1)')

  const c1 = new Graphics()
  c1.strokeStyle = { color: 0x000000, alpha: 0.2, width: 0 }
  c1.fillStyle = { alpha: 0.9, fill: gradientFill1 }
  //c1.arcTo(0, 0, 100, 100, 75)
  //c1.arc(0, 0, 100, -Math.PI / 2, 0)
  c1.arc(0, 0, size / 2, 0, Math.PI / 2)
  //c1.stroke()
  c1.fill()

  c1.x = width / 2
  c1.y = height / 2

  c1.x = width / 2
  c1.y = height / 2

  //c1.rotation = 0
  pixiSrvc.addChild(c1)

  // NE
  const gradientFill2 = new FillGradient(0, 0, size / 2, size / 2)
  gradientFill2.addColorStop(0, 'rgba(255, 255, 255, 0)')
  gradientFill2.addColorStop(0.51, 'rgba(255, 255, 255, 0)')

  //  gradientFill1.addColorStop(0.511, 'rgba(255, 0, 0, 1)')
  //  gradientFill1.addColorStop(0.7, 'rgba(255, 0, 0, 1)')

  gradientFill2.addColorStop(0.511, 'rgba(0, 0, 255, 0.1)')
  gradientFill2.addColorStop(0.7, 'rgba(0, 255, 0, 0.2)')

  gradientFill2.addColorStop(1.0, 'rgba(255, 255, 255, 1)')

  const c2 = new Graphics()
  c2.strokeStyle = { color: 0x000000, alpha: 0.2, width: 0 }
  c2.fillStyle = { alpha: 0.9, fill: gradientFill2 }
  //c1.arcTo(0, 0, 100, 100, 75)
  //c1.arc(0, 0, 100, -Math.PI / 2, 0)
  c2.arc(0, 0, size / 2, 0, Math.PI / 2)
  //c1.stroke()
  c2.fill()

  c2.x = width / 2
  c2.y = height / 2

  c1.rotation = Math.PI / 4
  pixiSrvc.addChild(c2)
}
