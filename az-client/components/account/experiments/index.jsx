"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

import { FiRefreshCcw } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi";

// USING CONTEXT
import { useAppContext } from "../../../context/app-context";

const Experiments = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);

  // CONTEXT OF CARTNUMBER
  const { cartNumber, setCartNumber } = useAppContext();

  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-part-of-user-data/experiments`,
          {
            headers: { auth_cookie: cookie },
          }
        )
        .then((d) => {
          setData(d.data);
        })
        .catch((err) => {
          toast.error("خطا در لود اطلاعات!", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      setNeedRefresh(0);
    }
  }, [cookie, needRefresh]);

  const featureSpliter = (val) => {
    return val.split(":");
  };

  const productRemover = (id) => {
    const formData = {
      method: "remove",
      goalFavProductId: id,
    };
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorite-product`,
        formData,
        {
          headers: { auth_cookie: cookie },
        }
      )
      .then((d) => {
        toast.success(d.data.msg, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNeedRefresh(0);
      })
      .catch((err) => {
        toast.error("خطا در لود اطلاعات!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setNeedRefresh(1);
  };

  return (
    <div className="flex flex-col gap-8 relative pt-20">
      <>
        <title>آزمایش های من</title>
        <meta name="description" content="آزمایش های های من" />
        <meta name="robots" content="index,follow" />
        <link
          rel="canonical"
          href="http://localhost:3000/account/experiments"
        />
      </>
      <h3 className="text-lg absolute top-1 right-1 ">آزمایش های من</h3>
      <div
        onClick={() => {
          setNeedRefresh(1);
          setData([-1]);
        }}
        className="absolute top-1 left-0 flex justify-center items-center rounded cursor-pointer transition-all duration-200 text-white hover:bg-indigo-400 text-sm gap-1 w-28 h-10 bg-[#2357b1]"
      >
        <FiRefreshCcw />
        به روز رسانی
      </div>
      <div>
        {data[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image
              alt="loading"
              width={120}
              height={120}
              src={"/loading.svg"}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-end items-center w-full">
              <div className="flex justify-center items-center bg-[#b17d23] text-white w-28 h-10 rounded">
                {data.experiments.length} آزمایش
              </div>
            </div>
            <div>
              {data.experiments.length < 1 ? (
                <div className="flex justify-center items-center p-8 w-full">
                  آزمایشی موجود نیست!
                </div>
              ) : (
                <div className="w-full flex flex-col gap-8">
                  {data.experiments.map((da, i) => (
                    <div
                      className="w-full flex flex-col gap-4 bg-[#e5fcde] text-sm rounded p-4 border-2 border-indigo-400"
                      key={i}
                    >
                      <div className="flex w-full flex-col md:flex-row justify-center items-center md:justify-between md:items-start gap-4">
                        <div className="flex justify-center items-center">
                          <Image
                            className="p-2"
                            alt={"product_image"}
                            title={da.imageAlt}
                            width={288}
                            height={120}
                            src={da.image}
                          />
                        </div>
                        <div className="relative w-full flex flex-col gap-4">
                          <Link
                            className="absolute top-1 left-24 flex justify-center items-center w-20 h-6 bg-green-600 transition-all duration-200 hover:bg-green-700 rounded-sm text-white text-sx"
                            href={`/shop/${da.slug}`}
                            target="_blank"
                          >
                            لینک آزمایش
                          </Link>
                          <div className="absolute top-1 left-1 bg-[#2357b1] text-white rounded-sm text-xs flex justify-center items-center w-20 h-6">
                            {da.typeOfProduct == "gr" ? (
                              <div>فایل گرافیکی</div>
                            ) : da.typeOfProduct == "app" ? (
                              <div>اپلیکیشن</div>
                            ) : (
                              <div>کتاب</div>
                            )}
                          </div>

                          <h3 className="mt-10 lg:mt-0 text-base">
                            {da.title}
                          </h3>
                          <p>{da.shortDesc}</p>

                          <div className="w-[95%] h-[.1rem] bg-zinc-400 rounded"></div>
                          <div className="m-4">
                            <div
                              onClick={() => cartAdder(da._id)}
                              className="absolute bottom-0 md:bottom-2 left-30 md:left-44 flex justify-center items-center cursor-pointer transition-all duration-200 text-white hover:bg-green-600 bg-green-500 w-32 h-8 rounded gap-2"
                            >
                              <HiShoppingBag className="w-6 h-6 p-1 mr-1 rounded-lg" />{" "}
                              افزودن به آزمایش ها
                            </div>
                            <div
                              onClick={() => productRemover(da._id)}
                              className="absolute flex justify-center items-center gap-1 rounded bottom-2 left-2 w-16 h-6 cursor-pointer bg-rose-600 text-white transition-all duration-200 hover:bg-rose-700"
                            >
                              حذف
                              <MdDeleteForever />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experiments;
