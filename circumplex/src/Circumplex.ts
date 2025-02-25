import Color from 'colorjs.io'
import { CircumplexConfig } from './CircumplexConfig.ts'
import { PixiService } from './pixi/PixiService.ts'

const defaults: Partial<CircumplexConfig> = {
  nw: {
    color: new Color('rgb(255, 0, 0)'),
  },
  ne: {
    color: new Color('rgb(0, 255, 0)'),
  },
  se: {
    color: new Color('blue'),
  },
  drawArrows: true,
  drawLines: true,
  gridWidth: 10,
  linesColor: new Color('rgb(166, 166, 166)'),
  backgroundColor: new Color('rgb(91, 91, 91)'),
}

export class Circumplex {
  #config: CircumplexConfig
  #contEl: HTMLElement | null = null
  #pixiSrvc: PixiService = new PixiService()
  #pixiCanvas: HTMLCanvasElement = document.createElement('canvas')

  constructor(config: CircumplexConfig) {
    this.#config = { ...defaults, ...config }
    this.init()
  }

  private init(): void {
    this.#contEl = document.getElementById(this.#config.containerId)
    if (!this.#contEl) {
      throw new Error(`Invalid container ID: ${this.#config.containerId}.`)
    }

    Object.assign(this.#pixiCanvas.style, {
      backgroundColor: 'transparent',
      minWidth: '0',
      minHeight: '0',
    })
    this.#contEl.appendChild(this.#pixiCanvas)

    void this.#pixiSrvc.init(this.#pixiCanvas, this.#contEl).then(() => {
      this.#pixiSrvc.start(this.#config)
    })
  }

  get config(): CircumplexConfig {
    return structuredClone(this.#config)
  }

  updateConfig(newConfig: Partial<CircumplexConfig>): void {
    this.#config = { ...this.#config, ...newConfig }
  }

  destroy(): void {
    this.#pixiSrvc.destroy()
    this.#pixiCanvas.remove()
    this.#contEl = null
  }

  sayHello(): void {
    console.log('Hello from Circumplex!')
  }
}
