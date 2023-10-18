import WachedListItem from "../wached-list-item/WachedListItem";

function WachedList({ watched, onRemoveWachedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WachedListItem
          movie={movie}
          key={movie.imdbID}
          onRemoveWachedMovie={onRemoveWachedMovie}
        />
      ))}
    </ul>
  );
}

export default WachedList;
