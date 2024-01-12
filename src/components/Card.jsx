import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './Card.css'

export function Card({ anime }) {
    return (
        <Link to={`/anime/${anime._id}`}>
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
        _id: PropTypes.string.isRequired,
        urlCapa: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
    }).isRequired,
}
