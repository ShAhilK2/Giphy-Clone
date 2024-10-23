import React, { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import { useParams } from "react-router-dom";
import FilterGif from "../components/filter-gif";
import Gif from "../components/gif";

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const { gf, filterGifs } = GifState();
  const { query } = useParams();

  const fetchSearchResults = async () => {
    const { data } = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filterGifs,
      limit: 20,
    });

    setSearchResults(data);
  };
  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-5 font-extrabold ">{query}</h2>
      <FilterGif alignLeft={true} />

      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResults.map((gif) => {
            return <Gif gif={gif} key={gif.id} />;
          })}
        </div>
      ) : (
        <span>
          No Gifs found for {query}. Try Searching For Stickers instead?{" "}
        </span>
      )}
    </div>
  );
}

export default Search;
