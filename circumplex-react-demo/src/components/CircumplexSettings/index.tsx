import { Checkbox } from '@mantine/core'
import { CircumplexConfig } from '@kaliatech/circumplex/src/CircumplexConfig.ts'
import { QuadrantSettingsPanel } from './QuadrantSettingsPanel'
import { SectionH2 } from '../common/SectionH2.tsx'
import { Section } from '../common/Section.tsx'

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
      <Section>
        <SectionH2>Options</SectionH2>
        <Checkbox
          label={'Draw grid'}
          checked={config.drawGrid}
          onChange={(evt) =>
            handleChange(evt.currentTarget.checked ? { drawGrid: true } : { drawGrid: false })
          }
        />
      </Section>
      <Section>
        <SectionH2>Quadrants</SectionH2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <QuadrantSettingsPanel quadrantId="nw" config={config} onChange={onChange} />
          <QuadrantSettingsPanel quadrantId="ne" config={config} onChange={onChange} />
          <QuadrantSettingsPanel quadrantId="se" config={config} onChange={onChange} />
          <QuadrantSettingsPanel quadrantId="sw" config={config} onChange={onChange} />
        </div>
      </Section>
    </div>
  )
}
