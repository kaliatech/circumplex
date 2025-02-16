import { Graphics } from 'pixi.js'
import { PixiService } from './PixiService.ts'

export function drawGraphic5Overlay(pixiSrvc: PixiService) {
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

  // Compute circle parameters: diameter is 5% of min(width, height)
  const circleDiameter = minDim * 0.25
  const circleRadius = circleDiameter / 2

  // Define properties for rays and arrow heads.
  const lineThickness = 1.5
  const lineLength = minDim / 2 - circleDiameter * 0.5
  const arrowLength = 10
  const arrowAngleDeg = 30
  const arrowAngle = (arrowAngleDeg * Math.PI) / 180

  graphics.fillStyle = {
    color: 0xffffff,
  }

  graphics.strokeStyle = {
    color: [0, 0, 0, 0.75],
    width: lineThickness,
  }

  // Draw a white circle at the center using the new v8 circle() method.

  graphics.circle(centerX, centerY, circleRadius)
  graphics.fill()
  graphics.stroke()

  // Helper function: rotates a vector (x, y) by a given angle (radians)
  const rotate = (x: number, y: number, angle: number) => ({
    x: x * Math.cos(angle) - y * Math.sin(angle),
    y: x * Math.sin(angle) + y * Math.cos(angle),
  })

  // Define the four cardinal directions: north, east, south, west.
  const directions = [
    { dx: 0, dy: -1 }, // North
    { dx: 1, dy: 0 }, // East
    { dx: 0, dy: 1 }, // South
    { dx: -1, dy: 0 }, // West
  ]

  // For each direction, draw a ray and its arrow head.
  directions.forEach(({ dx, dy }) => {
    // Compute the starting point on the circle’s perimeter
    const startX = centerX + dx * circleRadius
    const startY = centerY + dy * circleRadius
    // Compute the end point (tip of the ray)
    const endX = centerX + dx * (circleRadius + lineLength)
    const endY = centerY + dy * (circleRadius + lineLength)

    // Draw the ray using the new line() method.
    graphics.moveTo(startX, startY)
    graphics.lineTo(endX, endY)

    // Calculate arrow head wing endpoints.
    // Rotate the unit direction by ±arrowAngle.
    const leftRot = rotate(dx, dy, arrowAngle)
    const rightRot = rotate(dx, dy, -arrowAngle)

    const leftWingX = endX - arrowLength * leftRot.x
    const leftWingY = endY - arrowLength * leftRot.y
    const rightWingX = endX - arrowLength * rightRot.x
    const rightWingY = endY - arrowLength * rightRot.y

    // Draw the arrow wings as short lines.
    graphics.moveTo(endX, endY)
    graphics.lineTo(leftWingX, leftWingY)

    graphics.moveTo(endX, endY)
    graphics.lineTo(rightWingX, rightWingY)
    graphics.stroke()
  })
}
