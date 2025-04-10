import Color from 'colorjs.io'
import { CircumplexConfig } from '@kaliatech/circumplex/src/CircumplexConfig.ts'
import { colorToRgbaStr } from '../../../utils/color-to-rgb.ts'
import { useState } from 'react'
import { ColorSwatchDialog } from '../ColorSwatchDialog/index.tsx'
import { SectionH3 } from '../../common/SectionH3.tsx'

interface QuadrantSettingsPanelProps {
  quadrantId: 'nw' | 'ne' | 'sw' | 'se' // Restrict to valid quadrant IDs
  config: CircumplexConfig
  onChange: (newConfig: CircumplexConfig) => void
}

export const QuadrantSettingsPanel = ({
  quadrantId,
  config,
  onChange,
}: QuadrantSettingsPanelProps) => {
  const [opened, setOpened] = useState(false)

  const handleColorChange = (area: string, newColor: string) => {
    const newProps = { ...config }
    if (area === quadrantId) {
      const quadrant = quadrantId as keyof Pick<CircumplexConfig, 'nw' | 'ne' | 'sw' | 'se'>
      newProps[quadrant].color = new Color(newColor)
    }
    onChange({ ...config, ...newProps })
  }

  const quadrant = quadrantId as keyof Pick<CircumplexConfig, 'nw' | 'ne' | 'sw' | 'se'>
  const value = colorToRgbaStr(config[quadrant].color)

  return (
    <div>
      <SectionH3>{quadrantId.toUpperCase()}</SectionH3>
      <div>
        <div
          id={`color-swatch-${quadrantId}`}
          style={{
            width: '2rem',
            height: '2rem',
            backgroundColor: value,
            cursor: 'pointer',
            border: '1px solid black',
          }}
          onClick={() => setOpened((o) => !o)}
        ></div>
        <ColorSwatchDialog
          target={document.getElementById(`color-swatch-${quadrantId}`) as HTMLElement}
          quadrantId={quadrantId}
          opened={opened}
          colorValue={value}
          onColorChange={handleColorChange}
          onClose={() => setOpened(false)}
        />
        <div>
          text 1,
          <br />
          text 2,
          <br /> text 3
        </div>
      </div>
    </div>
  )
}
