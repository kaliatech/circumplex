import { Application, Graphics } from 'pixi.js'
import { drawBackgroundGraphic2 } from './drawBackgroundGraphic2.ts'

export class PixiService {
  #app?: Application
  #children = new Map<number, Graphics>()

  isInitialized: boolean = false

  constructor() {}

  async init(pixiCanvas: HTMLCanvasElement, resizeTo?: Window | HTMLElement): Promise<Application> {
    console.log('init')
    this.#app = new Application()

    await this.#app.init({
      canvas: pixiCanvas,
      backgroundAlpha: 0,
      resizeTo: resizeTo || window,
      antialias: true,
      //resolution: window.devicePixelRatio,
      autoDensity: true,
    })

    this.#app.renderer.on('resize', (_width, _height) => {
      this.doDraw()
    })

    this.isInitialized = true
    return this.#app
  }

  start() {
    console.log('start')
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

  addChild(child: Graphics | Graphics[]) {
    const childs = Array.isArray(child) ? child : [child]
    childs.forEach((c) => {
      this.#children.set(c.uid, c)
      this.#app?.stage.addChild(c)
    })
  }

  removeChild(child: Graphics | Graphics[]) {
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

    //drawBackgroundGraphic(this)
    drawBackgroundGraphic2(this)
  }
}
