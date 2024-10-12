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
    const pixiSrvc = new PixiService()
    pixiServiceRef.current = pixiSrvc

    if (pixiServiceRef.current.isInitialized) {
      pixiServiceRef.current.start()
    } else {
      pixiSrvc.init(pixiCanvasRef.current, contEl).then(() => {
        if (pixiServiceRef.current && pixiServiceRef.current == pixiSrvc) {
          pixiSrvc.start()
        }
      })
    }
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
    <div id={id} style={{ display: 'flex', flexDirection: 'column', border: '1px solid black' }}>
      <canvas ref={pixiCanvasRef} style={{ flex: 1, backgroundColor: 'transparent' }} />
    </div>
  )
}
