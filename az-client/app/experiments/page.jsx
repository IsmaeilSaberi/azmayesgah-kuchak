import ExperimentPageComponent from "@/components/experiment-page";

export const metadata = {
  metadataBase: new URL("https://azekuchak.ir/"),
  title: "آزمایش ها",
  description: "بخش آزمایش های آزمایشگاه کوچک من",
  alternates: {
    canonical: "/experiments",
    languages: {
      fa: "/fa-IR",
    },
  },
};

const ExperimentPage = async ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      <ExperimentPageComponent url={searchParams} />
    </div>
  );
};

export default ExperimentPage;
