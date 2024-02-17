"use client";
import SearchComponent from "../search-component";

const ExperimentsSearch = () => {
  return (
    <div className="flex w-full flex-col gap-2 relative pt-10">
      <>
        <title>جستجو در آزمایش ها</title>
        <meta name="description" content="جستجو در آزمایش ها" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="http://localhost:3000/search" />
      </>
      <h3 className="text-lg absolute top-1 right-1 ">جستجو در آزمایش ها</h3>
      <SearchComponent searchIn={"experiments"} />
    </div>
  );
};

export default ExperimentsSearch;
