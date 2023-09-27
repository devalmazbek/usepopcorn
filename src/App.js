import { useState } from "react";

import Navbar from "./components/header/Navbar";
import Main from "./components/main/Main";
import Result from "./components/header/result/Result";
import WachedSummary from "./components/wached-summary/WachedSummary";
import Box from "./components/box/Box";

import { tempMovieData, tempWatchedData } from "./data";
import WachedList from "./components/wached-list/WachedList";
import MovieList from "./components/movie-list/MovieList";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Navbar>
        <Result movies={movies} />
      </Navbar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WachedSummary watched={watched} />
          <WachedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
