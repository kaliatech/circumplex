import { CircumplexConfig } from './CircumplexConfig.ts'
import { PixiService } from './pixi/PixiService.ts'
import { defaultConfig } from './CircumplexConfigDefaults.ts'

export class Circumplex {
  #config: CircumplexConfig
  #contEl: HTMLElement | null = null
  #bgEl: HTMLDivElement | null = null
  #pixiSrvc: PixiService | null = null
  #pixiCanvas: HTMLCanvasElement | null = null

  constructor(config: Partial<CircumplexConfig>, delayInit = false) {
    this.#config = { ...defaultConfig, ...config } as CircumplexConfig
    if (!delayInit) {
      void this.init(config)
    }
  }

  async init(config?: Partial<CircumplexConfig>): Promise<void> {
    this.#config = { ...this.#config, ...config } as CircumplexConfig
    this.#contEl = document.getElementById(this.#config.containerId)
    if (!this.#contEl) {
      throw new Error(`Invalid container ID: ${this.#config.containerId}.`)
    }

    this.#bgEl = this.redrawBackground()

    this.#pixiCanvas = document.createElement('canvas')
    Object.assign(this.#pixiCanvas.style, {
      backgroundColor: 'transparent',
      minWidth: '0',
      minHeight: '0',
    })

    // this.#pixiCanvas?.addEventListener('click', (evt) => {
    //   console.log('click', evt)
    // })

    const canvasDiv = document.createElement('div')
    canvasDiv.style.width = '100%'
    canvasDiv.style.height = '100%'
    this.#bgEl.appendChild(canvasDiv)

    canvasDiv.appendChild(this.#pixiCanvas)

    this.#pixiSrvc = new PixiService()
    await this.#pixiSrvc.init(this.#pixiCanvas, canvasDiv)
    this.#pixiSrvc?.start(this.#config)
  }

  redrawBackground() {
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
    if (!this.#pixiSrvc?.isInitialized) {
      return
    }
    this.#config = { ...this.#config, ...newConfig }
    this.redrawBackground()
    this.#pixiSrvc?.start(this.#config)
  }

  destroy(): void {
    console.log('destroy')
    this.#pixiSrvc?.destroy()
    this.#pixiSrvc = null
    this.#pixiCanvas?.remove()
    this.#pixiCanvas = null
    this.#bgEl?.remove()
    this.#bgEl = null
    if (this.#contEl) {
      this.#contEl.innerHTML = ''
    }
    this.#contEl = null
  }

  sayHello(): void {
    console.log('Hello from Circumplexs!')
  }
}
