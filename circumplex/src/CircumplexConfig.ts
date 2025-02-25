import Color from 'colorjs.io'

export interface CircumplexConfig {
  containerId: string
  width?: string
  height?: string
  backgroundColor?: Color
  drawGrid?: boolean
  gridColor?: Color
  gridWidth?: number
  drawLines?: boolean
  linesColor?: Color
  linesWidth?: number
  drawArrows?: boolean
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
