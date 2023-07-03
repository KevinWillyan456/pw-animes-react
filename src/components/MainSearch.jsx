import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from './Card'

export function MainSearch() {
    const [searchParams] = useSearchParams()

    const [animes, setAnimes] = useState([])
    const query = searchParams.get('q')

    const getSearchedAnimes = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        if (!query) return

        const dataSerched = data.filter((anime) => {
            return anime.nome.toLowerCase().includes(query.toLowerCase())
        })

        setAnimes(dataSerched)
    }

    useEffect(() => {
        const searchWithQueryURL =
            'https://pw-animes-react-database.kevinsouza456.repl.co/animes'
        getSearchedAnimes(searchWithQueryURL)
    }, [query])

    return (
        <>
            <section className="container-animes">
                <h2 className="main-search-title">Resultados da pesquisa</h2>
                <div className="content-animes">
                    {animes.length > 0 ? (
                        animes.map((anime) => (
                            <Card key={anime.id} anime={anime} />
                        ))
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
