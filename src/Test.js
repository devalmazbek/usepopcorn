import { useState } from "react";
import StarRating from "./StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating
        maxLength={10}
        defaultValue={5}
        onMovieRating={setMovieRating}
      />
      <p style={{ fontSize: "1.5rem", color: "#000" }}>
        The movie was rated {movieRating} star
      </p>
    </div>
  );
}

export default Test;
