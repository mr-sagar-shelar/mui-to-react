import * as React from 'react'
import * as ReactDom from 'react-dom'

const App: React.VFC = () => {
  return <h1>MUI to React</h1>
}

ReactDom.render(<App />, document.getElementById('app'))
