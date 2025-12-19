import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment ,reset} from '../Counter/CounterSlice'

export function Counter() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <span>{count}</span>
        <br />
        <br />
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>  </span>

        <button aria-label="Decrement value" onClick={() => dispatch(decrement())} >
          Decrement
        </button>
        <span>  </span>
        <button aria-label="Reset value" onClick={() => dispatch(reset())} >
          Reset
        </button>
      
      </div>
    </div>
  )
}