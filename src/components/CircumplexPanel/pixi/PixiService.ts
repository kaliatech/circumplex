import { Application, ContainerChild } from 'pixi.js'
import { drawBackgroundGraphic2 } from './drawBackgroundGraphic2.ts'
import { drawBackgroundGraphic } from './drawBackgroundGraphic.ts'
import { drawBackgroundGraphic3 } from './drawBackgroundGraphic3.ts'
import { drawBackgroundGraphic4 } from './drawBackgroundGraphic4.ts'

import { extensions, ResizePlugin } from 'pixi.js'

extensions.add(ResizePlugin)

export class PixiService {
  #app?: Application
  #children = new Map<number, ContainerChild>()

  isInitialized: boolean = false

  constructor() {}

  async init(pixiCanvas: HTMLCanvasElement, resizeTo?: Window | HTMLElement): Promise<Application> {
    console.log('init')
    this.#app = new Application()
    //
    console.log('widthCont', (resizeTo as HTMLElement).clientWidth)
    // pixiCanvas.height = resizeTo.clientHeight
    // pixiCanvas.width = resizeTo.clientWidth

    console.log('pixiCanvas.width', pixiCanvas.width)

    await this.#app.init({
      canvas: pixiCanvas,
      backgroundAlpha: 0,
      resizeTo: resizeTo || window,
      antialias: true,
      //resolution: window.devicePixelRatio,
      autoDensity: true,
    })

    this.#app.renderer.on('resize', (_width, _height) => {
      console.log('_width', _width)
      console.log('_height', _height)
      if (this.#app) {
        this.#app.canvas.width = _width
        this.#app.canvas.height = _height
      }
      this.doDraw()
    })

    this.isInitialized = true
    return this.#app
  }

  start() {
    this.doDraw()
  }

  clear() {
    console.log('clear')
    if (this.#children) {
      this.removeChild([...this.#children.values()])
    }
  }

  destroy() {
    console.log('destroy')
    if (!this.#app) return
    if (!this.#app.renderer) return // possible sequence bug in pixi.jss

    this.removeChild([...this.#children.values()])

    //TODO: Unable to destroy without getting WebGL error on subsequent init
    //https://github.com/pixijs/pixijs/issues/10403
    //this.#app?.destroy({ removeView: false }, { children: true, texture: false, context: false })

    this.#app = undefined
  }

  addChild(child: ContainerChild | ContainerChild[]) {
    const childs = Array.isArray(child) ? child : [child]
    childs.forEach((c) => {
      this.#children.set(c.uid, c)
      this.#app?.stage.addChild(c)
    })
  }

  removeChild(child: ContainerChild | ContainerChild[]) {
    const childs = Array.isArray(child) ? child : [child]
    childs.forEach((c) => {
      this.#children.delete(c.uid)
      this.#app?.stage.removeChild(c)
    })
  }

  getSize(): { width: number; height: number } | undefined {
    if (!this.#app || !this.#app.canvas) {
      return undefined
    }
    return { width: this.#app.canvas.width, height: this.#app.canvas.height }
  }

  doDraw() {
    const app = this.#app
    if (!app) return

    if (this.#children) {
      this.removeChild([...this.#children.values()])
    }

    console.log('doDraw')

    drawBackgroundGraphic(this)
    drawBackgroundGraphic2(this)
    //drawBackgroundGraphic3(this)
    drawBackgroundGraphic4(this)
  }
}
