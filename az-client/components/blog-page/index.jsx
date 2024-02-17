"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogBox from "../blogs/blogbox";
import Image from "next/image";

const BlogPageComp = ({ url }) => {
  const [result, setResult] = useState([-1]);
  const [btns, setBtns] = useState([-1]);
  const [pgn, setPgn] = useState(url.pgn ? `pgn=${url.pgn}` : "pgn=4");
  const [pn, setPn] = useState(url.pn ? `&pn=${url.pn}` : "&pn=1");
  const [searchedPostsNumber, setSearchedPostsNumber] = useState(0);
  const [keyword, setKeyword] = useState(
    url.keyword ? `&keyword=${unescape(url.keyword)}` : ""
  );

  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setResult([-1]);
    setBtns([-1]);
    setKeyword(
      url.keyword && url.keyword.length > 0
        ? `&keyword=${unescape(url.keyword)}`
        : ""
    );
  }, [url.keyword]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/search-posts?${pgn}${pn}${keyword}`
      )
      .then((d) => {
        setResult(d.data.allPosts);
        setBtns(d.data.btns);
        setSearchedPostsNumber(d.data.postsNumber);
      })
      .catch((err) => console.log("خطا!"));
  }, [pn, keyword]);

  return (
    <div className="flex flex-col m-2 rounded gap-8 border-[0.1rem] border-[#23b17d]">
      <section className="flex justify-center md:justify-between items-center gap-8 my-8 mx-2 flex-wrap">
        <div className="flex justify-center md:justify-start items-center gap-4">
          <h1 className="text-center text-base md:text-xl text-indigo-600">
            وبلاگ فروشگاه مدرسه اکسل
          </h1>
          <div className="w-20 flex justify-center items-center text-center h-8 rounded text-base sm:text-sm border-2 border-indigo-500">
            {searchedPostsNumber} مقاله
          </div>
        </div>
      </section>
      <div className=" flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          {result[0] == -1 ? (
            <div className="flex justify-center items-center p-12">
              <Image
                alt="loading"
                width={120}
                height={120}
                src={"/loading.svg"}
              />
            </div>
          ) : result.length < 1 ? (
            <div className="flex justify-center items-center w-full p-8">
              پستی موجود نیست!
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 p-4">
              {result.map((post, i) => (
                <div key={i}>
                  <BlogBox data={post} />
                </div>
              ))}
            </div>
          )}
        </div>
        <section className="flex justify-center items-center gap-4 flex-wrap p-1">
          {btns[0] == -1 ? (
            <div className="flex justify-center items-center p-12 w-full">
              <Image
                alt="loading"
                width={50}
                height={50}
                src={"/loading.svg"}
              />
            </div>
          ) : (
            btns.map((b, i) => (
              <button
                key={i}
                onClick={() => {
                  if (pn == `&pn=${b + 1}`) {
                    goToTop();
                  } else {
                    setPn(`&pn=${b + 1}`);
                    goToTop();
                    setResult([-1]);
                  }
                }}
                className={
                  pn == `&pn=${b + 1}`
                    ? "w-8 h-8 rounded-full border-2 bg-indigo-400 text-white border-indigo-500 transition-all duration-200 hover:bg-indigo-200"
                    : "w-8 h-8 rounded-full border-2 border-indigo-500 transition-all duration-200 hover:bg-indigo-200"
                }
              >
                {b + 1}
              </button>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default BlogPageComp;
