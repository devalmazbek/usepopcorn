import { useRef } from "react";
import { useKey } from "../../../useKey";

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  // useEffect(
  //   function () {
  //     function callback(e) {
  //       if (document.activeElement === inputEl.current) return;

  //       if (e.code === "Enter") {
  //         inputEl.current.focus();
  //         setQuery("");
  //       }
  //     }

  //     document.addEventListener("keydown", callback);
  //     return () => document.removeEventListener("keydown", callback);
  //   },

  //   [setQuery]
  // );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      ref={inputEl}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
