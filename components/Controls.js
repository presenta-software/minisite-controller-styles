import Styles from '@presenta/controller-styles'
import { useRef } from 'react'
import Selector from './Selector.js'

const rnd = arr => {
  const idx = parseInt(Math.random() * arr.length)
  return arr[idx]
}

function Controls (props) {
  const colorsRef = useRef()
  const fontsRef = useRef()
  const cVarRef = useRef()
  const sVarRef = useRef()
  const transitionRef = useRef()

  const handleRandomValues = () => {
    colorsRef.current.changeParam(rnd(Styles.colors))
    fontsRef.current.changeParam(rnd(Styles.fonts))
    cVarRef.current.changeParam(rnd(Styles.colorvars))
    sVarRef.current.changeParam(rnd(Styles.scenevars))
    transitionRef.current.changeParam(rnd(Styles.transitions))
  }

  return (
    <div>

      <Selector
        ref={colorsRef}
        arr={Styles.colors}
        name='Color Scheme'
        change={v => props.handleChange('colors', v)}
      />

      <Selector
        ref={fontsRef}
        arr={Styles.fonts}
        name='Fonts Kit'
        change={v => props.handleChange('fonts', v)}
      />

      <Selector
        ref={cVarRef}
        arr={Styles.colorvars}
        name='Color Variant'
        change={v => props.handleChange('colorVar', v)}
      />

      <Selector
        ref={sVarRef}
        arr={Styles.scenevars}
        name='Padding Variant'
        change={v => props.handleChange('sceneVar', v)}
      />

      <Selector
        ref={transitionRef}
        arr={Styles.transitions}
        name='Transition'
        change={v => props.handleChange('transition', v)}
      />

      <button onClick={handleRandomValues} className='w-full sm:w-auto flex-none bg-blue-600 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 transition-colors duration-200' type='button' aria-label='like'>I'm Feeling Lucky</button>

    </div>
  )
}

export default Controls
