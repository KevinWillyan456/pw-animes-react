export function AnimeContentEpisodeList({
    anime,
    selectedEpisode,
    gerenciarEpisodioButton,
}) {
    return (
        <>
            {anime.episodios.map((episodio) => {
                const buttonClass =
                    episodio.episodioId === selectedEpisode ? 'selected' : ''

                return (
                    <li key={episodio.episodioId}>
                        <button
                            className={buttonClass}
                            onClick={() => gerenciarEpisodioButton(episodio)}
                        >
                            {`EP ${episodio.episodioId}`}
                        </button>
                    </li>
                )
            })}
        </>
    )
}
