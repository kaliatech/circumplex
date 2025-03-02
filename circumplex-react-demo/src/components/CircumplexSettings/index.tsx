import { Checkbox } from '@mantine/core'
import { CircumplexConfig } from '@kaliatech/circumplex/src/CircumplexConfig.ts'

interface CircumplexSettingsProps {
  config: CircumplexConfig
  onChange: (newConfig: CircumplexConfig) => void
}

export const CircumplexSettings = (props: CircumplexSettingsProps) => {
  const handleChange = (newProps: Partial<CircumplexConfig>) => {
    props.onChange({ ...props.config, ...newProps })
  }

  return (
    <div>
      <h2>Settings</h2>
      <Checkbox
        label={'Draw grid'}
        checked={props.config.drawGrid}
        onChange={(evt) =>
          handleChange(evt.currentTarget.checked ? { drawGrid: true } : { drawGrid: false })
        }
      />
    </div>
  )
}
