import Head from 'next/head'
import dynamic from 'next/dynamic'
import 'tailwindcss/tailwind.css'
import { useState } from 'react'
import { colorsMap, fontsMap } from '@presenta/md2pjson'
import LZ from 'lz-string'

const PresentaWrapper = dynamic(
  () => import('../components/PresentaWrapper.js'),
  { ssr: false }
)

const Controls = dynamic(
  () => import('../components/Controls.js'),
  { ssr: false }
)

const defConf = {
  colors: 'grad2',
  fonts: 'spark',
  colorVar: 'main',
  sceneVar: 'a',
  scenes: [{
    blocks: [{
      type: 'text',
      scale: 2.5,
      text: '<p>This is a </p><h1><mark>presentation!</mark></h1>'
    }]
  }, {
    blocks: [{
      type: 'text',
      scale: 2,
      textVar: 'text',
      text: '<h1>Slide 2</h1><p>Presentations?</p><ul><li>Make slides Fast!</li><li>Using Markdown or Text</li></ul>'
    }]
  }]
}

const noInternal = (key, value) => {
  if (key.indexOf('_') === 0) {
    return undefined
  }
  return value
}

const findValue = (map, v) => {
  let res = null
  for (const k in map) {
    if (map[k] === v) res = k
  }
  return res
}

export default function Home () {
  const [config, setConfig] = useState(defConf)
  const [zid, setZid] = useState('')

  const handleChange = (s, v) => {
    config[s] = v
    setConfig(JSON.parse(JSON.stringify(config, noInternal)))

    const md = `---
colors: ${findValue(colorsMap, config.colors)}
fonts: ${findValue(fontsMap, config.fonts)}
sceneVar: ${config.sceneVar}
colorVar: ${config.colorVar}
transition: ${config.transition}
---

This is a 
# <mark>Presentation!</mark>

<!--
textVar: title
-->

---

# Slide 2
Presentations?
- Make slides Fast!
- Using Markdown or Text


---

# Want to learn more about this tool?
### Click the "home" button

`
    setZid(LZ.compressToEncodedURIComponent(md))
  }

  return (
    <div className='p-0 sm:p-4 lg:p-8'>
      <Head>
        <title>PRESENTA Styles (plug-in)</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='p-4 lg:p-0 mt-8'>
        <h1 className='text-5xl p-4 text-center md:text-8xl leading-none font-extrabold tracking-tight text-gray-900'>
          PRESENTA Styles <br />(plug-in) ????
        </h1>

        <h3 className='p-4 text-center text-2xl font-bold mt-5'>
          Permute colors, fonts, paddings and transitions <br />to explore Look&Feels for PRESENTA Lib documents.
        </h3>

        <p className='p-4 text-center text-1xl mt-5 text-gray-600 bg-gray-200'>
          With this little configurator you can play with the style possibilities of the plug-in:
        </p>
      </div>

      <div className='myFlexWrapper p-3 lg:p-0 mt-5 md:space-x-8'>
        <div className='presenta'>
          <PresentaWrapper config={config} />
        </div>
        <div className='ctrl mt-5 md:mt-0'>
          <Controls config={config} handleChange={handleChange} />
        </div>
      </div>

      <div className='p-3 lg:p-0 mt-16'>

        <h2 className='text-center text-5xl leading-none font-extrabold tracking-tight text-gray-900'>
          Like that look&feel?
        </h2>

        <div className='p-8 text-center'>
          <a target='blank' href={process.env.NEXT_PUBLIC_PLAYGROUND_URL + '/import/md?id=' + zid} className='block w-full sm:w-auto hover:bg-gray-700 bg-blue-600 text-white text-xl leading-6 font-semibold py-3 px-6 transition-colors duration-200'>
            Use it in PLAYGROUND now, our MARKDOWN based presentation tool.
          </a>
        </div>

      </div>

      <div className='border-t-2 lg:p-0 mt-8'>
        <p className='mt-8 mb-8 sm:mb-4 lg:mb-0 text-center'>
          Find out more on <a className='font-bold underline' href='https://www.presenta.cc'>PRESENTA project</a> and the open-source <a className='font-bold underline' href='https://github.com/presenta-software/presenta-lib'>PRESENTA Lib</a>
        </p>
      </div>

    </div>
  )
}
