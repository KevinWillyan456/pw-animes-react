import PropTypes from 'prop-types'

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
                    {`EP ${episodio.episodioNumero}`}
                </button>
            </li>
        </>
    )
}

AnimeContentEpisodeList.propTypes = {
    buttonClass: PropTypes.string.isRequired,
    episodio: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        episodioNumero: PropTypes.number.isRequired,
        episodioUrl: PropTypes.string.isRequired,
        episodioTipo: PropTypes.string.isRequired,
    }).isRequired,
    gerenciarEpisodioButton: PropTypes.func.isRequired,
}
