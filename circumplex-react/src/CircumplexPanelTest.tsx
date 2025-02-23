import { Circumplex } from '@kaliatech/circumplex'

export const CircumplexPanelTest = () => {
  const circumplex = new Circumplex({ containerId: 'circumplex-cont' })
  circumplex.sayHello()

  return (
    <div>
      <h1>Circumplex</h1>
      <div id="circumplex-cont"></div>
    </div>
  )
}
