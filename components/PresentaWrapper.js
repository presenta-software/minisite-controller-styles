import { useRef, useEffect, useState } from 'react'
import * as Presenta from '@presenta/lib'

function PresentaWrapper (props) {
  const preso = useRef()

  useEffect(() => {
    let p = null
    new Presenta(preso.current, props.config).then(_p => {
      p = _p
    })

    return () => {
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
