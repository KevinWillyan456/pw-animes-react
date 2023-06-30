import './AnimeContent.css'

export function AnimeContent({ anime }) {
    return (
        <>
            <h1 className="title">{anime.nome}</h1>
            <h2 className="title-synopsis">Sinopse</h2>
            <div className="synopsis-content">{anime.sinopse}</div>
        </>
    )
}
