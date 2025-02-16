import { CircumplexPanel } from '../CircumplexPanel'

export const CircumplexDemo = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem' }}>
      <h1>Circumplex UI Control</h1>
      <div style={{ display: 'flex', height: '50vh', width: '25rem' }}>
        <CircumplexPanel />
      </div>
    </div>
  )
}
