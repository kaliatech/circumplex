import { Application, ContainerChild, extensions, ResizePlugin } from 'pixi.js'
import { drawBackground } from './draw-background.ts'
import { drawOverlay } from './draw-overlay.ts'
import { CircumplexConfig } from '../CircumplexConfig.ts'

extensions.add(ResizePlugin)

export class PixiService {
  #config?: CircumplexConfig
  #app?: Application
  #children = new Map<number, ContainerChild>()

  isInitialized = false

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async init(pixiCanvas: HTMLCanvasElement, resizeTo?: Window | HTMLElement): Promise<Application> {
    this.#app = new Application()

    await this.#app.init({
      canvas: pixiCanvas,
      backgroundAlpha: 0,
      resizeTo: resizeTo ?? window,
      antialias: true,
      //resolution: window.devicePixelRatio,
      autoDensity: true,
    })

    this.#app.renderer.on('resize', (_width, _height) => {
      if (this.#app) {
        this.#app.canvas.width = _width
        this.#app.canvas.height = _height
      }
      //this.doDraw()
    })

    this.isInitialized = true
    return this.#app
  }

  start(config: CircumplexConfig) {
    this.#config = config
    this.doDraw()
  }

  clear() {
    if (this.#children) {
      this.removeChild([...this.#children.values()])
    }
  }

  destroy() {
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

    if (!this.#config) return

    if (this.#children) {
      this.removeChild([...this.#children.values()])
    }
    drawBackground(this, this.#config)
    drawOverlay(this)
  }
}
