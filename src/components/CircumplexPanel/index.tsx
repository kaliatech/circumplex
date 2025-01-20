import { useEffect, useRef } from 'react'
import { PixiService } from './pixi/PixiService.ts'

interface CircumplexPanelProps {
  id?: string
}

export const CircumplexPanel = ({ id = 'circumplex-cont' }: CircumplexPanelProps) => {
  const pixiCanvasRef = useRef<HTMLCanvasElement>(null)

  const pixiServiceRef = useRef<PixiService>()

  useEffect(() => {
    if (!pixiCanvasRef.current) {
      return
    }

    // if (pixiServiceRef.current) {
    //   pixiServiceRef.current.destroy()
    //   pixiServiceRef.current = undefined
    // }

    const contEl = document.getElementById(id)
    if (!contEl) {
      console.error('Invalid container ID for pixi')
      return
    }

    console.log('contEl.clientWidth', contEl.clientWidth)
    const pixiSrvc = new PixiService()
    pixiServiceRef.current = pixiSrvc

    console.log('pixiCanvasRef.current.width', pixiCanvasRef.current.width)
    if (pixiServiceRef.current.isInitialized) {
      pixiServiceRef.current.start()
    } else {
      pixiSrvc.init(pixiCanvasRef.current, contEl).then(() => {
        console.log('pixiCanvasRef.current.widthC', pixiCanvasRef.current.width)
        if (pixiServiceRef.current && pixiServiceRef.current == pixiSrvc) {
          pixiSrvc.start()
        }
      })
    }
    console.log('pixiCanvasRef.current.widthB', pixiCanvasRef.current.width)
    return () => {
      if (pixiServiceRef.current) {
        pixiServiceRef.current.clear()
      }
      // if (pixiServiceRef.current) {
      //   pixiServiceRef.current.destroy()
      //   pixiServiceRef.current = undefined
      // }
    }
  }, [pixiCanvasRef])

  return (
    <div
      id={id}
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        border: '1px solid black',
      }}
    >
      <canvas
        ref={pixiCanvasRef}
        style={{
          backgroundColor: 'transparent',
          minHeight: 0,
          minWidth: 0,
          // height: '100%',
          // width: '100%',
        }}
      />
    </div>
  )
}
