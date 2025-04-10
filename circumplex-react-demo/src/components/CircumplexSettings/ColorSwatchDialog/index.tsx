import { Group, ColorPicker, Modal } from '@mantine/core'
import { QuadrantId } from '@kaliatech/circumplex/src/CircumplexConfig.js'
interface ColorSwatchDialogProps {
  target: HTMLElement
  quadrantId: QuadrantId
  opened: boolean
  colorValue: string
  onColorChange: (area: string, newColor: string) => void
  onClose: () => void
}

export const ColorSwatchDialog = ({
  opened,
  quadrantId,
  colorValue,
  onColorChange,
  onClose,
}: ColorSwatchDialogProps) => {
  return (
    <Modal
      //portalProps={{ target: target }}
      title={`${quadrantId.toUpperCase()} Quadrant`}
      centered
      opened={opened}
      withCloseButton
      onClose={onClose}
      size="sm"
      radius="md"
    >
      <Group>
        <ColorPicker
          value={colorValue}
          format={'rgba'}
          onChange={(evt) => onColorChange(quadrantId, evt)}
        />
      </Group>
    </Modal>
  )
}
