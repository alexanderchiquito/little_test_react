import { useState, useEffect } from 'react'
import './app.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPINT_RANDOM_FACT = `https//cataas.com/cat/says/${firtsWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMGE_URL = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // Para recuperar una cita al cargar la imagen
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  // Para recuperar la imagen cada vez que tebgamos un acita nueva
  useEffect(() => {
    // const firtsWord = fact.split(' ')[0] la primera Palabra
    // const firtsWord = fact.split(' ').slice(0, 3).join(' ') 3 palabras
    if (!fact) return
    const firtsWord = fact.split(' ', 3).join(' ')

    console.log(firtsWord)

    fetch(
      `https://cataas.com/cat/says/${firtsWord}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        // console.log(response)
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])
  return (
    <main>
      <h1>App</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={`${CAT_PREFIX_IMGE_URL}${imageUrl}`}
          alt={`image extracted using the first three words for ${fact}`}
        />
      )}
    </main>
  )
}
