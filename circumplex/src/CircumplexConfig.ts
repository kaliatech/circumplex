import Color from 'colorjs.io'

export interface CircumplexConfig {
  containerId: string
  width?: string
  height?: string
  backgroundColor?: Color
  ne?: {
    color?: Color
  }
  se?: {
    color?: Color
  }
  sw?: {
    color?: Color
  }
  nw?: {
    color?: Color
  }
}
