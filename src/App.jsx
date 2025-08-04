// import { useEffect, useState } from "react";
// import Search from "./components/search.jsx";
// import Spinner from "./components/spinner.jsx";

// const API_BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY

// const API_OPTIONS = {
//   method : 'GET',
//   headers:{
//     accept: 'application/json',
//     authorization: `Bearer ${API_KEY}`
//   }
// }

// const App = () => {  
//   const [searchTerm, setSearchTerm] = useState('');
//   const [erroMessage, setErrorMessage] = useState('');
//   const [movieList, setmovieList] = useState([]);
//   const [isLoading, setisLoading] = useState(false);

//   const fetchmovies = async() =>{
//     setisLoading(true);
//     setErrorMessage('');

//     try{
//       const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

//       const response = await fetch(endpoint, API_OPTIONS);

//       if(!response.ok) {
//         throw new Error('Failed to fetch movies');
//       }

//       const data = await response.json();

//       if(data.response == 'False'){
//         setErrorMessage(data.Error || 'Failed to Fetch movies');
//         setmovieList([]);
//         return;
//       }      

//       setmovieList(data.result || []);
//     } catch (error) {
//       console.error(`Error fetching movies:  ${error}`);
//       setErrorMessage(`Error fetching movies. please try again later.`);
//     } finally {
//       setisLoading (false);
//     }
//   } 
  
//   useEffect( ()  => {
//     fetchmovies();
//      }, [] );
  
//   return (
//     <main>
//       <div className="pattern" />

//       <div className="wrapper">
//         <header>
//           <img src="./hero.png" alt="Hero Banner" />
//           <h1>
//             find <span className="text-gradient">movies</span> you'll enjoy without the hassle
//           </h1>
        
//         <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//        </header>

//        <section className="all-movies">
//         <h2 className="mt-[20px]">All Movies</h2>

//         {isLoading ? (
//           <Spinner />
//         ) : erroMessage ? (
//           <p className="text-red-500">{erroMessage}</p>
//         ) :(
//           <ul>
//             {movieList.map((movie) => (
//               <moviecard  key={movie.id} movie={movie} />
//             ))}
//           </ul>
//         )
//         } 
       
//        </section>
//         <h1></h1>
//       </div>
//     </main>
//   );
// };

// export default App;


import { useEffect, useState } from "react";
import Search from "./components/search.jsx";
import Spinner from "./components/spinner.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}` // Changed 'authorization' to 'Authorization'
  }
}

const App = () => {  
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async() => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Add API key as query parameter as backup
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
      
      console.log('Fetching from:', endpoint); // Debug log
      console.log('API Key exists:', !!API_KEY); // Debug log
      
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Debug log

      setMovieList(data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  } 
  
  useEffect(() => {
    fetchMovies();
  }, []);
  
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
            <div className="movie-list">
              {movieList.length > 0 ? (
                movieList.map((movie) => (
                  <div key={movie.id} className="movie-item">
                    <p className="text-white">{movie.title}</p>
                  </div>
                ))
              ) : (
                <p className="text-white">No movies found</p>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
