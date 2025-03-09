import Color from 'colorjs.io'

export function colorToRgbaStr(color: Color) {
  const rgba = color.to('srgb')
  return `rgba(${Math.round(rgba.r * 255)}, ${Math.round(rgba.g * 255)}, ${Math.round(rgba.b * 255)}, ${rgba.alpha})`
}
