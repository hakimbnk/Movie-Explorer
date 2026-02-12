import { Star } from 'lucide-react';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
    return (
        <div className="movie-card" onClick={() => onClick(movie)}>
            <div className="movie-poster-wrapper">
                {movie.image ? (
                    <img src={movie.image} alt={movie.title} className="movie-poster" />
                ) : (
                    <div className="no-image">Pas d'image</div>
                )}
                <div className="movie-overlay">
                    <button className="details-btn">Voir détails</button>
                </div>
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-rating">
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <span>{movie.rating ? movie.rating.toFixed(1) : "N/A"}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
