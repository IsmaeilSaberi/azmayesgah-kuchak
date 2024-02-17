"use client";
import Image from "next/legacy/image";
import Link from "next/link";


const SingleExperimentBox = ({ itemData, index }) => {
  return (
    <article className="transition-all duration-200 hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row gap-0 md:gap-2 justify-between items-center h-60 md:h-44 border-[0.05rem] border-indigo-500 w-full bg-white rounded-md shadow-md hover:shadow-xl p-1">
        <div className="flex flex-col text-base gap-2 md:w-[70%]">
          <Link
            className="flex gap-1 justify-start items-start hover:text-indigo-500"
            href={`/experiments/${itemData.slug}`}
            // target="_blank"
          >
            <h3 className="line-clamp-2">
              {index + 1}. {itemData.title}
            </h3>
          </Link>
        </div>
        <div className="flex items-center justify-center p-1">
          <Link
            className="w-full flex justify-end items-center"
            href={`/experiments/${itemData.slug}`}
            target="_blank"
          >
            <Image
              className=""
              alt={itemData.imageAlt}
              title={itemData.title}
              width={180}
              height={120}
              src={itemData.image}
            />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SingleExperimentBox;
