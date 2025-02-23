import { useEffect, useRef } from 'react'
import { PixiService } from './pixi/PixiService.ts'

import { Circumplex } from '@kaliatech/circumplex/src/Circumplex.ts'
const circumplex = new Circumplex({
  canvasWidth: 500,
  canvasHeight: 500,
})

interface CircumplexPanelProps {
  id?: string
}

export const CircumplexPanel = ({ id = 'circumplex-cont' }: CircumplexPanelProps) => {
  const pixiCanvasRef = useRef<HTMLCanvasElement>(null)

  const pixiServiceRef = useRef<PixiService>()

  useEffect(() => {
    circumplex.sayHello()
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
    if (pixiServiceRef.current?.isInitialized) {
      pixiServiceRef.current.start()
    } else {
      void pixiSrvc.init(pixiCanvasRef.current, contEl).then(() => {
        console.log('pixiCanvasRef.current.widthC', pixiCanvasRef.current?.width)
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
  }, [id, pixiCanvasRef])

  const handleClick = (evt: React.MouseEvent, label: string) => {
    console.log('click', label, evt)
  }

  return (
    <div
      id={id}
      style={{
        minWidth: 0,
        minHeight: 0,
        position: 'relative',
        width: 'auto',
        aspectRatio: 1,
        alignItems: 'center',
        zIndex: 100,
      }}
    >
      <canvas
        ref={pixiCanvasRef}
        style={{
          backgroundColor: 'transparent',
          minHeight: 0,
          minWidth: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '.75rem',
          cursor: 'pointer',
        }}
        onClick={(evt) => handleClick(evt, 'neutral')}
      >
        Neutral
      </div>

      <div
        style={{
          position: 'absolute',
          left: '108%',
          top: '50%',
          transform: 'translate(-50%, -50%) rotate(-90deg)',
          padding: '.75rem',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        onClick={(evt) => handleClick(evt, 'valance+')}
      >
        Valence (+1)
      </div>

      <div
        style={{
          position: 'absolute',
          left: '-5%',
          top: '50%',
          transform: 'translate(-50%, -50%) rotate(-90deg)',
          padding: '.75rem',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        onClick={(evt) => handleClick(evt, 'valance-')}
      >
        Valence (-)
      </div>

      <div
        style={{
          position: 'absolute',
          left: '82%',
          top: '62%',
          transform: 'translate(-50%, -50%)',
          padding: '.75rem',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        onClick={(evt) => handleClick(evt, 'relaxed')}
      >
        Content
      </div>

      <div
        style={{
          position: 'absolute',
          left: '75%',
          top: '75%',
          transform: 'translate(-50%, -50%)',
          padding: '.75rem',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        onClick={(evt) => handleClick(evt, 'relaxed')}
      >
        Relaxed
      </div>

      <div
        style={{
          position: 'absolute',
          left: '60%',
          top: '85%',
          transform: 'translate(-50%, -50%)',
          padding: '.75rem',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        onClick={(evt) => handleClick(evt, 'relaxed')}
      >
        Calm
      </div>
    </div>
  )
}
