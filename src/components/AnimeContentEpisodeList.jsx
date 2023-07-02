export function AnimeContentEpisodeList({
    buttonClass,
    episodio,
    gerenciarEpisodioButton,
}) {
    return (
        <>
            <li>
                <button
                    className={buttonClass}
                    onClick={() => gerenciarEpisodioButton(episodio)}
                >
                    {`EP ${episodio.episodioId}`}
                </button>
            </li>
        </>
    )
}
