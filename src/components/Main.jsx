import { useEffect, useState } from 'react'
import { Card } from './Card'
import './Main.css'

export function Main() {
    const [animes, setAnimes] = useState([])

    const getAnimes = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        setAnimes(data)
    }

    useEffect(() => {
        const url = 'http://localhost:5000/api/animes'
        getAnimes(url)
    }, [])

    return (
        <>
            <section className="container-animes">
                <div className="content-animes">
                    {animes.length > 0 &&
                        animes.map((anime) => (
                            <Card key={anime.id} anime={anime} />
                        ))}
                </div>
            </section>
        </>
    )
}
