import { Circumplex } from '@kaliatech/circumplex'

export const CircumplexPanelTest = () => {
  const circumplex = new Circumplex()
  circumplex.sayHello()

  return (
    <div>
      <h1>Circumplex</h1>
    </div>
  )
}
