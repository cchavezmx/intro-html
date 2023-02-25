import Head from 'next/head'
import Image from 'next/image'
// https://nextjs.org/docs/advanced-features/module-path-aliases
import { useState } from 'react'
import Definition from '@/components/Definition'

export default function Home () {
  const [result, setResult] = useState(null)

  const handledSarh = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const value = form.get('value')

    fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value, peito: 'hola' })
    })
      .then(res => res.json())
      .then(data => setResult(data))
  }

  const [font, setFont] = useState('font-montserrat')
  const handleChangeFont = (font) => {
    if (font === 'quicksand') {
      setFont('font-quicksand')
    }

    if (font === 'montserrat') {
      setFont('font-montserrat')
    }

    if (font === 'inter') {
      setFont('font-inter')
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={font}>
        <header>
          <Image src="/logobook.png" alt="logo" height={60} width={60} onClick={() => window.location.reload()}/>
          {/* <h1>Diccionario</h1> */}
          <select className={font} onChange={(e) => handleChangeFont(e.target.value)}>
            <option value='montserrat' className="font-montserrat">Montserrat</option>
            <option value='inter' className="font-inter">Inter</option>
            <option value='quicksand' className="font-quicksand">Quicksand</option>
          </select>
        </header>
        <form onSubmit={handledSarh}>
          <input
            placeholder="Enter to world"
            name="value"
          />
          <button className='search-button' type="submit">
            Buscar
          </button>
        </form>
        <div>
            {
              Array.isArray(result)
                ? <Definition result={result} />
                : null
            }
            {/* {
              result.length > 0 && <Definition result={result} />
            } */}
            {
              !result && (
                <div className='result_empty'>
                <h2>
                  Add a word to search
                </h2>
              </div>
              )
            }
        </div>
        </main>
        <footer></footer>
    </>
  )
}
