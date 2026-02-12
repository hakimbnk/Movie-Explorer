import { X, Calendar, Star, Youtube } from 'lucide-react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
    if (!movie) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-header">
                    {movie.image && (
                        <img src={movie.image} alt={movie.title} className="modal-poster" />
                    )}
                    <div className="modal-info">
                        <h2 className="modal-title">{movie.title}</h2>

                        <div className="modal-meta">
                            <div className="meta-item">
                                <Calendar size={18} className="meta-icon" />
                                <span>{movie.release_date}</span>
                            </div>
                            <div className="meta-item">
                                <Star size={18} className="meta-icon star" />
                                <span>{movie.rating ? movie.rating.toFixed(1) : "N/A"}/10</span>
                            </div>
                        </div>

                        <p className="modal-overview">{movie.overview}</p>

                        {movie.trailer_url && (
                            <a
                                href={movie.trailer_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="trailer-btn"
                            >
                                <Youtube size={20} />
                                Voir Trailer
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
