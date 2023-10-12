import { useState } from "react";
import Star from "./Star";

const container = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const textStyle = {
  lineHeight: "0",
  margin: "0",
  color: "#000",
  fontSize: "1.5rem",
};

const rateStyle = {
  display: "flex",
};

function StarRating({ maxLength = 5, defaultValue = 0, onMovieRating }) {
  const [rate, setRate] = useState(defaultValue);
  const [tempRating, setTempRating] = useState(0);

  function handleRate(rating) {
    setRate(rating);
    onMovieRating(rating);
  }

  return (
    <div style={container}>
      <div style={rateStyle}>
        {Array.from({ length: maxLength }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRate(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rate >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rate || ""}</p>
    </div>
  );
}

export default StarRating;
