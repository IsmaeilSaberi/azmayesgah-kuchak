import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="container mx-auto">
      <header className="text-center py-4">
        <h1 className="text-4xl font-bold">به وبسایت وعده تندرستی خوش آمدی!</h1>
      </header>

      <main className="container mx-auto py-8">
        <p className="text-lg">
          سلامتی جزئی جدایی ناپذیر از زندگی هر کسی است که خواهان تجربه ی زندگی
          شاد و عالی است.
        </p>
        <p className="text-lg">
          مطمئنا غذایی که می خوریم یکی از مهمترین معیارهای تاثیرگذار در سلامتی
          ماست.
        </p>
        <p className="text-lg">
          اگر در تغذیه ی خود دقت های لازم را انجام دهیم و موادی سالم وارد بدن
          خود کنیم در آینده با بیماری ها روبرو نخواهیم شد تا نیازی به استفاده از
          داروها باشد.
        </p>
        <div className="flex justify-center items-center gap-1 p-2 m-4">
          <p className="text-lg font-bold">
            برای سنجش معیارهای سلامتی ات و همچنین کنترل سلامتی ات از لحاظ درشت
            مغذی ها و ریز مغذی ها می توانی از اینجا شروع کنی.
          </p>

          <Link
            href={"/login"}
            className="bg-[#7900FF] hover:bg-[#FFB000] text-white font-bold py-2 px-4 rounded"
          >
            شروع
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
