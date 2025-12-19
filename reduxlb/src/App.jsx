import { useState } from 'react'
import './App.css'
import { store } from './redux/Store'
import { Provider } from 'react-redux'
import { Counter } from './Features/Counter/Counter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <h1>Insane</h1>
      <Counter/>
    </Provider>
  )
}

export default App

