import { useEffect, useState } from "react";
import Search from "./components/search.jsx";
import Spinner from "./components/spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";


const API_BASE_URL =  'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method : 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
 }
}

const App = () => {  
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  //Debounce the search term to prevent making to many API request
  // by waiting for the user  to stop typing for 500ms
 
  useDebounce(() => setDebouncedSearchTerm(searchTerm),500,[searchTerm])

  const fetchmovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage("");

    try{
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${query}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if(data.response == 'False'){
        setErrorMessage(data.Error || 'Failed to Fetch movies');
        setMovieList([]);
        return;
      }      

      setMovieList(data.results || []);
    } catch (Error) {
      console.error("Error fetching movies:", Error);
      setErrorMessage("Error fetching movies. please try again later.");
    } finally {
      setIsLoading (false);
    }
  };
  
  useEffect( ()  => {
    fetchmovies(debouncedSearchTerm);
     }, [debouncedSearchTerm] );
  
  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            find <span className="text-gradient">movies</span> you'll enjoy without the hassle
          </h1>
        
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
       </header>

       <section className="all-movies">
        <h2 className="mt-[20px]">All Movies</h2>

        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <ul>
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )
        } 
       </section>
        <h1></h1>
      </div>
    </main>
  );
};

export default App;
