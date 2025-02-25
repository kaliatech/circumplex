import { Graphics } from 'pixi.js'
import { PixiService } from './PixiService'
import { CircumplexConfig } from '../CircumplexConfig'

export function drawOverlay(pixiSrvc: PixiService, config: CircumplexConfig) {
  const canvasSize = pixiSrvc.getSize()
  if (!canvasSize) {
    return
  }

  // Create a Graphics object to do our drawing
  const graphics = new Graphics()
  pixiSrvc.addChild(graphics)

  // Get canvas dimensions and compute the center
  const { width, height } = canvasSize

  // Canvas dimensions and center point
  const centerX = width / 2
  const centerY = height / 2
  const minDim = Math.min(width, height)

  // Compute circle parameters: diameter is 25% of min(width, height)
  const circleDiameter = minDim * 0.25
  const circleRadius = circleDiameter / 2

  // Define properties for rays and arrow heads
  const lineThickness = config.linesWidth ?? 1.5
  const lineLength = minDim / 2 - circleDiameter * 0.5
  const arrowLength = 10
  const arrowAngleDeg = 30
  const arrowAngle = (arrowAngleDeg * Math.PI) / 180

  // // Draw grid if enabled
  // if (config.drawGrid) {
  //   const gridColor = config.gridColor?.coords ?? [0, 0, 0]
  //   const gridAlpha = 0.15
  //   graphics.strokeStyle = {
  //     color: [gridColor[0], gridColor[1], gridColor[2], gridAlpha],
  //     width: config.gridWidth ?? 1,
  //   }

  //   // Draw horizontal and vertical grid lines
  //   for (let i = -5; i <= 5; i++) {
  //     const pos = (i / 5) * circleRadius * 2
  //     // Horizontal line
  //     graphics.moveTo(centerX - circleRadius * 2, centerY + pos)
  //     graphics.lineTo(centerX + circleRadius * 2, centerY + pos)
  //     // Vertical line
  //     graphics.moveTo(centerX + pos, centerY - circleRadius * 2)
  //     graphics.lineTo(centerX + pos, centerY + circleRadius * 2)
  //   }
  //   graphics.stroke()
  // }

  // Draw the center circle
  graphics.fillStyle = {
    color: config.backgroundColor?.coords ?? [1, 1, 1], // Default white
  }

  graphics.strokeStyle = {
    color: [0, 0, 0, 0.75],
    width: lineThickness,
  }

  // Draw a white circle at the center using the new v8 circle() method.

  graphics.circle(centerX, centerY, circleRadius)
  graphics.fill()
  graphics.stroke()

  // Only proceed with lines if they're enabled
  if (!config.drawLines) {
    return
  }

  // Helper function: rotates a vector (x, y) by a given angle (radians)
  const rotate = (x: number, y: number, angle: number) => ({
    x: x * Math.cos(angle) - y * Math.sin(angle),
    y: x * Math.sin(angle) + y * Math.cos(angle),
  })

  // Define the four cardinal directions: north, east, south, west
  const directions = [
    { dx: 0, dy: -1 }, // North
    { dx: 1, dy: 0 }, // East
    { dx: 0, dy: 1 }, // South
    { dx: -1, dy: 0 }, // West
  ]

  // Update line style for axes
  graphics.strokeStyle = {
    color: config.linesColor?.coords ?? [0, 0, 0, 0.75],
    width: lineThickness,
  }

  // For each direction, draw a ray and its arrow head
  directions.forEach(({ dx, dy }) => {
    // Compute the starting point on the circle's perimeter
    const startX = centerX + dx * circleRadius
    const startY = centerY + dy * circleRadius
    // Compute the end point (tip of the ray)
    const endX = centerX + dx * (circleRadius + lineLength)
    const endY = centerY + dy * (circleRadius + lineLength)

    // Draw the ray
    graphics.moveTo(startX, startY)
    graphics.lineTo(endX, endY)
    graphics.stroke()

    // Draw arrow heads if enabled
    if (config.drawArrows) {
      // Calculate arrow head wing endpoints
      const leftRot = rotate(dx, dy, arrowAngle)
      const rightRot = rotate(dx, dy, -arrowAngle)

      const leftWingX = endX - arrowLength * leftRot.x
      const leftWingY = endY - arrowLength * leftRot.y
      const rightWingX = endX - arrowLength * rightRot.x
      const rightWingY = endY - arrowLength * rightRot.y

      // Draw the arrow wings
      graphics.moveTo(endX, endY)
      graphics.lineTo(leftWingX, leftWingY)
      graphics.moveTo(endX, endY)
      graphics.lineTo(rightWingX, rightWingY)
      graphics.stroke()
    }
  })
}
