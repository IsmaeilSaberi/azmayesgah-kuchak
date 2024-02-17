"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

const BMRchart = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);
  const [advice, setAdvice] = useState(true);

  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-part-of-user-data/healthparameters`,
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

  return (
    <div className="flex flex-col gap-10 relative pt-8">
      <>
        <title>شاخص های سلامتی من</title>
        <meta name="description" content="شاخص های سلامتی من" />
        <meta name="robots" content="index,follow" />
        <link
          rel="canonical"
          href="http://localhost:3000/account/healthparameters"
        />
      </>
      <h3 className="text-lg absolute top-1 right-1 ">
        محاسبه شاخص های سلامتی
      </h3>

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
          <div className="flex flex-col gap-3 p-2">
            <div className="flex justify-between m-1 items-center gap-6 flex-wrap">
              <div className="flex justify-center gap-4 items-center bg-[#e5fcde] w-full md:w-60 text-sm h-10 rounded p-1">
                <div>تاریخ ثبت نام:</div>
                <div>{data.createdAt}</div>
              </div>
              <div className="flex justify-center gap-4 items-center bg-[#e5fcde] w-full md:w-60 text-sm h-10 rounded p-1">
                <div>تاریخ به روز رسانی:</div>
                <div>{data.updatedAt}</div>
              </div>
            </div>
            <div
              onClick={() => {
                setAdvice(!advice);
              }}
              className="flex justify-center items-center rounded cursor-pointer transition-all duration-200 text-white hover:bg-indigo-400 text-xs gap-1 w-32 h-8 bg-[#7900FF]"
            >
              {advice ? "بستن اطلاعات تکمیلی" : " مشاهده اطلاعات تکمیلی"}
            </div>
            {advice ? (
              <div className="">
                <div className=" bg-white rounded overflow-hidden shadow-xl transform transition-all sm:my-4">
                  <div className="px-4 pt-2 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg text-center font-medium leading-6 text-gray-900">
                      توضیحات تکمیلی شاخص های سلامتی
                    </h3>
                    <div className="mt-4">
                      <p className="text-sm text-right text-gray-500">
                        - سن بر حسب سال محاسبه شده است (y)
                        <br />
                        <br />
                        - سن بر حسب واحد کیلوگرم محاسبه شده است (kg)
                        <br />
                        <br />
                        - قد بر حسب واحد سانتی متر محاسبه شده است (cm)
                        <br />
                        <br />
                        - شاخص توده بدنی(یا BMI) که از فرمول با فرمول مقابل
                        محاسبه می شود: وزن تقسیم بر قد به متر ضربدر خودش و
                        محدوده ی نرمال آن از 18.5 تا 24.9 است.
                        <br />
                        <br />
                        - نرخ متابولیک پایه یا BMR که تعداد کالری های لازم برای
                        حفظ عملکردهای بدن در حالت استراحت می باشد.
                        <br />
                        این فرمول برای مردان به صورت مقابل است: 66.47 + (13.75 *
                        وزن به کیلوگرم) + (5.003 * قد به سانتی متر) - (6.755 *
                        سن به سال)
                        <br />
                        این فرمول برای خانم ها به صورت زیر می باشد: 6.551 +
                        (9.563 * وزن به کیلوگرم) + (1.85 * قد به سانتی متر) -
                        (4.676 * سن به سال)
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"></div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <h2 className="text-lg">
              بر اساس داده های وارد شده توسط شما که به قرار زیر می باشند:{" "}
            </h2>
            <div className="flex flex-wrap gap-6 bg-[#e5fcde] w-full text-sm rounded p-1">
              <div className="flex justify-start border-2 border-[#548CFF] p-1 rounded items-center gap-4">
                <div>سن:</div>
                <div>{data.age}</div>
              </div>
              <div className="flex justify-start border-2 border-[#548CFF] p-1 rounded items-center gap-4">
                <div>وزن:</div>
                <div>{data.weight} کیلوگرم</div>
              </div>
              <div className="flex justify-start border-2 border-[#548CFF] p-1 rounded items-center gap-4">
                <div>قد:</div>
                <div>{data.height} سانتی متر</div>
              </div>
              <div className="flex justify-start border-2 border-[#548CFF] p-1 rounded items-center gap-4">
                <div>جنسیت:</div>
                <div>{data.gender == "Male" ? "آقا" : "خانم"}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              <div className="flex gap-2 border-2 border-[#7900FF] rounded p-4">
                <h3 className="font-bold text-lg">
                  شاخص توده بدنی یا BMI شما:{" "}
                </h3>
                <div
                  className={
                    data.BMI > 18.5 && data.BMI < 25
                      ? "text-[#7900FF] text-2xl font-bold bg-[#548CFF] p-1 rounded"
                      : "text-[#9a031e] text-2xl font-bold bg-[#548CFF] p-1 rounded"
                  }
                >
                  {data.BMI}
                </div>
              </div>
              <div className="flex gap-2 border-2 border-[#7900FF] rounded p-4">
                <h3 className="font-bold text-lg">
                  نرخ متابولیک یا سوخت و ساز پایه شما(BMR):{" "}
                </h3>
                <div className="text-[#9a031e] text-2xl font-bold bg-[#548CFF] p-1 rounded">
                  {data.BMR}{" "}
                  <span className="text-sm text-gray-600">کالری</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMRchart;
