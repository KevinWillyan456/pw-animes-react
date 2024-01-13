import { useEffect, useState } from 'react'
import { Card } from './Card'
import './Main.css'
import { SpinnerLoading } from './SpinnerLoading'

export function Main() {
    const [animes, setAnimes] = useState([])
    const [error, setError] = useState(false)

    const getAnimes = async (url) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                api_key: import.meta.env.VITE_API_KEY,
            },
        }).catch(() => setError(true))

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
                    {animes.length > 0 ? (
                        animes.map((anime) => (
                            <Card key={anime._id} anime={anime} />
                        ))
                    ) : error ? (
                        <div className="fetch-error">
                            <h1>Erro na comunicação com o servidor</h1>
                            <p>
                                Infelizmente não será possível carregar os
                                animes
                            </p>
                        </div>
                    ) : (
                        <SpinnerLoading />
                    )}
                </div>
            </section>
        </>
    )
}
