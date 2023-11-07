import { useState, useEffect } from "react";

import Navbar from "./components/header/Navbar";
import Main from "./components/main/Main";
import Result from "./components/header/result/Result";
import WachedSummary from "./components/wached-summary/WachedSummary";
import Box from "./components/box/Box";
import WachedList from "./components/wached-list/WachedList";
import MovieList from "./components/movie-list/MovieList";
import Error from "./components/error/Error";
import Search from "./components/header/search/Search";
import SelectedMovie from "./components/selected-movie/SelectedMovie";

import { useMovies } from "./useMovies";
import Spinner from "./components/spinner/Spinner";
import { useLocalStorage } from "./useLocalStorage";
// import { tempMovieData, tempWatchedData } from "./data";

const KEY = "653a9256";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(
    query,
    handleCloseMovieDetails
  );

  const [watched, setWatched] = useLocalStorage([], "watched");

  function handleCloseMovieDetails() {
    setSelectedId(null);
  }

  function handleAddWachedMovies(movie) {
    setWatched([...watched, movie]);
    setSelectedId(null);
  }

  function handleRemoveWachedMovie(id) {
    setWatched((watched) => {
      return watched.filter((movie) => movie?.imdbID !== id);
    });
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <Result movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Spinner />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={setSelectedId} />
          )}
          {error && <Error message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              id={selectedId}
              apiKey={KEY}
              onCloseMovieDetail={handleCloseMovieDetails}
              onAddWachedMovies={handleAddWachedMovies}
              watched={watched}
            />
          ) : (
            <>
              <WachedSummary watched={watched} />
              <WachedList
                watched={watched}
                onRemoveWachedMovie={handleRemoveWachedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
