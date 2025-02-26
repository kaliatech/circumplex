import Color from 'colorjs.io'
import { CircumplexConfig } from './CircumplexConfig.ts'

export const defaultConfig: Omit<CircumplexConfig, 'containerId'> = {
  backgroundColor: new Color('white'),
  drawGrid: true,
  gridColor: new Color('red'),
  gridWidth: 1,
  drawLines: true,
  linesColor: new Color('black'),
  linesWidth: 1,
  drawArrows: true,
  arrowsMargin: 10,
  ne: {
    color: new Color('green'),
  },
  se: {
    color: new Color('blue'),
  },
  sw: {
    color: new Color('red'),
  },
  nw: {
    color: new Color('rgb(255,255,0)'),
  },
}
