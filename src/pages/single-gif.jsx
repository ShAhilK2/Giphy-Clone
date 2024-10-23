import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import {
  HiMiniChevronDoubleDown,
  HiMiniChevronDoubleUp,
  HiMiniHeart,
} from "react-icons/hi2";
import FollowOn from "../components/follow-on";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "texts"];

function SingleGif() {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifts] = useState([]);
  const [readmore, setReadMore] = useState(false);

  const { gf, favorites, setFavorites, addToFavorites } = GifState();

  const fetchGifs = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setGif(data);
    setRelatedGifts(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    fetchGifs();
  }, [type]);

  const shareGif = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: gif.title,
          text: `Check out this GIF: ${gif.title}`,
          url: gif.url,
        });
      } catch (error) {
        console.error("Error sharing GIF:", error);
      }
    } else {
      alert(
        "Sharing is not supported in your browser. You can copy the link: " +
          gif.url
      );
    }
  };

  const EmbedGif = () => {
    const embedCode = `<iframe src="${gif.url}" width="480" height="360" frameBorder="0" allowFullScreen></iframe>`;
    navigator.clipboard
      .writeText(embedCode)
      .then(() => {
        alert("Embed code copied to clipboard:\n" + embedCode);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block col-span-1">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="text-gray-200">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readmore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 59) + "...."}
                <div
                  className="flex items-center text-gray-200 cursor-pointer"
                  onClick={() => setReadMore(!readmore)}
                >
                  {readmore ? (
                    <>
                      Read less <HiMiniChevronDoubleUp size={20} />
                    </>
                  ) : (
                    <>
                      Read More <HiMiniChevronDoubleDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <FollowOn />
        <div className="w-full h-0.5 my-6 bg-gray-800"></div>

        {gif?.source && (
          <div>
            <span className="text-gray-300">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a
                href={`${gif?.source}`}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate"
              >
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-3/4">
            <div className="text-gray-200 truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="text-gray-200">@{gif?.user?.username}</div>
              </div>
              <button className="ml-auto">
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavorites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favorites.includes(gif.id) ? "text-red-500" : ""
                }`}
              />
              Favorite
            </button>
            <button
              onClick={shareGif}
              className="flex gap-6 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              onClick={EmbedGif}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>
        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
            {relatedGifs.map((gif) => {
              return <Gif gif={gif} key={gif.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleGif;
