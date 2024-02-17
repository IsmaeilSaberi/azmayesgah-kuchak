"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

import { BiMenu } from "react-icons/bi";
import { toast } from "react-toastify";

// USING CONTEXT
import { useAppContext } from "../../context/app-context";
import HeaderUser from "../auth/header-user";

import axios from "axios";

const Header = () => {
  const [categories, setcategories] = useState([]);

  // CONTEXT OF CARTNUMBER AND DISPLAYNAME
  const { displayName } = useAppContext();

  const router = useRouter();

  const searchRef = useRef();

  //FOR RESPONSIVE
  const [menuIsOpen, setMenuIsOpen] = useState(-1);

  useEffect(() => {
    if (menuIsOpen == -1) {
      document.body.style.overflow = "auto";
    } else if (menuIsOpen == 1) {
      document.body.style.overflow = "hidden";
    }
  }, [menuIsOpen]);

  return (
    <header className="container mx-auto md:border-[0.1px] border-[#548CFF] rounded my-2 h-[12vh] md:h-[24vh] relative z-50 text-[#7900FF]">
      <div
        className={
          menuIsOpen == -1
            ? "flex bg-gray-600 md:bg-transparent w-full h-[100vh] md:h-44 py-1 md:px-2 fixed top-0 bottom-0 -left-[100%] md:left-0 right-[100%] md:right-0 md:absolute transition-all duration-500"
            : "flex md:bg-transparent backdrop-blur-3xl w-full h-[100vh] md:h-44 py-1 md:px-2 fixed top-0 bottom-0 right-0 left-0 md:absolute transition-all duration-500"
        }
      >
        <div className="flex flex-col rounded-sm md:flex-row justify-start items-center md:items-center md:justify-between gap-8 w-full">
          <div className="flex flex-col gap-2 justify-center">
            <nav className="flex flex-col md:flex-row justify-between items-center w-full">
              <ul className="flex text-sm flex-col flex-wrap md:flex-row justify-between gap-4 md:gap-2 items-center">
                <li className="rounded-full  w-52 z-40 p-1 border-purple-300 border-[0.1rem] bg-[#7900FF] text-white hover:text-[#b12357]  text-center hover:shadow-gray-300 transition-all duration-200 hover:shadow-xl">
                  <HeaderUser
                    setMenuIsOpen={setMenuIsOpen}
                    displayName={displayName}
                  />
                </li>
                <li className="rounded-full  w-36 z-40 p-1 border-purple-300 border-[0.1rem] bg-[#7900FF] text-white hover:text-[#b12357]  text-center hover:shadow-gray-300 transition-all duration-200 hover:shadow-xl">
                  <Link
                    className="border-purple-300 border-[0.1rem] h-9 rounded-full px-1 flex justify-center items-center transition-all duration-200 hover:bg-[#9fe2a6] "
                    href={"/"}
                    onClick={() => setMenuIsOpen(-1)}
                  >
                    خانه
                  </Link>
                </li>
                <li className="rounded-full  w-36 z-40 p-1 border-purple-300 border-[0.1rem] bg-[#7900FF] text-white hover:text-[#b12357]  text-center hover:shadow-gray-300 transition-all duration-200 hover:shadow-xl">
                  <Link
                    className="border-purple-300 border-[0.1rem] h-9 rounded-full px-1 flex justify-center items-center transition-all duration-200 hover:bg-[#9fe2a6] "
                    href={"/account/healthparameters"}
                    onClick={() => setMenuIsOpen(-1)}
                  >
                    آزمایش های من
                  </Link>
                </li>
                <li className="rounded-full  w-36 z-40 p-1 border-purple-300 border-[0.1rem] bg-[#7900FF] text-white hover:text-[#b12357]  text-center hover:shadow-gray-300 transition-all duration-200 hover:shadow-xl">
                  <Link
                    className="border-purple-300 border-[0.1rem] h-9 rounded-full px-1 flex justify-center items-center transition-all duration-200 hover:bg-[#9fe2a6] "
                    href={"/healthcharts"}
                    onClick={() => setMenuIsOpen(-1)}
                  >
                    آزمایش های آینده
                  </Link>
                </li>
                <li className="rounded-full  w-36 z-40 p-1 border-purple-300 border-[0.1rem] bg-[#7900FF] text-white hover:text-[#b12357]  text-center hover:shadow-gray-300 transition-all duration-200 hover:shadow-xl">
                  <Link
                    className="border-purple-300 border-[0.1rem] h-9 rounded-full px-1 flex justify-center items-center transition-all duration-200 hover:bg-[#9fe2a6] "
                    href={"/blog"}
                    onClick={() => setMenuIsOpen(-1)}
                  >
                    مقالات
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div
            onClick={() => setMenuIsOpen(-1)}
            className="flex relative items-center gap-2"
          >
            <Link
              href={"/"}
              onClick={() => setMenuIsOpen(-1)}
              className="logo w-52 z-30 bg-white flex flex-col gap-2 p-2 rounded-full border-[0.5px] border-[#7900FF] cursor-pointer transition-all duration-150 hover:shadow-[0px_1px_10px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-center items-center">
                <Image
                  className="rounded-full"
                  width={100}
                  height={100}
                  src={"/logo.png"}
                  alt="logo"
                />
              </div>
              <div className="text-sm text-center font-bold xl:text-lg">
                آزمایشگاه کوچک من
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="fixed z-50 flex md:hidden top-2 right-2">
        <BiMenu
          onClick={() => setMenuIsOpen(menuIsOpen * -1)}
          className={
            menuIsOpen == -1
              ? "w-10 h-10 text-black flex"
              : "w-10 h-10 text-black hidden"
          }
        />
        <AiOutlineClose
          onClick={() => setMenuIsOpen(menuIsOpen * -1)}
          className={
            menuIsOpen == 1
              ? "w-10 h-10 text-black flex"
              : "w-10 h-10 text-black hidden"
          }
        />
      </div>
    </header>
  );
};

export default Header;
