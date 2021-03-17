import { useRef, useEffect } from 'react'
import * as Presenta from '@presenta/lib'

function PresentaWrapper (props) {
  const preso = useRef()

  useEffect(() => {
    let p = null
    const debouncer = setTimeout(() => {
      new Presenta(preso.current, props.config).then(_p => {
        p = _p
      })
    }, 100)

    return () => {
      clearTimeout(debouncer)
      if (p) p.destroy()
      if (preso.current) preso.current.innerHTML = ''
    }
  })

  return (
    <div style={{ border: '1px solid black' }}>
      <div ref={preso} />
    </div>
  )
}

export default PresentaWrapper
