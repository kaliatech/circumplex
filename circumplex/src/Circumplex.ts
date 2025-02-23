import { CircumplexConfig } from './CircumplexConfig.ts'

export class Circumplex {
  constructor(private config: CircumplexConfig) {}

  get getConfig(): CircumplexConfig {
    return structuredClone(this.config)
  }

  updateConfig(newConfig: Partial<CircumplexConfig>) {
    this.config = { ...this.config, ...newConfig }
  }

  sayHello() {
    console.log('Config:', this.config)
  }
}
