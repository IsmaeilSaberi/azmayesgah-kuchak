import SearchMainComponent from "@/components/search/search-main";

const Page = async ({ params }) => {
  return (
    <section className="container mx-auto">
      <h1 className="text-lg text-indigo-500 p-1">جستجو ...</h1>
      <SearchMainComponent items={params} />
    </section>
  );
};

export default Page;
