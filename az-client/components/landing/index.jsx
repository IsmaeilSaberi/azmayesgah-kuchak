import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="container mx-auto p-1">
      <header className="text-center py-4">
        <h1 className="text-xl md:text-3xl text-[#7900FF] font-bold">
          به آزمایشگاه کوچک من خوش آمدی!
        </h1>
      </header>
      <main className="container mx-auto py-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div>
            <Image
              className="rounded"
              src={"/landing.png"}
              width={600}
              height={600}
              alt="آزمایشگاه من"
            />
          </div>
          <div className="flex flex-col justify-evenly gap-4">
            <div className="flex flex-col justify-start items-center text-justify gap-2">
              <p className="text-lg">
                همه مون توی مدرسه مواقعی رو داشتیم که توی خیلی از درسهای عملی و
                آزمایشگاهی به دلیل نبودن فضای آزمایشگاهی مناسب از خیلی از مطالب
                گذر کردیم.
              </p>
              <p className="text-lg">
                در حالی که می دونیم آزمایش های علمی توی درسهامون خیلی مهمند و می
                تونن سرمنشاء اختراعات جدید و باعث درک بیشتر ما دانش آموزان در
                یادگیری هر چه بهتر درسهامون باشند.
              </p>
              <p className="text-lg">
                این مساله من و دوستم رو به فکر یک ایده انداخت که بتونیم با کمک
                از فضای آنلاین راه حلی برای این کار پیدا کنیم و این شد که
                آزمایشگاه کوچک من رو راه اندازی کردیم.
              </p>
            </div>
            <div className="flex flex-col md:flex-row text-justify justify-end items-center gap-4 p-1 m-2">
              <p className="text-lg font-bold">
                اگر شما هم دنبال دیدن و تجربه ی آزمایش های با حال از درس ها مون
                و منابع دیگه هستی از اینجا می تونی سفرت رو با ما شروع کنی.
              </p>
              <Link
                href={"/login"}
                className="bg-[#7900FF] hover:bg-[#CFFFDC] border-2 hover:border-[#7900FF] hover:text-[#7900FF] text-white font-bold py-2 px-4 rounded-full"
              >
                شروع
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
