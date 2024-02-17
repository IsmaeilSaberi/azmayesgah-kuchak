"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { FiRefreshCcw } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

//FOR UPDATING MINI DATA
import { useForm } from "react-hook-form";
import LinearChart from "../charts/linearchart";

const BMIchart = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);

  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-part-of-user-data/info`,
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

  //FOR UPDATING MINI DATA
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});

  const miniUpdater = () => {
    const formData = {
      password: watch("password"),
      rePassword: watch("repassword"),
    };
    const backendUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/update-mini-user/${data._id}`;
    axios
      .post(backendUrl, formData, {
        headers: { auth_cookie: cookie },
      })
      .then((d) => {
        const message = d.data.msg
          ? d.data.msg
          : "تغییر اطلاعات با موفقیت انجام شد!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNeedRefresh(1);
      })
      .catch((err) => {
        const errorMsg =
          err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : "خطا";
        toast.error(errorMsg, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // LOGOUT
  const router = useRouter();
  const logouter = () => {
    Cookies.set("auth_cookie", "", { expires: 0 });
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-10 relative pt-8">
      <>
        <title>اطلاعات من</title>
        <meta name="description" content="اطلاعات من" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="http://localhost:3000/account/info" />
      </>
      <h3 className="text-lg absolute top-1 right-1 ">اطلاعات کلی من</h3>
      <div
        onClick={() => {
          setNeedRefresh(1);
          setData([-1]);
        }}
        className="absolute top-0 left-0 flex justify-center items-center rounded cursor-pointer transition-all duration-200 text-white hover:bg-indigo-400 text-xs gap-1 w-20 h-8 bg-[#2357b1]"
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
          <LinearChart />
        )}
      </div>
    </div>
  );
};

export default BMIchart;
