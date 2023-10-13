import { useEffect, useState } from "react";

import StarRating from "./../../StarRating";
import Spinner from "../spinner/Spinner";

function SelectedMovie({ id, apiKey, onCloseMovieDetail, onAddWachedMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setMovie({});
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

  console.log(Object.keys(movie).length);
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
              <StarRating maxLength={10} size={26} />
              <button className="btn-add">Add wached list</button>
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
