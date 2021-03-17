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
    <div>
      <p className='pb-1 text-xs text-gray-400'>{props.name}:</p>
      <select value={p} className='w-full mb-4' onChange={onChange}>
        <option>None</option>
        {props.arr.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    </div>
  )
}

export default forwardRef(Selector)
