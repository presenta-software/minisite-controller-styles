import Styles from '@presenta/controller-styles'
import { useState } from 'react'

const rnd = arr => {
  const idx = parseInt(Math.random() * arr.length)
  return arr[idx]
}

function Controls (props) {
  const [color, setColor] = useState()

  const changeColor = e => {
    const v = e.target.value
    setColor(v)
    props.handleChange('colors', v)
  }

  const handleRandomValues = () => {
    changeColor({ target: { value: rnd(Styles.colors) } })
    props.handleChange('fonts', rnd(Styles.fonts))
    props.handleChange('colorVar', rnd(Styles.colorvars))
    props.handleChange('sceneVar', rnd(Styles.scenevars))
    props.handleChange('transition', rnd(Styles.transitions))
  }

  return (
    <div>
      <select value={color} className='w-full mb-4' onChange={changeColor}>
        <option disabled>Color Scheme:</option>
        <option>None</option>
        {Styles.colors.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select defaultValue={null} className='w-full mb-4' onChange={e => props.handleChange('fonts', e.target.value)}>
        <option disabled>Font Kits:</option>
        <option>None</option>
        {Styles.fonts.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select className='w-full mb-4' onChange={e => props.handleChange('colorVar', e.target.value)}>
        <option disabled>Color Variant:</option>
        {Styles.colorvars.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select defaultValue={null} className='w-full mb-4' onChange={e => props.handleChange('sceneVar', e.target.value)}>
        <option disabled>Padding Variant:</option>
        <option>None</option>
        {Styles.scenevars.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select defaultValue={null} className='w-full mb-4' onChange={e => props.handleChange('transition', e.target.value)}>
        <option disabled>Transition:</option>
        <option>None</option>
        {Styles.transitions.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <button onClick={handleRandomValues} className='w-full sm:w-auto flex-none bg-blue-600 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 transition-colors duration-200' type='button' aria-label='like'>I'm Feeling Lucky</button>

    </div>
  )
}

export default Controls
