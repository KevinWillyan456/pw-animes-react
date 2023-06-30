import './AnimeContent.css'

export function AnimeContent({ anime }) {
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
                        src="https://purchaseway-animes-node.kevinsouza456.repl.co/resources/img/age-12.png"
                        alt="age"
                    />
                </div>
            </div>
        </>
    )
}
