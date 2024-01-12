import { useEffect, useState } from 'react'
import { Card } from './Card'
import './Main.css'

export function Main() {
    const [animes, setAnimes] = useState([])

    const getAnimes = async (url) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                api_key: import.meta.env.VITE_API_KEY,
            },
        })
        const data = await res.json()

        data.sort((a, b) => {
            const nomeA = a.nome.toUpperCase()
            const nomeB = b.nome.toUpperCase()

            if (nomeA < nomeB) {
                return -1
            }
            if (nomeA > nomeB) {
                return 1
            }
            return 0
        })

        setAnimes(data)
    }

    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/animes`

        getAnimes(url)
    }, [])

    return (
        <>
            <section className="container-animes">
                <div className="content-animes">
                    {animes.length > 0 &&
                        animes.map((anime) => (
                            <Card key={anime._id} anime={anime} />
                        ))}
                </div>
            </section>
        </>
    )
}
