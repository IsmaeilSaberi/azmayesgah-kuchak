import Image from "next/legacy/image";
import BreadCrumb from "@/components/bread-crumb";
import { FcDownload } from "react-icons/fc";
import { MdDateRange } from "react-icons/md";
import { RiTimer2Line } from "react-icons/ri";
import Link from "next/link";

import { notFound } from "next/navigation";
import VideoPlayer from "@/components/video-player";
import AudioPlayer from "@/components/audio-player";
import RelatedExperiments from "@/components/related-experiments";
import RelatedPosts from "@/components/related-posts";
import SearchComponent from "@/components/search/search-component";
import HtmlRender from "@/components/html-render";

//// THIS IS A DYNAMIC SEO FOR THIS DYNAMIC PAGE
export async function generateMetadata({ params }) {
  // GET DATA OF ONE DOWNLOAD
  const data = await getData(params.slug);
  if (!data) {
    return {
      title: "این آزمایش پیدا نشد!",
      description: "چنین آزمایشی وجود ندارد!",
    };
  }
  return {
    title: "آزمایشگاه کوچک من",
    description: data.shortDesc,
    alternates: {
      canonical: `/experiment/experiments/${params.slug}`,
      languages: {
        "fa-IR": `/fa-IR/experiments/${params.slug}`,
      },
    },
  };
}

//// SINGLE EXPERIMENT DATA
const getData = async (slug) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}experiment/get-experiment/${slug}`,
    { cache: "no-store" }
  );
  const outData = await data.json();
  if (!outData._id && outData.msg) {
    notFound();
  } else {
    return outData;
  }
};

const SingleExperiment = async ({ params }) => {
  const data = await getData(params.slug);
  const commentProps = { src_id: data._id, typeOfModel: "experiment" };

  // A FUNCTION FOR REPLACING - WITH SPACE IN TAGS
  function replaceDashWithSpace(str) {
    // Replace the Persian hyphen character with a space
    return str.replace(/[\u2012_\u2015]/g, " ");
  }

  return (
    <div className="container mx-auto flex justify-between items-start gap-2">
      {data.msg ? (
        <div className="w-full flex justify-center items-center p-12 text-xl">
          <div>این آزمایش هنوز منتشر نشده است!</div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2 w-full my-8 px-1 md:p-1">
          <main className="w-full md:w-[60%] lg:w-[75%]">
            <div className="flex flex-col gap-8">
              <BreadCrumb
                secondTitle={"آزمایش ها"}
                secondLink={"/experiments"}
                title={data.title}
              />
              <section className="flex justify-center items-center">
                <Image
                  className="rounded"
                  alt={data.imageAlt}
                  title={data.title}
                  width={800}
                  height={500}
                  src={data.image}
                  priority={true}
                />
              </section>
              <section className="flex flex-col gap-6">
                <h1 className="text-indigo-600 text-lg">{data.title}</h1>
                <div className="flex justify-start items-center gap-2 text-base sm:text-sm flex-wrap">
                  <div className="bg-zinc-200 rounded-md p-2 flex justify-between items-center gap-2">
                    <MdDateRange className="w-6 h-6" />
                    <span>آخرین بروز رسانی : </span>
                    <span>{data.updatedAt}</span>
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-6 p-2">
                <h2 className="text-xl">توضیحات کامل</h2>
                <HtmlRender htmlContent={data.longDesc} />
              </section>
              <div className="h-[0.05rem] w-full bg-indigo-700"></div>
              <section className="flex flex-col gap-4">
                <div className="flex justify-around items-center p-1">
                  <div className="flex justify-start items-center">
                    <h2 className="text-indigo-800">فایل تصویری</h2>
                  </div>
                  <div className="text-xs flex justify-center items-center md:text-md">
                    MB {data.videoSize}{" "}
                  </div>
                  <div className="flex gap-1 text-xs justify-center items-center md:text-md">
                    {data.videoDuration} دقیقه
                    <RiTimer2Line className="text-lg" />
                  </div>
                  <div className="flex gap-1 text-xs justify-center items-center md:text-md">
                    دریافت فایل
                    <Link download href={data.videoLink} className="p-1">
                      <FcDownload className="text-lg" />
                    </Link>
                  </div>
                </div>
                <VideoPlayer src={data.videoLink} />
              </section>
              <section className="flex flex-col gap-4">
                <div className="flex justify-around items-center p-1">
                  <div className="flex justify-start items-center">
                    <h2 className="text-indigo-800">فایل صوتی</h2>
                  </div>
                  <div className="text-xs flex justify-center items-center md:text-md">
                    {data.audioSize} MB
                  </div>
                  <div className="flex gap-1 text-xs justify-center items-center md:text-md">
                    {data.audioDuration} دقیقه
                    <RiTimer2Line className="text-lg" />
                  </div>
                  <div className="flex gap-1 text-xs justify-center items-center md:text-md">
                    دریافت فایل
                    <Link download href={data.audioLink} className="p-1">
                      <FcDownload className="text-lg" />
                    </Link>
                  </div>
                </div>
                <AudioPlayer src={data.audioLink} />
              </section>
            </div>
          </main>
          <aside className="mt-8 md:mt-0 w-full md:w-80 md:max-w-80 p-1 rounded-md bg-zinc-50 flex flex-col gap-8">
            <SearchComponent searchIn={"experiments"} />
            <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-indigo-600">توضیحات خلاصه</h3>
              <p className="text-base md:text-sm text-justify leading-6">
                {data.shortDesc}
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-indigo-600">برچسب ها</h3>
              <div className="flex justify-start items-center gap-2 flex-wrap">
                {data.tags.length < 1 ? (
                  <div className="flex justify-center items-center p-2">
                    بدون برچسب
                  </div>
                ) : (
                  data.tags.map((ta, i) => (
                    <Link
                      key={i}
                      className=" p-[0.15rem] flex justify-start items-center text-white text-sm bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 rounded"
                      href={`/downloads?keyword=${escape(ta)}`}
                    >
                      {replaceDashWithSpace(ta)}
                    </Link>
                  ))
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-indigo-600">مقالات مرتبط</h3>
              <RelatedPosts related={data.relatedPosts} />
            </div>
            <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-indigo-600">آزمایش های مرتبط</h3>
              <RelatedExperiments related={data.relatedExperiments} />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default SingleExperiment;
