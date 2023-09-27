import WachedListItem from "../wached-list-item/WachedListItem";

function WachedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WachedListItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default WachedList;
