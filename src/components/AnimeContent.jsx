import { useEffect, useRef } from 'react'
import { useState } from 'react'
import './AnimeContent.css'
import { AnimeContentEpisodeList } from './AnimeContentEpisodeList'

export function AnimeContent({ anime }) {
    const [episode, setEpisode] = useState(1)
    const [indexEpisode, setIndexEpisode] = useState(0)
    const [selectedEpisode, setSelectedEpisode] = useState(1)
    const loadRef = useRef(null)
    const episodeIndicatorRef = useRef(null)

    const totalEpisodes = anime.episodios.length

    const gerenciarEpisodioTela = () => {
        const episodios = anime.episodios
        const episodioEncontrado =
            episodios.find((episodio) => episodio.episodioId == episode) ||
            episodios[0]
        if (loadRef.current) {
            loadRef.current.innerHTML = `<iframe src="https://drive.google.com/file/d/${episodioEncontrado.episodioUrl}/preview" width="640" height="480" allow="autoplay" allowfullscreen="allowfullscreean"></iframe>`

            if (!isNaN(episode) && episode < 10) {
                const formattedEpisode = episode.toString().padStart(2, '0')
                episodeIndicatorRef.current.textContent = `EP ${formattedEpisode}`
            } else {
                episodeIndicatorRef.current.textContent = `EP ${episode}`
            }
        }
    }

    const gerenciarEpisodioButton = (episodio) => {
        setEpisode(episodio.episodioId)
        setIndexEpisode(
            anime.episodios.findIndex(
                (objeto) => objeto.episodioId === episodio.episodioId
            )
        )
        setSelectedEpisode(episodio.episodioId)
    }

    useEffect(() => {
        gerenciarEpisodioTela()
    }, [episode])

    useEffect(() => {
        setEpisode(anime.episodios[indexEpisode].episodioId)
    }, [indexEpisode])

    const handlePreviousEpisode = () => {
        if (indexEpisode > 0) {
            setIndexEpisode(indexEpisode - 1)
        }
    }

    const handleNextEpisode = () => {
        if (indexEpisode < totalEpisodes - 1) {
            setIndexEpisode(indexEpisode + 1)
        }
    }

    const handleRerender = () => {
        setRerender(!rerender)
    }

    return (
        <>
            <h1 className="anime-content-title">{anime.nome}</h1>
            <h2 className="anime-content-title-synopsis">Sinopse</h2>
            <div className="anime-content-synopsis-content">
                {anime.sinopse}
            </div>
            <div className="anime-content-episode">
                <div ref={episodeIndicatorRef} className="current-episode">
                    EP 01
                </div>
                <div className="age">
                    <img
                        src={`https://purchaseway-animes-node.kevinsouza456.repl.co/resources/img/age-${anime.classificacaoIndicativa}.png`}
                        alt="age"
                    />
                </div>
            </div>
            <div className="view-episode">
                <div ref={loadRef} className="load"></div>
            </div>

            <div className="actionButtons">
                <button
                    className={`prev ${indexEpisode <= 0 ? 'forbidden' : ''}`}
                    onClick={handlePreviousEpisode}
                    disabled={indexEpisode === 0}
                >
                    Anterior
                </button>
                <button
                    className={`next ${
                        indexEpisode === totalEpisodes - 1 ? 'forbidden' : ''
                    }`}
                    onClick={handleNextEpisode}
                    disabled={indexEpisode === totalEpisodes - 1}
                >
                    Próximo
                </button>
            </div>

            <div className="list-episodes">
                <ul>
                    <AnimeContentEpisodeList
                        anime={anime}
                        selectedEpisode={selectedEpisode}
                        gerenciarEpisodioButton={gerenciarEpisodioButton}
                    />
                </ul>
            </div>
        </>
    )
}
