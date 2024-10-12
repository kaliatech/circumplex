import { CircumplexPanel } from '../CircumplexPanel'

export const CircumplexDemo = () => {
  return (
    <div style={{display:"flex", flexDirection:"column", margin: "1rem"}}>
      <h1>Circumplex UI Control</h1>
      <div style={{height:"25rem", width:"25rem", }}>
        <CircumplexPanel />
      </div>
    </div>
  )
}
