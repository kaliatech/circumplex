import Color from 'colorjs.io'
import { Checkbox, ColorPicker } from '@mantine/core'
import { CircumplexConfig } from '@kaliatech/circumplex/src/CircumplexConfig.ts'

interface CircumplexSettingsProps {
  config: CircumplexConfig
  onChange: (newConfig: CircumplexConfig) => void
}

export const CircumplexSettings = ({ config, onChange }: CircumplexSettingsProps) => {
  const handleChange = (newProps: Partial<CircumplexConfig>) => {
    onChange({ ...config, ...newProps })
  }

  const handleColorChange = (area: string, newColor: string) => {
    const newProps = { ...config }
    if (area === 'nw') {
      newProps.nw.color = new Color(newColor)
    }
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

      <ColorPicker
        value={config.nw.color.toString()}
        format={'rgba'}
        onChange={(evt) => handleColorChange('nw', evt)}
      />
    </div>
  )
}
