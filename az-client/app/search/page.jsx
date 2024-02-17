import Redirect from "../../components/redirect";

const SearchPage = () => {
  return (
    <div>
      <div className="p-12 text-center">
        در حال انتقال به صفحه ی جستجوها ...
      </div>
      <Redirect url={"/search/experiments"} />
    </div>
  );
};

export default SearchPage;
