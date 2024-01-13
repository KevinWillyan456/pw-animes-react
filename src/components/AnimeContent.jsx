import { useEffect, useRef } from 'react'
import { useState } from 'react'
import './AnimeContent.css'
import { AnimeContentEpisodeList } from './AnimeContentEpisodeList'
import PropTypes from 'prop-types'

export function AnimeContent({ anime }) {
    const [episode, setEpisode] = useState(1)
    const [indexEpisode, setIndexEpisode] = useState(0)
    const [selectedEpisode, setSelectedEpisode] = useState(1)
    const loadRef = useRef(null)
    const episodeIndicatorRef = useRef(null)

    const totalEpisodes = anime.episodios.length

    const gerenciarEpisodioTela = () => {
        const episodios = anime.episodios

        if (episodios.length === 0) {
            if (loadRef.current) {
                loadRef.current.innerHTML = `<div class="no-episodes">Não há episódios disponíveis</div>`
            }
            return
        }

        const episodioEncontrado =
            episodios.find((episodio) => episodio.episodioNumero == episode) ||
            episodios[0]
        if (loadRef.current) {
            loadRef.current.innerHTML = `<iframe src="https://drive.google.com/file/d/${episodioEncontrado.episodioUrl}/preview" width="640" height="480" allow="autoplay" allowfullscreen="allowfullscreean"></iframe>`

            if (
                !isNaN(episodioEncontrado.episodioNumero) &&
                episodioEncontrado.episodioNumero < 10
            ) {
                const formattedEpisode = episodioEncontrado.episodioNumero
                    .toString()
                    .padStart(2, '0')
                if (episodioEncontrado.episodioTipo !== 'normal') {
                    episodeIndicatorRef.current.textContent = `EP ${formattedEpisode} - ${episodioEncontrado.episodioTipo}`
                } else {
                    episodeIndicatorRef.current.textContent = `EP ${formattedEpisode}`
                }
            } else {
                if (episodioEncontrado.episodioTipo !== 'normal') {
                    episodeIndicatorRef.current.textContent = `EP ${episodioEncontrado.episodioNumero} - ${episodioEncontrado.episodioTipo}`
                } else {
                    episodeIndicatorRef.current.textContent = `EP ${episodioEncontrado.episodioNumero}`
                }
            }
        }
    }

    const gerenciarEpisodioButton = (episodio) => {
        if (anime.episodios.length === 0) {
            return
        }

        setEpisode(episodio.episodioNumero)
        setIndexEpisode(
            anime.episodios.findIndex(
                (objeto) => objeto.episodioNumero === episodio.episodioNumero
            )
        )
        setSelectedEpisode(episodio.episodioNumero)
    }

    useEffect(() => {
        gerenciarEpisodioTela()
        setSelectedEpisode(episode)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [episode])

    useEffect(() => {
        if (anime.episodios.length === 0) {
            return
        }

        setEpisode(anime.episodios[indexEpisode].episodioNumero)
    }, [anime.episodios, indexEpisode])

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

    const classificacaoIndicativa = {
        L: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/DJCTQ_-_L.svg/443px-DJCTQ_-_L.svg.png',
        10: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/DJCTQ_-_10.svg/1024px-DJCTQ_-_10.svg.png',
        12: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/DJCTQ_-_12.svg/400px-DJCTQ_-_12.svg.png',
        14: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/DJCTQ_-_14.svg/400px-DJCTQ_-_14.svg.png',
        16: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/DJCTQ_-_16.svg/400px-DJCTQ_-_16.svg.png',
        18: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/DJCTQ_-_18.svg/400px-DJCTQ_-_18.svg.png',
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
                        src={
                            anime.classificacaoIndicativa in
                            classificacaoIndicativa
                                ? classificacaoIndicativa[
                                      anime.classificacaoIndicativa
                                  ]
                                : classificacaoIndicativa['L']
                        }
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
                    {anime.episodios.map((episodio) => {
                        const buttonClass =
                            episodio.episodioNumero === selectedEpisode
                                ? 'selected'
                                : ''

                        return (
                            <AnimeContentEpisodeList
                                key={episodio.episodioNumero}
                                buttonClass={buttonClass}
                                episodio={episodio}
                                gerenciarEpisodioButton={
                                    gerenciarEpisodioButton
                                }
                            />
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

AnimeContent.propTypes = {
    anime: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
        sinopse: PropTypes.string.isRequired,
        classificacaoIndicativa: PropTypes.number.isRequired,
        episodios: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                episodioNumero: PropTypes.number.isRequired,
                episodioUrl: PropTypes.string.isRequired,
                episodioTipo: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
}
