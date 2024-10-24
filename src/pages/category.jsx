import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import FollowOn from "../components/follow-on";

function Category() {
  const [categoryResults, setCategoryResults] = useState([]);

  const { category } = useParams();
  const { gf } = GifState();

  const fetchCategoryResults = async () => {
    const { data } = await gf.gifs(category, category);
    setCategoryResults(data);
  };

  useEffect(() => {
    fetchCategoryResults();
  }, [category]);
  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4 ">
      <div className="w-full sm:w-72">
        {categoryResults.length > 0 && (
          <Gif gif={categoryResults[0]} hover={false} />
        )}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me,GIF it to me!
        </span>
        <FollowOn />
        <div className="w-full h-0.5 my-6 bg-gray-800"></div>
      </div>

      <div className="text-4xl pb-1 font-extrabold capitalize">
        <h2>{category.split("-").join(" & ")} GIFs</h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>
        {categoryResults.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
            {categoryResults.slice(1).map((cat) => {
              return <Gif gif={cat} key={cat.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
