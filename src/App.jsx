import { useState, useEffect } from "react";
import './App.css'
import { AnimatedBackground } from "./components/AnimatedBackground";
import SearchBar from "./components/searchbar";
import MovieCard from "./components/moviecard";
import MovieModal from "./components/MovieModal";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("http://127.0.0.1:5000/api/movies")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching movies:", err);
        setError("Impossible de charger les films. Vérifiez que le backend est lancé.");
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    fetch(`http://127.0.0.1:5000/api/movies/search?q=${query}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error searching movies:", err);
        setError("Erreur lors de la recherche. Réessayez plus tard.");
        setLoading(false);
      });
  };

  const handleMovieClick = (movie) => {
    fetch(`http://127.0.0.1:5000/api/movies/${movie.id}`)
      .then(res => res.json())
      .then(data => setSelectedMovie(data))
      .catch(err => console.error("Error fetching details:", err));
  };

  return (
    <div className="app">
      <AnimatedBackground />

      <div className="content-wrapper">
        <header className="header">
          <h1 className="app-title">Movie Explorer</h1>
          <p className="app-subtitle">Découvrez votre prochaine aventure cinématographique</p>
        </header>

        <SearchBar
          value={query}
          onChange={e => setQuery(e.target.value)}
          onSearch={handleSearch}
        />

        {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', margin: '1rem' }}>{error}</div>}

        {loading ? (
          <div className="loading">Chargement...</div>
        ) : (
          <div className="movie-grid">
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleMovieClick}
              />
            ))}
          </div>
        )}
      </div>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}

export default App
