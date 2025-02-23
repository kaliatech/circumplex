import { useEffect } from 'react'

import { Circumplex } from '@kaliatech/circumplex/src/Circumplex.ts'

interface CircumplexPanelProps {
  id?: string
}

export const CircumplexPanel = ({ id = 'circumplex-cont' }: CircumplexPanelProps) => {
  useEffect(() => {
    const circumplex = new Circumplex({
      containerId: id,
    })

    circumplex.sayHello()

    return () => {
      circumplex.destroy()
    }
  }, [id])

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
