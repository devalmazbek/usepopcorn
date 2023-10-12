import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";

function SelectedMovie({ id, apiKey }) {
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
        <div>
          <div className="img">
            <img src={movie.Poster} alt="sdfsdfsdf" />
          </div>
          <div className="content">
            <h2>{movie.Title}</h2>
          </div>
        </div>
      ) : (
        <h3>no selected movie</h3>
      )}
    </>
  );
}

export default SelectedMovie;
