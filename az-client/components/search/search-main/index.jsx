"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

import ExperimentsSearch from "../experiments-search";


const SearchMainComponent = ({ items }) => {
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));

  //TAB
  const [details, setDetails] = useState(<ExperimentsSearch />);
  useEffect(() => {
    if (items.slug[0] == "experiments") {
      setDetails(<ExperimentsSearch />);
    } else if (items.slug[0] == "posts") {
      setDetails(<PostsSearch cookie={auth_cookie} />);
    } else {
      setDetails(<ExperimentsSearch />);
    }
  }, [items.slug[0]]);

  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-1 p-1">
      <div
        className={
          "z-40 justify-center items-center w-2/3 md:w-52 flex md:sticky md:top-1 md:right-0 md:bottom-8 bg-zinc-100"
        }
      >
        <nav className="flex justify-center items-start mt-2 md:mt-0 w-full p-2">
          <ul className="flex flex-col justify-center items-center gap-4 w-full">
            <li className="w-full">
              <Link
                onClick={() => {
                  goToTop();
                }}
                className={
                  items.slug[0] == "experiments"
                    ? "w-full md:w-40 h-8 md:h-12 text-base md:text-lg rounded flex justify-center items-center bg-indigo-800 text-yellow-500 border-[0.15rem] border-rose-500 transition-all duration-200 hover:bg-indigo-700"
                    : "w-full md:w-40 h-8 md:h-12 text-base md:text-lg rounded flex justify-center items-center bg-indigo-600 text-white transition-all duration-200 hover:bg-indigo-700"
                }
                href={"/search/experiments"}
              >
                جستجو در آزمایش ها
              </Link>
            </li>
            <li className="w-full">
              <Link
                onClick={() => {
                  goToTop();
                }}
                className={
                  items.slug[0] == "posts"
                    ? "w-full md:w-40 h-8 md:h-12 text-base md:text-lg rounded flex justify-center items-center bg-indigo-800 text-yellow-500 border-[0.15rem] border-rose-500 transition-all duration-200 hover:bg-indigo-700"
                    : "w-full md:w-40 h-8 md:h-12 text-base md:text-lg rounded flex justify-center items-center bg-indigo-600 text-white transition-all duration-200 hover:bg-indigo-700"
                }
                href={"/search/posts"}
              >
                جستجو در مقالات
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-2 w-full bg-zinc-100 rounded mt-4 md:mt-0">
        {details}
      </div>
    </div>
  );
};

export default SearchMainComponent;
