import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AnimeContent } from '../components/AnimeContent'

export function Anime() {
    const { id } = useParams()
    const [anime, setAnime] = useState(null)

    const getAnime = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        setAnime(data)
    }

    useEffect(() => {
        const animeUrl = `https://pw-animes-react-database.kevinsouza456.repl.co/animes/${id}`
        getAnime(animeUrl)
    }, [])

    return (
        <>
            <Header />
            {anime && <AnimeContent anime={anime} />}
            <Footer />
        </>
    )
}
