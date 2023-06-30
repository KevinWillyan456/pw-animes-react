import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function Anime() {
    const { id } = useParams()
    const [anime, setAnime] = useState(null)

    const getAnime = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        setAnime(data)
    }

    useEffect(() => {
        const animeUrl = `http://localhost:5000/animes/${id}`
        getAnime(animeUrl)
    }, [])

    return (
        <>
            {anime && (
                <>
                    <div>Nome do anime: {anime.nome}</div>
                    <div>{anime.sinopse}</div>
                </>
            )}
        </>
    )
}
