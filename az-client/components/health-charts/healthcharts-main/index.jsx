"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";
import { ImProfile } from "react-icons/im";
import { AiOutlineClose } from "react-icons/ai";

import BMRchart from "../bmr";
import BMIchart from "../bmi";

const HealthChartsMainComponent = ({ items }) => {
  const router = useRouter();

  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));
  const [auth_cookie2, setauth_cookie2] = useState(Cookies.get("auth_cookie"));

  // NO COOKIE REDIRECT
  useEffect(() => {
    if (auth_cookie != auth_cookie2) {
      router.push("/login");
    } else if (!auth_cookie || auth_cookie == "") {
      router.push("/login");
    } else {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-user-data`, {
          headers: { auth_cookie: auth_cookie },
        })
        .then((d) => {
          if (!d.data._id) {
            router.push("/login");
          }
        })
        .catch((err) => {
          router.push("/login");
        });
    }
  }, [Cookies.get("auth_cookie")]);

  useEffect(() => {
    setauth_cookie2(Cookies.get("auth_cookie"));
  }, [Cookies.get("auth_cookie")]);

  //TAB
  const [details, setDetails] = useState(<BMIchart cookie={auth_cookie} />);
  useEffect(() => {
    if (items.slug[0] == "bmi") {
      setDetails(<BMIchart cookie={auth_cookie} />);
    } else if (items.slug[0] == "bmr") {
      setDetails(<BMRchart cookie={auth_cookie} />);
    } else {
      setDetails(<BMIchart cookie={auth_cookie} />);
    }
  }, [items.slug[0]]);

  //FOR RESPONSIVE
  const [menuIsOpen, setMenuIsOpen] = useState(-1);
  useEffect(() => {
    if (menuIsOpen == -1) {
      document.body.style.overflow = "auto";
    } else if (menuIsOpen == 1) {
      document.body.style.overflow = "hidden";
    }
  }, [menuIsOpen]);

  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  //   <div className="flex flex-col gap-1">
  //   <input
  //     type="number"
  //     placeholder="سن جدید(به سال)"
  //     className="p-2 w-full outline-none border-zinc-400 border-2 rounded focus:border-[#18e52d] "
  //     {...register("age", {
  //       min: 1,
  //       valueAsNumber: true,
  //       pattern: {
  //         value: /^(0|[1-9]\d*)(\.\d+)?$/,
  //       },
  //     })}
  //   />
  //   {errors.age && errors.age.type == "required" && (
  //     <div className="text-rose-500 text-sm">
  //       لطفا سن جدید خود را وارد کنید!
  //     </div>
  //   )}
  //   {errors.age && errors.age.type == "min" && (
  //     <div className="text-rose-500 text-sm">
  //       عدد سن جدید باید بزرگتر از صفر باشد!
  //     </div>
  //   )}
  // </div>
  // <div className="flex flex-col gap-1">
  //   <input
  //     type="number"
  //     placeholder="وزن جدید(به کیلوگرم)"
  //     className="p-2 w-full outline-none border-zinc-400 border-2 rounded focus:border-[#18e52d] "
  //     {...register("weight", {
  //       min: 1,
  //       valueAsNumber: true,
  //       pattern: {
  //         value: /^(0|[1-9]\d*)(\.\d+)?$/,
  //       },
  //     })}
  //   />
  //   {errors.weight && errors.weight.type == "required" && (
  //     <div className="text-rose-500 text-sm">
  //       لطفا وزن جدید خود را وارد کنید!
  //     </div>
  //   )}
  //   {errors.weight && errors.weight.type == "min" && (
  //     <div className="text-rose-500 text-sm">
  //       عدد وزن جدید باید بزرگتر از صفر باشد!
  //     </div>
  //   )}
  // </div>
  // <div className="flex flex-col gap-1">
  //   <input
  //     type="number"
  //     placeholder="قد جدید(به سانتی متر)"
  //     className="p-2 w-full outline-none border-zinc-400 border-2 rounded focus:border-[#18e52d] "
  //     {...register("height", {
  //       min: 1,
  //       valueAsNumber: true,
  //       pattern: {
  //         value: /^(0|[1-9]\d*)(\.\d+)?$/,
  //       },
  //     })}
  //   />
  //   {errors.height && errors.height.type == "required" && (
  //     <div className="text-rose-500 text-sm">
  //       لطفا قد جدید خود را وارد کنید!
  //     </div>
  //   )}
  //   {errors.heught && errors.heught.type == "min" && (
  //     <div className="text-rose-500 text-sm">
  //       عدد قد جدید باید بزرگتر از صفر باشد!
  //     </div>
  //   )}
  // </div>

  //   <div className="flex flex-col gap-1">
  //   <div className="flex flex-col gap-2">
  //     <div>جنسیت</div>
  //     <select
  //       {...register("gender")}
  //       className="p-2 rounded w-full outline-none border-2 border-zinc-300 focus:border-[#18e52d]"
  //     >
  //       <option value="Male">مرد</option>
  //       <option value="Female">زن</option>
  //     </select>
  //   </div>
  //   {errors.gender && errors.gender.type == "required" && (
  //     <div className="text-rose-500 text-sm">
  //       لطفا جنسیت را وارد کنید!
  //     </div>
  //   )}
  // </div>

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-start gap-2">
        <div
          className={
            menuIsOpen == -1
              ? "z-50 md:z-40 w-full md:w-72 bg-gray-600 md:bg-[#CFFFDC] p-6 rounded-none md:rounded md:bg-transparent fixed md:sticky md:top-8 md:right-0 md:bottom-8 h-auto py-2 md:py-4 md:px-2 top-0 bottom-0 left-[100%] md:left-0 -right-[100%] transition-all duration-500"
              : "z-50 md:z-40 w-full md:w-72 backdrop-blur-3xl md:bg-[#CFFFDC] p-6 rounded-none md:rounded md:bg-transparent h-[100vh] py-1 md:px-2 fixed top-0 bottom-0 right-0 left-0 md:absolute transition-all duration-500"
          }
        >
          <nav className="flex justify-center items-center mt-12 md:mt-0 ">
            <ul className="flex flex-col gap-4 w-full">
              <li className="w-full">
                <Link
                  onClick={() => {
                    goToTop();
                    setMenuIsOpen(-1);
                  }}
                  className={
                    items.slug[0] == "bmi"
                      ? "rounded text-white bg-[#7900FF] transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                      : "rounded text-white bg-[#548CFF] transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                  }
                  href={"/healthcharts/bmi"}
                >
                  نمودارهای BMI
                </Link>
              </li>
              <li className="w-full">
                <Link
                  onClick={() => {
                    goToTop();
                    setMenuIsOpen(-1);
                  }}
                  className={
                    items.slug[0] == "bmr"
                      ? "rounded text-white bg-[#7900FF] transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                      : "rounded text-white bg-[#548CFF] transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                  }
                  href={"/healthcharts/bmr"}
                >
                  نمودارهای BMR
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-2 md:p-4 w-full rounded mt-4 md:mt-0">{details}</div>
      </div>
      <div className="fixed z-50 flex md:hidden top-3 left-3">
        <ImProfile
          onClick={() => setMenuIsOpen(menuIsOpen * -1)}
          className={
            menuIsOpen == -1
              ? "w-9 h-9 text-gray-800 flex"
              : "w-9 h-9 text-gray-800 hidden"
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
    </div>
  );
};

export default HealthChartsMainComponent;
