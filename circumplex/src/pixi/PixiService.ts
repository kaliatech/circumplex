import {
  Application,
  ContainerChild,
  extensions,
  Graphics,
  ResizePlugin,
  Text as PText,
} from 'pixi.js'
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
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    })

    // this.#app.renderer.on('resize', (_width, _height) => {
    //   if (this.#app && this.#app.canvas) {
    //     this.#app.canvas.width = _width
    //     this.#app.canvas.height = _height
    //   }
    //   //this.doDraw()
    // })

    this.#app.stage.interactive = true
    this.#app?.stage.addListener('mouseenter', () => {
      if (this.#app?.stage) {
        this.#app.stage.cursor = 'pointer'
      }
    })
    this.#app?.stage.addListener('mouseleave', () => {
      if (this.#app?.stage) {
        this.#app.stage.cursor = 'auto'
      }
    })

    const marker = new Graphics().circle(0, 0, 20).fill(0xff0000)
    marker.alpha = 0.25
    marker.zIndex = 1000
    this.#app?.stage.addChild(marker)

    const testTxt = new PText({
      text: 'X',
      style: {
        fontSize: 16,
      },
    })
    this.#app?.stage.addChild(testTxt)

    this.#app?.stage.addListener('click', (evt) => {
      console.log('PixiService.click', evt.x, evt.y)
      marker.position = { x: evt.globalX, y: evt.globalY }
      testTxt.position = {
        x: marker.position.x - marker.width / 4 + testTxt.width / 2,
        y: marker.position.y - marker.height / 4,
      }
      testTxt.zIndex = 1000
    })

    this.isInitialized = true
    return this.#app
  }

  start(config: CircumplexConfig) {
    this.#config = config
    this.doDraw()
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  stop() {}

  clear() {
    if (this.#children) {
      this.removeChild([...this.#children.values()])
    }
  }

  destroy() {
    if (!this.#app) return
    if (!this.#app.renderer) return // possible sequence bug in pixi.jss

    this.removeChild([...this.#children.values()])

    this.#app.renderer.removeAllListeners()

    //TODO: Unable to destroy without getting WebGL error on subsequent init
    //https://github.com/pixijs/pixijs/issues/10403
    //this.#app.renderer.destroy()
    try {
      this.#app.destroy({ removeView: true }, { children: true, texture: true, context: true })
    } catch (err) {
      console.error('Error destroying pixi app', err)
    }

    this.#app = undefined
    this.isInitialized = false
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

  getStageSize(): { width: number; height: number } | undefined {
    if (!this.#app || !this.#app.canvas) {
      return undefined
    }
    //return { width: this.#app.canvas.width, height: this.#app.canvas.height }
    //return { width: this.#app.stage.width, height: this.#app.stage.height }
    return { width: this.#app.screen.width, height: this.#app.screen.height }
  }

  getCanvasSize(): { width: number; height: number } | undefined {
    if (!this.#app || !this.#app.canvas) {
      return undefined
    }
    return { width: this.#app.canvas.width, height: this.#app.canvas.height }
    //Alternatively:
    // width: this.getStageSize() * window.devicePixelRatio
  }

  doDraw() {
    const app = this.#app
    if (!app) return

    if (!this.#config) return

    if (this.#children) {
      this.removeChild([...this.#children.values()])
    }
    drawBackground(this, this.#config)
    drawOverlay(this, this.#config)
  }
}
