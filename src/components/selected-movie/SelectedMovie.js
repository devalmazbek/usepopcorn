import { useEffect, useState } from "react";

import StarRating from "./../../StarRating";
import Spinner from "../spinner/Spinner";

function SelectedMovie({
  id,
  apiKey,
  onCloseMovieDetail,
  onAddWachedMovies,
  watched,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [movieRate, setMovieRate] = useState("");

  useEffect(function () {
    function closeDetail(e) {
      if (e.code === "Escape") {
        onCloseMovieDetail();
      }
    }

    document.addEventListener("keydown", closeDetail);

    return function () {
      document.removeEventListener("keydown", closeDetail);
      console.log("close");
    };
  });

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          if (id) {
            const response = await fetch(
              `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`
            );
            const data = await response.json();
            setMovie(data);
          }
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      getMovieDetails();
    },
    [id]
  );

  useEffect(
    function () {
      if (!movie.Title) return;
      else {
        document.title = `Movie|${movie.Title}`;
      }

      return function () {
        document.title = "usePopcorn";
      };
    },
    [movie.Title]
  );

  function handleAddMovie() {
    const wachetMovie = {
      imdbID: id,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.slice(0, 2)),
      userRating: movieRate,
    };

    onAddWachedMovies(wachetMovie);
  }

  console.log(movie.title);

  const isRated = watched.map((movie) => movie.imdbID).includes(id);
  const rate = watched.map((movie) => {
    let currentRating;
    if (movie.imdbID === id) {
      currentRating = movie.userRating;
    }
    return currentRating;
  });

  console.log(rate);

  return (
    <>
      {isLoading && <Spinner />}
      {Object.keys(movie).length !== 0 ? (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovieDetail}>
              &larr;
            </button>
            <img src={movie.Poster} alt={movie.Title} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>Rating ⭐ {movie.imdbRating}</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isRated ? (
                <>
                  <StarRating
                    maxLength={10}
                    size={26}
                    onMovieRating={setMovieRate}
                  />
                  {movieRate && (
                    <button className="btn-add" onClick={handleAddMovie}>
                      Add wached list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  The movie is rated! <span>{rate}</span>
                </p>
              )}
            </div>
            <p>{movie.Plot}</p>
            <p>Starring: {movie.Actors}</p>
            <p>Directed by: {movie.Director}</p>
          </section>
        </div>
      ) : (
        <h3>no selected movie</h3>
      )}
    </>
  );
}

export default SelectedMovie;
