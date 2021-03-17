import Styles from '@presenta/controller-styles'
import { useRef, useEffect } from 'react'
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

  useEffect(() => {
    colorsRef.current.changeParam(props.config.colors)
    fontsRef.current.changeParam(props.config.fonts)
    cVarRef.current.changeParam(props.config.colorVar)
    sVarRef.current.changeParam(props.config.sceneVar)
    transitionRef.current.changeParam(props.config.transition)
  }, [])

  return (
    <div>

      <button onClick={handleRandomValues} className='mb-6 flex w-full bg-blue-600 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-3 pr-4 transition-colors duration-200' type='button' aria-label='like'>
        <svg className='stroke-current opacity-50 mr-2' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='23 4 23 10 17 10' /><polyline points='1 20 1 14 7 14' /><path d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15' /></svg>
        I'm Feeling Lucky
      </button>

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

    </div>
  )
}

export default Controls
