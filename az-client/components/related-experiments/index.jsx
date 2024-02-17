"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleExperimentBox from "../experiment-page/singleExperimentBox";
import Image from "next/legacy/image";

const RelatedExperiments = ({ related }) => {
  const [relatedExperiments, setRelatedExperiments] = useState([-1]);

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}experiment/get-related-experiments-by-ids`,
        { goalIds: related }
      )
      .then((d) => {
        setRelatedExperiments(d.data);
      })
      .catch((error) => console.log(""));
  }, [related]);

  return (
    <ul className="flex flex-col gap-2">
      {relatedExperiments == -1 ? (
        <div className="w-full flex justify-center items-center p-12">
          <Image alt="loading" width={120} height={120} src={"/loading.svg"} />
        </div>
      ) : relatedExperiments.length < 1 ? (
        <div className="flex justify-center items-center p-4">
          محتوای مرتبطی موجود نیست!
        </div>
      ) : (
        relatedExperiments.map((dow, i) => (
          <li key={i}>
            <SingleExperimentBox index={i} itemData={dow} />
          </li>
        ))
      )}
    </ul>
  );
};

export default RelatedExperiments;
