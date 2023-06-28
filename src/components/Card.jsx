import './Card.css'
import PropTypes from 'prop-types'

export function Card({ anime }) {
    return (
        <div className="card">
            <div className="card-img">
                <img src={anime.urlCapa} />
            </div>
            <div className="card-title">{anime.nome}</div>
        </div>
    )
}

Card.propTypes = {
    anime: PropTypes.shape({
        urlCapa: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
    }).isRequired,
}
