import { useEffect, useState } from "react";
import Search from "./components/search.jsx";

//API

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect( effect: () => {

  }, deps: []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            find <span className="text-gradient">movies</span> you'll enjoy without the hassle
          </h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1></h1>
      </div>
    </main>
  );
};

export default App;
