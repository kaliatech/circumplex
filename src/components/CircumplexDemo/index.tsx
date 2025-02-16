import { CircumplexPanel } from '../CircumplexPanel'

export const CircumplexDemo = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem' }}>
      <h1>Circumplex UI Control</h1>
      <div
        style={{
          position: 'relative',
          height: '20rem',
          width: '20rem',
          margin: '2rem',
          border: '1px solid gray',
          //backgroundColor: 'black',
          backgroundSize: '10px 10px',
          backgroundImage:
            'linear-gradient(to right, rgba(100,100,100,0.15) 1px, transparent 1px),linear-gradient(to bottom, rgba(100,100,100,0.15) 1px, transparent 1px)',
        }}
      >
        <CircumplexPanel />
      </div>
    </div>
  )
}
