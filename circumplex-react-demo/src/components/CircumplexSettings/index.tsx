import { Checkbox } from '@mantine/core'
import { CircumplexConfig } from '@kaliatech/circumplex/src/CircumplexConfig.ts'
import { QuadrantSettingsPanel } from './QuadrantSettingsPanel'

interface CircumplexSettingsProps {
  config: CircumplexConfig
  onChange: (newConfig: CircumplexConfig) => void
}

export const CircumplexSettings = ({ config, onChange }: CircumplexSettingsProps) => {
  const handleChange = (newProps: Partial<CircumplexConfig>) => {
    onChange({ ...config, ...newProps })
  }

  return (
    <div>
      <h2>Settings</h2>

      <Checkbox
        label={'Draw grid'}
        checked={config.drawGrid}
        onChange={(evt) =>
          handleChange(evt.currentTarget.checked ? { drawGrid: true } : { drawGrid: false })
        }
      />
      <QuadrantSettingsPanel quadrantId="nw" config={config} onChange={onChange} />
      <QuadrantSettingsPanel quadrantId="ne" config={config} onChange={onChange} />
      <QuadrantSettingsPanel quadrantId="se" config={config} onChange={onChange} />
      <QuadrantSettingsPanel quadrantId="sw" config={config} onChange={onChange} />
    </div>
  )
}
