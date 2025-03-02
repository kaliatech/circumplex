import { CircumplexPanel } from '@kaliatech/circumplex-react/src/CircumplexPanel/index.tsx'

import '@mantine/core/styles.css'

import { createTheme, MantineProvider } from '@mantine/core'
import { CircumplexSettings } from '../CircumplexSettings'
import { useState } from 'react'
import { defaultConfig } from '@kaliatech/circumplex/src/CircumplexConfigDefaults.ts'
import { CircumplexConfig } from '@kaliatech/circumplex/src/CircumplexConfig.ts'

const theme = createTheme({})

export const CircumplexDemo = () => {
  const [config, setConfig] = useState({ ...defaultConfig, containerId: 'circumplex-cont' })

  const handleConfigChange = (newConfig: CircumplexConfig) => {
    setConfig({ ...config, ...newConfig })
  }
  return (
    <MantineProvider theme={theme} defaultColorScheme={'light'}>
      <main>
        <h1>Circumplex UI Control</h1>
        <p>
          This is a demo of the Circumplex UI control. More information, see:{' '}
          <a href="https://github.com/kaliatech/circumplex">
            https://github.com/kaliatech/circumplex
          </a>
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', maxWidth: '30rem' }}>
            <CircumplexPanel config={config} />
          </div>
          <div>
            <CircumplexSettings config={config} onChange={handleConfigChange} />
          </div>
        </div>
      </main>
    </MantineProvider>
  )
}
