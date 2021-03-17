import Head from 'next/head'
import dynamic from 'next/dynamic'
import 'tailwindcss/tailwind.css'
import { useState } from 'react'
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
  scenes: [{
    blocks: [{
      type: 'text',
      scale: 4,
      text: '<h1>Slide 1</h1><p>This is a <mark>presentation!</mark></p>'
    }]
  }, {
    blocks: [{
      type: 'text',
      scale: 2,
      textVar: 'text',
      text: '<h1>Slide 2</h1><p>Section 1</p><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>'
    }]
  }]
}

const noInternal = (key, value) => {
  if (key.indexOf('_') === 0) {
    return undefined
  }
  return value
}

export default function Home () {
  const [config, setConfig] = useState(defConf)
  const [zid, setZid] = useState('')

  const handleChange = (s, v) => {
    config[s] = v
    setConfig(JSON.parse(JSON.stringify(config, noInternal)))

    const md = `---
colors: ${config.colors}
fonts: ${config.fonts}
colorVar: ${config.colorVar}
sceneVar: ${config.sceneVar}
transition: ${config.fonts}
---

# Slide 1
This is a <mark>Presentation!</mark>

---

# Slide 2
Section 1
- Item 1
- Item 2
- Item 3

`
    console.log(md)
    setZid(LZ.compressToBase64(md))
  }

  return (
    <div className='p-0 sm:p-4 lg:p-8'>
      <Head>
        <title>PRESENTA Styles (plug-in)</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='p-4 lg:p-0 mt-8'>
        <h1 className='text-5xl p-4 text-center md:text-8xl leading-none font-extrabold tracking-tight text-gray-900'>
          PRESENTA Styles <br />(plug-in) 🎉
        </h1>

        <h3 className='p-4 text-center text-2xl font-bold mt-5'>
          Permutate colors, fonts, paddings and transitions <br />to style a PRESENTA Lib document.
        </h3>

        <p className='p-4 text-center text-1xl mt-5 text-gray-600 bg-gray-200'>
          With this little tool you can play with the style possibilities of the plug-in:
        </p>
      </div>

      <div className='p-3 lg:p-0 flex flex-col mt-5 md:flex-row md:space-x-8'>
        <div className='presenta flex-2 xl:flex-1'>
          <PresentaWrapper config={config} />
        </div>
        <div className='ctrl flex-1 w-full mt-5 md:mt-0'>
          <Controls handleChange={handleChange} />
        </div>
      </div>

      <div className='p-3 lg:p-0 mt-16'>

        <h2 className='text-center text-5xl leading-none font-extrabold tracking-tight text-gray-900'>
          Like that look&feel?
        </h2>

        <div className='p-8 text-center'>
          <a target='blank' href={'http://localhost:8080/import/md/' + zid} className=' w-full sm:w-auto flex-none hover:bg-gray-700 bg-blue-600 text-white text-xl leading-6 font-semibold py-3 px-6 border transition-colors duration-200' type='button' aria-label='like'>
            Use it in PLAYGROUND now, our MARKDOWN based presentation tool.
          </a>
        </div>

      </div>

      <div className='border-t-2 lg:p-0 mt-8'>
        <p className='mt-8 mb-8 sm:mb-0 text-center'>
          Find out more on <a className='font-bold underline' href='https://www.presenta.cc'>PRESENTA project</a> and the open-source <a className='font-bold underline' href='https://github.com/presenta-software/presenta-lib'>PRESENTA Lib</a>
        </p>
      </div>

    </div>
  )
}
