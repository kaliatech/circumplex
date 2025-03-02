import { CircumplexConfig } from './CircumplexConfig.ts'
import { PixiService } from './pixi/PixiService.ts'
import { defaultConfig } from './CircumplexConfigDefaults.ts'

export class Circumplex {
  #config: CircumplexConfig
  #contEl: HTMLElement | null = null
  #bgEl: HTMLDivElement | null = null
  #pixiSrvc: PixiService = new PixiService()
  #pixiCanvas: HTMLCanvasElement = document.createElement('canvas')

  constructor(config: Partial<CircumplexConfig>) {
    this.#config = { ...defaultConfig, ...config } as CircumplexConfig
    this.init()
  }

  private init(): void {
    this.#contEl = document.getElementById(this.#config.containerId)
    if (!this.#contEl) {
      throw new Error(`Invalid container ID: ${this.#config.containerId}.`)
    }

    this.#bgEl = this.initBackground()

    Object.assign(this.#pixiCanvas.style, {
      backgroundColor: 'transparent',
      minWidth: '0',
      minHeight: '0',
    })

    const canvasDiv = document.createElement('div')
    canvasDiv.style.width = '100%'
    canvasDiv.style.height = '100%'
    this.#bgEl.appendChild(canvasDiv)

    canvasDiv.appendChild(this.#pixiCanvas)

    void this.#pixiSrvc.init(this.#pixiCanvas, canvasDiv).then(() => {
      this.#pixiSrvc.start(this.#config)
    })
  }

  initBackground(): HTMLDivElement {
    if (!this.#bgEl) {
      const bgEl = document.createElement('div')
      bgEl.className = 'circumplex-background'
      bgEl.style.position = 'relative'
      bgEl.style.width = '100%'
      bgEl.style.height = '100%'
      this.#contEl?.appendChild(bgEl)
      this.#bgEl = bgEl
    }
    const bgEl = this.#bgEl
    bgEl.style.border = '1px solid gray'

    bgEl.style.backgroundColor = this.#config.backgroundColor.toString()
    if (this.#config.drawGrid) {
      bgEl.style.backgroundSize = '10px 10px'
      bgEl.style.backgroundImage =
        'linear-gradient(to right, rgba(100,100,100,0.15) 1px, transparent 1px),linear-gradient(to bottom, rgba(100,100,100,0.15) 1px, transparent 1px)'
    } else {
      bgEl.style.backgroundImage = 'none'
    }
    this.#contEl?.appendChild(bgEl)
    return bgEl
  }

  get config(): CircumplexConfig {
    return structuredClone(this.#config)
  }

  updateConfig(newConfig: Partial<CircumplexConfig>): void {
    this.#config = { ...this.#config, ...newConfig }
    // if (this.#pixiSrvc) {
    //   this.#pixiSrvc.stop()
    //   this.#pixiSrvc.clear()
    // }
    // if (this.#pixiCanvas) {
    //   this.#pixiCanvas.remove()
    // }
    this.initBackground()
  }

  destroy(): void {
    this.#pixiSrvc.destroy()
    this.#pixiCanvas.remove()
    if (this.#contEl) {
      this.#contEl.innerHTML = ''
    }
    this.#contEl = null
  }

  sayHello(): void {
    console.log('Hello from Circumplex!')
  }
}
