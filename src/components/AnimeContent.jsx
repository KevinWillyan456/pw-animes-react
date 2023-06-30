import { useEffect, useRef } from 'react'
import { useState } from 'react'
import './AnimeContent.css'

export function AnimeContent({ anime }) {
    const [episode, setEpisode] = useState(1)
    const loadRef = useRef(null)

    const gerenciarEpisodioTela = () => {
        const episodios = anime.episodios
        const episodioEncontrado =
            episodios.find((episodio) => episodio.episodioId == episode) ||
            episodios[0]
        if (loadRef.current) {
            loadRef.current.innerHTML = `<iframe src="https://drive.google.com/file/d/${episodioEncontrado.episodioUrl}/preview" width="640" height="480" allow="autoplay" allowfullscreen="allowfullscreean"></iframe>`
        }
    }

    useEffect(() => {
        gerenciarEpisodioTela()
    }, [])

    return (
        <>
            <h1 className="anime-content-title">{anime.nome}</h1>
            <h2 className="anime-content-title-synopsis">Sinopse</h2>
            <div className="anime-content-synopsis-content">
                {anime.sinopse}
            </div>
            <div className="anime-content-episode">
                <div className="current-episode">EP 01</div>
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
        </>
    )
}
