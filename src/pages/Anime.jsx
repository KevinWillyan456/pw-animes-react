import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AnimeContent } from '../components/AnimeContent'

export function Anime() {
    const { id } = useParams()
    const [anime, setAnime] = useState(null)

    const getAnime = async (url) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                api_key: import.meta.env.VITE_API_KEY,
            },
        })
        const data = await res.json()
        setAnime(data)
    }

    useEffect(() => {
        const animeUrl = `${import.meta.env.VITE_API_URL}/animes/${id}`
        getAnime(animeUrl)
    }, [id])

    return (
        <>
            <Header />
            {anime && <AnimeContent anime={anime} />}
            <Footer />
        </>
    )
}
