import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import Home from "./pages/home";
import Category from "./pages/category";
import Search from "./pages/search";
import Gif from "./pages/single-gif";
import Favorites from "./pages/favourties";
import "./index.css"; // Adjust the path as necessary
import GifProvider from "./context/gif-context";
import SingleGif from "./pages/single-gif";

//homepage
//categories
//search
//single gif
//favourites

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <Category />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/:type/:slug",
        element: <SingleGif />,
      },
      {
        path: "/favourites",
        element: <Favorites />,
      },
    ],
  },
]);
function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;
