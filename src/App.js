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

import Spinner from "./components/spinner/Spinner";
// import { tempMovieData, tempWatchedData } from "./data";

const KEY = "653a9256";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() =>
    JSON.parse(localStorage.getItem("wached"))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

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

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!response.ok) {
            throw new Error("Something gone wrong with getting movies");
          }

          const data = await response.json();

          if (data.Response === "False") throw new Error("Movie not found");
          console.log(data);

          setMovies(data.Search);
        } catch (err) {
          console.log(err);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("Please write correct name");
        return;
      }

      fetchMovies();
      handleCloseMovieDetails();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  useEffect(
    function () {
      localStorage.setItem("wached", JSON.stringify(watched));
    },
    [watched]
  );

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
