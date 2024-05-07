"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SingleExperimentBox from "./singleExperimentBox";
import Image from "next/legacy/image";
import SearchComponent from "../search/search-component";

const ExperimentPageComponent = ({ url }) => {
  const [result, setResult] = useState([-1]);
  const [btns, setBtns] = useState([-1]);
  const [pgn, setPgn] = useState(url.pgn ? `pgn=${url.pgn}` : "pgn=20");
  const [pn, setPn] = useState(url.pn ? `&pn=${url.pn}` : "&pn=1");
  const [searchedExperimentsNumber, setSearchedExperimentsNumber] = useState(0);
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/experiment/search-experiments?${pgn}${pn}${keyword}`
      )
      .then((d) => {
        setResult(d.data.allExperiments);
        setBtns(d.data.btns);
        setSearchedExperimentsNumber(d.data.experimentsNumber);
      })
      .catch((err) => console.log("خطا!"));
  }, [pn, keyword]);

  return (
    <div className="flex flex-col gap-6 p-2">
      <section className="flex justify-center md:justify-between items-center gap-8 my-6 mx-2 flex-wrap">
        <div className="flex justify-center md:justify-start items-center gap-4">
          <h1 className="text-center text-base md:text-xl text-indigo-600">
            آزمایش ها
          </h1>
          <div className="flex justify-center items-center text-center h-8 rounded text-sm border-2 border-indigo-500 p-1">
            {searchedExperimentsNumber} آزمایش
          </div>
        </div>
        <SearchComponent searchIn={"experiments"} />
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
              آزمایشی موجود نیست!
            </div>
          ) : (
            <div className="flex flex-col justify-center md:justify-between items-center gap-2 p-1">
              {result.map((da, i) => (
                <div className="w-full" key={i}>
                  <SingleExperimentBox index={i} itemData={da} />
                </div>
              ))}
            </div>
          )}
        </div>
        <section className="flex justify-center items-center gap-2">
          {btns[0] == -1 ? (
            <div className="flex justify-center items-center p-12">
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
                    ? "rounded-full w-6 h-6 bg-indigo-800 text-white flex justify-center items-center transition-all duration-300 hover:bg-orange-500"
                    : "rounded-full w-6 h-6 bg-indigo-600 text-white flex justify-center items-center transition-all duration-300 hover:bg-orange-500"
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

export default ExperimentPageComponent;
