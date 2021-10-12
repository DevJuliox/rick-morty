import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home({ personajesNuevos }) {
  console.log(personajesNuevos)
  return (
    <>
      {personajesNuevos.map((personaje) => {
        return (
          <div key={personaje.id}>
            <Link href="/[personaje]" as={`/${personaje.ruta}`}>
              <a>
                <img src={personaje.image} />
                <h1>{personaje.name}</h1>
              </a>
            </Link>
          </div>
        )
      })}
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const peticion = await fetch('https://rickandmortyapi.com/api/character')
    const personajes = await peticion.json()

    const personajesNuevos = personajes.results.map((personaje) => {
      return {
        ...personaje,
        ruta: personaje.name.split(' ').join('-').toLowerCase()
      }
    })

    return {
      props: { personajesNuevos }, // will be passed to the page component as props
    }
  } catch (error) {

  }

}
