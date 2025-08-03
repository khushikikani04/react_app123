import { useEffect, useState } from "react";
import Search from "./components/search.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method : 'GET',
  headers:{
    accept: 'application.json',
    authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [erroMessage, setErrorMessage] = useState('');

  const fetchmovies = async() =>{
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok) {
        throw new error('Failed to fetch movies');
      }

      const data = await response.json();

      console.log(data)
    } catch (error) {
      console.error(`Error fetching movies:  ${error}`);
      setErrorMessage(`Error fetching movies. please try again later.`)
    }
  } 
  
  useEffect( ()  => {
     }, [] );
  
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
        
        {erroMessage && <p className="text-red-500">{erroMessage}</p>}
       </section>
        <h1></h1>
      </div>
    </main>
  );
};

export default App;
