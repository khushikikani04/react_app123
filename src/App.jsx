
import { useEffect, useState } from "react";
import Search from "./components/search.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json', // Fixed: application.json → application/json
    authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Fixed typo: ErroMessage → errorMessage
  const [movies, setMovies] = useState([]); // Added movies state

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/popular`, API_OPTIONS);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies. Please try again later.`);
    }
  };

  // ✅ FIXED LINE 30 - Correct useEffect syntax:
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            find <span className="text-gradient">movies</span> you'll enjoy without the hassle
          </h1>
          
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>
          
          {errorMessage && <p className="error">{errorMessage}</p>}
          
          <div className="movies-grid">
            {movies.map(movie => (
              <div key={movie.id} className="movie-card">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>Rating: {movie.vote_average}/10</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;
