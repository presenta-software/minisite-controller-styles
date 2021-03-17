import { useState, forwardRef, useImperativeHandle } from 'react'

function Selector (props, ref) {
  const [p, setP] = useState()

  const onChange = e => {
    const v = e.target.value
    changeP(v)
  }

  const changeP = v => {
    setP(v)
    props.change(v)
  }

  useImperativeHandle(ref, () => ({
    changeParam (v) {
      changeP(v)
    }
  }), [])

  return (
    <select value={p} className='w-full mb-4' onChange={onChange}>
      <option disabled>{props.name}:</option>
      <option>None</option>
      {props.arr.map(d => (
        <option key={d} value={d}>{d}</option>
      ))}
    </select>
  )
}

export default forwardRef(Selector)
