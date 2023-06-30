import { Link } from 'react-router-dom'
import './Card.css'
import PropTypes from 'prop-types'

export function Card({ anime }) {
    return (
        <Link to={`/anime/${anime.id}`}>
            <div className="card">
                <div className="card-img">
                    <img src={anime.urlCapa} />
                </div>
                <div className="card-title">{anime.nome}</div>
            </div>
        </Link>
    )
}

Card.propTypes = {
    anime: PropTypes.shape({
        urlCapa: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
    }).isRequired,
}
