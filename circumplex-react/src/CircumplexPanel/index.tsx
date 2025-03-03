import { useEffect, useRef, useState } from 'react'

import { Circumplex } from '@kaliatech/circumplex/src/Circumplex.ts'
import { CircumplexConfig } from '@kaliatech/circumplex/src/CircumplexConfig.ts'

//import Color from 'colorjs.io'

interface CircumplexPanelProps {
  config: CircumplexConfig
}

export const CircumplexPanel = ({ config }: CircumplexPanelProps) => {
  const circumplexRef = useRef<Circumplex>(new Circumplex(config, true))
  const [isCircumplexInited, setIsCircumplexInited] = useState(false)

  useEffect(() => {
    const cRef = circumplexRef.current
    cRef
      ?.init()
      .then(() => {
        setIsCircumplexInited(true)
      })
      .catch((err) => {
        console.error('Unable init Circumples', err)
      })
    return () => {
      cRef?.destroy()
      setIsCircumplexInited(false)
    }
  }, [])

  useEffect(() => {
    if (!isCircumplexInited) return
    circumplexRef.current?.updateConfig(config)
  }, [isCircumplexInited, config])

  const handleClick = (evt: React.MouseEvent, label: string) => {
    console.log('click', label, evt)
  }

  return (
    <div
      id={config.containerId}
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
          zIndex: 200,
        }}
        onClick={(evt) => handleClick(evt, 'neutral')}
      >
        Neutrals
      </div>

      {/*<div*/}
      {/*  style={{*/}
      {/*    position: 'absolute',*/}
      {/*    left: '108%',*/}
      {/*    top: '50%',*/}
      {/*    transform: 'translate(-50%, -50%) rotate(-90deg)',*/}
      {/*    padding: '.75rem',*/}
      {/*    cursor: 'pointer',*/}
      {/*    textAlign: 'center',*/}
      {/*    zIndex: 200,*/}
      {/*  }}*/}
      {/*  onClick={(evt) => handleClick(evt, 'valance+')}*/}
      {/*>*/}
      {/*  Valence (+1)*/}
      {/*</div>*/}

      {/*<div*/}
      {/*  style={{*/}
      {/*    position: 'absolute',*/}
      {/*    left: '-5%',*/}
      {/*    top: '50%',*/}
      {/*    transform: 'translate(-50%, -50%) rotate(-90deg)',*/}
      {/*    padding: '.75rem',*/}
      {/*    cursor: 'pointer',*/}
      {/*    textAlign: 'center',*/}
      {/*  }}*/}
      {/*  onClick={(evt) => handleClick(evt, 'valance-')}*/}
      {/*>*/}
      {/*  Valence (-)*/}
      {/*</div>*/}

      <div
        style={{
          position: 'absolute',
          left: '82%',
          top: '62%',
          transform: 'translate(-50%, -50%)',
          padding: '.75rem',
          cursor: 'pointer',
          textAlign: 'center',
          zIndex: 200,
        }}
        onClick={(evt) => handleClick(evt, 'relaxed')}
      >
        Content
      </div>

      {/*  <div*/}
      {/*    style={{*/}
      {/*      position: 'absolute',*/}
      {/*      left: '75%',*/}
      {/*      top: '75%',*/}
      {/*      transform: 'translate(-50%, -50%)',*/}
      {/*      padding: '.75rem',*/}
      {/*      cursor: 'pointer',*/}
      {/*      textAlign: 'center',*/}
      {/*    }}*/}
      {/*    onClick={(evt) => handleClick(evt, 'relaxed')}*/}
      {/*  >*/}
      {/*    Relaxed*/}
      {/*  </div>*/}

      {/*  <div*/}
      {/*    style={{*/}
      {/*      position: 'absolute',*/}
      {/*      left: '60%',*/}
      {/*      top: '85%',*/}
      {/*      transform: 'translate(-50%, -50%)',*/}
      {/*      padding: '.75rem',*/}
      {/*      cursor: 'pointer',*/}
      {/*      textAlign: 'center',*/}
      {/*    }}*/}
      {/*    onClick={(evt) => handleClick(evt, 'relaxed')}*/}
      {/*  >*/}
      {/*    Calm*/}
      {/*  </div>*/}
    </div>
  )
}
