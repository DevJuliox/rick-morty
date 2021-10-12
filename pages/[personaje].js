import React from 'react'

export default function Personaje({ personajeValido }) {
    console.log("personajeValido", personajeValido)
    return (
        <div>
            <h1>{personajeValido.name}</h1>
            <img src={personajeValido.image} />
        </div>
    )
}


export async function getServerSideProps(context) {

    const { personaje } = context.query
    try {
        const peticion = await fetch('https://rickandmortyapi.com/api/character')
        const personajes = await peticion.json()

        const personajesNuevos = personajes.results.map((personaje) => {
            return {
                ...personaje,
                ruta: personaje.name.split(' ').join('-').toLowerCase()
            }
        })

        const personajeEncontrado = personajesNuevos.filter(personaje => personaje.ruta == context.params.personaje)
        let personajeValido = personajeEncontrado[0]
        return {
            props: { personajeValido }, // will be passed to the page component as props
        }
    } catch (error) {

    }

}
