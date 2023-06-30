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
        const animeUrl = `http://localhost:5000/animes/${id}`
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
