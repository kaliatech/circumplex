import Color from 'colorjs.io'

export interface CircumplexConfig {
  containerId: string
  backgroundColor: Color
  drawGrid: boolean
  gridColor: Color
  gridWidth: number
  drawLines: boolean
  linesColor: Color
  linesWidth: number
  drawArrows: boolean
  arrowsMargin: number
  ne: {
    color: Color
  }
  se: {
    color: Color
  }
  sw: {
    color: Color
  }
  nw: {
    color: Color
  }
}
