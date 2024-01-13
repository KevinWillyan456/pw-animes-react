import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from './Card'
import { SpinnerLoading } from './SpinnerLoading'

export function MainSearch() {
    const [searchParams] = useSearchParams()
    const [requestFinished, setRequestFinished] = useState(false)
    const [error, setError] = useState(false)

    const [animes, setAnimes] = useState([])
    const query = searchParams.get('q')

    const getSearchedAnimes = async (url) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                api_key: import.meta.env.VITE_API_KEY,
            },
        }).catch(() => setError(true))

        const data = await res.json()

        if (!query) return

        const dataSerched = data.filter((anime) => {
            return anime.nome.toLowerCase().includes(query.toLowerCase())
        })

        dataSerched.sort((a, b) => {
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

        setAnimes(dataSerched)
        setRequestFinished(true)
    }

    useEffect(() => {
        const searchWithQueryURL = `${import.meta.env.VITE_API_URL}/animes`
        getSearchedAnimes(searchWithQueryURL)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    return (
        <>
            <section className="container-animes">
                <h2 className="main-search-title">
                    Resultados da pesquisa:
                    <div className="main-search-result">{query}</div>
                </h2>
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
                    ) : !requestFinished ? (
                        <SpinnerLoading />
                    ) : (
                        <div className="anime-not-found">
                            <div className="content">
                                Nenhum anime foi encontrado
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
