"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";

const SearchComponent = ({ searchIn }) => {
  const searchRef = useRef();
  const router = useRouter();

  const Searcher = (e) => {
    e.preventDefault();
    if (searchRef.current.value.length > 0) {
      let url = "";
      if (searchIn == "experiments") {
        url = `/${searchIn}?keyword=${escape(
          searchRef.current.value.replace(/\s+/g, "_")
        )}`;
      } else if (searchIn == "posts") {
        url = `/shop?&keyword=${escape(
          searchRef.current.value.replace(/\s+/g, "_")
        )}`;
      } 

      router.push(url);
      searchRef.current.value = "";
    } else {
      toast.error("فرم جستجو خالی است.", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="mx-8">
      <form
        onSubmit={Searcher}
        className="relative border-zinc-700 border-2 p-2 rounded-md flex justify-between items-center"
      >
        <input
          type="text"
          ref={searchRef}
          className="bg-transparent px-2 py-1 text-sm outline-none w-64 md:w-70"
          placeholder={`جستجو در ${
            searchIn == "experiments"
              ? "آزمایش ها"
              : "مقالات"
          } ... `}
        />
        <button className="w-12 absolute left-0" type="submit">
          <AiOutlineSearch className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
